import React, {useEffect, useState} from "react";

export default function StockDetails(props) {
	
	if (props.location.stockProps === undefined) {
		return (
			<div className="symbol-undefined">
				<h2>Stock Symbol is undefined, please return to home and select
				a stock first to view it's information.
				</h2>
			</div>
		);
	} else if (props.location.stockProps.symbol === '') {
		return (
			<div className="symbol-undefined">
				<h2>Stock Symbol is undefined, please return to home and select
					a stock first to view it's information.
				</h2>
			</div>
		)
	}
	
	
	let stockSymbol = props.location.stockProps.symbol;
	
	return (
		<div className="stock-details">
			<StockDetailsHeader symbol={stockSymbol} />
			<div className="stock-details-info">
			<StockDetailsTable symbol={stockSymbol} />
			</div>
			<div className="stock-details-chart">
			
			</div>
		</div>
		

	)
}

function StockDetailsHeader(symbol) {
	const url = `http://131.181.190.87:3000/stocks/${symbol.symbol}`;
	
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
				}
			)
			.then((stock) => {
				setStockInfo(stock);
			})
	})
	
	return (
		<div className="stock-details-header">
			<h2>{stockInfo.symbol} | {stockInfo.name}</h2>
			<h3>{stockInfo.industry}</h3>
		</div>
	)
}

function StockDetailsTable(symbol) {

}