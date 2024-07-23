import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
// import { Map, Marker } from 'mapkit-react'

function MapCard() {
    const tompkins = { lat: 40.72606737678102, lng: -73.98333751481684 }

    return (
        <div id='map'>
            {/* <Map token={import.meta.env.VITE_MAPKIT_KEY_ALT}>
                    <Marker
                        key={market.id}
                        latitude={market.latitude}
                        longitude={market.longitude}
                        title={market.name}
                    />
            </Map> */}

            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultCenter={{ lat: 40.72606737678102, lng: -73.98333751481684 }}
                    defaultZoom={13}
                    map-id="4cdb05ac35ed1b8"
                    disableDefaultUI={true}
                    >
                    <Marker position={tompkins} />
                </Map>
            </APIProvider>
        </div>
    )
}

export default MapCard;