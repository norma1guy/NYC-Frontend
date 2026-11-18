import type { GeoJSONSourceSpecification } from "maplibre-gl";
import { getColumnValues } from "./api";

export type ModifySource = {
    id : string;
    source : GeoJSONSourceSpecification
}
export async function modifySources(name :string,value : string,id : string) : Promise<ModifySource>{

    const source = await getColumnValues(name,value);

    if(!source){
        throw new Error(`Could not fetch data for ${name} with ${value}`);
    }


    return {
        id : id,
        source : {
            type : 'geojson',
            data : source,
        }

    }
}