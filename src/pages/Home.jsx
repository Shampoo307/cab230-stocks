import  React, { useState, useEffect } from 'react';
import {AgGridReact} from "ag-grid-react";
import { Form, FormGroup, Label, Input } from 'reactstrap';


function validateInput(input) {
    const industries = [
        "health care",
        "industrials",
        "consumer discretionary",
        "consumer staples",
        "information technology",
        "utilities",
        "financials",
        "real estate",
        "materials",
        "energy",
        "telecommunication services"
    ];
    
    if (industries.includes(input)) {
        return true;
    }
    if (input.toString().length >= 1
        && input.toString().length <= 5) {
        return true;
    }
    if (input.toString() === '') {
        return true;
    }
    
    return false;
}

function IndustrySearchBar(props) {
    const [innerSearch, setInnerSearch] = useState('');
    const [validity, setValidity] = useState(false);
    return (
        <Form className="industryInput">
            <input
                // aria-labelledby="search-button"
                name="industry"
                id="industrySearch"
                placeholder="Industry"
                value={innerSearch}
                onChange={(event) => {
                    setInnerSearch(event.target.value);
                    
                }}
                
            />
            
            
            <button
                type="submit"
                id="industry-search-button"
                onClick={ (event) => {
                    event.preventDefault();
                    if (validateInput(innerSearch.toLowerCase())) {
                        props.onSubmit(innerSearch);
                    }
                }}
                ></button>
            <Input
                type="select"
                name="select"
                id="industry-select">
                <option>All</option>
                <option>Healthcare</option>
                <option>Industrials</option>
                <option>Consumer Discretionary</option>
                <option>Consumer Staples</option>
                <option>Information Technology</option>
                <option>Utilities</option>
                <option>Financials</option>
                <option>Real Estate</option>
                <option>Materials</option>
                <option>Energy</option>
                <option>Telecommunication Services</option>
            </Input>
        </Form>
    );
    
}

function useStocks(searchTerm) {
    const [stocks, setStockList] = useState([]);
    // const [error, setError] = useState(null);

    useEffect( () => {
            getStocks(searchTerm)
                .then((stocks) => {
                    setStockList(stocks);
                });
        }, [searchTerm],
    );

    return { stocks };
}

// function validate

function getStocks(searchTerm) {
    
    const url = `http://131.181.190.87:3000/stocks/symbols`;
    const specifier = `?industry=${searchTerm}`;
    
    if (searchTerm !== ''
        && searchTerm.toString().length > 5) {
        const newURL = url + specifier;
        return (
            fetch(newURL)
                .then((res) => res.json())
                .then((stocks) =>
                    stocks.map((stock) => {
                        return {
                            name: stock.name,
                            symbol: stock.symbol,
                            industry: stock.industry
                        };
                    })
                )
        );
    }
    else if (searchTerm.toString().length >= 1
                && searchTerm.toString().length <= 5) {
        const newURL = `http://131.181.190.87:3000/stocks/${searchTerm.toString().toUpperCase()}`;
        let stockArray = new Array(1);
        return (
            fetch(newURL)
                .then((res) => res.json())
                .then((stock) =>
                     {
                         return [
                             { name: stock.name,
                                 symbol: stock.symbol,
                                 industry: stock.industry
                             }
                         ];
                        })
                
        );
    }
    //
    return (
        fetch(url)
            .then((res) => res.json())
            .then((stocks) =>
                stocks.map((stock) => {
                    return {
                        name: stock.name,
                        symbol: stock.symbol,
                        industry: stock.industry
                    };
                })
            )
    );
}

const StockGrid = () => {
    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Symbol", field: "symbol", sortable: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true }
    ]
    
    const [search, setSearch] = useState('');
    const { stocks } = useStocks(search);
    
    
    return (
        <div className="container gridContainer">
            <div
                className="search-bar-container">
                <IndustrySearchBar onSubmit={setSearch} />
            </div>
            <div
                className="ag-theme-balham"
                style={{height: "500px", width: "620px"}}>
                
                <AgGridReact
                    id="stock-table"
                    columnDefs={columns}
                    rowData={stocks}
                    paginationPageSize={15}
                
                />
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="homePage">
            <div className="greeting">
                <h3>
                    Welcome to the American Stock Exchange Analyst Portal!
                </h3>
                <p>
                    Browse selected stock data from 2019-11-06 to 2020-03-24.
                    Search by Stock Symbol or Industry, sort by Industry, or select a Company to view.
                    <br/>
                    Create an account to view stock information between specific dates!
                </p>
            </div>
            
            <div className="homePageTable">
                <StockGrid />
            </div>
        </main>
    );
}

