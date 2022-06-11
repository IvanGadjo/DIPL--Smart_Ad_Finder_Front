import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton: FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        onClick={() => {
          loginWithRedirect({
            screen_hint: 'signup',
          });
        }}
      >
        Sign up
      </button>
    </>
  );
};

export default SignUpButton;
