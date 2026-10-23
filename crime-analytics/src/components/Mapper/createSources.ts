import type {SourceSpecification} from 'maplibre-gl';
import { getBoundary } from '../../utils/api';

export const codes: {[key:string] : string} = {
    "New York" : "NYC",
    "Manhattan" : "MN",
    "The Bronx" : "BX",
    "Queens" : "QN",
    "Staten Island" : "SI",
    "Brooklyn" : "BK",
}

export async function createSources() : Promise<Record<string,SourceSpecification>>{

    const boundary = await getBoundary();

    if(!boundary){
        throw new Error('Cannot retrieve boundary data');
    }

    return {
        'boundary' : {
            type : 'geojson',
            data : boundary
        }
    }
    
}
