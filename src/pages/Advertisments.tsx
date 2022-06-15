import { FC, useEffect, useState } from "react";
import ActionsPanel from "../components/advertisments/ActionsPanel";
import AdvertCard from "../components/advertisments/AdvertCard";
import Loader from "../components/shared/Loader";
import { IUserAdvert } from "../utils/interfaces";
import { useUserAdverts } from "../utils/swrHooks/useUserAdverts";


const Advertisments: FC<{}> = () => {

    const { allAdverts, isLoadingData } = useUserAdverts();
    const [ shownAdverts, setShownAdverts ] = useState<IUserAdvert[]>();

    useEffect(() => {
        // console.log(allAdverts)
        setShownAdverts(allAdverts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadingData])

    return (
        <>  
        {/* {console.log(shownAdverts)} */}
            {
                isLoadingData 
                ? 
                <>
                    <Loader/>
                </> 
                :
                <>
                    <ActionsPanel setShownAdverts={setShownAdverts}/>
                    <br/>
                    <br/>

                    {/* {allAdverts.map((adv: IUserAdvert) => <AdvertCard key={adv.id} userAdvert={adv}/>)} */}
                    
                    {
                        shownAdverts? shownAdverts.map((adv: IUserAdvert) => <AdvertCard key={adv.id} userAdvert={adv}/>) : null
                    }

                </>
            }

            
        </>
    )
}

export default Advertisments;