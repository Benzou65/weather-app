import React from "react";
import spinner from "./spinner.svg";
import "./Spinner.css";

class Spinner extends React.Component {
	render() {
		return (
			<div>
				<img src={spinner} alt="" className="Spinner-logo" />
			</div>
		);
	}
}

export default Spinner;
