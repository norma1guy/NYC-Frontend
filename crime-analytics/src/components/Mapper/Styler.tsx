import type { Source, SourceSpecification, StyleSpecification,SymbolLayerSpecification } from 'maplibre-gl';
import { getBoroPolygon, getBoundary } from '../../utils/api';
import type { AsyncData, CustomSources, geoData } from '../../types/styleSpecs';
import { useEffect, useState } from 'react';
import Mapper from './Mapper';
import { cityLayer } from './createCityLayer';
import { boroLayer } from './createBoroLayers';
import { createBoundaryDataSources } from './createSources';


const emptyData: geoData = {
    type: "FeatureCollection",
    features: [],
};

const emptySource: SourceSpecification = {
    type : "geojson",
    data : emptyData,
}

export default function Styler(){

    const [cityBoundary,setCityBoundary] = useState<AsyncData<geoData>>(undefined);
    const [boroBoundary,setBoroBoundary] = useState<AsyncData<geoData>>(undefined);
    const [boroPolygons,setBoroPolygons] = useState<AsyncData<geoData>>(undefined);
    const [customSources,setCustomSources] = useState<CustomSources>({});



    useEffect(() => {
        createBoundaryDataSources()
        .then(setCustomSources)
        .catch(console.error);
    },[]);

   
    
    //console.log(boroBoundary);
    const mapStyle : StyleSpecification = {
        version : 8,
        name : "Map",
        sources : customSources,

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
            ...boroLayer
            ,
            
        ],
    }

    return (
        <div className='styler'>
            <Mapper styleSpec={mapStyle}/>
        </div>
    )



}