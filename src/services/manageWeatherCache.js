import { weatherApiService } from './weatherApiService';
import {CACHE_EXPIRE_TIME} from '../constants/constants';

const deleteCache = (expireTime) => {
    setTimeout(() => {
        localStorage.removeItem('cachedWeatherData');
        localStorage.removeItem('cachedTimestamp');
        console.log('Cache Expired. (After Refresh)');
    }, expireTime);
}

const addToCache = (weatherData, currentTime) => {
    localStorage.setItem('cachedWeatherData', JSON.stringify(weatherData));
    localStorage.setItem('cachedTimestamp', currentTime.toString());
}

export const manageWeatherCache = async (cityCodes, setWeatherReport) => {
    const cachedWeatherData = localStorage.getItem('cachedWeatherData');
    const cachedTimestamp = localStorage.getItem('cachedTimestamp');

    if (cachedWeatherData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const timeSinceStored = currentTime - parseInt(cachedTimestamp, 10);

        if (timeSinceStored <= CACHE_EXPIRE_TIME ) {
            try {
                const weatherData = JSON.parse(cachedWeatherData);
                setWeatherReport(weatherData);
                console.log('Cached weather data used');

                deleteCache(CACHE_EXPIRE_TIME - timeSinceStored);

            } catch (error) {
                console.log('Error getting cached data: ', error);
            }
        }
        else {
            localStorage.removeItem('cachedWeatherData');
            localStorage.removeItem('cachedTimestamp');
            console.log('Cache Expired. (Deleted remaining cache)');

            const weatherData = await weatherApiService(cityCodes);
            if (weatherData !== null) {
                setWeatherReport(weatherData);
                const currentTime = new Date().getTime();
                addToCache(weatherData, currentTime);
                console.log('Weather data stored in cache');
            }
            deleteCache(CACHE_EXPIRE_TIME);
        }
    }
    else {
        const weatherData = await weatherApiService(cityCodes);
        if (weatherData !== null) {
            setWeatherReport(weatherData);
            const currentTime = new Date().getTime();
            addToCache(weatherData, currentTime);
            console.log('Weather data stored in cache');

            deleteCache(CACHE_EXPIRE_TIME);
        }
    }
}
