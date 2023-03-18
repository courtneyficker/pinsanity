import { useEffect, useState } from "react";
import axios from "axios";
import { PinType } from "../types/PinsanityTypes";

export const PinfoBox = () => {
    const [pin, setPin] = useState();
    
    const myPin: PinType = {
        "id": 7,
        "name": "Pinny McPinFace",
        "imgUri": "./src/assets/pins/7.png",
        "info": "blah blah blah",
    }
    

    return (
        <div className="pinfobox">
            <img src={myPin.imgUri} alt={`Image of pin (ID${myPin.id})`}></img>
            <span className="pin-name">{myPin.name}</span>
            <div className="pinfo">{myPin.info}</div>
        </div>
    );
}

export function getRandomPin(): PinType {
    const [total, setTotal] = useState(100);
    const [pinID, setPinID] = useState(1);

    // Find out how many pins we have
    const getTotal = async () => {
        const count = await axios.get("http://localhost:8080/pins/count");
        setTotal(count.data);
    };
    void getTotal();
    
    const randID = Math.floor(Math.random() * total);
        console.log("NUMBER:", randID);

        const getPin = async () => {
            const randPin = await axios.get(`http://localhost:8080/pin/${randID}`);
            setPinID(randPin.data);
        };
        getPin();
    
    

	return {
		id: pinID,
        name: `Pin${pinID}`,
        imgUri: `./src/assets/pins/${pinID}.png`,
        info: `blah blah blah`,
	};
}
