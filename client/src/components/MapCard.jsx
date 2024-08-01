import React, { useState } from "react";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
// import { Map, Marker } from 'mapkit-react'
import MarkerCard from "./MarkerCard";

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
                        <MarkerCard key={barData.id} barData={barData} />
                    ))}                        
                    
                </Map>
            </APIProvider>
        </div>
    )
}

export default MapCard;