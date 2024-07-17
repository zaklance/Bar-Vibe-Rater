import React from "react";
import { useState } from "react";
import '../index.css';
import barLogo from '../assets/bar-vibe-rater-logo.png'

function SignUp() {
    const [signupEmail, setSignupEmail] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

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
                <button className="btn login-btn" type='submit'>Signup</button>
            </div>
        </>
    )
}

export default SignUp;