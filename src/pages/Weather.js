import React, { useState, useEffect } from 'react';
import cities from '../cities.json';
import WeatherCard from '../components/WeatherCard';
import checkWeatherCache from '../functions/checkWeatherCache'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cacheExpireTime } from '../constants';
import "../styles.css";

const Weather = () => {
    const [cityData, setCityData] = useState([]);
    const [weatherReport, setWeatherReport] = useState([]);

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
        <>
            <div className='weather-container'>
                <Header />
                <div className='add-city'>
                    <input type='text' placeholder='Enter a city' />
                    <button>Add City</button>
                </div>
                <div className='weather'>
                    <div className='weather-cards-container'>
                    {weatherReport.map((cityWeather, index) => (
                        <WeatherCard
                            key={cityWeather.id}
                            cityWeather={cityWeather}
                            index={index}
                            cityCodes={cityData.map(data => data.CityCode).join(',')}
                            setWeatherReport={setWeatherReport} />
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Weather;