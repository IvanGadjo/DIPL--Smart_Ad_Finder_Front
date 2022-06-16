import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { getAllAdverts, getAllAdvertsByUserId } from "../../utils/restServices/userAdvertsService";
import { useUI_ZustandStore } from '../../utils/zustandStores/userInfoStore';
import shallow from 'zustand/shallow';

interface IProps {
    setShownAdverts: Dispatch<SetStateAction<IUserAdvert[] | undefined>>,
    typeOfAdsShown: string,
    setTypeOfAdsShown: Dispatch<SetStateAction<string>>
}



const ActionsPanel: FC<IProps> = ({ setShownAdverts, typeOfAdsShown, setTypeOfAdsShown }) => {

    const [ userId, auth0UserInfo ] = useUI_ZustandStore(state => [state.userId, state.auth0UserInfo], shallow);

    
    const handleToggle_advertsShownType = async () => {
        if(typeOfAdsShown === 'byUser') {

            let userAds = await getAllAdverts();   
            
            setShownAdverts(userAds);
            setTypeOfAdsShown('all');
            
        } else {
            if(userId){
                let userAds = await getAllAdvertsByUserId(userId, auth0UserInfo.token);
                setShownAdverts(userAds);
                setTypeOfAdsShown('byUser');
            } else {
                console.error('UserID e UNDEFINED!')
            }
        }
    }

    return (
        <>
            <Link to='/createUserAdvert'>
                <button>Ново барање</button>
            </Link>

            <br/>
            <br/>


            <button onClick={() => handleToggle_advertsShownType()}>Прикажи мои/останати</button>

        </>
    );
}

export default ActionsPanel;   