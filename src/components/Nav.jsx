import {Link} from "react-router-dom";
import React from "react";


export default function Nav() {
    return (
        <nav className="navComponent">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}