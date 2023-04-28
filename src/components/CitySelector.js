import React, { useState, useEffect } from 'react';

function CitySelector({ onSelect }) {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(`${process.env.API_URL}/search?q=${searchText}`);
            const data = await response.json();
            setSearchResults(data);
        };

        if (searchText) {
            const timeoutId = setTimeout(fetchCities, 500);
            return () => clearTimeout(timeoutId);
        } else {
            setSearchResults([]);
        }
    }, [searchText]);

    return (
        <div className="city-selector" data-cy="city-selector">
            <label htmlFor="city-input">Select a city:</label>
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