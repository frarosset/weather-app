import { getCssGradient } from "./colorUtilities.js";
import { getCurrentRgbGradient } from "./getCurrentRgbGradient.js";
import { adjustRgbGradientBasedOnWeather } from "./adjustBasedOnWeather.js";

export default function applyDynamicBackground(propertyName, data) {
  const background = computeDynamicBackground(data);
  document.documentElement.style.setProperty(propertyName, background);
}

function computeDynamicBackground(data) {
  // Get the background color assuming weather conditions
  const rgbGradient = getCurrentRgbGradient(data.current);

  // adjust the color based on weather conditions
  const weatherData = {
    cloudcover: data.current.cloudcover,
    precipitation: data.current.precipitation,
    visibility: data.current.visibility,
  };
  const adjustedRgbGradient = adjustRgbGradientBasedOnWeather(
    rgbGradient,
    weatherData
  );

  return getCssGradient(adjustedRgbGradient);
}
