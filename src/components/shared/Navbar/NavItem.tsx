import { FC, SVGProps } from "react";
import { NavLink } from "react-router-dom";


interface IProps {
    name: string,
    path: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const NavItem: FC<IProps> = ({ name, path, Icon }) => {

    return (
        <>
        <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
                isActive ? 
                'bg-green-800 text-white group flex items-center pl-3 py-3 pr-4 text-sm font-medium rounded-md' : 
                'text-gray-300 hover:bg-green-800 hover:text-white group flex items-center pl-3 py-3 pr-4 text-sm font-medium rounded-md'
            }

        >

            <Icon 
            className='text-gray-300 mr-3  h-6 w-6'
            aria-hidden="true"
            />

            <span>{name}</span>
        </NavLink>
        </>
    )
}

export default NavItem;

