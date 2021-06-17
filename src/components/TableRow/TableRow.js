import formatTimeHHMM from "../formatTimeHHMM";
import "./TableRow.css";

function TableRow(props) {
	const departure = props.departure;
	const departureTime = formatTimeHHMM(departure.departureTime);

	return (
		<tr className="table-row">
			<th>MBTA</th>
			<th>{departureTime}</th>
			<th>{departure.destination.toUpperCase()}</th>
			<th>{departure.trainNumber.toUpperCase()}</th>
			<th>{departure.trackNumber.toUpperCase()}</th>
			<th>{departure.status.toUpperCase()}</th>
		</tr>
	);
}

export default TableRow;
