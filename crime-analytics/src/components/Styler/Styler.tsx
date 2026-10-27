import { Map, type LayerSpecification, type SourceSpecification, type StyleSpecification} from 'maplibre-gl';
import { useEffect, useMemo, useState, type Dispatch } from 'react';
import Mapper from '../Mapper/Mapper';
import { cityLayer } from '../../utils/createCityLayer';
import { createBoroLayers } from '../../utils/createBoroLayers';
import { createSources } from '../../utils/createSources';
import Modifier from '../Modifier/Modifier';
import Loader from '../Loader/Loader';
import { createLayers } from '../../utils/createLayers';

type StylerProps = {
    onLoad : Dispatch<Map>,
}

export default function Styler({onLoad} : StylerProps){

    const [sources,setSources] = useState<Record<string,SourceSpecification>>();
    const [loading,setLoading] = useState<boolean>(true);
    const [layers,setLayers] = useState<LayerSpecification[]>([]);
    const [mapStyle,setMapStyle] = useState<StyleSpecification>();
    const [modify,setModify] = useState<boolean>(false);





    //Initial map setup
    useEffect(() => {

        createSources()
        .then(setSources)
        .catch(console.error);

        setLayers(createLayers());

    },[]);

    useEffect(() => {

        if(!sources) return;
        setLoading(false);

        const style : StyleSpecification = {
            version : 8,
            name : "Map",
            sources : sources,
            layers : layers,
        }
        setMapStyle(style);
    },[sources,layers])


    return (
        <div>
        { !mapStyle || loading ? 
            (<div className=' flex fixed inset-0 items-center justify-center'>
                <Loader/>
            </div>)
            :
            (<div>
                <Mapper styleSpec={mapStyle} onLoad={onLoad}/>
            </div>)
        }
        </div>
    )



}