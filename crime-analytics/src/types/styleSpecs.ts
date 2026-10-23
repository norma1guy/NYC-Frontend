
import type { FeatureCollection,GeoJsonProperties,Geometry } from "geojson";
import type { StyleSpecification } from "maplibre-gl";


export type geoData = FeatureCollection< Geometry, GeoJsonProperties>;

export type AsyncData<T> = T | undefined;
