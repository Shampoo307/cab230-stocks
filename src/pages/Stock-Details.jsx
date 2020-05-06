import React from "react";

export default function StockDetails(props) {
	
	if (props.location.stockProps == undefined) {
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
	// console.log(props.location.stockProps.symbol);
	console.log(props);
	
	return <h2>{props.location.stockProps.symbol}</h2>;
}