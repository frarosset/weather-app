import getUnit from "./getUnit.js";

const properties = [
  "tempmax",
  "tempmin",
  "temp",
  "feelslike",
  "umidity",
  "dew",
  "precip",
  "precipprob",
  "preciptype",
  "snow",
  "snowdepth",
  "pressure",
  "cloudcover",
  "visibility",
  "windgust",
  "windspeed",
  "winddir",
  "moonphase",
  "solarradiation",
  "uvindex",
  "conditions",
  "description",
  "icon",
];
const dates = ["datetime", "sunrise", "sunset"];

const alertProperties = ["event", "headline", "link", "description"];
const alertDates = ["onset", "ends"];

export default function processResponseData(response, unitGroup) {
  const data = {};

  data.location = response.resolvedAddress;
  data.descriptionWeek = response.description; // a seven day outlook description

  // Current conditions
  data.current = processCurrentConditions(
    response.currentConditions,
    unitGroup
  );

  // Day forecast
  data.days = processDailyConditions(response.days, unitGroup);

  // Extract info on next 24 hours
  data.next24Hours = extractNext24HoursConditions(
    data.current.datetime,
    data.days
  );

  // Alerts info (array of objects)
  data.alerts = processAlerts(response.alerts);

  return data;
}

// Processing functions ---------------------------------------------

function processAlerts(alertResponse) {
  const alertArray = [];

  alertResponse.forEach((alert) => {
    const alertObj = Object.assign(
      {},
      processProperties(alertProperties, alert),
      processProperties(alertDates, alert, "date")
    );

    alertArray.push(alertObj);
  });

  return alertArray;
}

function processBase(responseSubObj, unitGroup) {
  const obj = Object.assign(
    {},
    processProperties(properties, responseSubObj), // original values
    processProperties(properties, responseSubObj, false, unitGroup), // converted to string, when unit group is specified
    processProperties(dates, responseSubObj, true)
  );

  return obj;
}

function processCurrentConditions(currentResponse, unitGroup) {
  const obj = processBase(currentResponse, unitGroup);

  // add information about current hour
  obj.isDay =
    obj.datetimeMin >= obj.sunriseMin && obj.datetimeMin <= obj.sunsetMin;

  return obj;
}

function processDailyConditions(dailyResponseArr, unitGroup) {
  const arr = [];

  dailyResponseArr.forEach((dailyResponse) => {
    const obj = processBase(dailyResponse, unitGroup);

    obj.hours = processHourlyConditions(dailyResponse.hours, unitGroup, obj);

    arr.push(obj);
  });

  return arr;
}

function processHourlyConditions(hourlyResponseArr, unitGroup, dayObj) {
  const arr = [];

  hourlyResponseArr.forEach((hourlyResponse) => {
    const obj = processBase(hourlyResponse, unitGroup);

    // add information about current hour
    obj.isDay =
      obj.datetimeMin >= dayObj.sunriseMin &&
      obj.datetimeMin <= dayObj.sunsetMin;

    arr.push(obj);
  });

  return arr;
}

function extractNext24HoursConditions(now, dailyData) {
  const nowHour = now.getHours();
  const todayHourly = dailyData[0].hours;
  const tomorrowHourly = dailyData[1].hours;

  const arr = [
    ...todayHourly.slice(nowHour),
    ...tomorrowHourly.slice(0, nowHour + 1),
  ];

  return arr;
}

// Helper functions -------------------------------------------------

function processProperties(propArr, responseSubObj, isDate, unitGroup = null) {
  const obj = {};
  propArr.forEach((prop) => {
    const responsePropName = `${prop}${isDate ? "Epoch" : ""}`;
    const propName = `${prop}${unitGroup != null ? "Str" : ""}`;

    const propTransform = (responseProp) => {
      if (isDate) {
        return new Date(responseProp * 1000);
      } else if (unitGroup != null) {
        const unit = getUnit(prop, unitGroup);
        return `${responseProp}${unit != null ? unit : ""}`;
      } else {
        return responseProp;
      }
    };

    const responseProp = responseSubObj[responsePropName];
    if (responseProp != null) {
      // Provide alternative string form for some values (this occurs when unitGroup is spedified)
      if (unitGroup != null) {
        if (prop === "winddir") {
          obj[propName] = getWinddirAltStr(responseSubObj.winddir);
          return obj;
        } else if (prop === "moonphase") {
          [obj[propName], obj["moonphaseIconStr"]] = getMoonphaseAltStr(
            responseSubObj.moonphase
          );
          return obj;
        }
      }

      obj[propName] = propTransform(responseProp);

      if (isDate) {
        obj[`${propName}Min`] =
          obj[propName].getHours() * 60 + obj[propName].getMinutes();
      }
    }
  });
  return obj;
}

const getWinddirAltStr = (angle) => {
  // see: https://stackoverflow.com/a/7490772
  const labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const N = labels.length;
  const deltaAngle = 360 / N;
  const val = Math.floor(angle / deltaAngle + 0.5);

  return labels[val % N];
};

const getMoonphaseAltStr = (moonphase) => {
  // 0        – new moon
  // 0-0.25   – waxing crescent
  // 0.25     – first quarter
  // 0.25-0.5 – waxing gibbous
  // 0.5      – full moon
  // 0.5-0.75 – waning gibbous
  // 0.75     – last quarter
  // 0.75-1   – waning crescent

  const phasesInfo = [
    ["is", 0, "new moon", "moon-new"],
    ["in", [0, 0.25], "waxing crescent", "moon-waxing-crescent"],
    ["is", 0.25, "first quarter", "moon-first-quarter"],
    ["in", [0.25, 0.55], "waxing gibbous", "moon-waxing-gibbous"],
    ["is", 0.5, "full moon", "moon-full"],
    ["in", [0.5, 0.755], "waning gibbous", "moon-waning-gibbous"],
    ["is", 0.75, "last quarter", "moon-last-quarter"],
    ["in", [0.75, 15], "waning crescent", "moon-waning-crescent"],
  ];

  const check = {
    is: (moonphase, val) => moonphase === val,
    in: (moonphase, [val1, val2]) => moonphase > val1 && moonphase < val2,
  };

  for (const info of phasesInfo) {
    if (check[info[0]](moonphase, info[1])) {
      return [info[2], info[3]];
    }
  }
  return ["", ""];
};
