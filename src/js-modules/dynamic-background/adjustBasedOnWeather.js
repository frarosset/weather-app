import { rgbToHsv, hsvToRgb } from "./colorUtilities.js";

// To adjust  a color based on weather conditions, we work on HSV color space
// The system is highly simplified, and the following observations are considered:
//
// - high cloud cover makes the sky appear darker and washed out
// - precipitation makes the sky appear washed out
// - low visibility makes the sky appear washed out
//
// These are achieved as follows:
//
// - to make a color darker, reduce its value in hsv space
// - to make a color washed out, reduce its saturation in hsv space
//
// For the saturation reduction, we just consider the weather factor that has the biggest effect
//
// In both cases, we don't want the color to appear too black or white, respectively,
// so if we have a given reduction (factor) we both scale it by a given reductionScalingFactor
// and cap it to a given maxReduction.
// These values can be, in general, different between s and v computation.
//
// When we have a gradient, the reduction is made for every stop color indipendently

const reductionScalingFactorS = 0.8; // Proportional scaling reduction
const maxReductionS = 0.8; // Capping reduction

const reductionScalingFactorV = 0.3; // scaling reduction
const maxReductionV = 0.3; // Capping reduction

const precipitation100 = 20; // mm or inches where the precipitation reduction factor is 1.
const visibility100 = 5; // km or miles where the visibility reduction factor is 1. Beyond this value there is no reduction.

export function adjustRgbGradientBasedOnWeather(rgbGradient, weatherData) {
  return rgbGradient.map((stop) => {
    const [rgbColor, percentage] = stop;
    const adjustedRgbColor = adjustRgbColorBasedOnWeather(
      rgbColor,
      weatherData
    );
    return [adjustedRgbColor, percentage];
  });
}

export function adjustRgbColorBasedOnWeather(rgbColor, weatherData) {
  const hsvColor = rgbToHsv(rgbColor);
  const adjustedHsvColor = adjustHsvColorBasedOnWeather(hsvColor, weatherData);
  return hsvToRgb(adjustedHsvColor);
}

function adjustHsvColorBasedOnWeather([h, s, v], weatherData) {
  const weatherFactors = computeWeatherFactors(weatherData);

  const adjustedS = adjustS(s, weatherFactors);
  const adjustedV = adjustV(v, weatherFactors);

  return [h, adjustedS, adjustedV];
}

// Specific functions

function computeWeatherFactors(data) {
  const cloudcover = data.cloudcover != null ? data.cloudcover / 100 : 0;

  const precipitation =
    data.precipitation != null ? data.precipitation / precipitation100 : 0;

  const visibility =
    data.visibility != null
      ? 1 - Math.min(data.visibility / visibility100, 1)
      : 1;

  return {
    cloudcover,
    precipitation,
    visibility,
  };
}

function adjustS(val, weatherFactors) {
  let reduction = Math.max(
    weatherFactors.cloudcover,
    weatherFactors.precipitation,
    weatherFactors.visibility
  );

  reduction = scaleReduction(reduction, reductionScalingFactorS, maxReductionS);
  const adjustedVal = applyReduction(val, reduction);
  return valInRange(adjustedVal);
}

function adjustV(val, weatherFactors) {
  let reduction = weatherFactors.cloudcover;

  reduction = scaleReduction(reduction, reductionScalingFactorV, maxReductionV);
  const adjustedVal = applyReduction(val, reduction);
  return valInRange(adjustedVal);
}

// helper functions

function scaleReduction(reduction, reductionScalingFactor, maxReduction) {
  return Math.min(reduction * reductionScalingFactor, maxReduction, 1);
}

function applyReduction(val, reduction) {
  return val * (1 - reduction);
}

function valInRange(val, minVal = 0, maxVal = 1) {
  return Math.max(minVal, Math.min(maxVal, val));
}
