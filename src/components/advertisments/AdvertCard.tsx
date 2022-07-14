import { FC } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { setActiveOnUserAdvert } from '../../utils/restServices/userAdvertsService';
import { useUserAdverts } from "../../utils/swrHooks/useUserAdverts";
import { useUI_ZustandStore } from "../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { categories, regions } from "../../utils/categoriesAndRegionsData";


interface IProps {
    userAdvert: IUserAdvert, 
    typeOfAdsShown: string,        
}



const AdvertCard: FC<IProps> = ({ userAdvert, typeOfAdsShown }) => {


    const [ auth0UserInfo, userId ] = useUI_ZustandStore(state => [state.auth0UserInfo, state.userId], shallow);
    const { allAdverts, setAdverts } = useUserAdverts();


    

    const arrayBufferToBase64 = ( buffer: any ) => {            // * Convert byte array from backend to base64 endcoded string. Then render <img src=<myBase64String> />
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    const handleSetActiveOnAdvert = async () => {

        if(userId) {

            const frmData = new FormData();
            if(userAdvert.image)
                frmData.append('image', userAdvert.image)


            if(userAdvert.isActive){
                await setActiveOnUserAdvert(userAdvert, userId, false, auth0UserInfo.token);
            } else await setActiveOnUserAdvert(userAdvert, userId, true, auth0UserInfo.token);


            let newAdsArray = allAdverts.map((ad: IUserAdvert) => {     // * Triggers component rerender
                if(ad.id === userAdvert.id){
                    ad.isActive = false;
                }
                return ad;
            })

            setAdverts(newAdsArray);
        } else {
            console.error('UserID e UNDEFINED!')
        }
    } 

    // * Utility methods
    const renderMKDName_category = (category: string) => {
        const mkCategory = categories.find(cat => cat.value === category)
        return <span className="block truncate">{mkCategory?.text}</span>
    }

    const renderMKDName_region = (region: string) => {
        const mkRegion = regions.find(reg => reg.value === region)
        return <span className="block truncate">{mkRegion?.text}</span>
    }
    

   
    

    return(
        <>
                

            <div key={userAdvert.id} className="group relative">

              {/* // * Image */}
              <div className="w-84 min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden h-80 lg:aspect-none">
                {
                    typeOfAdsShown === 'byUser' ?

                    <>
                        <Link to='/editUserAdvert' state={userAdvert}>
                            <button
                            className="inline-flex items-center ml-3 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Промени</button>
                        </Link>

                        <>
                            {
                                userAdvert.isActive ?
                                <button 
                                className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                                onClick={() => {handleSetActiveOnAdvert()}}>Деактивирај</button>
                                :
                                <button 
                                className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                                onClick={() => {handleSetActiveOnAdvert()}}>Активирај</button>

                            }
                        </>

                        
                    </>
                    : 

                    <></>
                }

                <>
                    <img
                    src={"data:image/png;base64," + arrayBufferToBase64(userAdvert.image)}
                    alt='Нема слика'
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />

                    {
                        typeOfAdsShown === 'byUser' ?
                        <>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-gray-400 absolute text-black top-9 left-3">{renderMKDName_region(userAdvert.region)}</h3>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-gray-400 absolute text-black top-16 left-3">{renderMKDName_category(userAdvert.category)}</h3>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-green-300 absolute text-black top-24 left-3">{userAdvert.price}</h3>
                        </> : 
                        <>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-gray-400 absolute text-black top-3 left-3">{renderMKDName_region(userAdvert.region)}</h3>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-gray-400 absolute text-black top-9 left-3">{renderMKDName_category(userAdvert.category)}</h3>
                            <h3 className="px-2.5 py-0.5 rounded-full font-medium text-xs bg-green-300 absolute text-black top-16 left-3">{userAdvert.price}</h3>
                        </> 
                    }
                    
                    

                </>
              </div>


              {/* // * Descriptions */}
              <div className="mt-4 flex justify-between">

                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    {userAdvert.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{userAdvert.description}</p>
                  <p className="mt-1 text-sm text-gray-700">{userAdvert.contactInfo}</p>
                </div>

              </div>
            </div>
          


        </>
    );
}

export default AdvertCard;   