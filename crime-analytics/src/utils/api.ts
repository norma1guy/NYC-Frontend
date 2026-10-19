import axios from 'axios';


import type {FeatureCollection} from 'geojson';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/osm',
    headers: {"Authorization" : `Token ${import.meta.env.VITE_API_TOKEN}`}
})

export async function fetchBoundary(){
    try {
        
        const response = await instance.get<FeatureCollection>('/boundary/geojson');
        const features = response.data;
        return features;

    } catch (error) {
        console.error('Error fetching the boundary : ',error);
    }
}
