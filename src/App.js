import React from "react";
import "./App.css";
import Meteo from "./Components/Meteo/Meteo";
import Footer from "./Components/Footer";
import Header from "./Components/Meteo/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<Meteo />
			<Footer />
		</div>
	);
}

export default App;
