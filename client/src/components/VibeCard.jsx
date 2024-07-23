import React from "react";
import Chart from 'chart.js/auto';
import { useEffect } from "react";
// import '../index.css';

function VibeCard({ barData }) {

    return (
        <div className="vibe-card">
            <canvas id={barData.id}></canvas>
            <h4>{barData.bar_name}</h4>
        </div>
    )
}

export default VibeCard;