import React, { useState } from "react";
import "./Meteo.css";
import ComingDays from "./ComingDays";
import DetailedDay from "./DetailedDay";

const Meteo = () => {
	const [inputContent, setInputContent] = useState("");
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [isLoaded, setIsLoaded] = useState(true);
	const [meteo, setMeteo] = useState(null);
	const [selectedDay, setSelectedDay] = useState("0");

	const selectDay = (props) => {
		setSelectedDay(props);
	};

	const launchRequest = () => {
		setIsLoaded(false);
		setError(false);
		setMeteo(null);
		setErrorMsg("");

		console.log("c'est parti launched !" + inputContent);
		const apiUrl =
			"https://www.prevision-meteo.ch/services/json/" + inputContent;
		fetch(apiUrl)
			.then((result) => {
				if (result.ok) {
					console.log("Result oK !");
					return result.json();
				}
				throw Error(result.statusText);
			})
			.then((data) => {
				console.log(data);
				setMeteo(data);
				if (meteo.errors) {
					setError(true);
					setErrorMsg(meteo.errors[0].text);
				} else {
					setError(false);
				}
				setIsLoaded(true);
			})
			.catch((error) => {
				setError(true);
				console.log(error);
			});
	};

	const handleInputContent = (event) => {
		setInputContent(event.target.value);
	};

	if (error) {
		return (
			<div className="Meteo">
				<label>Saisissez une ville : </label>
				<form onSubmit={launchRequest}>
					<input
						className="search-field"
						onChange={handleInputContent}
						value={inputContent}
					></input>
					<button className="button">Envoyer</button>
				</form>
				<p>Erreur : {errorMsg}</p>
			</div>
		);
	}
	if (!isLoaded) {
		return (
			<div className="Meteo">
				<p>Chargement…</p>
			</div>
		);
	} else if (isLoaded && meteo === null) {
		return (
			<div className="Meteo">
				<label>Saisissez une ville : </label>{" "}
				<form onSubmit={launchRequest}>
					<input
						className="search-field"
						onChange={handleInputContent}
						value={inputContent}
					></input>
					<button className="button">Envoyer</button>
				</form>
			</div>
		);
	} else if (isLoaded && error !== true) {
		return (
			<div className="Meteo">
				<div className="Top-bar">
					<div className="Search-bar">
						<form onSubmit={launchRequest}>
							<label>Saisissez une ville : </label>
							<div>
								<input
									className="search-field"
									onChange={handleInputContent}
									value={inputContent}
								></input>
								<button className="button">Envoyer</button>
							</div>
						</form>
					</div>
					<div className="Current-condition">
						<h2>{meteo.city_info.name}</h2>
						<img
							src={meteo.current_condition.icon_big}
							alt={meteo.current_condition.condition}
							title={meteo.current_condition.condition}
						/>

						<p>{meteo.current_condition.tmp}°C</p>

						<p>{meteo.current_condition.humidity}% d'humidité</p>
						<p>{meteo.current_condition.wnd_spd} km/h de vent</p>
					</div>
				</div>
				<div className="group-days">
					<ComingDays day={meteo.fcst_day_0} d="0" cli={selectDay} />
					<ComingDays day={meteo.fcst_day_1} d="1" cli={selectDay} />
					<ComingDays day={meteo.fcst_day_2} d="2" cli={selectDay} />
					<ComingDays day={meteo.fcst_day_3} d="3" cli={selectDay} />
					<ComingDays day={meteo.fcst_day_4} d="4" cli={selectDay} />
				</div>
				<div>
					{selectedDay === "0" && (
						<DetailedDay day={meteo.fcst_day_0} />
					)}
					{selectedDay === "1" && (
						<DetailedDay day={meteo.fcst_day_1} />
					)}
					{selectedDay === "2" && (
						<DetailedDay day={meteo.fcst_day_2} />
					)}
					{selectedDay === "3" && (
						<DetailedDay day={meteo.fcst_day_3} />
					)}
					{selectedDay === "4" && (
						<DetailedDay day={meteo.fcst_day_4} />
					)}
				</div>
			</div>
		);
	}
};
export default Meteo;
