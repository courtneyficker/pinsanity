import axios from "axios";
import { useState, useEffect } from "react";
import { PinType } from "../types/PinsanityTypes";

export const PinList = () => {
    const [allPins, setAllPins] = useState([]);
    const [totalPins, setTotalPins] = useState(0);
    
    useEffect( () => {
        const getAllPins = async () => {
            const allPins = await axios.get("http://localhost:8080/pins");
            setAllPins(allPins.data);
            setTotalPins(allPins.data.length);
        };
        getAllPins();
    }, []);

    return (
        <div>
            <h3>Total Pins: {totalPins}</h3>
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
