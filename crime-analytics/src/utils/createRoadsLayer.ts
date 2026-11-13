import type { LayerSpecification } from "maplibre-gl";

export const roadsLayer : LayerSpecification[] = 
[
    {
        id: "roads",
        type: "line",
        source: "roads",
        paint : {
            "line-color" : "rgb(212,56,56)"
        }
    }
]