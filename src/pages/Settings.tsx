import { FC } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LogOutButton from "../components/auth/logOutButton";

const Settings: FC<{}> = () => {

    const { user } = useAuth0();

    return (
        <>
            <LogOutButton/>
            {
                user && user.name && user.picture && user.email ?
                <>
                    {user.name}
                    <img
                        src={user.picture}
                        alt="Profile"
                    />
                    {user.email}
                </>
                :
                <>GRESKA</>
            }
        </>
    )
}

export default Settings;