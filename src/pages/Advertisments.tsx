import { FC } from "react";
import ActionsPanel from "../components/advertisments/ActionsPanel";
import AdvertCard from "../components/advertisments/AdvertCard";
import Loader from "../components/shared/Loader";
import { IUserAdvert } from "../utils/interfaces";
import { useUserAdverts } from "../utils/swrHooks/useUserAdverts";


const Advertisments: FC<{}> = () => {

    const { allAdverts, isLoadingData } = useUserAdverts();

    return (
        <>
            {
                isLoadingData 
                ? 
                <>
                    <Loader/>
                </> 
                :
                <>
                    <ActionsPanel/>
                    <br/>
                    <br/>
                    
                    {
                        allAdverts.map((adv: IUserAdvert) => <AdvertCard userAdvert={adv}/>)
                    }

                </>
            }

            
        </>
    )
}

export default Advertisments;