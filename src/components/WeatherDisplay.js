import React from "react";

function WeatherDisplay({ weather }) {
    if (!weather) {
        return <p>Please select a city to display weather information.</p>;
    }

    const { name, weather: weatherData, main: { temp, humidity } } = weather;

    return (
        <>
            <div data-cy="weather-display">
            <h2>{name}</h2>
            <p>{weatherData[0].description}</p>
            <p>
                Temperature: {Math.round(temp - 273.15)}°C /{" "}
                {Math.round((temp - 273.15) * 1.8 + 32)}°F
            </p>
            <p>Humidity: {humidity}%</p>
            </div>
        </>
    );
}

export default WeatherDisplay;
