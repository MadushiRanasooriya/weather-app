import { API_BASE_URL, UNITS_METRIC, API_KEY_PARAM } from "../constants/constants";

export const weatherApiService = async (cityCodes) => {
    try {
        const apiUrl = `${API_BASE_URL}${cityCodes}${UNITS_METRIC}${API_KEY_PARAM}${process.env.REACT_APP_API_KEY}`;

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