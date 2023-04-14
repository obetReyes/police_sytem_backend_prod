import React, { useRef , useLayoutEffect, useState, useEffect} from 'react'
import { useContext } from 'react'
import { PlacesContext, MapContext } from '../../../contexts'
import { Map } from 'mapbox-gl'



export const MapView = () => {
 
  const styles = {
    satellite:"mapbox://styles/mapbox/satellite-streets-v12",
    street:"mapbox://styles/mapbox/navigation-night-v1",
  }

    const {isloading, userLocation} = useContext(PlacesContext)
    const {setMap, map} = useContext(MapContext)
    const mapDiv = useRef<HTMLDivElement>(null)
    const [currentStyle, setCurrentStyle] = useState<string>(styles.street)
   
   


    const handleStyle  =  () => {
      if(currentStyle == styles.street){
        return setCurrentStyle(styles.satellite)
      }else{
        
        return setCurrentStyle(styles.street)
      }
      
    }
  
  
 
    

  
  useLayoutEffect(() => {
        if(!isloading){
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: currentStyle, // style URL
                center:  userLocation, // starting position [lng, lat]
                zoom: 13, // starting zoom
               
                
            });
          
          setMap(map)
          map.fitBounds( [
            [-109.95822719774833,22.880810404607914], // Southwest coordinates
            [-109.67198953434098,23.620601685610268] // Northeast coordinates
            ])
          
        }
    }, [isloading, currentStyle])

    
    


  if(isloading){
    return(
        <div>
      
        </div>
    )
  }
    return (
      <>
       <div className='w-full h-screen' ref={mapDiv}></div>
      
      {currentStyle == styles.satellite ?  <button className='fixed top-2 rounded-lg p-1 bg-gray-800 text-white right-4' onClick={handleStyle}>vista de calles</button> : <button className='fixed top-2 rounded-lg p-1 bg-gray-800 text-white right-4' onClick={handleStyle}>vision satelital</button>}
      </>
  )
}
