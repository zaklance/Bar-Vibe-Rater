import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';


function Search() {
    // const [bars, setBars, ratings, setRatings] = useOutletContext;
    const [ favs, setFavs ] = useState([]);
    const [ bar, setBar ] = useState();
    const params = useParams();
    const barId = params.id;
    const chartRef = useRef();

    console.log(params.id)

    useEffect(() => {
        fetch("http://127.0.0.1:5555/favorites")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.user_id === parseInt(globalThis.localStorage.getItem('user_id')));
                setFavs(filteredData)
            })
            .catch(error => console.error('Error fetching favorites', error));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/bars/${barId}`)
            .then(response => response.json())
            .then(data => setBar(data))
            .catch(error => console.error('Error fetching bars', error));
    }, [barId]);


    // if (!bar) {
    //     return <h1>Loading...</h1>;
    // };
    // console.log(bar.ratings)


    function calculateAverageRatings(data) {
        const barMap = {};

        data.forEach(item => {
            const { bar_id, rating } = item;

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

        const averages = {};
        for (const bar_id in barMap) {
            averages[bar_id] = barMap[bar_id].sum.map((sum, index) => sum / barMap[bar_id].count[index]);
        }

        return averages;
    }

    const averages = calculateAverageRatings(bar.ratings);

    console.log(averages)


    
    const ctx = document.getElementById("chart-rater");

    if (chartRef.current) {
        chartRef.current.destroy();
    }

    const barData = {
        labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food", 'Lighting'],
        datasets: [{
            label: `Bar`,
            backgroundColor: "rgba(200,0,0,0.2)",
            data: Object.values(averages)
        }]
    };

    chartRef.current = new Chart(ctx, {
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

    if (chartRef.current) {
        chartRef.current.destroy();
    }
        

    return (
        <>
            <h1>{bar.bar_name}</h1>
            <canvas id="chart-rater"></canvas>
        </>
    )
}

export default Search;