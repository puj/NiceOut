import moment from 'moment';

export const kelvinToCelsius = (tempInKelvin) => {
  return tempInKelvin - 272.15;
};

export const formatTemperature = (tempInKelvin) => {
  return `${formatTemperatureWithoutUnits(tempInKelvin)}°C`;
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
  const lowerBound = 3;
  const upperBound = 13;

  let workingTemp = tempInCelsius;
  workingTemp = Math.max(workingTemp, lowerBound);
  workingTemp = Math.min(workingTemp, upperBound);

  return (workingTemp - lowerBound) / (upperBound - lowerBound);
};

// Calculates  a [0,1] to indicate how pleasant the hour of the day could be
export const calculateHourOfDayScore = (hour) => {
  const minScore = 0.1;
  const minHour = 5;
  const maxHour = 19;
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
    const bonus = 0.5 * (1 - hourRatio);
    return hourRatio + bonus;
  }

  return Math.max(hourRatio, minScore);
};

export const calculateWeatherScore = (cloudiness, temp, hourOfDay) => {
  const hourScore = calculateHourOfDayScore(hourOfDay);
  const tempScore = calculateTempScore(kelvinToCelsius(temp));
  const clearSkiedness = 1 - cloudiness;
  // const tempScoreWeightedClearness = Math.pow(
  //   tempScore,
  //   clearSkiedness * clearSkiedness
  // );
  const baseScore = (hourScore + tempScore) / 2;
  if (clearSkiedness < 0.5) {
    // Can reduce to half of base
    const halfBaseScore = baseScore / 2;
    const cloudPenalty = cloudiness * halfBaseScore;
    const weightedScore = baseScore - cloudPenalty;
    return weightedScore;
  } else {
    // Can increase by half of base
    const halfBaseScore = baseScore / 2;
    const clearBonus = clearSkiedness * halfBaseScore;
    console.log('Clear +' + clearBonus);
    const weightedScore = baseScore + clearBonus;
    return weightedScore;
  }
};

export const calculateNicenessFactor = (weatherData) => {
  const temp = weatherData.temp;
  const cloudiness = weatherData.clouds / 100.0;
  const hour = moment(weatherData.dt * 1000).hour();
  const nicenessFactor = calculateWeatherScore(cloudiness, temp, hour);
  console.log(nicenessFactor);
  return nicenessFactor;
};
