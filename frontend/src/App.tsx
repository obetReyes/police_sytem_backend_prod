import { AppRouter } from "./components"
import {BrowserRouter} from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapProvider, PlacesProvider, UserProvider } from "./contexts";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const client = new QueryClient();
mapboxgl.accessToken = "pk.eyJ1Ijoib2JldHJleWVzIiwiYSI6ImNsZ2Z3anljczAzZzMza295M3YxampwcTIifQ.1vXeTEc2zuztH_5rMnBWdA"

if(!navigator.geolocation){
  alert("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
  throw new Error("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
}

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
    <BrowserRouter>
    <UserProvider>
    <PlacesProvider>
      <MapProvider>
    <AppRouter/>
    </MapProvider>
    </PlacesProvider>
    </UserProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
