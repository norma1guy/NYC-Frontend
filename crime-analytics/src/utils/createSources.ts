import type {SourceSpecification} from 'maplibre-gl';
import { getBoroPolygon, getBoundary, getLabelPoints, getRoads } from './api';

export const codes: {[key:string] : string} = {
    "New York" : "NYC",
    "Manhattan" : "MN",
    "The Bronx" : "BX",
    "Queens" : "QN",
    "Staten Island" : "SI",
    "Brooklyn" : "BK",
}

export async function createSources() : Promise<Record<string,SourceSpecification>>{


    const [boundary,boundaryPolygon,labelPoints,roads] = await Promise.all(
        [
            getBoundary(),
            getBoroPolygon(),
            getLabelPoints(),
            getRoads(),
        ]
    ).catch((error) => {
        throw new Error(`Cannot retrieve data`,{cause : error})
    })

    if(!boundary || !boundaryPolygon || !labelPoints || !roads){
        throw new Error(`Cannot retrieve one or more data`);
    }

    

    return {
        'boundary' : {
            type : 'geojson',
            data : boundary
        },
        'boundarypolygon' : {
            type : 'geojson',
            data : boundaryPolygon
        },
        'labelpoints' : {
            type : 'geojson',
            data : labelPoints
        },
        'roads' : {
            type : 'geojson',
            data : roads,
        }
    }
    
}
