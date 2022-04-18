import { FC } from "react";
import { NavLink } from "react-router-dom";


interface IProps {
    name: string,
    path: string,
    Icon: JSX.Element
}

const NavItem: FC<IProps> = ({ name, path, Icon }) => {

    return (
        <>
        <NavLink
            key={name}
            to={path}
            className="flex items-center pl-3 py-3 pr-4 hover:bg-brandthinblue text-brandblue rounded text-sm font-medium"
        >
            {/* <Icon /> */}
            <span>{name}</span>
        </NavLink>
        </>
    )
}

export default NavItem;