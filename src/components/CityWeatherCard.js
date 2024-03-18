import React from 'react';
import { formatDateandTime , formatTime, capitalizeEachWord } from '../functions/functions';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CityWeatherCard = ({weatherData, colorIndex}) => {
    const iconLink = 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className={`city-weather-card card-${colorIndex}`}>
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
    )
}

export default CityWeatherCard
