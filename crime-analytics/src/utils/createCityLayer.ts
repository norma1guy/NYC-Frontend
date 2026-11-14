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
            "fill-color" : "rgb(255, 255, 204)"
        },
        filter : ['==',['get','name'],'New York']

    }
]