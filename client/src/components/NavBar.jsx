import React from "react";
import { NavLink } from 'react-router-dom';
import '../index.css';

function NavBar() {

    return (
        <nav>
            <ul className="nav-bar">
                <li>
                    <button className="nav-btn">
                        <NavLink reloadDocument to='/vibes'>vibes</NavLink>
                    </button>
                </li>
                <li>
                    <button className="nav-btn">
                        <NavLink reloadDocument to='/rater'>rater</NavLink>
                    </button>
                </li>
                <li>
                    <button className="nav-btn">
                        <NavLink reloadDocument to='/favorites'>favs</NavLink>
                    </button>
                </li>
                <li>
                    <button className="nav-btn">
                        <NavLink reloadDocument to={`/vibes/`}>random</NavLink>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar;