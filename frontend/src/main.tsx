import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1Ijoib2JldHJleWVzIiwiYSI6ImNsZ2Z3anljczAzZzMza295M3YxampwcTIifQ.1vXeTEc2zuztH_5rMnBWdA"

if(!navigator.geolocation){
  alert("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
  throw new Error("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
