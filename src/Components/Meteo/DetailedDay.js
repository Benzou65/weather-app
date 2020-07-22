import React from "react";
import DetailedHour from "./DetailedHour";
import "./DetailedDay.css";

function DetailedDay(props) {
	const { day } = props;
	return (
		<div>
			<h3 className="Day">{day.day_long}</h3>
			<div className="DetailedDay">
				<DetailedHour hour="0H" hourData={day.hourly_data["0H00"]} />
				<DetailedHour hour="1H" hourData={day.hourly_data["1H00"]} />
				<DetailedHour hour="2H" hourData={day.hourly_data["2H00"]} />
				<DetailedHour hour="3H" hourData={day.hourly_data["3H00"]} />
				<DetailedHour hour="4H" hourData={day.hourly_data["4H00"]} />
				<DetailedHour hour="5H" hourData={day.hourly_data["5H00"]} />
				<DetailedHour hour="6H" hourData={day.hourly_data["6H00"]} />
				<DetailedHour hour="7H" hourData={day.hourly_data["7H00"]} />
				<DetailedHour hour="8H" hourData={day.hourly_data["8H00"]} />
				<DetailedHour hour="9H" hourData={day.hourly_data["9H00"]} />
				<DetailedHour hour="10H" hourData={day.hourly_data["10H00"]} />
				<DetailedHour hour="11H" hourData={day.hourly_data["11H00"]} />
				<DetailedHour hour="12H" hourData={day.hourly_data["12H00"]} />
				<DetailedHour hour="13H" hourData={day.hourly_data["13H00"]} />
				<DetailedHour hour="14H" hourData={day.hourly_data["14H00"]} />
				<DetailedHour hour="15H" hourData={day.hourly_data["15H00"]} />
				<DetailedHour hour="16H" hourData={day.hourly_data["16H00"]} />
				<DetailedHour hour="17H" hourData={day.hourly_data["17H00"]} />
				<DetailedHour hour="18H" hourData={day.hourly_data["18H00"]} />
				<DetailedHour hour="19H" hourData={day.hourly_data["19H00"]} />
				<DetailedHour hour="20H" hourData={day.hourly_data["20H00"]} />
				<DetailedHour hour="21H" hourData={day.hourly_data["21H00"]} />
				<DetailedHour hour="22H" hourData={day.hourly_data["22H00"]} />
				<DetailedHour hour="23H" hourData={day.hourly_data["23H00"]} />
			</div>
		</div>
	);
}

export default DetailedDay;
