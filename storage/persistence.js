import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_WEATHER_DATA = 'KEY_WEATHER_DATA';
const KEY_WEATHER_LAST_FETCHED = 'KEY_WEATHER_LAST_UPDATED';

async function getValueFor(key) {
  return await AsyncStorage.getItem(key);
}

async function save(key, value) {
  await AsyncStorage.setItem(key, String(value));
}

export const saveWeatherData = async (data) => {
  await save(KEY_WEATHER_DATA, JSON.stringify(data));
};

export const saveWeatherLastFetched = async (date) => {
  await save(KEY_WEATHER_LAST_FETCHED, date);
};

export const retrieveWeatherData = async () => {
  return JSON.parse(await getValueFor(KEY_WEATHER_DATA));
};

export const retrieveWeatherLastFetched = async () => {
  const restoredLastFetched = await getValueFor(KEY_WEATHER_LAST_FETCHED);
  if (restoredLastFetched) {
    return parseInt(restoredLastFetched);
  } else {
    return 0;
  }
};
