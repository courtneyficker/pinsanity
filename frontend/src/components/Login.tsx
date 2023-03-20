import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
    const { loginWithRedirect, loginWithPopup } = useAuth0();

    return <button className="btnAuth" onClick={() => loginWithRedirect()}>Log In</button>;
    //return <button className="btnAuth" onClick={() => loginWithPopup()}>Log In</button>;
};

export default LoginButton;
