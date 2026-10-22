import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import type { StyleSpecification } from 'maplibre-gl';
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import './Mapper.css'
setWorkerUrl(workerUrl);


export default function Mapper({styleSpec} : {styleSpec:StyleSpecification}){

    
    return (
        <div className='map'>
            <Map
                initialViewState={{
                    longitude: -73.9311,
                    latitude: 40.6567,
                    zoom:10,
                    pitch: 45,
                }}
                style={{width: 1200, height: 600}}
                mapStyle={styleSpec}
                
            />
        </div>
    )

}