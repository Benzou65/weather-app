import React from "react";
import "./Search.css";

class Search extends React.Component {
	render() {
		return (
			<div>
				<label>Saisissez une ville : </label>
				<form onSubmit={this.props.clickHandler}>
					<input
						className="search-field"
						onChange={this.props.inputHandler}
						value={this.props.inputContent}
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
