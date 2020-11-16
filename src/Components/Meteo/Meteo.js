import React from "react";
import "./Meteo.css";
import ComingDays from "./ComingDays";
import DetailedDay from "./DetailedDay";
import Spinner from "../Spinner/Spinner";

class Meteo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputContent: "",
			error: false,
			errorMsg: "",
			isLoaded: true,
			meteo: null,
			selectedDay: 0,
		};
		this.handleInputContent = this.handleInputContent.bind(this);
		this.launchRequest = this.launchRequest.bind(this);
		this.selectDay = this.selectDay.bind(this);
	}

	// Launch request to the prevision-meteo.ch API service and put JSON into state
	launchRequest(e) {
		e.preventDefault();
		this.setState({
			isLoaded: false,
			error: false,
			meteo: null,
			errorMsg: "",
		});
		// console.log("Launch ok ! " + this.state.inputContent);
		const apiUrl =
			"https://www.prevision-meteo.ch/services/json/" +
			this.state.inputContent;
		fetch(apiUrl)
			.then((result) => {
				if (result.ok) {
					// console.log("Result ok !");
					return result.json();
				}
				throw Error(result.statusText);
			})
			.then((data) => {
				// console.log(data);
				this.setState({
					meteo: data,
				});
				if (this.state.meteo.errors) {
					this.setState({
						error: true,
						errorMsg: this.state.meteo.errors[0].text,
					});
				} else {
					this.setState({
						error: false,
					});
				}
				this.setState({ isLoaded: true });
			})
			.catch((error) => {
				this.setState({ error: true });
				// console.log(error);
			});
	}

	// Handle selected day from ComingDays components (not implemented yet)
	selectDay(e) {
		// console.log(e);
		this.setState({
			selectedDay: e,
		});
	}

	// Handle value from search input and put it into state
	handleInputContent(event) {
		this.setState({ inputContent: event.target.value });
	}

	render() {
		const { error, errorMsg, isLoaded, meteo } = this.state;
		// Display error screen
		if (error) {
			return (
				<div className="Meteo">
					<label>Saisissez une ville : </label>
					<form onSubmit={this.launchRequest}>
						<input
							className="search-field"
							onChange={this.handleInputContent}
							value={this.state.inputContent}
						></input>
						<button className="button">Envoyer</button>
					</form>
					<p>Erreur : {errorMsg}</p>
				</div>
			);
		}
		// Display load screen
		else if (!isLoaded) {
			return (
				<div className="Meteo">
					<Spinner />
					<p>Chargement…</p>
				</div>
			);
		}
		// Display home screen
		else if (isLoaded && meteo === null) {
			return (
				<div className="Meteo">
					<label>Saisissez une ville : </label>{" "}
					<form onSubmit={this.launchRequest}>
						<input
							className="search-field"
							onChange={this.handleInputContent}
							value={this.state.inputContent}
						></input>
						<button className="button">Envoyer</button>
					</form>
				</div>
			);
		}
		// Display result screen
		else if (isLoaded && error !== true) {
			return (
				<div className="Meteo">
					<div className="Top-bar">
						<div className="Search-bar">
							<form onSubmit={this.launchRequest}>
								<label>Saisissez une ville : </label>
								<div>
									<input
										className="search-field"
										onChange={this.handleInputContent}
										value={this.state.inputContent}
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

							<p>
								{meteo.current_condition.humidity}% d'humidité
							</p>
							<p>
								{meteo.current_condition.wnd_spd} km/h de vent
							</p>
						</div>
					</div>
					<div className="group-days">
						<ComingDays
							day={this.state.meteo.fcst_day_0}
							onClick={this.selectDay.bind(this, 0)}
						/>

						<ComingDays
							day={this.state.meteo.fcst_day_1}
							onClick={this.selectDay.bind(this, 1)}
						/>

						<ComingDays
							day={this.state.meteo.fcst_day_2}
							onClick={this.selectDay.bind(this, 2)}
						/>
						<ComingDays
							day={this.state.meteo.fcst_day_3}
							onClick={this.selectDay.bind(this, 3)}
						/>
						<ComingDays
							day={this.state.meteo.fcst_day_4}
							onClick={this.selectDay.bind(this, 4)}
						/>
					</div>
					<div>
						{this.state.selectedDay === 0 && (
							<DetailedDay day={this.state.meteo.fcst_day_0} />
						)}
						{this.state.selectedDay === 1 && (
							<DetailedDay day={this.state.meteo.fcst_day_1} />
						)}
						{this.state.selectedDay === 2 && (
							<DetailedDay day={this.state.meteo.fcst_day_2} />
						)}
						{this.state.selectedDay === 3 && (
							<DetailedDay day={this.state.meteo.fcst_day_3} />
						)}
						{this.state.selectedDay === 4 && (
							<DetailedDay day={this.state.meteo.fcst_day_4} />
						)}
					</div>
				</div>
			);
		}
	}
}

export default Meteo;
