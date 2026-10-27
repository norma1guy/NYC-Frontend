import type { LayerSpecification } from "maplibre-gl";
import { createBoroLayers } from "./createBoroLayers";
import { cityLayer } from "./createCityLayer";

export function createLayers() : LayerSpecification[]{


    return [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "rgb(56, 131, 206)"
            }
        },
        ...cityLayer,
        ...createBoroLayers(),
    ]
}