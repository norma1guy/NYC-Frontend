import type { StyleSpecification,SymbolLayerSpecification } from 'maplibre-gl';
import { getBoundary } from '../../utils/api';
import type { AsyncData, geoData } from '../../types/styleSpecs';
import { useEffect, useState } from 'react';
import Mapper from './Mapper';
import { cityLayer } from './cityLayer';
import { boroLayer } from './boroLayer';

const emptyData: geoData = {
    type: "FeatureCollection",
    features: [],
};

export default function Styler(){

    const [cityBoundary,setCityBoundary] = useState<AsyncData<geoData>>(undefined);
    const [boroBoundary,setBoroBoundary] = useState<AsyncData<geoData>>(undefined);

    useEffect(() => {

        async function fetchBoundaries(){
            const [city,boro] = await Promise.all([
                getBoundary(false),
                getBoundary(true),
            ])

            setCityBoundary(city);
            setBoroBoundary(boro);
        }
        fetchBoundaries().catch(console.error);
    },[]);

    //console.log(boroBoundary);
    const mapStyle : StyleSpecification = {
        "version" : 8,
        "name" : "Map",
        "sources" : {
            "cityBoundary" : {
                "type" : "geojson",
                "data" : cityBoundary ?? emptyData,
            },
            "boroBoundary" : {
                "type" : "geojson",
                "data" : boroBoundary ?? emptyData,
            }
        },

        "layers" : [
            {
                "id": "background",
                "type": "background",
                "paint": {
                    "background-color": "rgb(56, 131, 206)"
                }
            },
            ...cityLayer
            ,
            boroLayer
            ,
            
        ]

    }

    console.log(boroBoundary?.features[0].properties)

    return (
        <div className='styler'>
            <Mapper styleSpec={mapStyle}/>
        </div>
    )



}