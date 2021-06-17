import React, { Component } from "react";
import BoardModel from "./../BoardModel";
import TableRow from "./../TableRow/TableRow.js";
import BoardHeader from "./../BoardHeader/BoardHeader.js";
import "./StationBoard.css";

class StationBoard extends Component {
	constructor(props) {
		super(props);

		const routeType = 2;
		const stationID = "place-sstat";
		const pageLimit = 20;

		this.model = new BoardModel(routeType, stationID, pageLimit);
		this.state = { departures: [] };
	}

	componentDidMount = () => {
		this.model.listenForDepartureUpdates(this.onResetDepartures);
	};

	componentWillUnmount = () => {
		this.model.stopListeningForDepartureUpdates();
	};

	onResetDepartures = (departures) => {
		this.setState({ departures: departures });
	};

	render() {
		const departuresHeader = (
			<thead>
				<tr className="departuresHeader-board">
					<th>CARRIER</th>
					<th>TIME</th>
					<th>DESTINATION</th>
					<th>TRAIN#</th>
					<th>TRACK#</th>
					<th>STATUS</th>
				</tr>
			</thead>
		);

		const departureRows = this.state.departures.map((departure, i) => <TableRow key={i} departure={departure} />);

		return (
			<div className="container-board">
				<BoardHeader />
				<table className="table-board">
					{departuresHeader}
					<tbody>{departureRows}</tbody>
				</table>
			</div>
		);
	}
}

export default StationBoard;
