import type { LayerSpecification } from "maplibre-gl";

export const bridgeLayer: LayerSpecification[] = [
    {
        id: "bridges",
        type: "line",
        source: "bridges",
        'source-layer': "bridges",
        paint: {
            "line-color": "#777777",
        }
    }
]