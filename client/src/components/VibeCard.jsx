import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import '../index.css';

function VibeCard({ barData, favs }) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        
        // Any other initialization or effect code can go here if needed
    }, [barData]);

    const isFav = favs.some(fav => fav.bar_id === barData.id);

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (isClicked == true) {
            console.log(isClicked)
        } else {
            console.log(isClicked)
        }

    };
    
    // console.log(isFav)

    return (
        <div className="vibe-card">
            <canvas id={`chart-${barData.id}`}></canvas>
            <div className="flex center">
                <h4 className="h-med">{barData.bar_name}</h4>
                <button
                    className={`h-med btn fav-btn ${isClicked || isFav ? 'btn-on' : ''}`}
                    onClick={handleClick}
                >♥</button>
            </div>
        </div>
    );
}

export default VibeCard;