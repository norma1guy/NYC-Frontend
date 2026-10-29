import Styler from "../Styler/Styler";
import Modifier, { type ModifierData } from "../Modifier/Modifier";
import { useEffect, useState } from "react";
import { Map } from "maplibre-gl";
import { modifySources } from "../../utils/modifySources";
import { createPointLayer } from "../../utils/createLayers";


export default function Controller(){
    const [map,setMap] = useState<Map>();
    const [markers,setMarkers] = useState<ModifierData[]>([]);


    //Add Layers when options selected
    useEffect(() => {

        if(!map)return;

        markers.forEach((mod : ModifierData)=>{
            const sourceId = `amenity-${mod.id}`
            if(map.getSource(sourceId))return;
            async function addSource(map:Map){
                try{

                    const newSource = await modifySources('amenity',mod.value,sourceId);
                    if(!newSource) return;
                    map.addSource(sourceId,newSource.source);
                    map.addLayer(createPointLayer(sourceId));
                } catch(error) {
                    console.error(`Error adding source ${sourceId}`);
                }
            }
            addSource(map)
            .then()
            .catch(console.error);
        })
        //console.log("MODIFIERS CHANGED!\n")
    },[markers])
    return (
        <div className="m-2 p-2 bg-black flex flex-col items-center justify-around">
            {map ? (<Modifier onModify={setMarkers}/>) : null}
            <Styler onLoad={setMap}/>
        </div>
    )
}