import type { SourceSpecification,Map } from "maplibre-gl";
import { getColumnValues } from "./api";


export async function modifySources({name,value} : {name : string,value : string}) : Promise<Record<string,SourceSpecification>>{

    const source = await getColumnValues(name,value);

    if(!source){
        throw new Error(`Could not fetch data for ${name} with ${value}`);
    }

    const sourceid = `${name}-${value}`

    return {
        [sourceid]: {
            type : 'geojson',
            data : source,
        },
    }
}