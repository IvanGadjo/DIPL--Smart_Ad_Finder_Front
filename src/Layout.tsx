import { FC, useEffect } from "react";
import Home from './pages/Home';
import HowItWorks from "./pages/HowItWorks";
import Advertisments from "./pages/Advertisments";
import LandingPage from "./pages/LandingPage";
import EditUserInterest from "./components/homePage/crudModals/EditUserInterest";
import CreateUserInterest from "./components/homePage/crudModals/CreateUserInterest";
import Navbar from "./components/shared/Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import CreateUserAdvert from "./components/advertisments/crudModals/CreateUserAdvert";
import EditUserAdvert from "./components/advertisments/crudModals/EditUserAdvert";
import { useAuth0 } from '@auth0/auth0-react';
import Loader from "./components/shared/Loader";
import Settings from "./pages/Settings";
import { useUI_ZustandStore } from "./utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { useRUIIS_ZustandStore } from "./utils/zustandStores/renderUserInterestsInfoStore";
import { IUserInterest } from "./utils/interfaces";
import { getAllUserInterestsOfUser } from "./utils/restServices/userInterestsService";




const Layout: FC<{}> = () => {

    const [ setAuth0UserInfo ] = useUI_ZustandStore(state => [state.setAuth0UserInfo], shallow);
    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();

    const [ setUserInterests, 
            shownUserInterest,
            setShownUserInterest ] = useUI_ZustandStore(state => [state.setUserInterests, state.shownUserInterest, state.setShownUserInterest], shallow);

    
    useEffect(() => {
        fetchToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    async function fetchToken() {
        const token = await getAccessTokenSilently();

        if(user && user.name && user.email){        // * This can also extract user.picture and add it in the store
            setAuth0UserInfo({
                name: user.name,
                email: user.email,
                token
            })
        }
        console.log(token)

        await getUserInterestsFirstTime(token);     // * First time call to API to ger user interests, needs to be done right after token retrieval - otherwise token is not set fast enough in 
                                                    // * zustand store, and when calling getUserInterests() from Home - the token is undefined
    }

    const getUserInterestsFirstTime = async (token: string) => {

        let usrInt: IUserInterest[] =  await getAllUserInterestsOfUser(1, token);
        usrInt = usrInt.filter(ui => ui.active)

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
    }



    const renderAuthRoutes = () => {
        return <>
            <Navbar/>
            <main>

                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/advertisments" element={<Advertisments/>} />
                    <Route path="/howItWorks" element={<HowItWorks/>} />
                    <Route path="/settings" element={<Settings/>} />

                    <Route path="/createUserInterest" element={<CreateUserInterest/>} />
                    <Route path="/editUserInterest" element={<EditUserInterest/>} />

                    <Route path="/createUserAdvert" element={<CreateUserAdvert/>} />
                    <Route path="/editUserAdvert" element={<EditUserAdvert/>} />

                    <Route
                        path="*"
                        element={<Navigate to="/home" replace />}
                    />


                </Routes>

            </main>
        </>
    }

    const renderUnAuthRoutes = () => {
        return <>
            <main>

                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>

            </main>
        </>
    }

    return (
        <>  

            {

                isLoading ? 

                <Loader/> :

                    isAuthenticated ?

                    renderAuthRoutes() :

                    renderUnAuthRoutes()
            }

        </>
    );
}

export default Layout;