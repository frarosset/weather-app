import {
  initDiv,
  initH3,
  initP,
  initUl,
  initLiAsChildInList,
} from "../../js-utilities/commonDomComponents.js";
import {
  setAnimation,
  precipIcons,
  uvindexIcons,
  otherIcons,
  astroIcons,
  moonphaseIcons,
} from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  otherConditionsDiv: "other-conditions-div",
  otherConditionsList: "other-conditions-list",
  otherConditionLi: "other-condition-li",
  otherConditionH3: "other-condition-h3",
  otherConditionContent: "other-condition-content",
  otherConditionIconDiv: "other-condition-icon-div",
  otherConditionValueDiv: "other-condition-value-div",
  otherConditionValue: "other-condition-value",
  otherConditionValueUnit: "other-condition-value-unit",
  otherConditionIconWithValueDiv: "other-condition-icon-with-value-div",
  otherConditionIconWithValueValue: "other-condition-icon-with-value-value",
  otherConditionValueSmallDiv: "other-condition-value-small-div",
  otherConditionValueSmallPre: "other-condition-value-small-pre",
  otherConditionValueSmall: "other-condition-value-small",
  otherConditionValueSmallPost: "other-condition-value-small-post",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatTz = null;

export function initOtherCurrentConditionsDiv(data) {
  formatTz = data.formatTz;
  const div = initOtherConditionsDiv(data.current, "");
  formatTz = null;
  return div;
}

function initOtherConditionsDiv(subdata, prestr) {
  const div = initDiv(getCssClass("otherConditionsDiv"));

  const otherConditionsList = initUl(getCssClass("otherConditionsList"));

  const otherConditionsDiv = [
    ["Wind", initWindContent],
    ["Precipitation", initPrecipitationContent],
    ["Humidity", initHumidityContent],
    ["Snow", initSnowContent],
    ["Cloud Cover", initCloudCoverContent],
    ["Pressure", initPressureContent],
    ["Visibility", initVisibilityContent],
    ["UV Index", initUvIndexContent],
    ["Solar Radiation", initSolarRadiationContent],
    ["Moonphase", initMoonPhaseContent],
    ["Sunrise & Sunset", initSunriseAndSunsetContent],
    ["Moonrise & Moonset", initMoonriseAndMoonsetContent],
  ];

  otherConditionsDiv.forEach(([title, callback]) => {
    const div = callback(subdata);

    if (subdata == null || div == null) return;

    const otherConditionLi = initLiAsChildInList(
      otherConditionsList,
      getCssClass("otherConditionLi")
    );
    const otherConditionH3 = initH3(
      getCssClass("otherConditionH3"),
      null,
      `${prestr} ${title}`
    );

    otherConditionLi.append(otherConditionH3, div);
  });

  div.append(otherConditionsList);

  return div;
}

// Init Specific Other Info Content

function initWindContent(subdata) {
  const windspeed = subdata.windspeedStr;
  const winddirDeg = subdata.winddir;
  const winddir = subdata.winddirStr;
  const windgust = subdata.windgustStr;

  if (windspeed == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-three-values",
    "wind",
  ]);

  const icon = initIcon(otherIcons["compass"]);
  icon.style.transform = `rotate(${180 + winddirDeg}deg)`;

  div.append(initValueSmall(winddir, "from"), icon, initValue(windspeed));

  if (windgust != null) {
    div.append(initValueSmall(windgust, "", "gust"));
  }

  return div;
}

function initPrecipitationContent(subdata) {
  const precip = subdata.precipStr;
  const preciptype = subdata.preciptypeStr;
  const preciptypeIcon = subdata.preciptypeIconStr;
  const precipprob = subdata.precipprobStr;

  if (precip == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-three-values",
    "precip",
  ]);

  if (preciptype != null) {
    div.append(
      initValueSmall(preciptype),
      initIcon(precipIcons[preciptypeIcon])
    );
  }

  div.append(initValue(precip), initValueSmall(precipprob, "", "chance"));

  return div;
}

function initSnowContent(subdata) {
  const snow = subdata.snowSrt;
  const snowdepth = subdata.snowdepthStr;

  if (snow == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-two-values",
    "snow",
  ]);

  div.append(initIcon(precipIcons["snowflake"]), initValue(snow));

  if (snowdepth != null) {
    div.append(initValueSmall(snowdepth, "", "on floor"));
  }

  return div;
}

function initPressureContent(subdata) {
  const pressure = subdata.pressureStr;
  const pressureVal = subdata.pressure;

  if (pressure == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-value",
    "pressure",
  ]);

  div.append(initValue(pressure));

  if (pressureVal > 1013) {
    div.append(initIcon(otherIcons["pressurehigh"]));
  } else if (pressureVal < 1013) {
    div.append(initIcon(otherIcons["pressurelow"]));
  }

  return div;
}

