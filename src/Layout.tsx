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
import { useRUIIS_ZustandStore } from './utils/zustandStores/renderUserInterestsInfoStore';
import shallow from 'zustand/shallow';
import { IUserInterest } from "./utils/interfaces";
import { getAllUserInterestsOfUser } from "./utils/restServices/userInterestsService";
import { createUser, getUserByEmail } from "./utils/restServices/usersService";
import { MenuIcon } from "@heroicons/react/outline";




const Layout: FC<{}> = () => {

    const [ setAuth0UserInfo ] = useUI_ZustandStore(state => [state.setAuth0UserInfo], shallow);
    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();

    const [ setUserInterests, 
            shownUserInterest,
            setShownUserInterest,
            setUserId ] = useUI_ZustandStore(state => [state.setUserInterests, state.shownUserInterest, state.setShownUserInterest, state.setUserId], shallow);

    const [ setMenuSidebarOpen ] = useRUIIS_ZustandStore(state => [state.setMenuSidebarOpen], shallow);

    
    useEffect(() => {
        fetchToken();       // * Calls getLoggedInUser() which then calls getUserInterestsFirstTime()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    const fetchToken = async () => {
        const token = await getAccessTokenSilently();

        if(user && user.name && user.email){        // * This can also extract user.picture and add it in the store
            setAuth0UserInfo({
                name: user.name,
                email: user.email,
                token
            })

            await getLoggedInUser(user.email, token);
            
        }
        // console.log(token)
    }

    const getLoggedInUser = async (email: string, token: string) => {
        let newUser = await getUserByEmail(email, token);

        if(newUser === ''){
            newUser = await createUser({
                userEmail: email
            }, token)

            setUserId(newUser.id)
        } else {
            setUserId(newUser.id)
        }


        await getUserInterestsFirstTime(newUser.id, token);     // * First time call to API to ger user interests, needs to be done right after token retrieval - otherwise token is not set fast enough in 
                                                    // * zustand store, and when calling getUserInterests() from Home - the token is undefined
    }

    const getUserInterestsFirstTime = async (firstTimeUserId: number, token: string) => {


        let usrInt: IUserInterest[] =  await getAllUserInterestsOfUser(firstTimeUserId, token);  
        // console.log(usrInt)

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

        // console.log(usrInt)

        setUserInterests(usrInt);
        setShownUserInterest(usrInt[0]);
    }



    const renderAuthRoutes = () => {
        return <>
            <Navbar/>

            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                    <button
                    type="button"
                    className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setMenuSidebarOpen(true)}
                    >
                    <span className="sr-only">Open sidebar</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="flex-1">
                    <div className="py-6">
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        {/* Replace with your content */}
                        <div className="py-4">
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
                        </div>
                        {/* /End replace */}
                    </div>
                    </div>
                </main>
            </div>

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
                
                <div className="lg:ml-64 lg:mt-64 ml-3 mt-28">
                    <Loader/>
                </div> :

                    isAuthenticated ?

                    renderAuthRoutes() :

                    renderUnAuthRoutes()
            }

        </>
    );
}

export default Layout;