
import { useContext } from "react"
import axios from "axios"


export const searchApi = axios.create({
    baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places",
    params:{
        limit:5,
        laguage:"es",
        access_token:"pk.eyJ1Ijoib2JldHJleWVzIiwiYSI6ImNsZ2Z3anljczAzZzMza295M3YxampwcTIifQ.1vXeTEc2zuztH_5rMnBWdA"
    }
})