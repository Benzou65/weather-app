import React from "react";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputContent: "",
			error: false,
			errorMsg: "",
			isLoaded: true,
			meteo: null,
		};
		this.handleInputContent = this.handleInputContent.bind(this);
	}

	handleInputContent = (event) => {
		this.setState({ inputContent: event.target.value });
	};

	launchRequest() {
		this.setState({
			isLoaded: false,
			error: false,
			meteo: null,
			errorMsg: "",
		});
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

	render() {
		return (
			<div>
				<label>Saisissez une ville : </label>{" "}
				<form
					onSubmit={() => {
						this.launchRequest();
					}}
				>
					<input
						className="search-field"
						onChange={this.handleInputContent}
						value={this.state.inputContent}
					></input>
					<button type="submit" className="button">
						Envoyer
					</button>
				</form>
			</div>
		);
	}
}

export default Search;
