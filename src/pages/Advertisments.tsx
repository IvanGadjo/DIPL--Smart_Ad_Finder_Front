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
    },[isLoadingData]);




    const renderAdvertCards = () => {
        if(shownAdverts){
            if(shownAdverts.length === 0){
                return <>Сеуште немате внесено оглас!</>
            } else {
                return shownAdverts.map((adv: IUserAdvert) => <AdvertCard key={adv.id} userAdvert={adv} typeOfAdsShown={typeOfAdsShown}/>)
            }
        } else {
            return <></>
        }
    }

    return (
        <>  
        {console.log(shownAdverts)}

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
                    

                    { renderAdvertCards() } 

                </>
            }

            
        </>
    )
}

export default Advertisments;