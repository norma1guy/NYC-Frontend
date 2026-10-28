import { useEffect, useRef, useState } from "react";
import { getColumnValues, getDistinctColumnValues } from "../../utils/api";
import DropDown from "../DropDown/DropDown";
import type { Map } from "maplibre-gl";
import MyCombobox from "../Combobox/Combobox";
import { type Combobox } from "@base-ui/react/combobox";

type ModifierProps = {
    map : Map,
}

export type ModifierData = {
    id : number;
    value : string;
}

export default function Modifier({map} : ModifierProps){

    const [amenities,setAmenities] = useState<ModifierData[]>([]);
    const [modifiers,setModifiers] = useState<string[]>([])

    useEffect(() => {
        async function getAmenities(){
            const data = await getDistinctColumnValues('amenity');
            if(!data)return;
            const data_structured = data.map((value,index)=>({id : index,value}));
            setAmenities(data_structured);
        }
        getAmenities();
    },[]);
    
    useEffect(() => {
        
        

        console.log("MODIFIERS CHANGED!\n")
    },[modifiers])


    return (
        <div className="modifier">
            <MyCombobox name="Amenity" data={amenities} example="Hospital" onChange={setModifiers}/>
        </div>
    )
}




