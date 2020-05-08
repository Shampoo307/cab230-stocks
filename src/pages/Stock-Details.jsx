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
			<StockContainer symbol={stockSymbol} />
		</div>
		

	)
}

function StockContainer({symbol}) {
	const stockColumns = [
		{ headerName: "Timestamp", field: "timestamp", sortable: false, width: 140 },
		{ headerName: "Open", field: "open", sortable: false, width: 100 },
		{ headerName: "High", field: "high", sortable: false, width: 100 },
		{ headerName: "Low", field: "low", sortable: false, width: 100 },
		{ headerName: "Close", field: "close", sortable: false, width: 100 },
		{ headerName: "Volumes", field: "volumes", sortable: false, width: 140 }
	]
	
	const fields = {
		name: "",
		symbol: "",
		industry: "",
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
					name: stock.name,
					symbol: stock.symbol,
					industry: stock.industry,
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
	
	
	
		// const { stock } = getStock(symbol);
		// console.log("stock that was got into {stock}: ", stock);
		// setStockInfo(stock);
		// console.log("stockInfo: ", stockInfo);
			// .then((stock) => {
			// 	console.log("stock got, .then: ", stock);
			// 	setStockInfo(stock);
			// 	console.log("stock set: ", stockInfo);
			// });
	
	// useEffect( () => {
	// 	console.log("started use effect");
	// 	getStock(symbol)
	// 		.then((stock) => {
	//
	// 			console.log("stock got, .then: ", stock);
	// 			setStockInfo(stock);
	// 			console.log("stock set: ", stockInfo);
	// 		})
	// 	}, [],
	// );
	
	return (
		<div>
			<div className="stock-details-header">
				<h2>{stockInfo.symbol} | {stockInfo.name}</h2>
				<h3>{stockInfo.industry}</h3>
			</div>
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
			<div className="user-buttons-stock">
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
			
			
			{/*<StockDetailsHeader stockInfo={stockInfo} />*/}
			{/*<StockDetailsTable stockInfo={stockInfo} />*/}
			
		</div>
	)
}
// function getStock(stockSymbol) {
// 	console.log("getting");
// 	const url = `http://131.181.190.87:3000/stocks/${stockSymbol}`;
// 	return (
// 		fetch(url)
// 			.then((res) => res.json())
// 			.then((stock) => {
// 				console.log("stock in from fetch", stock);
// 					return {
// 						name: stock.name,
// 						symbol: stock.symbol,
// 						industry: stock.industry,
// 						timestamp: stock.timestamp,
// 						open: stock.open,
// 						high: stock.high,
// 						low: stock.low,
// 						close: stock.close,
// 						volumes: stock.volumes
// 					}
// 				}
// 			)
// 	)
// }

// function StockDetailsHeader({stockInfo}) {
// 	console.log("stock Details for header: ", stockInfo);
// 	return (
// 		<div className="stock-details-header">
// 			<h2>{stockInfo.symbol} | {stockInfo.name}</h2>
// 			<h3>{stockInfo.industry}</h3>
// 		</div>
// 	)
// }
//
// function StockDetailsTable({stockInfo, columns}) {
// 	console.log("stock Info for table: ", stockInfo);
// 	const stockColumns = [
// 		{ headerName: "Timestamp", field: "timestamp" },
// 		{ headerName: "Open", field: "open", sortable: true },
// 		{ headerName: "High", field: "high", sortable: true },
// 		{ headerName: "Low", field: "low", sortable: true },
// 		{ headerName: "Close", field: "close", sortable: true },
// 		{ headerName: "Volumes", field: "volumes", sortable: true }
// 	]
//
// 	const stockRow = {
// 		timestamp: stockInfo.date,
// 		open: stockInfo.open,
// 		high: stockInfo.high,
// 		low: stockInfo.low,
// 		close: stockInfo.close,
// 		volumes: stockInfo.volumes
// 	}
// 	console.log("stock row: ", stockRow);
// 	console.log(stockInfo);
// 	return (
// 		<div >
// 			<AgGridReact
// 				id="stock-details-table"
// 				columnDefs={stockColumns}
// 				// rowData={stockRow}
// 				/>
// 		</div>
// 	)
// }