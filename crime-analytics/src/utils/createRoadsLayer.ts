import type { LayerSpecification } from "maplibre-gl";

export const roadsLayer : LayerSpecification[] = 
[
    {
        id: "roads",
        type: "line",
        source: "roads",
        'source-layer': 'roads',
        paint: {
            "line-color": "#777777",

            "line-width": [
                "match",
                ["get", "highway"],

                ["motorway", "trunk"], 4,
                ["primary"], 3,
                ["secondary"], 2.5,
                ["tertiary"], 2,
                ["residential", "unclassified"], 1.5,
                ["service", "living_street"], 1,

                0.8
            ],
            "line-opacity" : 0.4,
        }
    }
]