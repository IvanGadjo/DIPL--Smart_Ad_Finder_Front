import { FC, useEffect } from "react";
import UserInterestsTable from "../components/homePage/UserInterestsTable";
import ActionsPanel from "../components/homePage/ActionsPanel";
import { getAllUserInterestsOfUser,
         getAllUserInterestsOfUserByCategory,
         getAllUserInterestsOfUserByRegion,
         getAllUserInterestsOfUserByCatrgoryAndRegion } from "../utils/restServices/userInterestsService";
import Loader from "../components/shared/Loader";
import { IUserInterest } from "../utils/interfaces";
import { useRUIIS_ZustandStore } from "../utils/zustandStores/renderUserInterestsInfoStore";
import { useUI_ZustandStore } from "../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import LogOutButton from "../components/auth/logOutButton";


const Home: FC<{}> = () => {


    const [ category, 
            region, 
            showActiveUserInterests] = useRUIIS_ZustandStore(state => [state.category, state.region, state.showActiveUserInterests], shallow);

    const [ setUserInterests, 
            userInterests,
            shownUserInterest,
            setShownUserInterest,
            auth0UserInfo,
            userId ] = useUI_ZustandStore(state => [state.setUserInterests, state.userInterests, state.shownUserInterest, state.setShownUserInterest, state.auth0UserInfo, state.userId], shallow);

    
            
    useEffect(() => {
        // console.log(userInterests)
        getUserInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, region, showActiveUserInterests])


    const getFilteredUserInterests = async () => {      

        if(userId) {

            let userInterests: IUserInterest[];

            if(category === 'all' && region === 'all'){         
                userInterests = await getAllUserInterestsOfUser(userId, auth0UserInfo.token);
            } else if(category !== 'all' && region === 'all'){
                userInterests = await getAllUserInterestsOfUserByCategory(category, userId, auth0UserInfo.token);
            } else if(category === 'all' && region !== 'all') {
                userInterests = await getAllUserInterestsOfUserByRegion(region, userId, auth0UserInfo.token);
            } else {                                        // * Specific category & region
                userInterests = await getAllUserInterestsOfUserByCatrgoryAndRegion(category, region, userId, auth0UserInfo.token);
            }


            if(showActiveUserInterests){        // * Show only active interests
                return userInterests.filter(ui => ui.active)
            } else {        // * Show only deactivated interests
                return userInterests.filter(ui => !ui.active)
            }
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    const getUserInterests = async () => {

        const usrInt: IUserInterest[]|undefined =  await getFilteredUserInterests();

        if(usrInt) {
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
            setShownUserInterest(usrInt[0]);
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    // console.log(category, region, showActiveUserInterests)
    // console.log(userInterests)
    // console.log(userInterests.find(ui => ui.id === 18)?.foundAdverts)
    // console.log(auth0UserInfo)


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
                        <LogOutButton/>
                        <ActionsPanel/>
                        <UserInterestsTable userInterests={userInterests} setUserInterests={setUserInterests}/>
                    </>
            }

            
        </>
    )
}

export default Home;