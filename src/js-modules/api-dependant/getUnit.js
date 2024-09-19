// unit measure for each data based of unitGroup
// Based on:
// - https://www.visualcrossing.com/resources/documentation/weather-data/weather-data-documentation/
// - https://www.visualcrossing.com/resources/documentation/weather-api/unit-groups-and-measurement-units/

// const temperatureUnits = {
//   us: "°F",
//   metric: "°C",
//   uk: "°C",
//   base: " K",
//   preSpace: false,
// };
const temperatureUnitsAlt = {
  us: "°", // F
  metric: "°", // C
  uk: "°", // C
  base: " K",
  preSpace: false,
};
const percentageUnits = {
  us: "%",
  metric: "%",
  uk: "%",
  base: "%",
  preSpace: false,
};
const precipitationUnits = {
  us: "inches",
  metric: "mm",
  uk: "mm",
  base: "mm",
  preSpace: true,
};
const snowUnits = {
  us: "inches",
  metric: "cm",
  uk: "cm",
  base: "cm",
  preSpace: true,
};
const windUnits = {
  us: "mph",
  metric: "kph",
  uk: "mph",
  base: "m/s",
  preSpace: true,
};
const pressureUnits = {
  us: "mb",
  metric: "mb",
  uk: "mb",
  base: "mb",
  preSpace: true,
};
const angleUnits = {
  us: "°",
  metric: "°",
  uk: "°",
  base: "°",
  preSpace: false,
};
const visibiltyUnits = {
  us: "miles",
  metric: "km",
  uk: "miles",
  base: "km",
  preSpace: true,
};
const solarRadiationUnits = {
  us: "W/m²",
  metric: "W/m²",
  uk: "W/m²",
  base: "W/m²",
  preSpace: true,
};
const solarEnergyUnits = {
  us: "MJ/m²",
  metric: "MJ/m²",
  uk: "MJ/m²",
  base: "W/m²",
  preSpace: true,
};
const noUnits = {
  us: null,
  metric: null,
  uk: null,
  base: null,
};

const unitGroupData = {
  tempmax: temperatureUnitsAlt,
  tempmin: temperatureUnitsAlt,
  temp: temperatureUnitsAlt,
  dew: temperatureUnitsAlt,
  feelslike: temperatureUnitsAlt,
  precip: precipitationUnits,
  precipprob: percentageUnits,
  precipcover: percentageUnits,
  preciptype: noUnits,
  snow: snowUnits,
  snowdepth: snowUnits,
  windspeed: windUnits,
  windgust: windUnits,
  winddir: angleUnits,
  visibility: visibiltyUnits,
  cloudcover: percentageUnits,
  humidity: percentageUnits,
  pressure: pressureUnits,
  solarradiation: solarRadiationUnits,
  solarenergy: solarEnergyUnits,
  uvindex: noUnits,
  severerisk: noUnits,
  sunrise: noUnits,
  sunset: noUnits,
  moonphase: noUnits,
  icon: noUnits,
  conditions: noUnits,
  description: noUnits,
  stations: noUnits,
};

export default function getUnit(property, unitGroup) {
  const unit = unitGroupData[property][unitGroup];

  if (unit == null) return unit;

  const preSpace = unitGroupData[property].preSpace ? " " : "";
  return `${preSpace}${unit}`;
}
