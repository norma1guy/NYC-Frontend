import type { LayerSpecification } from "maplibre-gl"

export const cityLayer : LayerSpecification[] = [
                            {
                                "id": "cityBoundaryLine",
                                "type": "line",
                                "source" : "cityBoundary",
                                "source-layer" : "",
                                "paint" : {
                                    "line-color" : "rgb(212, 56, 56)"
                                }
                            },
                            {
                                "id" : "cityBoundaryFill",
                                "type" : "fill",
                                "source" : "cityBoundary",
                                "paint" : {
                                    "fill-color" : "rgb(247, 231, 192)"
                                }
                            }
                        ]