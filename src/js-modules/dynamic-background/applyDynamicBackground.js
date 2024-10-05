import { getCssGradient } from "./colorUtilities.js";
import { getCurrentRgbGradient } from "./getCurrentRgbGradient.js";
import { adjustRgbGradientBasedOnWeather } from "./adjustBasedOnWeather.js";

export default function applyDynamicBackground(propertyName, data) {
  const background = computeDynamicBackground(data);
  document.documentElement.style.setProperty(propertyName, background);
  testDynamicBackground(data);
}

export function computeDynamicBackground(data) {
  // Get the background color assuming weather conditions
  const timeData = {
    m: data.current.datetimeMin,
    sr: data.current.sunriseMin,
    ss: data.current.sunsetMin,
  };
  const rgbGradient = getCurrentRgbGradient(timeData);

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

// test function
function testDynamicBackground(data, deltaM = 10) {
  // save current datetimeMin (it will be modified)
  const oldCurrentDatetimeMin = data.current.datetimeMin;

  const SR = data.current.sunriseMin;
  const SS = data.current.sunsetMin;

  // just a function to display time
  const minutesToHHMM = (m) => {
    const [hh, mm] = [Math.floor(m / 60) % 24, m % 60];
    return `${hh < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm}`;
  };

  const container = document.createElement("div");
  const className = "test-dynamic-background";
  container.classList.add(className);
  container.style.display = "flex";
  container.style.flexWrap = "wrap";

  // show a gradient every deltaM minutes, from modnight to midnight
  for (let m = 0; m < 1440; m += deltaM) {
    data.current.datetimeMin = m;
    const background = computeDynamicBackground(data);

    const div = document.createElement("div");

    div.innerText = minutesToHHMM(m);
    // highlight current time interval
    if (oldCurrentDatetimeMin >= m && oldCurrentDatetimeMin < m + deltaM) {
      div.innerText += ` <---`;
    }

    div.style.width = "min-content";
    div.style.height = "120px";
    div.style.margin = "2px 0px";
    div.style.writingMode = "vertical-rl";
    div.style.background = background;
    div.style.lineHeight = 1.5;
    if (m < SR || m > SS) {
      // nighttime
      div.style.color = "white";
    } else {
      //daytime
      div.style.color = "black";
      div.style.fontWeight = "bold";
    }

    container.appendChild(div);
  }

  // if the div is already present, replace it
  const existingContainer = document.querySelector(`.${className}`);
  if (existingContainer != null) {
    existingContainer.replaceWith(container);
  } else {
    document.body.appendChild(container);
  }

  // restore current datetimeMin (it will be modified)
  data.current.datetimeMin = oldCurrentDatetimeMin;
}
