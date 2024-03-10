export const getWeatherData = async (cityCodes) => {
    try {
        const apiKey = '55a0b1c4c73ef41239bc2552928205b0';
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