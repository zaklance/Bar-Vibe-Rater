import React from "react";
import { NavLink } from 'react-router-dom';
// import '../index.css';

function NavBar() {

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
                <li>
                    <NavLink reloadDocument to={`/vibes/`}>
                        <button className="nav-btn">
                            random
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar;