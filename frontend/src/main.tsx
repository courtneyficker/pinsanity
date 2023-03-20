import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import './styles/index.css'
import './styles/pinfobox.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT}
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}>
      <App />
    </Auth0Provider>,
    document.getElementById("root");
  </React.StrictMode>,
)
