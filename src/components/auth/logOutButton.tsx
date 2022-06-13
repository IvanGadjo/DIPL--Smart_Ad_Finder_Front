import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutIcon } from '@heroicons/react/solid';

const LogOutButton: FC<{}> = () => {
  // * clears app session & redirects
  // * pass LogoutOptions in loginWithRedirect() for customizing logout experience
  const { logout } = useAuth0();

  return (
    <>
      <button
        onClick={() =>
          logout({
            // returnTo: "https://harvel.io",
            // returnTo: "window.location.origin",
            returnTo: "http://localhost:3000",

          })
        }
      >
        Log Out
        {/* <LogoutIcon
          aria-hidden='true'
        ></LogoutIcon> */}
      </button>
    </>
  );
};

export default LogOutButton;
