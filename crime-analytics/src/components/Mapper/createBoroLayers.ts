import type { LayerSpecification } from "maplibre-gl";
import { totalPopulation } from "../../types/constants";
import { codes } from "./createSources";


//Change symbol layer to interaction

const colors = [
    'rgb(213, 29, 29)',
    'rgb(200, 115, 25)',
    'rgb(55, 172, 47)',
    'rgb(32, 35, 191)',
    'rgb(136, 21, 174)',
]


export function createBoroLayers() : LayerSpecification[]{

    const boundaryNames = [
        'Manhattan','Staten Island',
        'The Bronx','Queens','Brooklyn'
    ]

    const boundaryLayers: LayerSpecification[] = boundaryNames.flatMap((name,index) => {

        const symbolLayer: LayerSpecification = {
            id: `${name}_label`,
            type: 'symbol',
            source: 'labelpoints',
            layout: {
                'symbol-placement': 'point',
                'text-field': ['get', 'name'],
                'text-size': 12,
                'text-font' : ['helvetica'],
            },
            filter: ['==', ['get', 'name'], name],
            /*paint : {
                'text-opacity' : ["case",['boolean',['feature-state','hover'],false],1,0],
            }*/
        };

        const fillLayer: LayerSpecification = {
            id: `${name}-fill`,
            type: 'fill',
            source: 'boundary',
            paint: {
                'fill-color': colors[index],
                'fill-opacity': 0.4,
            },
            filter : ['==', ['get', 'name'], name],
        };


        return [fillLayer, symbolLayer];
    });

    return boundaryLayers;

}