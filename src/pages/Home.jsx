import  React from 'react';
import {AgGridReact} from "ag-grid-react";


const mockData = {
    columns: [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Symbol", field: "symbol", sortable: true },
        { headerName: "Industry", field: "industry", sortable: true }
    ],
    rowData: [
        { name: "Arconic Inc", symbol: "ARNC", industry: "Industrials" },
        { name: "Apple Inc", symbol: "AAPL", industry: "Information Technology" },
        { name: "Berkshire Hathaway", symbol: "BRK.B", industry: "Financials" },
        { name: "Boeing Company", symbol: "BA", industry: "Industrials" },
        { name: "CA Inc", symbol: "CA", industry: "Information Technology" },
        { name: "Dominion Energy", symbol: "D", industry: "Utilities" },
        { name: "Exelon Corp.", symbol: "EXC", industry: "Utilities" },
        { name: "Expedia Inc", symbol: "EXPE", industry: "Consumer Discretionary" },
        { name: "Goldman Sachs Group", symbol: "GS", industry: "Financials" },
        { name: "Kroger Co.", symbol: "KR", industry: "Consumer Staples" },
        { name: "Nucor Corp.", symbol: "NUE", industry: "Materials" },
        { name: "Pfizer Inc.", symbol: "PFE", industry: "Health Care" },
        { name: "PPG Industries", symbol: "PPG", industry: "Materials" },
        { name: "Salesforece.com", symbol: "CRM", industry: "Information Technology" },
        { name: "Stryker Corp.", symbol: "SYK", industry: "Health Care" }
    ]
}

const MockDataGrid = () => {
    return (
        <div className="container gridContainer">
            <h1>Companies &  Their Industries</h1>
            <div
                className="ag-theme-balham"
                style={{height: "500px", width: "620px"}}>
                
                <AgGridReact
                    columnDefs={mockData.columns}
                    rowData={mockData.rowData}
                    pagination={true}
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
                    Simple categorisation via Industry, Company Name, or Symbol,
                    and create an account to view stock information between specific dates!
                </p>
            </div>
            
            <div className="homePageTable">
                <MockDataGrid />
            </div>
        </main>
    );
}

