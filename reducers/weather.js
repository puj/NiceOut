import { createSlice } from '@reduxjs/toolkit';
import { requestWeatherData } from '../api/api';
import {
  saveWeatherData,
  saveWeatherLastFetched,
  retrieveWeatherLastFetched,
  retrieveWeatherData,
} from '../storage/persistence.js';

const initialState = {
  weatherData: null,
  lastFetched: 0,
  focusedForcast: null,
};

export const weather = createSlice({
  name: 'weather',
  initialState: initialState,
  reducers: {
    setWeatherData: (state, action) => {
      const { weatherData } = action.payload;
      state.weatherData = weatherData;
      return state;
    },
    setLastFetched: (state, action) => {
      const { lastFetched } = action.payload;
      state.lastFetched = lastFetched;
      return state;
    },
    setFocusedForecast: (state, action) => {
      const { focusedForcast } = action.payload;
      state.focusedForcast = focusedForcast;
      return state;
    },
  },
});

export const loadWeatherData = (forceFetch = false) => {
  return async (dispatch) => {
    console.info('Loading Weather Data from Local Storage...');
    // Let's try loading from local storage first
    const lastFetched = await retrieveWeatherLastFetched();
    const weatherData = await retrieveWeatherData();

    const now = new Date().getTime();
    const timeSinceLastUpdate = now - lastFetched;
    const timeElapsed = timeSinceLastUpdate > 1000 * 60 * 30;

    const shouldRunAgain = !lastFetched || !weatherData || timeElapsed;

    if (!shouldRunAgain && !forceFetch) {
      // Update redux store and stop here
      dispatch(weather.actions.setWeatherData({ weatherData }));
      dispatch(weather.actions.setLastFetched({ lastFetched }));
      return;
    }

    // Fall back to fetching from api
    console.info('Fetching Weather API Data...');
    try {
      const weatherData = await requestWeatherData();
      const lastFetched = new Date().getTime();

      // Save to persistence
      await saveWeatherData(weatherData);
      await saveWeatherLastFetched(lastFetched);

      // Update redux store
      dispatch(weather.actions.setWeatherData({ weatherData }));
      dispatch(weather.actions.setLastFetched({ lastFetched }));

      console.log(`API Fetch complete: ${lastFetched}`);
    } catch (e) {
      console.error(e);
    }
  };
};
