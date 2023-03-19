import { useEffect, useState } from "react";
import axios from "axios";
import LoginButton from "../Login";
import LogoutButton from "../Logout";

export const Header = () => {
    return (
        <nav id="nav">
            <a className="title" href="index.html">Pinsanity!</a>
            <ul>
                <li id="my_lists">My Lists</li>
            </ul>
            <LoginButton />
            <LogoutButton />
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
