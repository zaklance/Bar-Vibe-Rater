import React from "react";
import { NavLink } from 'react-router-dom';
import '../index.css';

function NavBar({ bars }) {
    const randomBar = Math.floor(Math.random() * (Math.floor(bars.length) - Math.ceil(1))) + Math.ceil(1);

    return (
        <nav>
            <ul className="nav-bar">
                <li>
                    <NavLink reloadDocument to='/vibes'>
                        <button className="nav-btn">
                            vibes
                        </button>
                    </NavLink>
                </li>
                <li>
                    <NavLink reloadDocument to='/rater'>
                        <button className="nav-btn">
                            rater
                        </button>
                    </NavLink>
                </li>
                <li>
                    <NavLink reloadDocument to='/favorites'>
                        <button className="nav-btn">
                            favs
                        </button>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink reloadDocument to={`/bars/${randomBar}`}>
                        <button className="nav-btn">
                            random
                        </button>
                    </NavLink>
                </li> */}
                <li>
                    <NavLink reloadDocument to={`/search`}>
                        <button className="nav-btn">
                            search
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar;