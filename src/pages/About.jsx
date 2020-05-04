import React from "react";

export default function About() {
    return (
        <div className="about">
            <h2>About</h2>
            <p>This website is created for the first assignment of CAB230.
                <br />
                Author: Thomas Crilly
                <br />
                Student Number: N9960783
            </p>
            <p id="user-info">
                The user can view a cursory list of all stocks available from the API on the homepage;
                their Name, Symbol, and Industry. The user can also filter this list by Industry based
                on their input.
                <br/>
                The user can click on any of the stocks to view a page detailing some information on it,
                namely it's most recent Price, Open, High, Low, and Close.
                <br/>
                To be able to see more detailed information about a particular stock, the user can register,
                and create an account. Once registered or logged in, the user can on viewing a stock's
                information, then see more about it's pricing history and fluctuations, accompanied by a
                graph to aid visual understanding.
            </p>
        </div>
    )
}