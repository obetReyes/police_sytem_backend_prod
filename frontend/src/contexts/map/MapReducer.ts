import { Map, Marker } from "mapbox-gl"
import { MAP_STATE } from "./MapProvider"


type MAP_ACTION = 
|{    type:"setMap",   payload:Map}
|{type:"setMarkers", payload:Marker[]}
export const MapReducer = (state:MAP_STATE, action:MAP_ACTION):MAP_STATE => {
    switch (action.type) {
        case "setMap":
            return {
                ...state,
                isMapReady:true,
                map:action.payload
            }
        case "setMarkers":
            return{
                ...state,
                markers:action.payload
            }
        default:
            return state;
    }
}