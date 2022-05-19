import { FC } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";

interface IProps {
    userAdvert: IUserAdvert,         
}



const AdvertCard: FC<IProps> = ({ userAdvert }) => {



    

    const arrayBufferToBase64 = ( buffer: any ) => {            // * Convert byte array from backend to base64 endcoded string. Then render <img src=<myBase64String> />
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    

   
    

    return(
        <>

                <div style={{backgroundColor: '#f1fcc7', width: '400px'}}>
                    <strong>{userAdvert.category}, {userAdvert.region}</strong>

                    <Link to='/editUserAdvert' state={userAdvert}>
                        <button>Промени</button>
                    </Link>


                    <h2>{userAdvert.title}</h2>
                    <p>{userAdvert.description}, {userAdvert.price}, {userAdvert.isActive ? userAdvert.isActive.toString() : null}, {userAdvert.id}</p>


                    <img alt='нема слика' src={"data:image/png;base64," + arrayBufferToBase64(userAdvert.image)} style={{ width: '250px', height:'250px'}}/>
                </div>

                <br/>
                <br/> 


        </>
    );
}

export default AdvertCard;   