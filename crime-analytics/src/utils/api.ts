import axios from 'axios';


import type {FeatureCollection} from 'geojson';
import type { AsyncData } from '../types/styleSpecs';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {"Authorization" : `Token ${import.meta.env.VITE_API_TOKEN}`}
})

export async function getBoundary() : Promise<AsyncData<FeatureCollection>>{
    try {

        const response = await instance.get<FeatureCollection>(`/boundary/geojson/?name=New%20York,The%20Bronx,Queens,Staten%20Island,Brooklyn,Manhattan`);
        const features = response.data;
        return features;
        
    } catch (error) {
        console.error(`Error fetching the boundary for ${name}`,error);
    }
}

export async function getLabelPoints() : Promise<AsyncData<FeatureCollection>>{
    try {
        const response = await instance.get<FeatureCollection>(`/labels/geojson/`);
        const features = response.data;
        return features
    } catch(error){
        console.error('Error fetching points for labels ',error)
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

export async function getDistinctColumnValues(column : string) : Promise<AsyncData<string[]>>{
    try{
        const response = await instance.get<string[]>(`/points/distinct/?column=${column}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching values ',error);
    }
}


export async function getColumnValues(column : string,value : string) : Promise<AsyncData<FeatureCollection>>{
    try{
        const response = await instance.get<FeatureCollection>(`/points/geojson/?${column}=${value}`);
        return response.data;
    } catch(error) {
        console.error(`Error fetching GeoJSON for ${column} with value ${value}`);
    }
}