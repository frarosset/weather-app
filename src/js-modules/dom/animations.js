import * as lottie from "lottie-web";

// Weather icons
import clearDay from "../../assets/Meteocons/weather/clear-day.json";
import showersDay from "../../assets/Meteocons/weather/showers-day.json";
import clearNight from "../../assets/Meteocons/weather/clear-night.json";
import showersNight from "../../assets/Meteocons/weather/showers-night.json";
import cloudy from "../../assets/Meteocons/weather/cloudy.json";
import sleet from "../../assets/Meteocons/weather/sleet.json";
import fog from "../../assets/Meteocons/weather/fog.json";
import snow from "../../assets/Meteocons/weather/snow.json";
import hail from "../../assets/Meteocons/weather/hail.json";
import snowShowersDay from "../../assets/Meteocons/weather/snow-showers-day.json";
import partlyCloudyDay from "../../assets/Meteocons/weather/partly-cloudy-day.json";
import snowShowersNight from "../../assets/Meteocons/weather/snow-showers-night.json";
import partlyCloudyNight from "../../assets/Meteocons/weather/partly-cloudy-night.json";
import thunder from "../../assets/Meteocons/weather/thunder.json";
import rain from "../../assets/Meteocons/weather/rain.json";
import thunderRain from "../../assets/Meteocons/weather/thunder-rain.json";
import rainSnow from "../../assets/Meteocons/weather/rain-snow.json";
import thunderShowersDay from "../../assets/Meteocons/weather/thunder-showers-day.json";
import rainSnowShowersDay from "../../assets/Meteocons/weather/rain-snow-showers-day.json";
import thunderShowersNight from "../../assets/Meteocons/weather/thunder-showers-night.json";
import rainSnowShowersNight from "../../assets/Meteocons/weather/rain-snow-showers-night.json";
import wind from "../../assets/Meteocons/weather/wind.json";

// Precip
import precipRain from "../../assets/Meteocons/precipitation/rain.json";
import precipSnow from "../../assets/Meteocons/precipitation/snow.json";
import precipSleet from "../../assets/Meteocons/precipitation/sleet.json";
import precipRainAndSnow from "../../assets/Meteocons/precipitation/rain-and-snow.json";
import precipSnowflake from "../../assets/Meteocons/precipitation/snowflake.json";

// Other Conditions
import solarRadiation from "../../assets/Meteocons/other/solar-radiation.json";
import compass from "../../assets/Meteocons/other/compass.json";

// UV index
import uvIndex0 from "../../assets/Meteocons/uvindex/uv-index-0.json";
import uvIndex1 from "../../assets/Meteocons/uvindex/uv-index-1.json";
import uvIndex2 from "../../assets/Meteocons/uvindex/uv-index-2.json";
import uvIndex3 from "../../assets/Meteocons/uvindex/uv-index-3.json";
import uvIndex4 from "../../assets/Meteocons/uvindex/uv-index-4.json";
import uvIndex5 from "../../assets/Meteocons/uvindex/uv-index-5.json";
import uvIndex6 from "../../assets/Meteocons/uvindex/uv-index-6.json";
import uvIndex7 from "../../assets/Meteocons/uvindex/uv-index-7.json";
import uvIndex8 from "../../assets/Meteocons/uvindex/uv-index-8.json";
import uvIndex9 from "../../assets/Meteocons/uvindex/uv-index-9.json";
import uvIndex10 from "../../assets/Meteocons/uvindex/uv-index-10.json";
import uvIndex11 from "../../assets/Meteocons/uvindex/uv-index-11.json";

// Astro
import sunrise from "../../assets/Meteocons/astro/sunrise.json";
import sunset from "../../assets/Meteocons/astro/sunset.json";
import moonrise from "../../assets/Meteocons/astro/moonrise.json";
import moonset from "../../assets/Meteocons/astro/moonset.json";

