import axios from 'axios';


import type {FeatureCollection} from 'geojson';
import type { AsyncData } from '../types/styleSpecs';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/osm',
    headers: {"Authorization" : `Token ${import.meta.env.VITE_API_TOKEN}`}
})

export async function getBoundary(name : string) : Promise<AsyncData<FeatureCollection>>{
    try {

        const encodedParameter = encodeURIComponent(name);
        const response = await instance.get<FeatureCollection>(`/boundary/geojson/?name=${encodedParameter}`);
        const features = response.data;
        return features;
        

    } catch (error) {
        console.error(`Error fetching the boundary for ${name}`,error);
    }
}

export async function getBoroPolygon() : Promise<AsyncData<FeatureCollection>>{
    try {
        const response = await instance.get<FeatureCollection>('/polygons/geojson/?name=Manhattan,The%20Bronx,Staten%20Island,Brooklyn,Queens');
        const features = response.data;
        return features;
    } catch(error) {
        console.error('Error fetching complete boundary polygons',error);
    }
}

