import { useEffect, useState } from "react";
import axios from "axios";

export const Header = () => {
    return (
        <>
        <h1>Pinsanity</h1>
        <h3>Your source for pinformation!</h3>
        <br/>
        </>
    );
}

export const PinList = () => {
    const [clicks, setClicks] = useState(0);
    const [allPins, setAllPins] = useState([]);
    
    useEffect( () => {
        const getPins = async () => {
            const allPins = await axios.get("http://localhost:8080/pins");
            setAllPins(allPins.data);
        };
        getPins();
    });
    

    return (
        <div>
        { allPins ? 
        <ul>
            {allPins.map((pin: {id: number, name: string}) =>
            <li key={pin.id}>{pin.id} : {pin.name}</li>)}
        </ul>
        : null
        }
        </div>
    );
}

export const PinfoBox = () => {

    return (
        <div className="pinfobox">
            <img src="./src/assets/pins/7.png" alt="Image of pin (ID 7)"></img>
            <span className="pin-name">Pin name</span>
            <div className="pinfo">Various pin info...
                asdf
                asdf
                asdef
            </div>
        </div>
    );
}