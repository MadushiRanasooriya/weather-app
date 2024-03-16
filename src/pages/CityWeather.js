import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles.css";
import CityWeatherCard from '../components/CityWeatherCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CityWeather = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const weatherData = location.state.weatherData;
    const colorIndex = location.state.colorIndex;

    const handleClick = () => {
        navigate('/');
    }
    return (
        <>
            <div className='weather-container'>
                <Header />
                <div className='weather'>
                    <CityWeatherCard weatherData={weatherData} handleClick={handleClick} colorIndex={colorIndex} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CityWeather
