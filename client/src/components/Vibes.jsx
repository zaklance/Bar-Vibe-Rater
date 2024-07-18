import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Chart from 'chart.js/auto';
import { useEffect } from "react";
import '../index.css';

function Vibes() {
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const tompkins = { lat: 40.72606737678102, lng: -73.98333751481684 }

    useEffect(() => {
        const ctx = document.getElementById("marksChart");

        const marksData = {
            labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food"],
            datasets: [{
                label: "Big Bar",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [4, 2, 4, 2, 3, 1]
            }, {
                label: "Tile Bar",
                backgroundColor: "rgba(0,0,200,0.2)",
                data: [4, 1, 2, 3, 4, 1]
            }]
        };
        
        const radarChart = new Chart(ctx, {
            type: 'radar',
            data: marksData,
            options: {
                scales: {
                    r: {
                        max: 5,
                        min: 0,
                        ticks: {
                            display: false,
                            stepSize: 1
                        },
                        grid: {

                        }
                    }
                }
            }
        });
    }, [])

        return (
            <>
                <div id='map'>
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                        <Map defaultCenter={tompkins} defaultZoom={13} map-id="4cdb05ac35ed1b8">
                            {/* <Marker position={tompkins} /> */}
                        </Map>
                    </APIProvider>
                    <gmp-map defaultCenter={tompkins} zoom={13} map-id="DEMO_MAP_ID">
                        <gmp-advanced-marker position={tompkins} title="Union Square"></gmp-advanced-marker>
                    </gmp-map>
                </div>
                <h2>Test</h2>
                <div className="vibe-chart">
                    <canvas id="marksChart"></canvas>
                </div>
            </>
        )
    }

export default Vibes;