import { useEffect, useState, type Dispatch } from "react";
import { getDistinctColumnValues } from "../../utils/api";
import MyCombobox from "../Combobox/Combobox";

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




