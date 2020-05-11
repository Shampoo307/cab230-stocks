import {Link} from "react-router-dom";
import React from "react";


export default function AuthedNav(props) {
	return (
		<nav className="navComponent">
			<ul>
				<li>
					<Link to="/authed-home">Home</Link>
				</li>
				{/*<li>*/}
				{/*	<Link to="/stock-details">View Stocks</Link>*/}
				{/*</li>*/}
				<li>
					<Link to="/" onClick={() => {
						props.logIn(false);
					}}>Logout</Link>
				</li>
				
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</nav>
	)
}