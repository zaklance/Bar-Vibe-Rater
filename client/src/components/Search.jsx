import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Chart from 'chart.js/auto';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import VibeCard from "./VibeCard";




function Search() {
    const [ bars, setBars, ratings, setRatings ] = useOutletContext();
    const [ favs, setFavs ] = useState([]);
    const [ filter, setFilter ] = useState('');
    const [ sliderVibeList, setSliderVibeList ] = useState([0, 0, 0, 0, 0, 0, 0]);
    const chartRefs = useRef({});

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

    useEffect(() => {
        fetch("http://127.0.0.1:5555/favorites")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.user_id === parseInt(globalThis.localStorage.getItem('user_id')));
                setFavs(filteredData)
            })
            .catch(error => console.error('Error fetching favorites', error));
    }, []);

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleSliderChange = (index, newValue) => {
        const newValues = [...sliderVibeList];
        newValues[index] = newValue;
        setSliderVibeList(newValues);
    }

    
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

    const averages = calculateAverageRatings(ratings);

    function filterAverages(averages, sliderValues) {
        const filteredAverages = {};
        for (const bar_id in averages) {
            const isWithinRange = averages[bar_id].every((value, index) => {
                return sliderValues[index] === 0 || Math.abs(value - sliderValues[index]) <= 0.5;
            });

            if (isWithinRange) {
                filteredAverages[bar_id] = averages[bar_id];
            }
        }
        return filteredAverages;
    }

    const filteredAverages = filterAverages(averages, sliderVibeList);
    const filteredBars = bars.filter(bar => filteredAverages[bar.id]);

    console.log(filteredAverages)

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
    
    console.log(filteredAverages)

    return (
        <>
            <h1>Search</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="select-small" >Filter</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={filter}
                    label="Filter"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Theme</MenuItem>
                    <MenuItem value={1}>Atmosphere</MenuItem>
                    <MenuItem value={2}>Libations</MenuItem>
                    <MenuItem value={3}>Group Size</MenuItem>
                    <MenuItem value={4}>Volume</MenuItem>
                    <MenuItem value={5}>Food</MenuItem>
                    <MenuItem value={6}>Lighting</MenuItem>
                </Select>
            </FormControl>
            {filter === 0 && (
                <div>
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
                        value={sliderVibeList[filter]}
                        onChange={(e, value) => handleSliderChange(0, value)}
                    />
                </div>
            )}
            {filter === 1 && (
                <div>
                    <div className="flex slider-text">
                        <h2 className="slider-header">Atmosphere:</h2>
                        <h2 className="flavor-text">{atmosphere[sliderVibeList[1]]}</h2>
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
                </div>
            )}
            {filter === 2 && (
                <div>
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
                </div >
            )}
            {filter === 3 && (
                <div>
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
                </div>
            )}
            {filter === 4 && (
                <div>
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
                </div>
            )}
            {filter === 5 && (
                <div>
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
                </div>
            )}
            {filter === 6 && (
                <div>
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
                </div>
            )}
            <div className="vibe-chart-container">
                {filteredBars.map((barData) => (
                    <VibeCard key={barData.id} barData={barData} favs={favs} setFavs={setFavs} />
                ))}
            </div>
        </>
    )
}

export default Search;