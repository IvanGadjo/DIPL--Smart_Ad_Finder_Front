import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Auth0Provider,
  Auth0ProviderOptions,
  AppState,
} from '@auth0/auth0-react';

let auth0_domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
let auth0_clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
let clientUrl: string = process.env.REACT_APP_CLIENT_URL as string;
let auth0_audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string;

const Auth0ProroviderWithHistory = ({ children }: Auth0ProviderOptions) => {
    const navigate = useNavigate();


    // * where Auth0 redirects your users from the Auth0 Universal Login page to your React application
    const onRedirectCallback = (appState: AppState | undefined) => {
        navigate(appState?.returnTo || window.location.pathname)
    };

    return (
        <Auth0Provider
            domain={auth0_domain}
            clientId={auth0_clientId}
            // redirectUri={window.location.origin}
            redirectUri={`${clientUrl}/home`}
            onRedirectCallback={onRedirectCallback}
            audience={auth0_audience}
        >
        {children}
        </Auth0Provider>
    );
};

export default Auth0ProroviderWithHistory;
