import type { LayerSpecification } from "maplibre-gl";


//Add a layer for complete polygon of boroughs and put symbol type for that and line for the land boundary
export const boroLayer : LayerSpecification[] =  [
    {
        id : "boroBoundaryLine",
        type : "symbol",
        source : "boroBoundary",
        layout : {
            "symbol-placement" : "point",
            "text-field" : ["get","name"],
            "text-size" : 12,
        },
        paint : {
            "text-color" : "rgb(26, 17, 184)",

        }
    }
]