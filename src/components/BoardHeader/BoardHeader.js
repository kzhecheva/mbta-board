import React, { Component } from "react";
import formatTimeHHMM from "../formatTimeHHMM";
import "./BoardHeader.css";

class BoardHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { time: new Date() };
	}

	componentDidMount = () => {
		this.timeCheck = setInterval(() => this._checkTime(), 1000);
	};

	componentWillUnmount = () => {
		clearInterval(this.timeCheck);
	};

	_checkTime = () => {
		this.setState({ time: new Date() });
	};

	render() {
		const dayOfWeek = this.state.time.toLocaleString("en-us", { weekday: "long" }).toUpperCase();
		const date = this.state.time.toLocaleDateString();
		const clockTime = formatTimeHHMM(this.state.time);

		return (
			<div className="container-header">
				<div>
					<div>{dayOfWeek}</div>
					<div>{date}</div>
				</div>
				<div className="title-header">SOUTH STATION TRAIN INFORMATION</div>
				<div>
					<div>CURRENT TIME</div>
					<div>{clockTime}</div>
				</div>
			</div>
		);
	}
}

export default BoardHeader;
