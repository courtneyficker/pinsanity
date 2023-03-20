import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Profile from "./Profile";
import { useAuth0, Auth0Context } from "@auth0/auth0-react";

export const Header = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <nav id="nav">
            <a className="title" href="index.html">Pinsanity!</a>
            <div className="userControls">
                <ul>
                    <li id="my_lists">My Lists</li>
                </ul>
            </div>
            <div className="loginStuff">
                { isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <LoginButton />
                )}
                <Profile />
            </div>
        </nav>
    );
}

export const Footer = () => {
    return (
        <footer>
            <div>Copyright 2023 Courtney Ficker</div>
        </footer>
    );
}
