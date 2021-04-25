import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
const WEATHER_FETCH_TASK_NAME = 'NiceOutWeatherFetch';

export const fetchWeatherTask = async () => {
  // Maybe trigger redux action here
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
