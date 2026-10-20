import axios from 'axios';


import type {FeatureCollection} from 'geojson';
import type { AsyncData } from '../types/styleSpecs';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/osm',
    headers: {"Authorization" : `Token ${import.meta.env.VITE_API_TOKEN}`}
})

export async function getBoundary(borough : boolean) : Promise<AsyncData<FeatureCollection>>{
    try {

        if(!borough){
            const response = await instance.get<FeatureCollection>('/boundary/geojson/?name=New%20York');
            const features = response.data;
            return features;
        } else {
            const response = await instance.get<FeatureCollection>('/boundary/geojson/?name=Manhattan,The%20Bronx,Staten%20Island,Brooklyn,Queens');
            const features = response.data;
            return features;
        }

    } catch (error) {
        console.error('Error fetching the boundary for ',`${borough ? 'City' : 'Boroughs'}`,error);
    }
}

export async function getCompleteBoundary() : Promise<AsyncData<FeatureCollection>>{
    try {
        const response = await instance.get<FeatureCollection>('/polygons/geojson/?name=Manhattan,The%20Bronx,Staten%20Island,Brooklyn,Queens');
        const features = response.data;
        return features;
    } catch(error) {
        console.error('Error fetching complete boundaries polygons',error);
    }
}

