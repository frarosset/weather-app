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

// Other Conditions
import solarRadiation from "../../assets/Meteocons/solar-radiation.json";

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

export const solarRadiationIcon = solarRadiation;

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
