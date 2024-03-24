import React from 'react';
import { formatDateAndTime, formatTime } from '../utils/dateAndTimeUtils';
import { capitalizeEachWord } from '../utils/stringUtils';
import { ICON_BASE_URL, ICON_FILE_EXTENSION } from '../constants/constants';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CityWeatherCard = ({ cityWeatherData, colorIndex }) => {
    const iconLink = ICON_BASE_URL + cityWeatherData.weather[0].icon + ICON_FILE_EXTENSION;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className={`city-weather-card card-${colorIndex}`}>
            <div className='row'>
                <p className='back' onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft} fontSize='large' /></p>
            </div>
            <div className='row'>
                <div className='column'>
                    <h3 className='city'>{cityWeatherData.name}, {cityWeatherData.sys.country}</h3>
                    <p className='date'>{formatDateAndTime(cityWeatherData.dt, cityWeatherData.sys.timezone)}</p>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='descrip'>
                        <p className='descript-content'>
                            <img src={iconLink} alt="Weather Icon" />
                            {capitalizeEachWord(cityWeatherData.weather[0].description)}
                        </p>
                    </div>

                </div>
                <div className='column'>
                    <p className='temp'>{`${(cityWeatherData.main.temp).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Min: ${(cityWeatherData.main.temp_min).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Max: ${(cityWeatherData.main.temp_max).toFixed(0)}°c`}</p>
                </div>
            </div>
            <div className='row bottom'>
                <div className='column'>
                    <p>{`Pressure: ${cityWeatherData.main.pressure}hPa`}</p>
                    <p>{`Humidity: ${cityWeatherData.main.humidity}%`}</p>
                    <p>{`Visibility: ${(cityWeatherData.visibility / 1000).toFixed(1)}km`}</p>
                </div>
                <div className='column'>
                    <div className='wind'>
                        <NearMeOutlinedIcon fontSize='large' />
                        <p>{`${(cityWeatherData.wind.speed).toFixed(1)}m/s ${cityWeatherData.wind.deg} Degree`}</p>
                    </div>
                </div>
                <div className='column'>
                    <p>{`Sunrise: ${formatTime(cityWeatherData.sys.sunrise, cityWeatherData.sys.timezone)}`}</p>
                    <p>{`Sunset: ${formatTime(cityWeatherData.sys.sunset, cityWeatherData.sys.timezone)}`}</p>
                </div>
            </div>
        </div>
    )
}

export default CityWeatherCard
