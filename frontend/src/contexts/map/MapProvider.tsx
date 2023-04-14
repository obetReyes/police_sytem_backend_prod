import { useContext, useEffect, useReducer } from "react"
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl"
import { MapContext } from "./MapContext"
import { PlacesContext } from "../places/PlacesContext"
import { MapReducer } from "./MapReducer"

import { DirectionsResponse, directionsApi } from "../../helpers"



interface PROPS{
    children: JSX.Element | JSX.Element[]
}

export interface MAP_STATE{
    isMapReady:boolean,
    map?:Map
    markers:Marker[]
}

const INITIAL_STATE:MAP_STATE = {
    isMapReady:false,
    map:undefined,
    markers:[]
}
export const MapProvider = ({children}:PROPS) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)
    const {places} = useContext(PlacesContext)    

    useEffect(() => {
        state.markers.forEach(marker => marker.remove())
        const newMarkers: Marker[] = []

        for(const place of places){
            const [lng, lat] = place.center
            const popup = new Popup()
            .setHTML(`
            <h6>${place.text}</h6>
            <p>${place.place_name}</p>
            `)

            const newMarker = new Marker()
            .setPopup(popup)
            .setLngLat([lng, lat])
            .addTo(state.map!)
        
            newMarkers.push(newMarker)
        }
        dispatch({type:"setMarkers", payload:newMarkers})
    },[places])

    const setMap = (map:Map) => {
        
        const popUp =  new Popup()
        .setHTML(
            `<h4>aqui estoy</h4>`
        )
        new Marker({
            color:"#FCE205"
        })
        .setLngLat(map.getCenter())
        .setPopup(popUp)
        .addTo(map);

        dispatch({type:"setMap", payload:map})
    }

    const getRouteBetweenPoints = async(start:[number, number], end:[number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
        const {distance, duration, geometry} = resp.data.routes[0];
        const {coordinates:coords} =geometry;
        let kms = distance/ 1000;
        kms = Math.round(kms * 100);
        kms /= 100;

        const minutes = Math.floor( duration / 60);
        console.log({kms, minutes})

        const bounds = new LngLatBounds(
            start,
            start
        );

        for(const coord of coords){
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds,{
            padding:200
        });

        //polyline
        const sourceData:AnySourceData ={
            type:"geojson",
            data:{
                type:"FeatureCollection",
                features:[
                    {
                        type:"Feature",
                        properties:{},
                        geometry:{
                            type:"LineString",
                            coordinates:coords
                        }
                    }
                ]
            }
        }
        
        //remove polyline

        if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }
        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id:'RouteString',
            type:"line",
            source:"RouteString",
            layout:{
                'line-cap':"round",
                'line-join':"round"
            },
            paint:{
                'line-color':"black",
                "line-width":3
            }
        })
        

    }
    return(
        <MapContext.Provider value={{...state, setMap, getRouteBetweenPoints}}>
            {children}
        </MapContext.Provider>
    )
}