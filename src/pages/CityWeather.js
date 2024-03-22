import React from 'react';
import { useLocation } from 'react-router-dom';
import CityWeatherCard from '../components/CityWeatherCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/Styles.css";

const CityWeather = () => {
    const location = useLocation();
    const weatherData = location.state.weatherData;
    const colorIndex = location.state.colorIndex;

    return (
        <>
            <div className='weather-container'>
                <Header />
                <div className='weather'>
                    <CityWeatherCard weatherData={weatherData} colorIndex={colorIndex} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CityWeather
