import React from "react";

function DetailedHour(props) {
	const { hourData, hour } = props;
	return (
		<div>
			<p>{hour}</p>
			<img
				src={hourData.ICON}
				alt={hourData.CONDITION}
				title={hourData.CONDITION}
			/>
			<p>{hourData.TMP2m}°C</p>
		</div>
	);
}

export default DetailedHour;
