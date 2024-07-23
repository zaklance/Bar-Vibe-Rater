import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../index.css';
import barLogo from '../assets/bar-vibe-rater-logo.png'


function Login() {

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

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
            navigate(`/vibes`);
        } else {
            alert('Login failed');
        }
    };

    return (
        <>
            <img src={barLogo} className="logo" alt="Bar Vibe Rater logo" />
            <div className="card">
                <form onSubmit={handleLogin}>
                    <input
                        type='username'
                        value={loginUsername}
                        placeholder='enter username'
                        onChange={(event) => setLoginUsername(event.target.value)}
                        required
                    />
                    <br />
                    <input
                        type='password'
                        value={loginPassword}
                        placeholder='enter password'
                        onChange={(event) => setLoginPassword(event.target.value)}
                        required
                    />
                </form>
                <button className="btn login-btn" type='submit'><NavLink reloadDocument to={'/vibes'}>Login</NavLink></button>
                <br />
                <button className="btn login-btn" ><NavLink reloadDocument to={'/signup'}>Signup</NavLink></button>
            </div>
        </>
    )
}

export default Login;