import type { Source, SourceSpecification, StyleSpecification,SymbolLayerSpecification } from 'maplibre-gl';
import { getBoroPolygon, getBoundary } from '../../utils/api';
import type { AsyncData, geoData } from '../../types/styleSpecs';
import { useEffect, useState } from 'react';
import Mapper from './Mapper';
import { cityLayer } from './createCityLayer';
import { createBoroLayers } from './createBoroLayers';
import { createSources } from './createSources';


const emptyData: geoData = {
    type: "FeatureCollection",
    features: [],
};

const emptySource: Record<string,SourceSpecification> = 
{
    "empty":
    {
        type : "geojson",
        data : emptyData,
    }
}

export default function Styler(){

    const [boundary,setBoundary] = useState<AsyncData<geoData>>(undefined);
    const [sources,setSources] = useState<Record<string,SourceSpecification>>();


    useEffect(() => {

        createSources()
        .then(setSources)
        .catch(console.error);
        

    },[]);
       
    const mapStyle : StyleSpecification = {
        version : 8,
        name : "Map",
        sources : sources ?? emptySource,

        layers : [
            {
                "id": "background",
                "type": "background",
                "paint": {
                    "background-color": "rgb(56, 131, 206)"
                }
            },
            ...cityLayer
            ,
            ...createBoroLayers(),
        ],
    }

    return (
        <div className='styler'>
            <Mapper styleSpec={mapStyle}/>
        </div>
    )



}