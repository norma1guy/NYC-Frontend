import Styler from "../Styler/Styler";
import Modifier from "../Modifier/Modifier";
import { useEffect, useState } from "react";
import { Map } from "maplibre-gl";


export default function Controller(){
    const [map,setMap] = useState<Map>();
    return (
        <div className="m-2 p-2 bg-black flex flex-col items-center justify-around">
            {map ? (<Modifier map={map}/>) : null}
            <Styler onLoad={setMap}/>
        </div>
    )
}