import { getCssRgb } from "./colorUtilities.js";
import { adjustRgbColorBasedOnWeather } from "./adjustBasedOnWeather.js";

export default function applyDynamicBackground(propertyName, data) {
  const background = computeDynamicBackground(data);
  document.documentElement.style.setProperty(propertyName, background);
}

function computeDynamicBackground(data) {
  const rgbColor = data.current.isDay ? [255, 215, 0] : [0, 128, 128]; // todo

  // adjust the color based on weather conditions
  const weatherData = {
    cloudcover: data.current.cloudcover,
    precipitation: data.current.precipitation,
    visibility: data.current.visibility,
  };
  const adjustedRgbColor = adjustRgbColorBasedOnWeather(rgbColor, weatherData);

  return getCssRgb(adjustedRgbColor);
}
