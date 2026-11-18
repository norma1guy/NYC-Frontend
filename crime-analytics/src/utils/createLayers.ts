import type { LayerSpecification } from "maplibre-gl";
import { createBoroLayers } from "./createBoroLayers";
import { cityLayer } from "./createCityLayer";
import { roadsLayer } from "./createRoadsLayer";
import { greensLayer } from "./createGreensLayer";
import { buildingsLayer } from "./createBuildingsLayer";

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
        ...greensLayer,
        ...buildingsLayer,
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