import React from "react";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
// import { Map, Marker } from 'mapkit-react'

function MapCard({ bars }) {
    const tompkins = { lat: 40.72606737678102, lng: -73.98333751481684 }

    return (
        <div id='map'>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultCenter={{ lat: 40.72606737678102, lng: -73.98333751481684 }}
                    defaultZoom={15}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                    disableDefaultUI={true}
                    >
                    {bars.map((barData) => (
                        <Marker key={barData.id} position={{'lat': parseFloat(barData.coordinates.lat), 'lng': parseFloat(barData.coordinates.lng)}} />
                    ))}
                    <AdvancedMarker position={tompkins} content={'test'}>
                        <Pin
                            // background={'#0f9d58'}
                            // borderColor={'#006425'}
                            // glyphColor={'#60d98f'}
                        />
                    </AdvancedMarker>
                </Map>
            </APIProvider>
        </div>
    )
}

export default MapCard;