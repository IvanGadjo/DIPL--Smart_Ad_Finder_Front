import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { getAllAdverts, getAllAdvertsByUserId } from "../../utils/restServices/userAdvertsService";

interface IProps {
    setShownAdverts: Dispatch<SetStateAction<IUserAdvert[] | undefined>>
}



const ActionsPanel: FC<IProps> = ({ setShownAdverts }) => {

    const [shownAdsType, setShownAdsType] = useState('byUser');

    const handleToggle_advertsShownType = async () => {
        if(shownAdsType === 'byUser') {
            let userAds = await getAllAdvertsByUserId(1);      // ! MOCK USER ID
            setShownAdverts(userAds);
            setShownAdsType('all');
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