import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateAndTime, formatTime } from '../utils/dateAndTimeUtils';
import { capitalizeEachWord } from '../utils/stringUtils';
import { ICON_BASE_URL, ICON_FILE_EXTENSION } from '../constants/constants';
import { manageWeatherCache } from '../services/manageWeatherCache';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ cityWeatherData, index, cityCodes, setWeatherReport }) => {
    const navigate = useNavigate();
    const iconLink = ICON_BASE_URL + cityWeatherData.weather[0].icon + ICON_FILE_EXTENSION;
    const colorIndex = index % 5;

    const handleClick = () => {
        manageWeatherCache(cityCodes, setWeatherReport);
        navigate(`/view-weather/${cityWeatherData.name}`, { state: { cityWeatherData: cityWeatherData, colorIndex: colorIndex } });
    }

    const handleClose = () => {
        setWeatherReport(prevWeatherReport => prevWeatherReport.filter((_, i) => i !== index));
    };


    return (
        <div className={`weather-card card-${colorIndex}`} >
            <div className='row'>
                <p onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></p>
            </div>
            <div className='row' onClick={handleClick}>
                <div className='column'>
                    <p className='city'>{cityWeatherData.name}, {cityWeatherData.sys.country}</p>
                    <p className='date'>{formatDateAndTime(cityWeatherData.dt, cityWeatherData.sys.timezone)}</p>
                    <p className='descrip'>
                        <img src={iconLink} alt="Weather Icon" />
                        <span className='descrip-text'>
                            {capitalizeEachWord(cityWeatherData.weather[0].description)}
                        </span>
                    </p>
                </div>
                <div className='column'>
                    <p className='temp'>{`${(cityWeatherData.main.temp).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Min: ${(cityWeatherData.main.temp_min).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Max: ${(cityWeatherData.main.temp_max).toFixed(0)}°c`}</p>
                    <br/><br/>
                </div>
            </div>
            <div className='row bottom' onClick={handleClick}>
                <div className='column'>
                    <p>{`Pressure: ${cityWeatherData.main.pressure}hPa`}</p>
                    <p>{`Humidity: ${cityWeatherData.main.humidity}%`}</p>
                    <p>{`Visibility: ${(cityWeatherData.visibility / 1000).toFixed(1)}km`}</p>
                </div>
                <div className='column'>
                    <div className='wind'>
                        <NearMeOutlinedIcon  />
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


export default WeatherCard;