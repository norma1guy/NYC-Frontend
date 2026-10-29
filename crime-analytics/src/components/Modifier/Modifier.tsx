import { useEffect, useRef, useState, type Dispatch } from "react";
import { getColumnValues, getDistinctColumnValues } from "../../utils/api";
import type { Map } from "maplibre-gl";
import MyCombobox from "../Combobox/Combobox";
import { modifySources } from "../../utils/modifySources";
import { createPointLayer } from "../../utils/createLayers";

type ModifierProps = {
    onModify : Dispatch<ModifierData[]>,
}

export type ModifierData = {
    id : number;
    value : string;
}

export default function Modifier({onModify} : ModifierProps){

    const [fields,setFields] = useState<ModifierData[]>([]);
    const [modifiers,setModifiers] = useState<ModifierData[]>([])

    useEffect(() => {
        async function getAmenities(){
            const data = await getDistinctColumnValues('amenity');
            if(!data)return;
            const data_structured = data.map((value,index)=>({id : index,value}));
            setFields(data_structured);
        }
        getAmenities();
    },[]);

    useEffect(() =>{
        onModify(modifiers)
    },[modifiers]);
    

    return (
        <div className="modifier">
            <MyCombobox name="Amenity" data={fields} example="Hospital" onChange={setModifiers}/>
        </div>
    )
}




