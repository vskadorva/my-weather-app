import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleCitySelection = async (value) => {
    const [lat, lon] = value.split(",");
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setWeather(data);
    setSelectedCity(data.name);
  };

  return (
      <div className="app" data-cy="my-weather-app">
        <Header />
        <main className="main">
          <CitySelector onSelect={handleCitySelection} />
          <WeatherDisplay weather={weather} />
        </main>
        <Footer />
      </div>
  );
}

export default App;
