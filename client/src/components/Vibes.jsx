import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Chart from 'chart.js/auto';
import { useEffect, useState } from "react";
import '../index.css';
import VibeCard from "./VibeCard";

function Vibes() {
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const [bars, setBars] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/bars")
        .then(response => response.json())
        .then(data => setBars(data))
        .catch(error => console.error('Error fetching bars', error));
    }, []);
    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/ratings")
        .then(response => response.json())
        .then(data => setRatings(data))
        .catch(error => console.error('Error fetching bars', error));
    }, []);

    // let ratingAvg = ratings[0].map((col, i) => ratings.map(row => row[i]).reduce((acc, c) => acc + c, 0) / ratings.length);
    // console.log(typeof(ratings))

    function calculateAverageRatings(data) {
        // Initialize a map to store cumulative sums and counts for each bar_id
        const barMap = {};

        // Iterate through each key in the data object
        for (const key in data) {
            const { bar_id, rating } = data[key];

            // If the bar_id doesn't exist in the map, initialize it
            if (!barMap[bar_id]) {
                barMap[bar_id] = {
                    sum: new Array(rating.length).fill(0),
                    count: new Array(rating.length).fill(0)
                };
            }

            // Update the sums and counts for the current bar_id
            rating.forEach((value, index) => {
                barMap[bar_id].sum[index] += value;
                barMap[bar_id].count[index] += 1;
            });
        }

        // Calculate the averages for each bar_id
        const averages = {};
        for (const bar_id in barMap) {
            averages[bar_id] = barMap[bar_id].sum.map((sum, index) => sum / barMap[bar_id].count[index]);
        }
        
        return averages;
    }
    
    // console.log(calculateAverageRatings(ratings));
    const averages = calculateAverageRatings(ratings);

    // Create charts for each bar_id
    for (const bar_id in averages) {
        const ctx = document.getElementById(`${bar_id}`);

        const barData = {
            labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food"],
            datasets: [{
                label: `Bar ${bar_id}`,
                backgroundColor: "rgba(200,0,0,0.2)",
                data: averages[bar_id]
            }]
        };

        const radarChart = new Chart(ctx, {
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
                }
            }
        });
    }

    // console.log(calculateAverageRatings(testData))
    

    // Example usage
    // const data = [
    //     { bar_id: 1, rating: [1, 2, 3] },
    //     { bar_id: 1, rating: [4, 5, 6] },
    //     { bar_id: 1, rating: [7, 8, 9] },
    //     { bar_id: 2, rating: [3, 2, 1] },
    //     { bar_id: 2, rating: [6, 5, 4] },
    //     { bar_id: 2, rating: [9, 8, 7] }
    // ];



    // useEffect(() => {
    //     const ctx = document.getElementById(bars.id);
        

    //     const barData = {
    //         labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food"],
    //         datasets: [{
    //             label: "Big Bar",
    //             backgroundColor: "rgba(200,0,0,0.2)",
    //             data: {}
    //         },
    //         // {
    //         //     label: "Tile Bar",
    //         //     backgroundColor: "rgba(0,0,200,0.2)",
    //         //     data: [4, 2, 3, 3, 5, 1]
    //         // }
    //         ]
    //     };
        
    //     const radarChart = new Chart(ctx, {
    //         type: 'radar',
    //         data: barData,
    //         options: {
    //             scales: {
    //                 r: {
    //                     max: 7,
    //                     min: 0,
    //                     ticks: {
    //                         display: false,
    //                         stepSize: 1
    //                     },
    //                     grid: {
                            
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }, [])

    const tompkins = { lat: 40.72606737678102, lng: -73.98333751481684 }
    
    return (
        <>
                <div id='map'>
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                        <Map defaultCenter={tompkins} defaultZoom={13} map-id="4cdb05ac35ed1b8" disableDefaultUI={true}>
                            {/* <Marker position={tompkins} /> */}
                        </Map>
                    </APIProvider>
                    <gmp-map defaultCenter={tompkins} zoom={13} map-id="DEMO_MAP_ID">
                        <gmp-advanced-marker position={tompkins} title="Union Square"></gmp-advanced-marker>
                    </gmp-map>
                </div>
                <h2>Test</h2>
                <div className="vibe-chart-container">
                    {bars.map((barData) => (
                        <VibeCard key={barData.id} barData={barData} />
                    ))}
                </div>
            </>
        )
    }

export default Vibes;