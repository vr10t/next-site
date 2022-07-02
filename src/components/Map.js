import React, { useEffect, useState } from 'react'
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import {throttle,debounce} from "throttle-debounce"
import { Loader } from '@googlemaps/js-api-loader';


const center = {
  lat: -3.745,
  lng: -38.523
};

function Map(props) {

  const containerStyle = {
    width: props.width,
    height: props.height,
  
  };
 const [mounted,setMounted] = useState(false)
 const [google,setGoogle] = useState(null)
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places"],
})
  const [response,setResponse]= React.useState(null)
  const [map, setMap] = React.useState(null)
  const count = React.useRef(0);
  useEffect(()=>{
    loader.load().then((res)=>{
    setMounted(true)
    setGoogle(res)
  })

  },[])
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  function callback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK' && count.current === 0) {
        count.current++;
      console.count();
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }
  const directionsCallback = React.useCallback( debounce(3000,callback,{atBegin:true}),[])
  return (<>
      {mounted &&<GoogleMap className="mx-auto"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        {
              (
                props.destination !== '' &&
                props.origin !== '' &&
                props.shouldFetchDirections
              ) && (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: props.destination,
                    origin: props.origin,
                    travelMode: 'DRIVING'
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )
            }

            {
             response !== null && (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
              )
            }
        </>
        
      </GoogleMap>}</>
  ) 
}

export default React.memo(Map)