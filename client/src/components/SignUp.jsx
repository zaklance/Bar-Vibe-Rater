import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../index.css';
import barLogo from '../assets/bar-vibe-rater-logo.png'

function SignUp() {
    const [signupEmail, setSignupEmail] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:5555/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: signupUsername,
                password: signupPassword,
                email: signupEmail,
            }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            alert("Sign Up Successful. Please log in!");
        } else {
            console.log('Signup failed');
        }
    };

    return (
        <>
            <img src={barLogo} className="logo" alt="Bar Vibe Rater logo" />
            <div className="card">
                <form>
                    <input
                        type='username'
                        value={signupUsername}
                        placeholder='enter username'
                        onChange={(event) => setSignupUsername(event.target.value)}
                        required
                    />
                    <br />
                    <input
                        type='password'
                        value={signupPassword}
                        placeholder='enter password'
                        onChange={(event) => setSignupPassword(event.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type='email'
                        value={signupEmail}
                        placeholder='enter email'
                        onChange={(event) => setSignupEmail(event.target.value)}
                        required
                    />
                </form>
                <button className="btn login-btn" type='submit'><NavLink reloadDocument to={'/'}>Signup</NavLink></button>
            </div>
        </>
    )
}

export default SignUp;