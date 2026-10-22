import type { LayerSpecification } from "maplibre-gl";
import { totalPopulation } from "../../types/constants";


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


function createBoroBoundaryLayer(){

}