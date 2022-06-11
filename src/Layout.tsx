import { FC } from "react";
import Home from './pages/Home';
import HowItWorks from "./pages/HowItWorks";
import Advertisments from "./pages/Advertisments";
import EditUserInterest from "./components/homePage/crudModals/EditUserInterest";
import CreateUserInterest from "./components/homePage/crudModals/CreateUserInterest";
import Navbar from "./components/shared/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import CreateUserAdvert from "./components/advertisments/crudModals/CreateUserAdvert";
import EditUserAdvert from "./components/advertisments/crudModals/EditUserAdvert";



// * Logikata za landing page-ot sto ne e ruta - dizajniraj isto kako vo custo


const Layout: FC<{}> = () => {


    return (
        <>

                <Navbar/>
                <main>

                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/advertisments" element={<Advertisments/>} />
                        <Route path="/howItWorks" element={<HowItWorks/>} />

                        <Route path="/createUserInterest" element={<CreateUserInterest/>} />
                        <Route path="/editUserInterest" element={<EditUserInterest/>} />

                        <Route path="/createUserAdvert" element={<CreateUserAdvert/>} />
                        <Route path="/editUserAdvert" element={<EditUserAdvert/>} />


                    </Routes>

                </main>

        </>
    );
}

export default Layout;      // * Tuka HOC za Auth