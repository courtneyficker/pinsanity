import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import './styles/index.css'
import './styles/pinfobox.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3bjmrn5j71aoqrhy.us.auth0.com"
      //clientId={import.meta.env.VITE_AUTH_CLIENT}
      clientId="W03dWCj9CvwnamvjgAiAGCtWbjfoqr5r"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <App />
    </Auth0Provider>,
    {/* document.getElementById("root"); */}
  </React.StrictMode>,
)
