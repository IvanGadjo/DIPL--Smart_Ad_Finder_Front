import { FC } from "react";
import ActionsPanel from "../components/advertisments/ActionsPanel";
import AdvertCard from "../components/advertisments/AdvertCard";


const Advertisments: FC<{}> = () => {

    return (
        <>
            <ActionsPanel/>
            <AdvertCard/>
        </>
    )
}

export default Advertisments;