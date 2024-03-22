export const formatDateAndTime = (timestamp, timeZone) => {
    const date = new Date((timestamp + timeZone) * 1000);
    const dateOptions = {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    }
    const formattedTime = formatTime(timestamp, timeZone);
    const formattedDate = date.toLocaleString('en-US', dateOptions);
    return `${formattedTime}, ${formattedDate}`;
}

export const formatTime = (timestamp, timeZone) => {
    const date = new Date((timestamp + timeZone) * 1000);
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
    }
    const formattedTime = date.toLocaleString('en-US', timeOptions);
    return `${formattedTime.toLowerCase()}`;
}