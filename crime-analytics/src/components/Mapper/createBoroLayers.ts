import type { LayerSpecification } from "maplibre-gl";
import { totalPopulation } from "../../types/constants";
import { codes } from "./createSources";


//Add a layer for complete polygon of boroughs and put symbol type for that and line for the land boundary
export const boroLayer : LayerSpecification[] =  [
    {
        id : "boroBoundarySymbol",
        type : "symbol",
        source : "boroPolygons",
        layout : {
            "symbol-placement" : "point",
            "text-field" : ["get","name"],
            "text-size" : 12,
        },
        paint : {
            "text-color" : "rgb(26, 17, 184)",

        }
    },
    {
        id : "boroBoundaryLine",
        type : "fill",
        source : "boroBoundary",
        paint : {
            "fill-color" : "rgb(26,17,184)",
        }
    },
    {
        id : "boroBoundaryLine",
        type : "fill-extrusion",
        source : "boroBoundary",
        paint : {
            "fill-extrusion-height" : 350,
            "fill-extrusion-opacity" : 0.5,
            "fill-extrusion-color" : [
                "interpolate",
                ["linear"],
                ["to-number",["get","population"]],
                0, "#440154",
                750000, "#318e42",
                1000000, "#a1b735",
                1500000, "#d79c43",
                2000000, "#fd2525",
            ],
        }
    }
]

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
            id: `${name}-symbol`,
            type: 'symbol',
            source: 'boundary',
            layout: {
                'symbol-placement': 'point',
                'text-field': ['get', 'name'],
                'text-size': 12,
            },
            filter: ['==', ['get', 'name'], name],
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