import Styler from "../Styler/Styler";
import Modifier, { type ModifierData } from "../Modifier/Modifier";
import { useEffect, useState, useRef } from "react";
import { Map } from "maplibre-gl";
import { modifySources } from "../../utils/modifySources";
import { createPointLayer } from "../../utils/createLayers";




function manageMarkerSources(field : string, markers : ModifierData[], map : Map,){

    const addMarkerSources= markers.map((marker)=>{
        const sourceId = `${field}-${marker.id}`;
        //If source is present dont need it
        if(map.getSource(sourceId))return;
        return marker;
    })

    return addMarkerSources;
}

function diffMarkerLayers(previous:globalThis.Map<string,string>,current:globalThis.Map<string,string>){
    let remove = new globalThis.Map();
    let add = new globalThis.Map();
    for(const [key,value] of previous){
        if(!current.has(key)){
            remove.set(key,value);
        }
    }

    for(const [key,value] of current){
        if(!previous.has(key)){
            add.set(key,value);
        }
    }

    return {'rem' : remove,'add' : add}
}


export default function Controller(){
    const [map,setMap] = useState<Map>();
    const [markers,setMarkers] = useState<ModifierData[]>([]);
    const previousLayers = useRef<globalThis.Map<string,string>>(new globalThis.Map());


    //Add Layers when options selected
    useEffect(() => {

        if(!map)return;
        let cancel = false;

        async function run(map : Map){
            const current = new globalThis.Map(markers.map((marker)=>{
                const sourceId = `amenity-${marker.id}`;
                const layerId = `amenity-${marker.id}-point`;

                return [layerId,sourceId];
            }));
            const addMarkers = manageMarkerSources('amenity',markers,map);
            async function addSource(map:Map,mod : ModifierData,sourceId : string){
                    try{
                        const newSource = await modifySources('amenity',mod.value,sourceId);
                        if(!newSource || cancel) return;
                        map.addSource(sourceId,newSource.source);
                    } catch(error) {
                        console.error(`Error adding source ${sourceId}`);
                    }
            }

            await Promise.all(
                addMarkers.map((mod: ModifierData | undefined) => {
                    if (!mod) return Promise.resolve();

                    const sourceId = `amenity-${mod.id}`;
                    return addSource(map, mod, sourceId);
                })
            );

            if (cancel) return;

            const diff = diffMarkerLayers(previousLayers.current,current);
            //console.log("MODIFIERS CHANGED!\n")

            diff.rem.forEach((_,layerId)=>{
                if(map.getLayer(layerId)) map.removeLayer(layerId);
            })

            diff.add.forEach((sourceId,layerId)=>{
                map.addLayer(createPointLayer(layerId,sourceId));
            })

            previousLayers.current = current;
        }

        void run(map);
        return () => {
            cancel = true;
        }

    },[markers])
    return (
        <div className="m-2 p-2 bg-black flex flex-col items-center justify-around">
            {map ? (<Modifier onModify={setMarkers}/>) : null}
            <Styler onLoad={setMap}/>
        </div>
    )
}