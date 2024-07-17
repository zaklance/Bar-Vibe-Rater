import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '../index.css';

function Vibes() {
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const tompkins = { lat: 40.72606737678102, lng: -73.98333751481684 }

    return (
        <>
            <div id='map'>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map defaultCenter={tompkins} defaultZoom={13} map-id="4cdb05ac35ed1b8">
                        <Marker position={tompkins} />
                    </Map>
                    <gmp-map defaultCenter={tompkins} zoom={13} map-id="DEMO_MAP_ID">
                        <gmp-advanced-marker position={tompkins} title="Union Square"></gmp-advanced-marker>
                    </gmp-map>
                </APIProvider>
            </div>
            <h2>Test</h2>
        </>
    )
}

export default Vibes;