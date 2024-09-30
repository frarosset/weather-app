import { getCssGradient } from "./colorUtilities.js";
//import { adjustRgbColorBasedOnWeather } from "./adjustBasedOnWeather.js";

export default function applyDynamicBackground(propertyName, data) {
  const background = computeDynamicBackground(data);
  document.documentElement.style.setProperty(propertyName, background);
}

function computeDynamicBackground(data) {
  const rgbGradient = data.current.isDay
    ? [
        [[255, 215, 0], 0],
        [[200, 128, 128], 90],
      ]
    : [
        [[0, 128, 128], 30],
        [[200, 128, 128], 90],
      ]; // todo

  // adjust the color based on weather conditions
  //   const weatherData = {
  //     cloudcover: data.current.cloudcover,
  //     precipitation: data.current.precipitation,
  //     visibility: data.current.visibility,
  //   };
  const adjustedRgbGradient = rgbGradient; // todo
  //const adjustedRgbColor = adjustRgbColorBasedOnWeather(rgbColor, weatherData);

  return getCssGradient(adjustedRgbGradient);
}
