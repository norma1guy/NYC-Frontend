import {useRef,useEffect} from 'react';
import { type StyleSpecification,Map } from 'maplibre-gl';
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import './Mapper.css'
setWorkerUrl(workerUrl);


export default function Mapper({styleSpec,handleLoad} : {styleSpec:StyleSpecification,handleLoad:()=>void}){

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const styleRef = useRef<StyleSpecification | null>(null);

    useEffect(() => {
        styleRef.current = styleSpec;
    },[styleSpec])

    useEffect(() => {
        const container = containerRef.current;
        const currentStyle = styleRef.current;

        if(!currentStyle || !container || mapRef.current){
            return;
        }

        const map = new Map({
            container: container,
            style: styleSpec,
            center: [-73.9311,40.6567],
            zoom: 10,
            pitch: 45

        });
        mapRef.current = map;
        return () => {
            map.remove();
            mapRef.current = null;
        };
    },[]);

    useEffect(() => {
        const map = mapRef.current;
        if(!map || !styleSpec) return;

        if(map.getStyle() === styleSpec) return;

        map.setStyle(styleSpec);

    },[styleSpec]);


    
    return (
        <div 
            className='m-2 p-5 flex w-dvh h-[70dvh] justify-center'
            ref={containerRef}
        />
    )

}