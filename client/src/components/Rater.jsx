import React, { useState, useEffect, useRef } from "react";
import Slider from '@mui/material/Slider';
import Chart from 'chart.js/auto';
import { light } from "@mui/material/styles/createPalette";
import '../index.css';

function Rater() {
    const chartRef = useRef();
    const [bars, setBars] = useState([]);
    const [query, setQuery] = useState("");
    const [ sliderVibeList, setSliderVibeList ] = useState([4, 4, 4, 4, 4, 4, 4]);
    
    const theme = {
        1: 'Sports bar',
        2: 'Pool and/or other bar games',
        3: 'Themed, ex: Tiki',
        4: 'Local bar',
        5: 'Pub',
        6: 'Craft',
        7: 'Music'
    }
    const atmosphere = {
        1: 'Dive in the deep- end',
        2: 'Dive',
        3: 'Sort of dive-y',
        4: 'Not a dive, not fancy',
        5: 'Fairly fancy',
        6: 'Fancy',
        7: 'Fancy fancy'
    }
    const libations = {
        1: 'Beer beer and more beer',
        2: 'Mostly beer',
        3: 'Lots of beer, some cocktails',
        4: 'Mix of beer and cocktails',
        5: 'Lots of cocktails, some beer',
        6: 'Mostly cocktails',
        7: 'Cocktails on cocktails, no beer for miles'
    }
    const partySize = {
        1: 'Flying solo, this is the place for you',
        2: 'A couple people',
        3: 'Trio',
        4: 'Foursomes',
        5: 'Larger groups',
        6: 'Parties (planned)',
        7: 'Parties (on the fly)'
    }
    const volume = {
        1: 'Intimate',
        2: 'Quiet this is a library',
        3: 'Chatter',
        4: 'Talking',
        5: 'Loud',
        6: 'Can you say that again?',
        7: '🔊 WHAT!? 🔊'
    }
    const food = {
        1: 'None allowed!',
        2: 'Outside food ok',
        3: 'Bar snacks only',
        4: 'Small bites',
        5: 'Medium bites',
        6: 'Limited menu',
        7: 'Full kitchen, actually known for their food'
    }
    const lighting = {
        1: 'Candlelight, phone needed for menu',
        2: 'Dim',
        3: 'Mood',
        4: 'Low-key',
        5: 'Illuminated',
        6: 'Bright',
        7: 'I can see everything, bring sunnies 😎'
    }

    // const getIndex = (i) =>sliderVibeList[i]

    const handleSliderChange = (index, newValue) => {
        const newValues = [...sliderVibeList];
        newValues[index] = newValue;
        setSliderVibeList(newValues);
    }

    useEffect(() => {
        fetch("http://localhost:5555/bars")
            .then(response => response.json())
            .then(data => { setBars(data); });
    }, []);
    
    const onUpdateQuery = event => setQuery(event.target.value);
    const filteredBars = bars.filter(bar => bar.bar_name.toLowerCase().includes(query.toLowerCase()) && bar.bar_name !== query)
    const matchingBar = bars.find(bar => bar.bar_name.toLowerCase() === query.toLowerCase());
    const matchingBarId = matchingBar ? matchingBar.id : null;

    useEffect(() => {
        const ctx = document.getElementById(`chart-rater`);

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const barData = {
            labels: ["Theme", "Atmosphere", "Libations", "Group Size", "Volume", "Food", 'Lighting'],
            datasets: [{
                label: `Bar`,
                backgroundColor: "rgba(200,0,0,0.2)",
                data: sliderVibeList
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

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [sliderVibeList]);


    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5555/ratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                rating: sliderVibeList,
                bar_id: matchingBarId,
                user_id: globalThis.sessionStorage.getItem('user_id'),
            })
        }).then(response => response.json())
            .then(console.log('Successful Vibe Rating'));
    }

    return (
        <div>
            <div>
                <canvas id="chart-rater"></canvas>
            </div>
            <h1>Vibe Rater</h1>
            {/* <h2>Bar Name</h2> */}
            <input className="search-bar" type="text" placeholder="Search bar names..." value={query} onChange={onUpdateQuery} />
            <div className="dropdown-content">
                {
                    query &&
                    filteredBars.slice(0, 10).map(item => <div className="search-results" key={item.id} onClick={(e) => setQuery(item.bar_name)}>
                        {item.bar_name}
                    </div>)
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex slider-text">
                    <h2 className="slider-header">Theme:</h2>
                    <h2 className="flavor-text" >{theme[sliderVibeList[0]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Theme"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[0]}
                    onChange={(e, value) => handleSliderChange(0, value)}
                />
                <div className="flex slider-text">
                    <h2 className="slider-header">Atmosphere:</h2>
                    <h2 className="flavor-text" >{atmosphere[sliderVibeList[1]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Atmosphere"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[1]}
                    onChange={(e, value) => handleSliderChange(1, value)}
                />
                <div className="flex slider-text">
                    <h2 className="slider-header">Libations: </h2>
                    <h2 className="flavor-text" >{libations[sliderVibeList[2]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Libations"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[2]}
                    onChange={(e, value) => handleSliderChange(2, value)}
                    />
                <div className="flex slider-text">
                    <h2 className="slider-header">Party Size:</h2>
                    <h2 className="flavor-text" >{partySize[sliderVibeList[3]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Party Size"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[3]}
                    onChange={(e, value) => handleSliderChange(3, value)}
                    />
                <div className="flex slider-text">
                    <h2 className="slider-header">Volume:</h2>
                    <h2 className="flavor-text" >{volume[sliderVibeList[4]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Volume"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[4]}
                    onChange={(e, value) => handleSliderChange(4, value)}
                    />
                <div className="flex slider-text">
                    <h2 className="slider-header">Food:</h2>
                    <h2 className="flavor-text" >{food[sliderVibeList[5]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Food"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[5]}
                    onChange={(e, value) => handleSliderChange(5, value)}
                    />
                <div className="flex slider-text">
                    <h2 className="slider-header">Lighting:</h2>
                    <h2 className="flavor-text" >{lighting[sliderVibeList[6]]}</h2>
                </div>
                <Slider className="slider"
                    aria-label="Lighting"
                    defaultValue={4}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    value={sliderVibeList[6]}
                    onChange={(e, value) => handleSliderChange(6, value)}
                />
                <input className="btn" id="submit" type="submit" value="Submit Vibe" />
            </form>
        </div>
    )
}

export default Rater;