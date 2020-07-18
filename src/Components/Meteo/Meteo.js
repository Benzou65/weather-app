import React from "react";
import "./Meteo.css";

class Meteo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputContent: "",
			error: false,
			errorMsg: "",
			isLoaded: true,
			meteo: null,
		};
	}

	launchRequest() {
		this.setState({ isLoaded: false });
		fetch(
			"https://www.prevision-meteo.ch/services/json/" +
				this.state.inputContent
		)
			.then((result) => result.json())
			.then((data) => {
				this.setState({
					meteo: data,
				});
				console.log(this.state.meteo);
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
				console.log(error);
			});
	}

	handleInputContent = (event) => {
		this.setState({ inputContent: event.target.value });
	};

	render() {
		const { error, errorMsg, isLoaded, meteo } = this.state;
		if (error) {
			return (
				<div className="Meteo">
					<h1>METEO</h1>
					<label>Saisissez une ville : </label>{" "}
					<form
						onSubmit={() => {
							this.launchRequest();
						}}
					>
						<input
							onChange={this.handleInputContent}
							value={this.state.inputContent}
						></input>
						<button type="submit" className="button">
							Envoyer
						</button>
					</form>
					<p>Erreur : {errorMsg}</p>
				</div>
			);
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else if (isLoaded && meteo === null) {
			return (
				<div className="Meteo">
					<h1>METEO</h1>
					<label>Saisissez une ville : </label>{" "}
					<form
						onSubmit={() => {
							this.launchRequest();
						}}
					>
						<input
							onChange={this.handleInputContent}
							value={this.state.inputContent}
						></input>
						<button type="submit" className="button">
							Envoyer
						</button>
					</form>
				</div>
			);
		} else if (isLoaded && error !== true) {
			return (
				<div className="Meteo">
					<h1>METEO</h1>
					<label>Saisissez une ville : </label>{" "}
					<form
						onSubmit={() => {
							this.launchRequest();
						}}
					>
						<input
							onChange={this.handleInputContent}
							value={this.state.inputContent}
						></input>
						<button type="submit" className="button">
							Envoyer
						</button>
					</form>
					<div>
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
			);
		}
	}
}

export default Meteo;
