import { Map } from "mapbox-gl";
import { createContext } from "react";

export interface MAP_CONTEXT_PROPS{
    isMapReady:boolean
    map?:Map
    //methods
    setMap:(map:Map) => void,
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}
export const MapContext = createContext<MAP_CONTEXT_PROPS>({} as MAP_CONTEXT_PROPS)