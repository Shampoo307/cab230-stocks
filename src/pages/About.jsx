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
                their Name, Symbol, and Industry. The user can also filter this list by Industry or
                stock symbol based on their input.
                <br/>
                <br/>
                The user can select a stock, and click 'View Stock' to view a page detailing some
                more specific stock information, namely its most recent Open, High, Low, Close, and Volume.
                <br/>
                <br/>
                To be able to see more detailed information about a particular stock, the user can register
                and create an account, or log in. Once registered and logged in, the user can again select
                a stock and be taken to a page with more information on it. Now however, there is a full table
                with data from the entire date range available, able to be narrowed down by use of the two date
                pickers. Below the table resides a graph charting out the information displayed in the table
                based on the dates selected.
            </p>
        </div>
    )
}