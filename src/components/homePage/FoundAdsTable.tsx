import { MailIcon, ExternalLinkIcon, XCircleIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";
import noImageLogo from '../../shared/scale-image-pngrepo-com.png';
// import noImageLogo from '../../shared/image-pngrepo-com-2.png';





interface IProps {
    shownUserInterest: IUserInterest,
    shownAds: IFoundAdvert[] | undefined,
    handleDeleteFoundAd: (foundAdvert: IFoundAdvert, userInterestId: number) => {}
    
}

const FoundAdsTable: FC<IProps> = ({ shownAds, shownUserInterest, handleDeleteFoundAd }) => {

    
    const renderImage = (shownAd: IFoundAdvert) => {
        if(shownAd.imageUrl === '') {
            return <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={noImageLogo} alt="нема слика" />
        } else if(shownAd.imageUrl.split('.')[0] === 'reklama5') {
            return <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={'https://' + shownAd.imageUrl} alt="нема слика" />
        } else {
            if(shownAd.imageUrl.split('/')[0] === 'ontent'){
                return <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={noImageLogo} alt="нема слика" />
            }
            else {
                return <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={shownAd.imageUrl} alt="нема слика" />
            }
        }
    }
 

    return (
        <>  
            {
                shownAds ? 


                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">        
                {shownAds.map((shownAd) => (
                    <li
                    key={shownAd.id}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                    >
                    <div className="flex-1 flex flex-col p-8">
                     
                        {renderImage(shownAd)}

                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{shownAd.title}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-gray-500 text-sm">{shownAd.price}</dd>

                            
                            {
                                shownUserInterest.category === 'Avtomobili' ?
                                <>
                                    <dd className="text-gray-500 text-sm">{shownAd.carYear} година</dd>
                                    <dd className="text-gray-500 text-sm">{shownAd.carMileage} km</dd>
                                </> :
                                null
                            }

                            <dt className="sr-only">Role</dt>
                            <div>
                                <dd className="mt-3">
                                    <span className="px-2 mx-1 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                    {shownUserInterest.category}
                                    </span>

                                    <span className="px-2 mx-1 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                    {shownUserInterest.region}
                                    </span>
                                </dd>
                                <dd className="mt-2">
                                    <span className="px-2 mx-1 py-1 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">
                                    {shownAd.imageUrl.split('.')[0] === 'reklama5' ? 'Реклама 5' : 'Пазар 3'}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="-ml-px w-0 flex-1 flex">
                                <button
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-700 font-medium border border-transparent rounded-br-lg hover:text-red-500"
                                onClick={() => {
                                    if(shownUserInterest.id) handleDeleteFoundAd(shownAd, shownUserInterest.id);
                                }}
                                >
                                    <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                                    <span className="ml-3">Избриши</span>
                                </button>
                            </div>
                            
                            <div className="-ml-px w-0 flex-1 flex">
                                <a
                                href={`${shownAd.url}`}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Оглас</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
                
                
                :
                <> Сеуште нема пронајдени огласи! </>
            }
        </>
    );
}

export default FoundAdsTable;   