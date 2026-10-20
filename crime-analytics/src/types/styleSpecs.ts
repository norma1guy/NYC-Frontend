
import type { FeatureCollection,GeoJsonProperties,Geometry } from "geojson";


export type geoData = FeatureCollection< Geometry, GeoJsonProperties>;

export type AsyncData<T> = T | undefined;