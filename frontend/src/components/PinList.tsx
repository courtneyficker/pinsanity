import axios from "axios";
import { useState, useEffect } from "react";
import { PinType } from "../types/PinsanityTypes";

export const PinList = () => {
    const [allPins, setAllPins] = useState([]);
    const [totalPins, setTotalPins] = useState(0);
    const [pinImages, setPinImages] = useState([]);
    
    useEffect( () => {
        const getAllPins = async () => {
            const allPins = await axios.get("http://localhost:8080/pins");
            setAllPins(allPins.data);
            setTotalPins(allPins.data.length);
        };
        getAllPins();
        

        const getPinImages = async () => {
            const allImages = await axios.get("http://localhost:8080/images");
            setPinImages(allImages.data);
        }
        console.log(pinImages);
        getPinImages();
    }, []);

    return (
        <div>
            <h3>Total Pins: {totalPins}</h3>
            { allPins ? 
            <ul className="master-list">
                {allPins.map((pin: PinType) =>
                    <div className="pinfobox">
                        {/* <img src={`./src/assets/pins/${pin.id}.png`} alt={pin.id.toString()}></img> */}
                        {/* <img src={getImageURL(pin.id).then(res)} alt={pin.id.toString()}></img> */}
                        <img src={pinImages[pin.id]} alt={pin.id.toString()}></img>
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

export const getImageURL = async (pinID: number) => {
    const url: string = await axios.get(`http://localhost:8080/image/${pinID}`);

    return ( url ? url : "");
}