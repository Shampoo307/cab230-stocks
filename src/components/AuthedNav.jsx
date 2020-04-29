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
					<Link to="/stock-details">View Stocks</Link>
				</li>
				<li>
					<Link to="/">Logout</Link>
				</li>
				<li>
					<Link to="/account">Account</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</nav>
	)
}