// Moonphase
import moonFirstQuarter from "../../assets/Meteocons/moonphase/moon-first-quarter.json";
import moonFull from "../../assets/Meteocons/moonphase/moon-full.json";
import moonLastQuarter from "../../assets/Meteocons/moonphase/moon-last-quarter.json";
import moonNew from "../../assets/Meteocons/moonphase/moon-new.json";
import moonWaningCrescent from "../../assets/Meteocons/moonphase/moon-waning-crescent.json";
import moonWaningGibbous from "../../assets/Meteocons/moonphase/moon-waning-gibbous.json";
import moonWaxingCrescent from "../../assets/Meteocons/moonphase/moon-waxing-crescent.json";
import moonWaxingGibbous from "../../assets/Meteocons/moonphase/moon-waxing-gibbous.json";

// Icons
import alert from "../../assets/LottieFiles/alert.json";

export const weatherIcons = {
  "clear-day": clearDay,
  "showers-day": showersDay,
  "clear-night": clearNight,
  "showers-night": showersNight,
  cloudy: cloudy,
  sleet: sleet,
  fog: fog,
  snow: snow,
  hail: hail,
  "snow-showers-day": snowShowersDay,
  "partly-cloudy-day": partlyCloudyDay,
  "snow-showers-night": snowShowersNight,
  "partly-cloudy-night": partlyCloudyNight,
  thunder: thunder,
  rain: rain,
  "thunder-rain": thunderRain,
  "rain-snow": rainSnow,
  "thunder-showers-day": thunderShowersDay,
  "rain-snow-showers-day": rainSnowShowersDay,
  "thunder-showers-night": thunderShowersNight,
  "rain-snow-showers-night": rainSnowShowersNight,
  wind: wind,
};

export const precipIcons = {
  rain: precipRain,
  snow: precipSnow,
  sleet: precipSleet,
  rainAndSnow: precipRainAndSnow,
  snowflake: precipSnowflake,
};

export const uvindexIcons = {
  "uv-index-0": uvIndex0,
  "uv-index-1": uvIndex1,
  "uv-index-2": uvIndex2,
  "uv-index-3": uvIndex3,
  "uv-index-4": uvIndex4,
  "uv-index-5": uvIndex5,
  "uv-index-6": uvIndex6,
  "uv-index-7": uvIndex7,
  "uv-index-8": uvIndex8,
  "uv-index-9": uvIndex9,
  "uv-index-10": uvIndex10,
  "uv-index-11": uvIndex11,
};

export const astroIcons = {
  sunrise: sunrise,
  sunset: sunset,
  moonrise: moonrise,
  moonset: moonset,
};

export const moonphaseIcons = {
  "moon-first-quarter": moonFirstQuarter,
  "moon-full": moonFull,
  "moon-last-quarter": moonLastQuarter,
  "moon-new": moonNew,
  "moon-waning-crescent": moonWaningCrescent,
  "moon-waning-gibbous": moonWaningGibbous,
  "moon-waxing-crescent": moonWaxingCrescent,
  "moon-waxing-gibbous": moonWaxingGibbous,
};

export const otherIcons = {
  solarRadiation: solarRadiation,
  compass: compass,
};

export const icons = {
  alert: alert,
};

export function setAnimation(
  parentContainer,
  data,
  loop = true,
  autoplay = true
) {
  const clonedData = JSON.parse(JSON.stringify(data)); // if there are repeaters
  lottie.loadAnimation({
    container: parentContainer,
    renderer: "svg",
    loop: loop,
    autoplay: autoplay,
    animationData: clonedData,
    useFrameInterpolation: false,
    renderConfig: {
      devicePixelRatio: 1, // Lower values improve performance but may reduce animation quality
    },
  });
}

export function freezeAllAnimations(unfreeze = false) {
  if (unfreeze) {
    lottie.unfreeze();
  } else {
    lottie.freeze();
  }
}
