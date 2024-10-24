/* eslint-disable no-unused-vars */
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ProyectoContainer } from '../Proyecto';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -32.90202739534915,
  lng: -71.47360309981121
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCy9Kx4UtkxYNsMo09AhZPyDg9K6ktQUiA"
  })
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(12)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center}/>
        
      </GoogleMap>
  ) : <></>
}

const Ubicacion = () => {
    return(
        <ProyectoContainer>
            <Map/>
        </ProyectoContainer>
    )
}
export default Ubicacion

