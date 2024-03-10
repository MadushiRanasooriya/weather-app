import { getWeatherData } from './getWeatherData';

const deleteCache = (expireTime) => {
    setTimeout(() => {
        localStorage.removeItem('cachedWeatherData');
        localStorage.removeItem('cachedTimestamp');
        console.log('Cache Expired. (After Refresh)');
    }, expireTime);
}

const checkWeatherCache = async (cityCodes, cacheExpireTime, setWeatherReport) => {
    const cachedWeatherData = localStorage.getItem('cachedWeatherData');
    const cachedTimestamp = localStorage.getItem('cachedTimestamp');

    if (cachedWeatherData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const timeSinceStored = currentTime - parseInt(cachedTimestamp, 10);

        if (timeSinceStored <= cacheExpireTime * 60 * 1000) {
            try {
                const weatherData = JSON.parse(cachedWeatherData);
                setWeatherReport(weatherData);
                console.log('Cached weather data used');

                deleteCache(cacheExpireTime * 60 * 1000 - timeSinceStored);

            } catch (error) {
                console.log('Error getting cached data: ', error);
            }
        }
        else {
            localStorage.removeItem('cachedWeatherData');
            localStorage.removeItem('cachedTimestamp');
            console.log('Cache Expired. (Deleted remaining cache)');

            const weatherData = await getWeatherData(cityCodes);
            if (weatherData !== null) {
                setWeatherReport(weatherData);
                const currentTime = new Date().getTime();
                localStorage.setItem('cachedWeatherData', JSON.stringify(weatherData));
                localStorage.setItem('cachedTimestamp', currentTime.toString());
                console.log('Weather data stored in cache');
            }
            deleteCache(cacheExpireTime * 60 * 1000);
        }
    }
    else {
        const weatherData = await getWeatherData(cityCodes);
        if (weatherData !== null) {
            setWeatherReport(weatherData);
            const currentTime = new Date().getTime();
            localStorage.setItem('cachedWeatherData', JSON.stringify(weatherData));
            localStorage.setItem('cachedTimestamp', currentTime.toString());
            console.log('Weather data stored in cache');

            deleteCache(cacheExpireTime * 60 * 1000);
        }
    }
}

export default checkWeatherCache;