import { PLACES_STATE } from "./PlacesProvider";
import { Feature } from "../../helpers"
type PLACES_ACTION =
  |{type:"setUserLocation",
  payload:[number,number]}
  |{type:"setPlaces",
  payload: Feature[]}
  |{type:"setLoadingPlaces"}


export const PlacesReducer = (state:PLACES_STATE, action:PLACES_ACTION):PLACES_STATE => {
  switch (action.type){
    case "setUserLocation":
    return {
      ...state,
      isloading:false,
      userLocation:action.payload
    }
    case "setLoadingPlaces":
      return{
        ...state,
        isLoadingPlaces:true,
        places:[]
      }
    case "setPlaces":
      return{
        ...state,
        isLoadingPlaces:false,
        places:action.payload
        
      }
    default:
      return state;
  }
}