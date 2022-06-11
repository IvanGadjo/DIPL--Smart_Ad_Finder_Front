import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogInButton: FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LogInButton;