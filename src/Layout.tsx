import { FC } from "react";
import Home from './pages/Home';
import HowItWorks from "./pages/HowItWorks";
import Advertisments from "./pages/Advertisments";
import Navbar from "./components/shared/Navbar/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";




const Layout: FC<{}> = () => {


    return (
        <>

            <BrowserRouter>

                <Navbar/>
                <main>

                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/advertisments" element={<Advertisments/>} />
                        <Route path="/howItWorks" element={<HowItWorks/>} />

                    </Routes>

                </main>

            </BrowserRouter>
        </>
    );
}

export default Layout;      // * Tuka HOC za Auth