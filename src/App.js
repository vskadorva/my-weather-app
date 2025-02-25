import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";
import Modal from './components/Modal';
import "./App.css";

function App() {
    const [weather, setWeather] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCitySelection = async (value) => {
        const [lat, lon] = value.split(",");
        const response = await fetch(`${process.env.API_URL}/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();
        setWeather(data);
    };

    return (
        <div className="app" data-cy="my-weather-app">
            <Header />
            <main className="main">
                <CitySelector onSelect={handleCitySelection} />
                <WeatherDisplay weather={weather} />
            </main>
            <Footer />
            <button 
                style={{ background: '#777', color: '#999' }} 
                onClick={() => setIsModalOpen(true)}>
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-title">Welcome to Weather App!</div>
                <h3>About</h3>
                <img src="/weather-icon.png" />
                <p>This is a simple weather application that shows you weather information for different cities.</p>
            </Modal>
        </div>
    );
}

export default App;
