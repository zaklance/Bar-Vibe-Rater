import React from "react";
import barLogo from '../assets/bar-vibe-rater-logo.png'
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Home({ isLoggedIn, setIsLoggedIn }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:5555/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            globalThis.localStorage.setItem('authToken', 'is logged in');
            globalThis.localStorage.setItem('user_id', data.id);
            console.log('Login successful:', data);
            navigate('/vibes');
        } else {
            alert('Login failed');
        }
    };

    // const checkAuth = () => {
    //     return localStorage.getItem('authToken') !== null;
    // }

    // useEffect(() => {
    //     setIsLoggedIn(checkAuth());
    // })


    return (
        <>
            <img src={barLogo} className="logo" alt="Bar Vibe Rater logo" />
            <div className="card">
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type='username'
                            value={loginUsername}
                            placeholder='enter username'
                            onChange={(event) => setLoginUsername(event.target.value)}
                            required
                        />
                        <br/>
                        <input
                            type='password'
                            value={loginPassword}
                            placeholder='enter password'
                            onChange={(event) => setLoginPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button className="btn login-btn" type='submit'>Login</button>
                        <br/>
                        <button className="btn login-btn" ><NavLink reloadDocument to={'/signup'}>Signup</NavLink></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Home;