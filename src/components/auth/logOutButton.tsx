import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutIcon } from '@heroicons/react/outline';

const LogOutButton: FC<{}> = () => {
  // * clears app session & redirects
  // * pass LogoutOptions in loginWithRedirect() for customizing logout experience
  const { logout } = useAuth0();

  return (
    <>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={() =>
          logout({
            // returnTo: "window.location.origin",
            returnTo: "http://localhost:3000",
          })
        }
      >
        Одјави се
        <LogoutIcon
          className="ml-2 -mr-1 h-5 w-5"
          aria-hidden='true'
        ></LogoutIcon>
      </button>
    </>
  );
};

export default LogOutButton;
