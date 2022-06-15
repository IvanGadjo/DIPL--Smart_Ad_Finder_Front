import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { getAllAdverts, getAllAdvertsByUserId } from "../../utils/restServices/userAdvertsService";
import { useUI_ZustandStore } from '../../utils/zustandStores/userInfoStore';
import shallow from 'zustand/shallow';

interface IProps {
    setShownAdverts: Dispatch<SetStateAction<IUserAdvert[] | undefined>>
}



const ActionsPanel: FC<IProps> = ({ setShownAdverts }) => {

    const [ userId, auth0UserInfo ] = useUI_ZustandStore(state => [state.userId, state.auth0UserInfo], shallow);
    const [shownAdsType, setShownAdsType] = useState('byUser');
    

    const handleToggle_advertsShownType = async () => {
        if(shownAdsType === 'byUser') {
            // let userAds = await getAllAdvertsByUserId(1);      // ! MOCK USER ID
            if(userId){
                let userAds = await getAllAdvertsByUserId(userId, auth0UserInfo.token);
                setShownAdverts(userAds);
                setShownAdsType('all');
            } else {
                console.error('UserID e UNDEFINED!')
            }
        } else {
            let userAds = await getAllAdverts();      
            setShownAdverts(userAds);
            setShownAdsType('byUser');
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