import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = ({setData,setLocation,setIsClickMap,isLoaded,setIsLoaded}) => {
    const containerStyle = {
        width: '100%',
        height: '100%'
    }
      
    const center = {
        lat: 16.47, 
        lng: 107.60
    }
    
    const consoleFnc = e => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&units=imperial&appid=e97898b77438d57329f4a668063b711a`
        axios.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => console.log(err))
        setLocation('')
        setIsClickMap(false)
        if(!isLoaded)
            setIsLoaded(true)
    }

    return (
        <div className='ggMap'>
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onClick={(e) => consoleFnc(e)}
                    >
                        <Marker
                            icon={{
                                url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                                
                            }}
                            position={{ lat: 16.47, lng: 107.60 }}
                        />
                    </GoogleMap>
                ) : (
                    <LoadScript googleMapsApiKey="AIzaSyB5bH3mh-sZjFg4iAvIIEfggTawVAtjzXs">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                            onClick={(e) => consoleFnc(e)}
                        >
                            <Marker
                                icon={{
                                    url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                                    
                                }}
                                position={{ lat: 16.47, lng: 107.60 }}
                            />
                        </GoogleMap>
                    </LoadScript>
                )
            }
            
        </div>
    )
}

export default Map