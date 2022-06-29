import { FC } from "react";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";




interface IProps {
    shownUserInterest: IUserInterest,
    shownAds: IFoundAdvert[] | undefined,
    handleDeleteFoundAd: (foundAdvert: IFoundAdvert, userInterestId: number) => {}
    
}

const FoundAdsTable: FC<IProps> = ({ shownAds, shownUserInterest, handleDeleteFoundAd }) => {

    
 

    return (
        <>  
            {
                shownAds ? 
                shownAds.map(fa => {
                    return <div key={fa.id}>
                                <button onClick={() => {
                                    if(shownUserInterest.id) handleDeleteFoundAd(fa, shownUserInterest.id);
                                }}>
                                    X
                                </button>
                                {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                                --- {fa.carYear}, {fa.carMileage}km
                            </div>
                        
                }) :
                <> Сеуште нема пронајдени огласи! </>
            }
        </>
    );
}

export default FoundAdsTable;   