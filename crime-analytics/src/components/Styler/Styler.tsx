import type { SourceSpecification, StyleSpecification} from 'maplibre-gl';
import { useEffect, useMemo, useState } from 'react';
import Mapper from '../Mapper/Mapper';
import { cityLayer } from '../../utils/createCityLayer';
import { createBoroLayers } from '../../utils/createBoroLayers';
import { createSources } from '../../utils/createSources';
import Modifier from '../Modifier/Modifier';


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
        return <div className='animate-spin'>Loading map...</div>
    }

    const handler = ()=>{}

    return (
        <div className='m-2 p-2 bg-black flex flex-col items-center justify-around'>
            <Modifier/>
            <Mapper styleSpec={mapStyle} handleLoad={handler}/>
        </div>
    )



}