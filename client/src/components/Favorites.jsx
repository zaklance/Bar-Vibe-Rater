import React, { useState, useEffect, useRef } from "react";
import VibeCard from "./VibeCard";
import Chart from 'chart.js/auto';
import '../index.css';

function Favorites() {
    const [favs, setFavs] = useState([]);
    const chartRefs = useRef({});

    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/favorites")
            .then(response => response.json())
            .then(data => { 
                const filteredData = data.filter(item => item.user_id === parseInt(globalThis.localStorage.getItem('user_id')));
                setFavs(filteredData)})
            .catch(error => console.error('Error fetching favorites', error));
    }, []);


    function calculateAverageRatings(data) {
        const barMap = {};

        data.forEach(entry => {
            const { bar } = entry;
            const { id: bar_id, ratings } = bar;

            ratings.forEach(item => {
                const { rating } = item;

                if (!Array.isArray(rating)) {
                    console.error(`Invalid rating format for bar_id ${bar_id}:`, rating);
                    return;
                }

                if (!barMap[bar_id]) {
                    barMap[bar_id] = {
                        sum: new Array(rating.length).fill(0),
                        count: new Array(rating.length).fill(0)
                    };
                }

                rating.forEach((value, index) => {
                    barMap[bar_id].sum[index] += value;
                    barMap[bar_id].count[index] += 1;
                });
            });
        });

        const averages = {};
        for (const bar_id in barMap) {
            averages[bar_id] = barMap[bar_id].sum.map((sum, index) => sum / barMap[bar_id].count[index]);
        }

        return averages;
    }
    
    const averages = calculateAverageRatings(favs);

    useEffect(() => {
        Object.keys(averages).forEach(bar_id => {
            const existingChart = chartRefs.current[bar_id];

            if (existingChart) {
                existingChart.destroy();
            }

            const ctx = document.getElementById(`chart-${bar_id}`);
            if (ctx) {
                const barData = {
                    labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food", 'Lighting'],
                    datasets: [{
                        label: `Bar`,
                        backgroundColor: "rgba(200,0,0,0.2)",
                        data: averages[bar_id]
                    }]
                };

                chartRefs.current[bar_id] = new Chart(ctx, {
                    type: 'radar',
                    data: barData,
                    options: {
                        scales: {
                            r: {
                                max: 7,
                                min: 0,
                                ticks: {
                                    display: false,
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        });
    }, [averages]);
    
    return (
        <>
            <h1 className="h-bold">Favorites</h1>
            <div className="vibe-chart-container">
                {favs.map((barData) => (
                    <VibeCard key={barData.id} barData={barData.bar} favs={favs} setFavs={setFavs} />
                ))}
            </div>
        </>
    )
}

export default Favorites;