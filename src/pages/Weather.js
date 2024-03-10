import React, { useState, useEffect } from 'react';
import cities from '../cities.json';
import WeatherCard from '../components/WeatherCard';
import checkWeatherCache from '../functions/checkWeatherCache'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import "../styles.css";

const Weather = () => {
    const [cityData, setCityData] = useState([]);
    const [weatherReport, setWeatherReport] = useState([]);
    const cacheExpireTime = 5; //in minutes

    useEffect(() => {      
        setCityData(cities.List);

    }, []);

    useEffect(() => {
        const cityCodes = cityData.map(data => data.CityCode).join(',');
        if (cityCodes.length > 0) {
            checkWeatherCache(cityCodes, cacheExpireTime, setWeatherReport);
        }
    }, [cityData]);

  
    return (
        <div className='weather-container'>
            <h1><FontAwesomeIcon icon={faCloudSun} /> Weather App</h1>
            <div className='weather'>
                {weatherReport.map((cityWeather, index) => (
                    <WeatherCard
                        key={cityWeather.id}
                        cityWeather={cityWeather}
                        index={index}
                        cityCodes={cityData.map(data => data.CityCode).join(',')} 
                        cacheExpireTime={cacheExpireTime} 
                        setWeatherReport={setWeatherReport} />
                ))}
            </div>
        </div>
    );
}

export default Weather;