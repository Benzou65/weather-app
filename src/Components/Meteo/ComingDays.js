import React from "react";
import "./ComingDays.css";

function ComingDays(props) {
	const { day, onClick } = props;

	return (
		<button className="ComingDays" type="button" onClick={onClick}>
			<p>
				{day.day_long} - {day.date}
			</p>
			<span>Min. {day.tmin}°C</span>
			<img src={day.icon} alt={day.condition} title={day.condition} />
			<span>Max. {day.tmax}°C</span>
		</button>
	);
}

export default ComingDays;
