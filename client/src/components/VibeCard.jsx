import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import '../index.css';

function VibeCard({ barData }) {
    // useEffect(() => {
    //     // Any other initialization or effect code can go here if needed
    // }, [barData]);

    return (
        <div className="vibe-card">
            <canvas id={`chart-${barData.id}`}></canvas>
            <h4 className="h-med">{barData.bar_name}</h4>
        </div>
    );
}

export default VibeCard;