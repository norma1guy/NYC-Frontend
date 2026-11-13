import {useRef,useEffect, type Dispatch} from 'react';
import { type StyleSpecification,Map } from 'maplibre-gl';
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import markerIcon from '../../assets/marker.svg';

setWorkerUrl(workerUrl);

type MapperProps = {
    styleSpec : StyleSpecification,
    onLoad : Dispatch<Map>
}


export default function Mapper({styleSpec,onLoad} : MapperProps){

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        if(!styleSpec|| !container || mapRef.current){
            return;
        }

        const map = new Map({
            container: container,
            style: styleSpec,
            center: [-73.9311,40.6567],
            zoom: 10,
            pitch: 45

        });
        map.on('load', () => {
            const marker = new Image();

            marker.onload = () => {
                if (!map.hasImage('marker')) {
                map.addImage('marker', marker);
                }
            };

            marker.onerror = (err) => {
                console.error('Failed to load SVG:', err);
            };

            marker.src = markerIcon;
        });
        onLoad(map);
    },[]);


    
    return (
        <div 
            className='m-2 p-5 flex w-[70dvw] h-[70vh] justify-center'
            ref={containerRef}
        />
    )

}