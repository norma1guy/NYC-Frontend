import type { LayerSpecification } from "maplibre-gl"

export const cityLayer : LayerSpecification[] = 
[
    {
        id: "New York Line",
        type: "line",
        source : "boundary",
        paint : {
            "line-color" : "rgb(212, 56, 56)"
        },
        filter : ['==',['get','name'],'New York']
    },
    {
        id : "New York Fill",
        type : "fill",
        source : "boundary",
        paint : {
            "fill-color" : "#FFFFE5",
        },
        filter : ['==',['get','name'],'New York']

    }
]