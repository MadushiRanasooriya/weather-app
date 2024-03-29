import React, { useState, useEffect } from 'react';
import cities from '../assets/data/cities.json';
import WeatherCard from '../components/WeatherCard';
import { manageWeatherCache } from '../services/manageWeatherCache';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/Styles.css";

const Weather = () => {
    const [cityData, setCityData] = useState([]);
    const [weatherReport, setWeatherReport] = useState([]);
    const [cityCodes, setCityCodes] = useState('');

    useEffect(() => {
        setCityData(cities.List);

    }, []);

    useEffect(() => {
        setCityCodes(cityData.map(data => data.CityCode).join(','));
    }, [cityData]);

    useEffect(() => {
        if (cityCodes.length > 0) {
            manageWeatherCache(cityCodes, setWeatherReport);
        }
    }, [cityCodes]);


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
                    {weatherReport.map((cityWeatherData, index) => (
                        <WeatherCard
                            key={cityWeatherData.id}
                            cityWeatherData={cityWeatherData}
                            index={index}
                            cityCodes={cityCodes}
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