import React, { useState, useEffect } from "react";

function CitySelector({ onSelect }) {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        let timeoutId;

        if (searchText) {
            timeoutId = setTimeout(async () => {
                const response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
                );
                const data = await response.json();
                setSearchResults(data);
            }, 500);
        } else {
            setSearchResults([]);
        }

        return () => clearTimeout(timeoutId);
    }, [searchText]);

    return (
        <div className="city-selector" data-cy="city-selector">
            <label htmlFor="city-select">Select a city:</label>
            <input
                type="text"
                id="city-input"
                name="city"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            />
            <select
                id="city-select"
                name="city"
                value=""
                onChange={(event) => onSelect(event.target.value)}
            >
                <option value="" disabled>
                    Select a city
                </option>
                {searchResults.map(({ name, state, country, lat, lon }, index) => (
                    <option key={`${name}-${state}-${country}-${index}`} value={`${lat},${lon}`}>
                        {name}, {state}, {country}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CitySelector;
