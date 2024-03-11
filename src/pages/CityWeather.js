import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDateandTime , formatTime, capitalizeEachWord } from '../functions/functions';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles.css";

const CityWeather = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const weatherData = location.state.weatherData;
    const color = location.state.backgroundColor;
    const iconLink = 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';

    const handleClick = () => {
        navigate('/');
    }
    return (
        <div className='weather-container'>
            <h1><FontAwesomeIcon icon={faCloudSun} /> Weather App</h1>
            <div className='weather'>
                <div className='city-weather-card' style={{ backgroundColor: color }}>
                    <div className='row'>
                        <p className='back' onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft} fontSize='large'/></p>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <h3 className='city'>{weatherData.name}, {weatherData.sys.country}</h3>
                            <p className='date'>{formatDateandTime(weatherData.dt, weatherData.sys.timezone)}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <div className='descrip'>
                                <span className='descript-content'>
                                    <img src={iconLink} alt="Weather Icon" />
                                    {capitalizeEachWord(weatherData.weather[0].description)}
                                </span>
                            </div>

                        </div>
                        <div className='column'>
                            <p className='temp'>{`${(weatherData.main.temp).toFixed(0)}°c`}</p>
                            <p className='temp-range'>{`Temp Min: ${(weatherData.main.temp_min).toFixed(0)}°c`}</p>
                            <p className='temp-range'>{`Temp Max: ${(weatherData.main.temp_max).toFixed(0)}°c`}</p>
                        </div>
                    </div>
                    <div className='row bottom'>
                        <div className='column'>
                            <p>{`Pressure: ${weatherData.main.pressure}hPa`}</p>
                            <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
                            <p>{`Visibility: ${(weatherData.visibility / 1000).toFixed(1)}km`}</p>
                        </div>
                        <div className='column'>
                            <div className='wind'>
                                <NearMeOutlinedIcon fontSize='large' />
                                <p>{`${(weatherData.wind.speed).toFixed(1)}m/s ${weatherData.wind.deg} Degree`}</p>
                            </div>
                        </div>
                        <div className='column'>
                            <p>{`Sunrise: ${formatTime(weatherData.sys.sunrise, weatherData.sys.timezone)}`}</p>
                            <p>{`Sunset: ${formatTime(weatherData.sys.sunset, weatherData.sys.timezone)}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather
