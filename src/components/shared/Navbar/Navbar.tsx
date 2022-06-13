import { FC } from "react";
import NavItem from "./NavItem";

const Navbar: FC<{}> = () => {

    return (
        <>

            <ul>
                <li>
                    <NavItem name='Почетна' path='/home' Icon={<></>} />
                </li>
                <li>
                    <NavItem name='Огласи' path='/advertisments' Icon={<></>} />
                </li>
                <li>
                    <NavItem name='Како работи' path='/howItWorks' Icon={<></>} />
                </li>
                <li>
                    <NavItem name='Подесувања и профил' path='/settings' Icon={<></>} />
                </li>
            </ul>
        
        </>
    )
}

export default Navbar;