import React, {useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import { Input, Label } from 'reactstrap';
import {Link} from "react-router-dom";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend} from "recharts";

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
	
	useEffect( () => {
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
	})
		
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
	const url = `http://131.181.190.87:3000/stocks/${symbol}`;
	
	useEffect( () => {
		fetch(url)
			.then((res) => res.json())
			.then((stock) => {
				return {
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
			timestamp: stockInfo.timestamp.slice(0, 10),
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
				style={{"paddingBottom": "200px"}}>
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

function useStock(date, symbol) {
	const [stock, setStock] = useState([]);
	
	useMemo( () => {
		getStock(date, symbol)
			.then((stock) => {
				setStock(stock);
			})
		
	}, [date]);
	
	return { stock }
}

function getStock(date, symbol) {
	const fromDateDate = `?from=${date.fromDate}T00%3A00%3A00.000Z`;
	const toDateDate = `&to=${date.toDate}T00%3A00%3A00.000Z`;
	const url = `http://131.181.190.87:3000/stocks/authed/${symbol}${fromDateDate}${toDateDate}`;
	const token = localStorage.getItem("token");
	const headers = {
		accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	}
	return (
		fetch(url, { headers })
			.then((res) => res.json())
			.then((stock) =>
				stock.map((stock) => {
					return {
						timestamp: stock.timestamp.slice(0, 10),
						open: stock.open,
						high: stock.high,
						low: stock.low,
						close: stock.close,
						volumes: stock.volumes
					};
				}))
	)
}

function StockContainerAuthed({symbol}) {
	const stockColumns = [
		{ headerName: "Timestamp", field: "timestamp", sortable: true, width: 140 },
		{ headerName: "Open", field: "open", sortable: true, width: 100 },
		{ headerName: "High", field: "high", sortable: true, width: 100 },
		{ headerName: "Low", field: "low", sortable: true, width: 100 },
		{ headerName: "Close", field: "close", sortable: true, width: 100 },
		{ headerName: "Volumes", field: "volumes", sortable: true, width: 140 }
	]
	const [date, setDate] = useState({fromDate: '2019-11-06', toDate: '2020-03-24'})
	const { stock } = useStock(date, symbol);
	
	return (
		<div>
			<div className="auth-stock-table">
				<div className="date-pickers">
					<Label
						id="fromDateLabel"
						for="fromDate"
						className="fromDateClass"
						>From: </Label>
					<Input
						type="date"
						id="fromDate"
						name="fromDate"
						className="fromDateClass"
						min="2019-11-06"
						max="2020-03-24"
						value={date.fromDate}
						onChange={(event) => {
							setDate({fromDate: event.target.value, toDate: date.toDate});
						}}
					/>
					<Label
						id="toDateLabel"
						for="toDate"
						className="toDateClass"
					>To: </Label>
					<Input
						type="date"
						id="toDate"
						name="toDate"
						className="toDateClass"
						min="2019-11-06"
						max="2020-03-24"
						value={date.toDate}
						onChange={(event) => {
							setDate({fromDate: date.fromDate, toDate: event.target.value});
						}}
					/>
				</div>
				<div
					className="ag-theme-balham"
					style={{height: "500px", width: "750px"}}>
					<AgGridReact
						id="auth-stock-table"
						columnDefs={stockColumns}
						rowData={stock}
						/>
				</div>
				<div className="chart">
					<LineChart width={750} height={500} data={stock}>
						<Line type="monotone" dataKey="open" stroke="#C608FF" strokeWidth={1.5} dot={null} name="Open" />
						<Line type="monotone" dataKey="high" stroke="#7AFF6F" strokeWidth={1.5} dot={null} name="High" />
						<Line type="monotone" dataKey="low" stroke="#FF5F5A" strokeWidth={1.5} dot={null} name="Low" />
						<Line type="monotone" dataKey="close" stroke="#36CFFF" strokeWidth={1.5} dot={null} name="Close" />
						
						<XAxis dataKey="timestamp" domain={['auto', 'auto']} />
						<YAxis domain={['dataMin', 'dataMax']}/>
						
						<Legend />
					</LineChart>
				</div>
			</div>
		</div>
	)
}