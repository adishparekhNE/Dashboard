import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// import Auth0Provider from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);
const clientId = process.env.REACT_APP_AUTH0_PROVIDER_CLIENTID;
const domain = process.env.REACT_APP_AUTH0_PROVIDER_DOMAIN;

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
