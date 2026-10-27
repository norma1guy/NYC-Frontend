import { useEffect, useRef, useState } from "react";
import { getColumnValues } from "../../utils/api";
import DropDown from "../DropDown/DropDown";
import type { Map } from "maplibre-gl";
import MyCombobox from "../Combobox/Combobox";
import { type Combobox } from "@base-ui/react/combobox";

type ModifierProps = {
    map : Map,
}

export default function Modifier({map} : ModifierProps){

    const [amenities,setAmenities] = useState<string[]>([]);
    const [modifiers,setModifiers] = useState<string[]>([])

    useEffect(() => {
        async function getAmenities(){
            const data = await getColumnValues('amenity');
            if(!data)return;

            const cleaned_data = data.map((entry) =>
                entry ? (
                    entry === "wifi;telephone;device_charging_station" ? 
                    entry = "Wifi/Telephone/Device Charging Station" :
                    entry.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')
                ): entry
            );
            setAmenities(cleaned_data);
        }
        getAmenities();
    },[]);
    
    useEffect(() => {
        if(modifiers.length === 5){

        }

        console.log("MODIFIERS CHANGED!\n")
    },[modifiers])


    return (
        <div className="modifier">
            <MyCombobox name="Amenity" data={amenities} example="Hospital" onChange={setModifiers}/>
        </div>
    )
}




