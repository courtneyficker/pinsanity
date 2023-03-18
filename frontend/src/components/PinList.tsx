import axios from "axios";
import { useState, useEffect } from "react";
import { PinType } from "../types/PinsanityTypes";

export const PinList = () => {
    const [allPins, setAllPins] = useState([]);
    
    useEffect( () => {
        const getAllPins = async () => {
            const allPins = await axios.get("http://localhost:8080/pins");
            setAllPins(allPins.data);
        };
        getAllPins();
    }, []);
    

    return (
        <div>
        { allPins ? 
        <ul className="master-list">
            {allPins.map((pin: PinType) =>
                <div className="pinfobox">
                    <img src={`./src/assets/pins/${pin.id}.png`} alt="{pin.id}"></img>
                    <span className="pin-name">{pin.name}</span>
                    <div className="pinfo">{pin.info}</div>
                </div>
            )}
        </ul>
        : null
        }
        </div>
    );
}
