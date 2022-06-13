import { FC } from "react";
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




const Layout: FC<{}> = () => {

    const { isAuthenticated, isLoading } = useAuth0();

    const renderAuthRoutes = () => {
        return <>
            <Navbar/>
            <main>

                <Routes>
                    <Route path="/home" element={<Home/>} />

                    <Route path="/advertisments" element={<Advertisments/>} />
                    <Route path="/howItWorks" element={<HowItWorks/>} />

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