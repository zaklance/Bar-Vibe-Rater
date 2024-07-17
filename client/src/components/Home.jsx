import React from "react";
import barLogo from '../assets/bar-vibe-rater-logo.png'
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Home() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    return (
        <>
            <img src={barLogo} className="logo" alt="Bar Vibe Rater logo" />
            <div className="card">
                <form>
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
                </form>
                <button className="btn login-btn" type='submit'>Login</button>
                <br/>
                <button className="btn login-btn" ><NavLink reloadDocument to={'/signup'}>Signup</NavLink></button>
            </div>
        </>
    )
}

export default Home;