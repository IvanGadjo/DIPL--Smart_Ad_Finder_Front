import { FC, useState, useEffect } from "react";
import UserInterestsTable from "../components/homePage/UserInterestsTable";
import ActionsPanel from "../components/homePage/ActionsPanel";
import { mockUser } from "../utils/mockData";
import { getAllUserInterestsOfUser } from "../utils/restServices/userInterestsService";
import Loader from "../components/shared/Loader";
import { IUserInterest } from "../utils/interfaces";

const Home: FC<{}> = () => {

    const [ userInterests, setUserInterests ] = useState<[IUserInterest] | null>(null);

    useEffect(() => {
        getUserInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserInterests = async () => {
        const usrInt =  await getAllUserInterestsOfUser(mockUser.id);
        setUserInterests(usrInt);

        console.log(userInterests)
    }

    return (
        <>

            {
                !userInterests 
                ?
                    <>
                        <Loader/>
                    </>
                :
                    <>
                        <ActionsPanel/>
                        <UserInterestsTable userInterests={userInterests}/>
                    </>
            }

            
        </>
    )
}

export default Home;