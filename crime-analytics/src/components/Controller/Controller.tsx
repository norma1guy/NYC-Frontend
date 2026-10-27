import Styler from "../Styler/Styler";
import Modifier from "../Modifier/Modifier";
import { useEffect, useState } from "react";
import { Map } from "maplibre-gl";


export default function Controller(){
    const [map,setMap] = useState<Map>();


    return (
        <div>
            {map ? (<Modifier/>) : null}
            <Styler/>
        </div>
    )
}