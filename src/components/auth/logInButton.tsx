import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginIcon } from '@heroicons/react/outline';


const LogInButton: FC<{}> = () => {

  const { loginWithRedirect } = useAuth0();


  return (
    <button
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => loginWithRedirect()}
    >
      Најави се
      <LoginIcon
        className="ml-2 -mr-1 h-5 w-5"
        aria-hidden='true'
      ></LoginIcon>
    </button>
  );
};

export default LogInButton;