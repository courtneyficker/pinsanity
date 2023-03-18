import { useState } from "react";
import { PinType } from "./types/PinsanityTypes";
import axios from "axios";

const initialState: { currentPin: PinType } = {
	currentPin: {
        "id": 1,
        "name": "Placeholder",
        "imgUri": "img.png",
        "info": "Blah blah some info",
    },
};

export default initialState;

