import type { LayerSpecification } from "maplibre-gl";

export const greensLayer : LayerSpecification[] = 
[
    {
        id: "greens",
        type: "fill",
        source: "greens",
        'source-layer': 'greens',
        paint: {
            "fill-color": "#99CC66",
            "fill-opacity" : 0.4,
        }
    }
]