import React, { useState } from "react";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

function MarkerCard({ barData }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClickMarker = () => {
        setIsSelected(!isSelected)
        console.log(isSelected)
    } 

    return (
        <AdvancedMarker
            key={barData.id}
            title={barData.bar_name}
            position={{ 'lat': parseFloat(barData.coordinates.lat), 'lng': parseFloat(barData.coordinates.lng) }}
            clickable={true}
            onClick={handleClickMarker}
        >
            {isSelected ? (
                <div className={`marker ${isSelected ? 'marker-on' : ''}`} >{barData.bar_name}</div>
            ) : (
                <Pin
                    background={'#6c7ae0'}
                    borderColor={'#475094'}
                    glyphColor={'#adb1f2'}
                />
            )}

        </AdvancedMarker>
    )
}

export default MarkerCard;