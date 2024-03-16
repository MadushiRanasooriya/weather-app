import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateandTime, formatTime, capitalizeEachWord } from '../functions/functions';
import checkWeatherCache from '../functions/checkWeatherCache';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { cacheExpireTime } from '../constants';

const WeatherCard = ({ cityWeather, index, cityCodes, setWeatherReport }) => {
    const navigate = useNavigate();
    const iconLink = 'https://openweathermap.org/img/wn/' + cityWeather.weather[0].icon + '.png';

    const handleClick = () => {
        checkWeatherCache(cityCodes, cacheExpireTime, setWeatherReport);
        navigate(`/view-weather/${cityWeather.name}`, { state: { weatherData: cityWeather, colorIndex: index % 5 } });
    }

    const handleClose = () => {
        setWeatherReport(prevWeatherReport => prevWeatherReport.filter((_, i) => i !== index));
    };


    return (
        <div className={`weather-card card-${index % 5}`} >
            <div className='row'>
                <p onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></p>
            </div>
            <div className='row' onClick={handleClick}>
                <div className='column'>
                    <p className='city'>{cityWeather.name}, {cityWeather.sys.country}</p>
                    <p className='date'>{formatDateandTime(cityWeather.dt, cityWeather.sys.timezone)}</p>
                    <p className='descrip'>
                        <img src={iconLink} alt="Weather Icon" />
                        <span className='descrip-text'>
                            {capitalizeEachWord(cityWeather.weather[0].description)}
                        </span>
                    </p>
                </div>
                <div className='column'>
                    <p className='temp'>{`${(cityWeather.main.temp).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Min: ${(cityWeather.main.temp_min).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Max: ${(cityWeather.main.temp_max).toFixed(0)}°c`}</p>
                    <br/><br/>
                </div>
            </div>
            <div className='row bottom' onClick={handleClick}>
                <div className='column'>
                    <p>{`Pressure: ${cityWeather.main.pressure}hPa`}</p>
                    <p>{`Humidity: ${cityWeather.main.humidity}%`}</p>
                    <p>{`Visibility: ${(cityWeather.visibility / 1000).toFixed(1)}km`}</p>
                </div>
                <div className='column'>
                    <div className='wind'>
                        <NearMeOutlinedIcon  />
                        <p>{`${(cityWeather.wind.speed).toFixed(1)}m/s ${cityWeather.wind.deg} Degree`}</p>
                    </div>
                </div>
                <div className='column'>
                    <p>{`Sunrise: ${formatTime(cityWeather.sys.sunrise, cityWeather.sys.timezone)}`}</p>
                    <p>{`Sunset: ${formatTime(cityWeather.sys.sunset, cityWeather.sys.timezone)}`}</p>
                </div>
            </div>
        </div>
    )
}


export default WeatherCard;