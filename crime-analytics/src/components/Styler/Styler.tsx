import { type LayerSpecification, type SourceSpecification, type StyleSpecification} from 'maplibre-gl';
import { useEffect, useMemo, useState } from 'react';
import Mapper from '../Mapper/Mapper';
import { cityLayer } from '../../utils/createCityLayer';
import { createBoroLayers } from '../../utils/createBoroLayers';
import { createSources } from '../../utils/createSources';
import Modifier from '../Modifier/Modifier';
import Loader from '../Loader/Loader';
import { createLayers } from '../../utils/createLayers';


export default function Styler(){

    const [sources,setSources] = useState<Record<string,SourceSpecification>>();
    const [loading,setLoading] = useState<boolean>(true);
    const [layers,setLayers] = useState<LayerSpecification[]>([]);
    const [modify,setModify] = useState<boolean>(false);
    


    //Initial map setup
    useEffect(() => {

        createSources()
        .then(setSources)
        .catch(console.error);

        setLayers(createLayers());

    },[]);

    useEffect(() => {

    },[modify])

    
       
    const mapStyle = useMemo<StyleSpecification | null>(() => {
        if(!sources) return null;
        setLoading(false);
        
        return {
            version : 8,
            name : "Map",
            sources : sources,

            layers : layers,
        }
    }, [sources]);

    const handler = ()=>{}

    return (
        <div>
        { !mapStyle || loading ? 
            (<div className=' flex fixed inset-0 items-center justify-center'>
                <Loader/>
            </div>)
            :
            (<div className='m-2 p-2 bg-black flex flex-col items-center justify-around'>
                <Modifier/>
                <Mapper styleSpec={mapStyle} handleLoad={handler}/>
            </div>)
        }
        </div>
    )



}