import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateandTime, formatTime, capitalizeEachWord } from '../functions/functions';
import checkWeatherCache from '../functions/checkWeatherCache';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

const WeatherCard = ({ cityWeather, index, cityCodes, cacheExpireTime, setWeatherReport }) => {
    const navigate = useNavigate();
    const colors = ['#6346e8', '#8342d4', '#21a81d', '#eba210', '#e64b40']
    const backgroundColor = colors[index % colors.length];
    const iconLink = 'https://openweathermap.org/img/wn/' + cityWeather.weather[0].icon + '.png';

    const handleClick = () => {
        checkWeatherCache(cityCodes, cacheExpireTime, setWeatherReport);
        navigate(`/view-weather/${cityWeather.name}`, { state: { weatherData: cityWeather, backgroundColor: backgroundColor } });
    }


    return (
        <div className='weather-card' onClick={handleClick} style={{ backgroundColor: backgroundColor }}>
            <div className='row'>
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
            <div className='row bottom'>
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
