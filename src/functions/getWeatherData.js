import appSettings from '../appSettings.json';

export const getWeatherData = async (cityCodes) => {
    try {
        const apiKey = appSettings.apiKey;
        const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityCodes}&units=metric&appid=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Response was not ok");
        }

        const weatherAPIData = await response.json();
        return weatherAPIData.list;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};