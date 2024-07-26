import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import '../index.css';

function VibeCard({ barData, favs, setFavs }) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {

        // Any other initialization or effect code can go here if needed
    }, [barData]);    

    const handleClick = async (event) => {
        setIsClicked(!isClicked);
        if (isClicked == false) {
            const response = await fetch('http://127.0.0.1:5555/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: globalThis.localStorage.getItem('user_id'),
                    bar_id: barData.id
                })
                // credentials: 'include'
            }).then((resp) => {
                return resp.json()
            }).then(data => {
                setFavs([...favs, data])
            });
        } else {
            const findFavId = favs.filter(item => item.bar_id == barData.id)
            for (const item of findFavId) {
                fetch(`http://127.0.0.1:5555/favorites/${item.id}`, {
                    method: "DELETE",
                }).then(() => {
                    setFavs((favs) => favs.filter((fav) => fav.bar_id !== barData.id));
                })
            }
        }
    };

    let isFav = favs.some(fav => fav.bar_id === barData.id);

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