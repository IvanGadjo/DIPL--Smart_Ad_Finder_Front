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
        setShownAdverts(allAdverts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadingData]);

    const renderAdvertCards = () => {
        if(shownAdverts){
            if(shownAdverts.length === 0){
                return <>Сеуште немате внесено оглас!</>
            } else {
                return (
                <div className="bg-white">
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
                            {shownAdverts.map((adv: IUserAdvert) => {
                                if(typeOfAdsShown==='all' && adv.isActive)
                                    return <AdvertCard key={adv.id} userAdvert={adv} typeOfAdsShown={typeOfAdsShown}/>
                                else if(typeOfAdsShown==='byUser')
                                    return <AdvertCard key={adv.id} userAdvert={adv} typeOfAdsShown={typeOfAdsShown}/>
                            }
                            )}
                        </div>
                    </div>
                </div>
                )
            }
        } else {
            return <></>
        }
    }

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
                    <div className="lg:ml-8 ml-7">
                        <ActionsPanel setShownAdverts={setShownAdverts} typeOfAdsShown={typeOfAdsShown}
                                        setTypeOfAdsShown={setTypeOfAdsShown}/>
                    </div>

                    { renderAdvertCards() } 
                </>
            }
        </>
    )
}

export default Advertisments;