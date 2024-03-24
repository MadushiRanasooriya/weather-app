import React from 'react';
import { useLocation } from 'react-router-dom';
import CityWeatherCard from '../components/CityWeatherCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/Styles.css";

const CityWeather = () => {
    const location = useLocation();
    const cityWeatherData = location.state.cityWeatherData;
    const colorIndex = location.state.colorIndex;

    return (
        <>
            <div className='weather-container'>
                <Header />
                <div className='weather'>
                    <CityWeatherCard cityWeatherData={cityWeatherData} colorIndex={colorIndex} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CityWeather
