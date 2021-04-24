export const formatTemperature = (tempInKelvin) => {
  return `${formatTemperatureWithoutUnits(tempInKelvin)}°C`;
};
export const formatTemperatureWithoutUnits = (tempInKelvin) => {
  const tempInCelsius = tempInKelvin - 272.15;
  const tempInCelsiusRounded = Math.round(tempInCelsius);
  return `${tempInCelsiusRounded}`;
};
