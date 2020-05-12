import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {Link} from "react-router-dom";

export default function StockDetails(props) {
	
	if (props.location.stockProps === undefined) {
		return (
			<div className="symbol-undefined">
				<h2>Stock Symbol is undefined, please return to home and select
				a stock first to view it's information.
				</h2>
				<Link to="/">
					<button className="to-home-from-undefined">
						Home
					</button>
				</Link>
			</div>
		);
	} else if (props.location.stockProps.symbol === '') {
		return (
			<div className="symbol-undefined">
				<h2>Stock Symbol is undefined, please return to home and select
					a stock first to view it's information.
				</h2>
				<Link to="/">
					<button className="to-home-from-undefined">
						Home
					</button>
				</Link>
			</div>
		)
	}
	
	let stockSymbol = props.location.stockProps.symbol;
	console.log("stock symbol", stockSymbol);
	return (
		<div className="stock-details-container">
			
			<StockDetailsHeader symbol={stockSymbol}/>
			{
				props.location.stockProps.loggedIn
					? <StockContainerAuthed symbol={stockSymbol} />
					: <StockContainerUnAuthed symbol={stockSymbol} />
			}
		</div>
	)
}

function StockDetailsHeader(props) {
	const [stockInfo, setStockInfo] = useState({});
	const url = `http://131.181.190.87:3000/stocks/${props.symbol}`;
	
	fetch(url)
		.then((res) => res.json())
		.then((stock) => {
				return {
					name: stock.name,
					symbol: stock.symbol,
					industry: stock.industry
				};
			}
		)
		.then((stock) => {
			setStockInfo(stock);
		});
		
	return (
		<div className="stock-details-header">
			<h2>{stockInfo.symbol} | {stockInfo.name}</h2>
			<h3>{stockInfo.industry}</h3>
		</div>
	);
}

function StockContainerUnAuthed({symbol}) {
	const stockColumns = [
		{ headerName: "Timestamp", field: "timestamp", sortable: false, width: 140 },
		{ headerName: "Open", field: "open", sortable: false, width: 100 },
		{ headerName: "High", field: "high", sortable: false, width: 100 },
		{ headerName: "Low", field: "low", sortable: false, width: 100 },
		{ headerName: "Close", field: "close", sortable: false, width: 100 },
		{ headerName: "Volumes", field: "volumes", sortable: false, width: 140 }
	]
	
	const fields = {
		timestamp: "",
		open: "",
		high: "",
		low: "",
		close: "",
		volumes: ""
	}
	
	const [stockInfo, setStockInfo] = useState(fields);
	console.log("set stockInfo", stockInfo);
	const url = `http://131.181.190.87:3000/stocks/${symbol}`;
	
		console.log("just before getStock");
	
	useEffect( () => {
		fetch(url)
			.then((res) => res.json())
			.then((stock) => {
				return {
					// name: stock.name,
					// symbol: stock.symbol,
					// industry: stock.industry,
					timestamp: stock.timestamp,
					open: stock.open,
					high: stock.high,
					low: stock.low,
					close: stock.close,
					volumes: stock.volumes
				};
			})
			.then((stock) => {
				setStockInfo(stock);
			})
		
	}, [symbol]);
	const stockRows = [
		{
			timestamp: stockInfo.timestamp.slice(0, 9),
			open: stockInfo.open,
			high: stockInfo.high,
			low: stockInfo.low,
			close: stockInfo.close,
			volumes: stockInfo.volumes
		}
	]
	
	return (
		<div>
			<div className="stock-details-table">
				<div className="ag-theme-balham"
					 style={{height: "65px", width: "682px"}}
				>
					<AgGridReact
						id="stock-details-table"
						columnDefs={stockColumns}
						rowData={stockRows}
						rowClass="stock-detail-row-class"
					/>
				</div>
			</div>
			<div className="user-buttons-stock"
				style={{"padding-bottom": "200px"}}>
				<p>
				Log in or Register to view both tabled and charted stock information
					between a date range!
				</p>
				<Link to="/login">
					<button id="login-from-stock">
						Login
					</button>
				</Link>
				<Link to="/register">
					<button id="register-from-stock">
					Register
					</button>
				</Link>
			</div>
		</div>
	)
}

function StockContainerAuthed({symbol}) {
	const stockColumns = [
		{ headerName: "Timestamp", field: "timestamp", sortable: false, width: 140 },
		{ headerName: "Open", field: "open", sortable: false, width: 100 },
		{ headerName: "High", field: "high", sortable: false, width: 100 },
		{ headerName: "Low", field: "low", sortable: false, width: 100 },
		{ headerName: "Close", field: "close", sortable: false, width: 100 },
		{ headerName: "Volumes", field: "volumes", sortable: false, width: 140 }
	]
	
	const [stockInfo, setStockInfo] = useState([]);
	console.log("set stockInfo", stockInfo);
	const specifierAll = `?=from=2019-11-06T00%3A00%3A00.000Z&to=2020-03-24T00%3A00%3A00.000Z`
	const url = `http://131.181.190.87:3000/stocks/authed/${symbol}${specifierAll}`;
	const token = localStorage.getItem("token");
	const headers = {
		accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	}
	
	useEffect( () => {
		fetch(url, { headers })
			.then((res) => res.json())
			.then((stock) =>
				stock.map((stock) => {
					return {
						timestamp: stock.timestamp,
						open: stock.open,
						high: stock.high,
						low: stock.low,
						close: stock.close,
						volumes: stock.volumes
					};
			}))
			.then((stock) => {
				setStockInfo(stock);
			}
			)
		
	}, [symbol]);
	
	return (
		<div>
			<div className="auth-stock-table">
				<div
					className="ag-theme-balham"
					style={{height: "500px", width: "682px"}}>
					<AgGridReact
						id="auth-stock-table"
						columnDefs={stockColumns}
						rowData={stockInfo}
						/>
				</div>
			</div>
		</div>
	)
}