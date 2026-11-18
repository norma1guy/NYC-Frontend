import type { LayerSpecification } from "maplibre-gl";

export const buildingsLayer : LayerSpecification[] = 
[
    {
        id: "buildings",
        type: "fill",
        source: "buildings",
        'source-layer': 'buildings',
        paint: {
            "fill-color": "#777777",
            "fill-opacity" : 0.2,
        }
    }
]