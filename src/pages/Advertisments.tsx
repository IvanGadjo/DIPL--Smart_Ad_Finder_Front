import { FC, useEffect, useState } from "react";
import ActionsPanel from "../components/advertisments/ActionsPanel";
import AdvertCard from "../components/advertisments/AdvertCard";
import Loader from "../components/shared/Loader";
import { IUserAdvert } from "../utils/interfaces";
import { useUserAdverts } from "../utils/swrHooks/useUserAdverts";


const Advertisments: FC<{}> = () => {

    const { allAdverts, isLoadingData } = useUserAdverts();
    const [ shownAdverts, setShownAdverts ] = useState<IUserAdvert[]>();
    const [ typeOfAdsShown, setTypeOfAdsShown ] = useState<string>('all');

    useEffect(() => {
        // console.log(allAdverts)
        setShownAdverts(allAdverts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadingData])

    return (
        <>  
        {console.log(shownAdverts)}
        {console.log(typeOfAdsShown)}

            {
                isLoadingData 
                ? 
                <>
                    <Loader/>
                </> 
                :
                <>
                    <ActionsPanel setShownAdverts={setShownAdverts} typeOfAdsShown={typeOfAdsShown} setTypeOfAdsShown={setTypeOfAdsShown}/>
                    <br/>
                    <br/>

                    {/* {allAdverts.map((adv: IUserAdvert) => <AdvertCard key={adv.id} userAdvert={adv}/>)} */}
                    
                    {
                        shownAdverts? shownAdverts.map((adv: IUserAdvert) => <AdvertCard key={adv.id} userAdvert={adv} typeOfAdsShown={typeOfAdsShown}/>) : null
                    }

                </>
            }

            
        </>
    )
}

export default Advertisments;