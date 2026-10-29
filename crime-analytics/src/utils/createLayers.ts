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

export function createPointLayer(sourceId : string) : LayerSpecification {

    return {
        id : `${sourceId}-point`,
        type : 'symbol',
        source: sourceId,
        layout : {
            'symbol-placement' : 'point',
            'icon-image' : 'marker',
            'icon-size' : 0.1,
        },
    }

}