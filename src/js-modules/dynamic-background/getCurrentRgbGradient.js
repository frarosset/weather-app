import { gradients, srIdx, ssIdx } from "./sampleDayGradients.js";
import { interpolateGradient } from "./colorUtilities.js";

export function getCurrentRgbGradient(timeData) {
  const m = timeData.m;
  const sr = timeData.sr;
  const ss = timeData.ss;

  // Get the part of the day (string)
  // Calculations reported next depends on that
  const partOfDay = getPartOfDay(m, sr, ss);
  const fractionInPartOfDay = getFractionInPartOfDay(m, sr, ss, partOfDay);
  const [gradient, gradientNext, factor] = getDataForInterpolation(
    fractionInPartOfDay,
    partOfDay
  );

  return interpolateGradient(gradient, gradientNext, factor);
}

function getPartOfDay(m, sr, ss) {
  if (m >= sr && m <= ss) {
    return "day";
  } else if (m < sr) {
    return "latenight";
  } else {
    return "earlynight";
  }
}

function fractionInRange(x, [a, b]) {
  return (x - a) / (b - a);
}

function getFractionInPartOfDay(m, sr, ss, partOfDay) {
  const M = 1440; // minutes in the day

  let range;

  switch (partOfDay) {
    case "latenight":
      range = [ss - M, sr];
      break;
    case "day":
      range = [sr, ss];
      break;
    case "earlynight":
      range = [ss, M + sr];
      break;
  }

  return fractionInRange(m, range);
}

function getIndex(fraction, [a, b]) {
  return Math.floor(fraction * (b - a)) + a;
}

function getFactor(fraction, [a, b]) {
  return (fraction * (b - a)) % 1;
}

function getDataForInterpolation(fraction, partOfDay) {
  const lastIdx = gradients.length - 1;

  let range;

  switch (partOfDay) {
    case "day":
      range = [srIdx, ssIdx];
      break;
    case "latenight":
    case "earlynight":
      range = [ssIdx, lastIdx + srIdx + 1];
      break;
  }

  const gradientIdx = getIndex(fraction, range) % gradients.length;
  const gradient = gradients[gradientIdx];

  const gradientNextIdx = (gradientIdx + 1) % gradients.length;
  const gradientNext = gradients[gradientNextIdx];

  const factor = getFactor(fraction, range);

  // console.log(partOfDay, fraction, gradientIdx, gradientNextIdx, factor);

  return [gradient, gradientNext, factor];
}
