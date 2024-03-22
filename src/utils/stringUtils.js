export const capitalizeEachWord = (string) => {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
};