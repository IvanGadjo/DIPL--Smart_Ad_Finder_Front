import { FC } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { setActiveOnUserAdvert } from '../../utils/restServices/userAdvertsService';
import { useUserAdverts } from "../../utils/swrHooks/useUserAdverts";
import { useUI_ZustandStore } from "../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';

interface IProps {
    userAdvert: IUserAdvert,         
}



const AdvertCard: FC<IProps> = ({ userAdvert }) => {


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
                await setActiveOnUserAdvert(userAdvert, 1, false, auth0UserInfo.token);
            } else await setActiveOnUserAdvert(userAdvert, 1, true, auth0UserInfo.token);


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
    

   
    

    return(
        <>

                <div style={{backgroundColor: '#f1fcc7', width: '400px'}}>
                    <strong>{userAdvert.category}, {userAdvert.region}</strong>

                    <Link to='/editUserAdvert' state={userAdvert}>
                        <button>Промени</button>
                    </Link>

                    <button onClick={() => {handleSetActiveOnAdvert()}}>Активирај/Деактивирај</button>


                    <h2>{userAdvert.title}</h2>
                    <p>{userAdvert.description}, {userAdvert.price}, {userAdvert.isActive ? userAdvert.isActive.toString() : 'false'}, {userAdvert.id}</p>
                    <p>{userAdvert.contactInfo}</p>



                    <img alt='нема слика' src={"data:image/png;base64," + arrayBufferToBase64(userAdvert.image)} style={{ width: '250px', height:'250px'}}/>
                </div>

                <br/>
                <br/> 


        </>
    );
}

export default AdvertCard;   