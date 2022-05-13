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
            userInterests,
            shownUserInterest,
            setShownUserInterest ] = useUI_ZustandStore(state => [state.setUserInterests, state.addUserInterest, state.addFoundAdvert, 
                                                                    state.userInterests, state.shownUserInterest, state.setShownUserInterest], shallow);

    
            
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

            if(shownUserInterest && prev.id === shownUserInterest.id){
                return -1;
            } else {

                if(prev.id && next.id){
                    if(prev.id > next.id) 
                        return 1
                    else  return -1
                }
                else return 1
            }
        })

        setUserInterests(usrInt);

        // console.log(shownUserInterest)

        setShownUserInterest(usrInt[0]);


        // console.log(shownUserInterest)


    }

    // console.log(category, region, showActiveUserInterests)
    // console.log(userInterests)
    // console.log(userInterests.find(ui => ui.id === 3)?.foundAdverts)


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