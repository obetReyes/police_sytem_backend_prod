import React, {useReducer, useEffect} from 'react'
import { getUserLocation } from '../../helpers/getUserLocation'
import { searchApi } from '../../helpers'
import { PlacesContext } from './PlacesContext'
import { PlacesReducer } from './PlacesReducer'
import { PlacesResponse,Feature } from '../../helpers/'

interface PROPS{
    children: JSX.Element | JSX.Element[]
}
export interface PLACES_STATE{
    isloading:boolean
    userLocation?: [number, number]
    isLoadingPlaces:boolean
    places:Feature[]
}

const INITIAL_STATE:PLACES_STATE ={
    isloading:true,
    userLocation:undefined,
    isLoadingPlaces:false,
    places:[]
}
export const PlacesProvider = ({children}:PROPS) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation().then(lngLat => dispatch({type:"setUserLocation", payload: lngLat}))
    }, [])

    const searchPlacesByTerm = async(query:string):Promise<Feature[]> => {
        if(query.length === 0) {
            dispatch({
                type:"setPlaces", payload:[]
            })
            return []
        }
        if(!state.userLocation) throw new Error("no hay ubicacion del usuario")
        dispatch({
            type:"setLoadingPlaces"
        })
        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`,{
            params:{
                proximity:state.userLocation.join(',')
            }
        })
        console.log(resp.data)
        dispatch({
            type:"setPlaces",
            payload:resp.data.features
        })
        return resp.data.features
    }
    
  return (
    <PlacesContext.Provider value={{...state, searchPlacesByTerm}}>{children}</PlacesContext.Provider>
  )
}
