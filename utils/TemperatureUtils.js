import moment from 'moment';

export const kelvinToCelsius = (tempInKelvin) => {
  return tempInKelvin - 272.15;
};

export const formatTemperature = (tempInKelvin) => {
  return `${formatTemperatureWithDegreeSymbol(tempInKelvin)}C`;
};

export const formatTemperatureWithDegreeSymbol = (tempInKelvin) => {
  return `${formatTemperatureWithoutUnits(tempInKelvin)}°`;
};

export const formatTemperatureWithoutUnits = (tempInKelvin) => {
  const tempInCelsius = kelvinToCelsius(tempInKelvin);
  const tempInCelsiusRounded = Math.round(tempInCelsius);
  return `${tempInCelsiusRounded}`;
};

// export const isNiceOut = (weatherData = {});
export const isSunny = (weatherData) => {
  return weatherData.weather[0].main === 'Clear';
};

// Return a [0,1] float indicating how cloudy it is
export const getCloudiness = (weatherData) => {
  return weatherData.clouds / 100.0;
};

// Calculates  a [0,1] to indicate how pleasant the temp could be
export const calculateTempScore = (tempInCelsius) => {
  const lowerBound = 4;
  const upperBound = 16;

  let workingTemp = tempInCelsius;
  workingTemp = Math.max(workingTemp, lowerBound);
  workingTemp = Math.min(workingTemp, upperBound);

  return (workingTemp - lowerBound) / (upperBound - lowerBound);
};

// Calculates  a [0,1] to indicate how pleasant the hour of the day could be
export const calculateHourOfDayScore = (hour) => {
  const minScore = 0.1;
  const minHour = 6;
  const maxHour = 17;
  const sweetSpotMinHour = 10;
  const sweetSpotMaxHour = 14;
  if (hour > maxHour) {
    return minScore;
  }
  if (hour < minHour) {
    return minScore;
  }

  const goodRange = maxHour - minHour;
  const midHour = minHour + goodRange / 2;
  const hourOffsetFromMid = Math.abs(midHour - hour);
  const hourRatio = (goodRange / 2 - hourOffsetFromMid) / (midHour - minHour);

  if (hour >= sweetSpotMinHour && hour <= sweetSpotMaxHour) {
    const bonus = 0.1 * (1 - hourRatio);
    return hourRatio + bonus;
  }

  return Math.max(hourRatio, minScore);
};

export const calculateCloudPenalty = (baseScore, cloudiness) => {
  if (cloudiness > 0.9) {
    return -baseScore * 0.5;
  }
  if (cloudiness > 0.8) {
    return -baseScore * 0.45;
  }
  if (cloudiness > 0.7) {
    return -baseScore * 0.4;
  }
  if (cloudiness > 0.6) {
    return -baseScore * 0.3;
  }
  if (cloudiness > 0.5) {
    return -baseScore * 0.15;
  }
  if (cloudiness > 0.4) {
    return -baseScore * 0.1;
  }
  if (cloudiness > 0.3) {
    return -baseScore * 0.05;
  }
  if (cloudiness > 0.2) {
    return baseScore * 0.1;
  }
  if (cloudiness > 0.1) {
    return baseScore * 0.3;
  }
  if (cloudiness > 0.0) {
    return baseScore * 0.5;
  }
  return 0;
};

export const calculateWeatherScore = (cloudiness, temp, hourOfDay) => {
  const hourScore = calculateHourOfDayScore(hourOfDay);
  const tempScore = calculateTempScore(kelvinToCelsius(temp));
  // const tempScoreWeightedClearness = Math.pow(
  //   tempScore,
  //   clearSkiedness * clearSkiedness
  // );
  const baseScore = (0.4 * hourScore + 1.6 * tempScore) / 2;
  const cloudPenalty = calculateCloudPenalty(baseScore, cloudiness);
  return baseScore + cloudPenalty;
};

export const calculateNicenessFactor = (weatherData) => {
  const temp = weatherData.temp;
  const cloudiness = weatherData.clouds / 100.0;
  const hour = moment(weatherData.dt * 1000).hour();
  const nicenessFactor = calculateWeatherScore(cloudiness, temp, hour);
  return nicenessFactor;
};
