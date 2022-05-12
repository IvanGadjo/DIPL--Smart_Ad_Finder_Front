import { FC, useEffect } from "react";
import UserInterestsTable from "../components/homePage/UserInterestsTable";
import ActionsPanel from "../components/homePage/ActionsPanel";
import { mockUser } from "../utils/mockData";
import { getAllUserInterestsOfUser,
         getAllUserInterestsOfUserByCategory,
         getAllUserInterestsOfUserByRegion,
         getAllUserInterestsOfUserByCatrgoryAndRegion } from "../utils/restServices/userInterestsService";
import Loader from "../components/shared/Loader";
import { IUserInterest } from "../utils/interfaces";
import { useRUIIS_ZustandStore } from "../utils/zustandStores/renderUserInterestsInfoStore";
import { useUI_ZustandStore } from "../utils/zustandStores/userInterestsStore";
import shallow from 'zustand/shallow';


const Home: FC<{}> = () => {


    const [ category, 
            region, 
            showActiveUserInterests] = useRUIIS_ZustandStore(state => [state.category, state.region, state.showActiveUserInterests], shallow);

    const [ setUserInterests, 
            addUserInterest, 
            addFoundAdvert,
            userInterests ] = useUI_ZustandStore(state => [state.setUserInterests, state.addUserInterest, state.addFoundAdvert, state.userInterests], shallow)

    
            
    useEffect(() => {
        getUserInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, region, showActiveUserInterests])


    const getFilteredUserInterests = async () => {      

        let userInterests: IUserInterest[];

        if(category === 'all' && region === 'all'){         
            userInterests = await getAllUserInterestsOfUser(mockUser.id);
        } else if(category !== 'all' && region === 'all'){
            userInterests = await getAllUserInterestsOfUserByCategory(category, mockUser.id);
        } else if(category === 'all' && region !== 'all') {
            userInterests = await getAllUserInterestsOfUserByRegion(region, mockUser.id);
        } else {                                        // * Specific category & region
            userInterests = await getAllUserInterestsOfUserByCatrgoryAndRegion(category, region, mockUser.id);
        }

        // console.log(userInterests)
        // return userInterests;

        if(showActiveUserInterests){        // * Show only active interests
            return userInterests.filter(ui => ui.active)
        } else {        // * Show only deactivated interests
            return userInterests.filter(ui => !ui.active)
        }
    }

    const getUserInterests = async () => {

        const usrInt: IUserInterest[] =  await getFilteredUserInterests();

        usrInt.sort((prev, next) => {       // * Sort userInterests by id and then show them in dropdown
            if(prev.id && next.id){
                if(prev.id > next.id) 
                    return 1
                else  return -1
            }
            else return 1
        })

        setUserInterests(usrInt);
    }

    // console.log(category, region, showActiveUserInterests)
    // console.log(userInterests)


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
                        <UserInterestsTable userInterests={userInterests} setUserInterests={setUserInterests}/>
                    </>
            }

            
        </>
    )
}

export default Home;