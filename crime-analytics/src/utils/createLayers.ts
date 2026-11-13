import type { LayerSpecification } from "maplibre-gl";
import { createBoroLayers } from "./createBoroLayers";
import { cityLayer } from "./createCityLayer";
import { roadsLayer } from "./createRoadsLayer";

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
        ...roadsLayer,
    ]
}

export function createPointLayer(layerId : string, sourceId : string) : LayerSpecification {

    return {
        id : layerId,
        type : 'symbol',
        source: sourceId,
        layout : {
            'symbol-placement' : 'point',
            'icon-image' : 'marker',
            'icon-size' : 0.1,
        },
    }

}