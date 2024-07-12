import axios from "axios";
import React, { useState, useEffect } from "react";
import '../App.css';
// import '../src/App.css';

const Weather = ({ onData }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    // console.log('weatherData', weatherData);

    const fetchData = async () => {
        if (!city) return;

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f00c38e0279b7bc85480c3fe775d518c`
            );
            setWeatherData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [city]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
        onData(e.target.value);
    };

    const timezoneOffsetInSeconds = weatherData.timezone;
    const timezoneOffsetInMilliseconds = timezoneOffsetInSeconds * 1000;
    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() + timezoneOffsetInMilliseconds);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = localDate.toLocaleDateString('en-US', options);
    // console.log(formattedDate);

    return (
        <div className="mt-2 p-4">
            <form>
                <input type="text" className="block w-full rounded-lg border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" placeholder="Enter city name" value={city} onChange={handleInputChange} />
            </form>
            {weatherData ? (
                <div className="mt-2 grid-container rounded-md border-solid">
                    <h2 className="bg-teal-300 font-bold rounded-md grid-item text-amber-600">{weatherData.name},{weatherData.sys.country},<br/>{formattedDate}</h2>
                    <p className="rounded-md grid-item text-gray-900"><strong>Temperature </strong><br /> {weatherData.main.temp}°C</p>
                    <p className="rounded-md grid-item text-gray-900"><strong>Description </strong><br /> {weatherData.weather[0].description}</p>
                    <p className="rounded-md grid-item text-gray-900"><strong>Feels like</strong><br />  {weatherData.main.feels_like}°C</p>
                    <p className="rounded-md grid-item text-gray-900"><strong>Humidity </strong><br /> {weatherData.main.humidity}%</p>
                    <p className="rounded-md grid-item text-gray-900"><strong>Pressure </strong><br /> {weatherData.main.pressure} hPa</p>
                    <p className="rounded-md grid-item text-gray-900"><strong>Wind Speed</strong><br />  {weatherData.wind.speed} m/s</p>
                </div >
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
