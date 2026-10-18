import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);

export default function Mapper(){

    const mapStyle = {
        "version" : 8,
        "name" : "Base Map",
        "sources" : {

                    },
        
        "layers" : [
                        {
                            "id": "background",
                            "type": "background",
                            "paint": {
                                "background-color": "rgb(239,239,239)"
                            }
                        },
                        {
                            "id": "Roads",
                            "type": "fill",
                        }
                    ]

    }


    return (
        <div id='map'>
            <Map
                initialViewState={{
                    longitude: -73.9311,
                    latitude: 40.6567,
                    zoom:9
                }}
                style={{width: 600, height: 400}}
                mapStyle="https://demotiles.maplibre.org/style.json"
            />
        </div>
    )

}