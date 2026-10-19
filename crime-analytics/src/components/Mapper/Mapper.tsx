import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification } from 'maplibre-gl';
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import './Mapper.css'

import { fetchBoundary } from '../../utils/api';
import type { FeatureCollection, GeoJsonProperties, Geometry,  } from 'geojson';

setWorkerUrl(workerUrl);

const emptyBoundary: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: "FeatureCollection",
  features: [],
};


export default function Mapper(){

    const [boundary, setBoundary] = React.useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);

    React.useEffect(() => {
    fetchBoundary().then(setBoundary).catch(console.error);
    }, []);

    const mapStyle : StyleSpecification = {
        "version" : 8,
        "name" : "Base Map",
        "sources" : {
            "boundary" : {
                "type" : "geojson",
                "data" : boundary ?? emptyBoundary,
            },
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
                            "id": "Boundary",
                            "type": "fill",
                            "source" : "boundary",
                            "source-layer" : "",
                            "paint" : {
                                "fill-color" : "rgb(212, 56, 56)"
                            }
                        }
                    ]

    }
    //console.log(boundary);


    return (
        <div className='map'>
            <Map
                initialViewState={{
                    longitude: -73.9311,
                    latitude: 40.6567,
                    zoom:9
                }}
                style={{width: 600, height: 400}}
                mapStyle={mapStyle}
            />
        </div>
    )

}