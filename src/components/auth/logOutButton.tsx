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
        className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() =>
          logout({
            // returnTo: "https://harvel.io",
            returnTo: "window.location.origin",
          })
        }
      >
        Log Out
        <LogoutIcon
          className='ml-2 -mr-0.5 h-4 w-4'
          aria-hidden='true'
        ></LogoutIcon>
      </button>
    </>
  );
};

export default LogOutButton;
