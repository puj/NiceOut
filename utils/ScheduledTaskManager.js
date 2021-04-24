import Constants from 'expo-constants';
const API_KEY = Constants.manifest.extra.API_KEY;

const LAT = 59.288503;
const LON = 18.093132;
const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&exclude=minutely`;

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
const WEATHER_FETCH_TASK_NAME = 'NiceOutWeatherFetch';

import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_WEATHER_DATA = 'KEY_WEATHER_DATA';
const KEY_WEATHER_LAST_UPDATED = 'KEY_WEATHER_LAST_UPDATED';

export const fetchWeatherTask = async () => {
  console.info('Executing Weather Task');
  try {
    const response = await fetch(URL);
    const json = await response.json();
    await saveWeatherData(json);
    console.log(`Updating saved  time: ${new Date().getTime()}`);
    await saveWeatherLastUpdated(new Date().getTime());
    return BackgroundFetch.Result.NewData;
  } catch (e) {
    console.error(e);
    return BackgroundFetch.Result.Failed;
  }
};
export const scheduleTask = async () => {
  BackgroundFetch.registerTaskAsync(WEATHER_FETCH_TASK_NAME, {
    minimumInterval: 60,
    stopOnTerminate: false,
    stopOnBoot: false,
  });
};

export const defineTask = () => {
  TaskManager.defineTask(WEATHER_FETCH_TASK_NAME, fetchWeatherTask);
};

async function getValueFor(key) {
  return await AsyncStorage.getItem(key);
}

async function save(key, value) {
  await AsyncStorage.setItem(key, String(value));
}

const saveWeatherData = async (data) => {
  await save(KEY_WEATHER_DATA, JSON.stringify(data));
};
const saveWeatherLastUpdated = async (data) => {
  await save(KEY_WEATHER_LAST_UPDATED, data);
};

export const retrieveWeatherData = async () => {
  return JSON.parse(await getValueFor(KEY_WEATHER_DATA));
};

export const retrieveWeatherLastUpdated = async () => {
  const restoredLastUpdated = await getValueFor(KEY_WEATHER_LAST_UPDATED);
  if (restoredLastUpdated) {
    return new Date(parseInt(restoredLastUpdated));
  } else {
    return new Date(0);
  }
};
