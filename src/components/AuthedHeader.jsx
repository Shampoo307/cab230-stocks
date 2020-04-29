import React from "react";

import AuthedNav from "./AuthedNav";

import stocksImage from './stocksImage.jpg';

// https://www.flickr.com/photos/quoteinspector/41296772825/in/photolist-MGBJKr-2bo9eCS-24xarjA-PjAeXL-25VfLuV-25VfLiH-jPrNU-24xaqSd-25VfKNz-dTagEs-27dqo3h-94P2QH
// IMAGE SOURCE

// the header
export default function Header() {
	return (
		<header className="header">
			{/* icon */}
			<div id="icon">
				<img src={stocksImage} alt="Generic Stock Market"/>
			</div>
			<div className="headerTitle">
				<h1>American Stock Exchange</h1>
				<h2>2019-11-06 to 2020-03-24</h2>
			</div>
			<AuthedNav/>
		</header>
	);
}