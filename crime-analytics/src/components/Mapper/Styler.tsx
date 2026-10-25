import type { Source, SourceSpecification, StyleSpecification,SymbolLayerSpecification } from 'maplibre-gl';
import { getBoroPolygon, getBoundary } from '../../utils/api';
import type { AsyncData, geoData } from '../../types/styleSpecs';
import { useEffect, useMemo, useState } from 'react';
import Mapper from './Mapper';
import { cityLayer } from './createCityLayer';
import { createBoroLayers } from './createBoroLayers';
import { createSources } from './createSources';
import './Styler.css'


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

    const [sources,setSources] = useState<Record<string,SourceSpecification>>();


    useEffect(() => {

        createSources()
        .then(setSources)
        .catch(console.error);


    },[]);

    
       
    const mapStyle = useMemo<StyleSpecification | null>(() => {
        if(!sources) return null;
        
        return {
            version : 8,
            name : "Map",
            sources : sources,

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
    }, [sources]);

    if(!mapStyle){
        return <div className='loader'>Loading map...</div>
    }

    const handler = ()=>{}

    return (
        <div className='styler'>
            <Mapper styleSpec={mapStyle} handleLoad={handler}/>
        </div>
    )



}