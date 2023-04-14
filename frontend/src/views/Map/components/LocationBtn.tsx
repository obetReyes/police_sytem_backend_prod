import React, { useContext, useEffect, useState } from 'react'
import { MapContext, PlacesContext } from '../../../contexts'

const USER_ROUTE = "users/currentUser"

export const BtnMyLocation = () => {

   const {map, isMapReady} =  useContext(MapContext)
  const {userLocation} = useContext(PlacesContext)


   const getLocation = () => {
    if(!isMapReady || !userLocation){
            throw new Error("mapa no esta listo")
    }
    map?.flyTo({
        zoom:16,
        center:userLocation
    })
  }
    return (
    <button onClick={getLocation} className="font-medium text-yellow-400 text-sm underline ">ir a mi ubicacion</button>
  )
}