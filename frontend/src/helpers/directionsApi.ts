import axios from "axios";

export const directionsApi = axios.create({
    baseURL:"https://api.mapbox.com/directions/v5/mapbox/driving",
    params:{
        alternatives:false,
        geometries:"geojson",
        overview:"simplified",
        steps:false,
        access_token:"pk.eyJ1Ijoib2JldHJleWVzIiwiYSI6ImNsZ2Z3anljczAzZzMza295M3YxampwcTIifQ.1vXeTEc2zuztH_5rMnBWdA"
    }
})