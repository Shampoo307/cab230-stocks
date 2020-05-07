import  React, { useState, useEffect } from 'react';
import {AgGridReact} from "ag-grid-react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link} from "react-router-dom";



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
    return (
        <Form className="industryInput">
            <input
                // aria-labelledby="search-button"
                name="industry"
                id="industrySearch"
                placeholder="Industry or Symbol"
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
            <Link to={{pathname: "/stock-details",
                        stockProps: {
                            symbol: props.stockSymbol
                        }
            }}>
                <button
                    id="view-stock-button"
                >View Stock</button>
            </Link>
            
            <Input
                type="select"
                name="select"
                id="industry-select"
                onChange={ (event) => {
                    
                    props.onSubmit(event.target.value);
                }}
            >
                <option value="">All</option>
                <option value="health care">Healthcare</option>
                <option value="industrials">Industrials</option>
                <option value="consumer discretionary">Consumer Discretionary</option>
                <option value="consumer staples">Consumer Staples</option>
                <option value="information technology">Information Technology</option>
                <option value="utilities">Utilities</option>
                <option value="financials">Financials</option>
                <option value="real estate">Real Estate</option>
                <option value="materials">Materials</option>
                <option value="energy">Energy</option>
                <option value="telecommunication services">Telecommunication Services</option>
            </Input>
        </Form>
    );
    
}

function useStocks(searchTerm) {
    const [stocks, setStockList] = useState([]);

    useEffect( () => {
            getStocks(searchTerm)
                .then((stocks) => {
                    setStockList(stocks);
                });
        }, [searchTerm],
    );

    return { stocks };
}


function getStocks(searchTerm) {
    
    const url = `http://131.181.190.87:3000/stocks/symbols`;
    const specifier = `?industry=${searchTerm}`;
    
    // Stocks by industry
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
    // Stock by symbol
    else if (searchTerm.toString().length >= 1
                && searchTerm.toString().length <= 5) {
        const newURL = `http://131.181.190.87:3000/stocks/${searchTerm.toString().toUpperCase()}`;
        // let stockArray = new Array(1);
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
    // All stocks
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
    
    const stocksColumns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Symbol", field: "symbol", sortable: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true }
    ]
    
    const [selectedStock, setSelectedStock] = useState('');
    const [search, setSearch] = useState('');
    const { stocks } = useStocks(search);
    
    return (
        <div className="container gridContainer">
            <div
                className="search-bar-container">
                <IndustrySearchBar onSubmit={setSearch} stockSymbol={selectedStock} />
            </div>
            <div
                className="ag-theme-balham"
                style={{height: "500px", width: "620px"}}>
                
                <AgGridReact
                    id="stock-table"
                    columnDefs={stocksColumns}
                    rowData={stocks}
                    paginationPageSize={15}
                    rowSelection="single"
                    onRowClicked={ (event) => {
                       setSelectedStock(event.data.symbol);
                    }}
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

