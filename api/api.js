import Constants from 'expo-constants';

const API_KEY = Constants.manifest.extra.API_KEY;

const LAT = 59.288503;
const LON = 18.093132;
const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&exclude=minutely`;

export const requestWeatherData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};
