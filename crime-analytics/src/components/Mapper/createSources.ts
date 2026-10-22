import type {SourceSpecification} from 'maplibre-gl';
import { getBoundary } from '../../utils/api';
import type { AsyncData,CustomSources,geoData } from '../../types/styleSpecs';
import type { FeatureCollection } from 'geojson';


export async function createSources(){
    const boundaryNames = [
        'New York','Manhattan','Staten Island',
        'The Bronx','Queens','Brooklyn'
    ]
}



export async function createBoundaryDataSources() : Promise<CustomSources>{

    const boundaryNames = [
        'New York','Manhattan','Staten Island',
        'The Bronx','Queens','Brooklyn'
    ]

    const sources = await Promise.all(
        boundaryNames.map(async (name,index) => {
            const geojson = await getBoundary(name);

            return {
                [`boundary${index}`] : {
                    type : "geojson",
                    data : geojson,
                }
            }
        })
    )

    return Object.assign({}, ...sources) as CustomSources;
}