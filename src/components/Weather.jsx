import axios from "axios";
import React, { useState, useEffect } from "react";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        if (!city) return;

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f00c38e0279b7bc85480c3fe775d518c`
            );
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [city]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter city name" value={city} onChange={handleInputChange} />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData ? (
                <div className="border">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Feels like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div >
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
