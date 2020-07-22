import React from "react";
import "./Meteo.css";
import Search from "./Search";
import ComingDays from "./ComingDays";
import DetailedDay from "./DetailedDay";

class Meteo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputContent: "",
			error: false,
			errorMsg: "",
			isLoaded: true,
			meteo: null,
			selectedDay: "0",
		};
		this.handleInputContent = this.handleInputContent.bind(this);
		this.launchRequest = this.launchRequest.bind(this);
		this.selectDay = this.selectDay.bind(this);
	}

	launchRequest() {
		this.setState({
			isLoaded: false,
			error: false,
			meteo: null,
			errorMsg: "",
		});
		console.log("c'est parti launched !" + this.state.inputContent);
		const apiUrl =
			"https://www.prevision-meteo.ch/services/json/" +
			this.state.inputContent;
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
				console.log(error);
			});
	}

	selectDay(props) {
		this.setState({
			selectedDay: props,
		});
	}

	handleInputContent(event) {
		this.setState({ inputContent: event.target.value });
	}

	render() {
		const { error, isLoaded, meteo } = this.state;
		return (
			<div>
				<Search
					inputHandler={this.handleInputContent}
					clickHandler={this.launchRequest}
					inputContent={this.state.inputContent}
				/>
				<p>Test transfert du state : {this.state.inputContent}</p>
				{isLoaded && error === false && meteo !== null && (
					<div>
						<div>
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
						<div className="group-days">
							<ComingDays day={this.state.meteo.fcst_day_0} />
							<ComingDays day={this.state.meteo.fcst_day_1} />
							<ComingDays day={this.state.meteo.fcst_day_2} />
							<ComingDays day={this.state.meteo.fcst_day_3} />
							<ComingDays day={this.state.meteo.fcst_day_4} />
						</div>
						<div>
							<DetailedDay day={this.state.meteo.fcst_day_0} />
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Meteo;