function initHumidityContent(subdata) {
  const humidity = subdata.humidityStr;
  const humidityVal = subdata.humidity;
  const dew = subdata.dewStr;

  if (humidity == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-three-values",
    "humidity",
  ]);

  const humidityStr =
    humidityVal > 60 ? "too humid" : humidityVal < 40 ? "too dry" : "optimal";

  div.append(
    initValueSmall(humidityStr),
    initIcon(otherIcons["humidity"]),
    initValue(humidity),
    initValueSmall(dew, "", "dew point")
  );

  return div;
}

function initCloudCoverContent(subdata) {
  const cloudCover = subdata.cloudcoverStr;

  if (cloudCover == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-value",
    "cloudcover",
  ]);

  div.append(initValue(cloudCover));

  div.append(initIcon(otherIcons["cloudcover"]));

  return div;
}

function initVisibilityContent(subdata) {
  const visibility = subdata.visibilityStr;
  const visibilityVal = subdata.visibility;

  if (visibility == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-value",
    "visibility",
  ]);

  div.append(initValue(visibility));

  const icon = initIcon(otherIcons["visibility"]);
  div.append(icon);

  const visibilityReduced = 5; // reduce opacity when below this value
  if (visibilityVal < visibilityReduced) {
    icon.style.opacity = `${(visibilityVal / visibilityReduced) * 100}%`;
  }

  return div;
}

function initUvIndexContent(subdata) {
  const uvIndex = subdata.uvindex;
  if (uvIndex == null) return null;

  const div = initDiv([getCssClass("otherConditionContent"), "uv-index"]);
  div.append(initIcon(uvindexIcons[`uv-index-${uvIndex}`]));
  return div;
}

function initSolarRadiationContent(subdata) {
  const solarRadiation = subdata.solarradiationStr;
  if (solarRadiation == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "grid-icon-and-value",
    "solar-radiation",
  ]);
  div.append(initIcon(otherIcons.solarRadiation), initValue(solarRadiation));
  return div;
}

function initMoonPhaseContent(subdata) {
  const moonphase = subdata.moonphaseIconStr;
  if (moonphase == null) return null;
  const div = initDiv([getCssClass("otherConditionContent"), "moonphase"]);
  div.append(initIcon(moonphaseIcons[`${moonphase}`]));
  return div;
}

function initSunriseAndSunsetContent(subdata) {
  const sunrise = subdata.sunrise;
  const sunset = subdata.sunset;

  if (sunrise == null || sunset == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "flex-list",
    "sunrise-and-sunset",
  ]);

  div.append(
    initIconWithValue(astroIcons["sunrise"], formatTz(sunrise, "HH:mm")),
    initIconWithValue(astroIcons["sunset"], formatTz(sunset, "HH:mm"))
  );

  return div;
}

function initMoonriseAndMoonsetContent(subdata) {
  const moonrise = subdata.moonrise;
  const moonset = subdata.moonset;

  if (moonrise == null || moonset == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "flex-list",
    "sunriseAndSunset",
  ]);

  div.append(
    initIconWithValue(astroIcons["moonrise"], formatTz(moonrise, "HH:mm")),
    initIconWithValue(astroIcons["moonset"], formatTz(moonset, "HH:mm"))
  );

  return div;
}

// Helper functions

function initIcon(icon) {
  const div = initDiv(getCssClass("otherConditionIconDiv"));
  setAnimation(div, icon);
  return div;
}

function initValue(valStr) {
  const div = initDiv(getCssClass("otherConditionValueDiv"));

  const [value, ...units] = valStr.split(" ");

  div.append(
    initP(getCssClass("otherConditionValue"), null, value),
    initP(getCssClass("otherConditionValueUnit"), null, units)
  );

  div.classList.add(`x${Math.min(5, value.length)}`);

  return div;
}

function initIconWithValue(icon, value) {
  const dataDiv = initDiv(getCssClass("otherConditionIconWithValueDiv"));
  dataDiv.append(
    initIcon(icon),
    initP(getCssClass("otherConditionIconWithValueValue"), null, value)
  );
  return dataDiv;
}

function initValueSmall(valueStr, pretext = "", posttext = "") {
  const div = initDiv(getCssClass("otherConditionValueSmallDiv"));
  div.append(
    initP(getCssClass("otherConditionValueSmallPre"), null, pretext),
    initP(getCssClass("otherConditionValueSmall"), null, valueStr),
    initP(getCssClass("otherConditionValueSmallPost"), null, posttext)
  );
  return div;
}
