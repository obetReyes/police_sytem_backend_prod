import { createContext } from "react"
import { Feature } from "../../helpers"
export interface PLACES_CONTEXT_PROPS{
    isloading:boolean
    userLocation?:[number,number]
    isLoadingPlaces:boolean
    places:Feature[]
    //methods

   searchPlacesByTerm:(query:string) => Promise<Feature[]>
}
export const PlacesContext  = createContext<PLACES_CONTEXT_PROPS>({} as PLACES_CONTEXT_PROPS);