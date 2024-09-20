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
  });
}
