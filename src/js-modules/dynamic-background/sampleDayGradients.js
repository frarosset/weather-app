import { interpolateColor } from "./colorUtilities.js";

// The following gradient defines the colort of the sky from midnight to midnight of the next day
// It assumes clear sky conditions (eg, no cloud cover, no precipitation and maximum visibility).
// Also, there are fixed times between stops: if there are 24 stops, there is a color for each hour

// gradients values are from: https://codepen.io/zessx/pen/kyEEBK

const initialGradients = [
  [[[0, 0, 12], 100]], // .sky-gradient-00, .sky-gradient-24
  [
    [[2, 1, 17], 85],
    [[25, 22, 33], 100],
  ], // .sky-gradient-01
  [
    [[2, 1, 17], 60],
    [[32, 32, 44], 100],
  ], // .sky-gradient-02
  [
    [[2, 1, 17], 10],
    [[58, 58, 82], 100],
  ], // .sky-gradient-03
  [
    [[32, 32, 44], 0],
    [[81, 81, 117], 100],
  ], // .sky-gradient-04
  [
    [[64, 64, 92], 0],
    [[111, 113, 170], 80],
    [[138, 118, 171], 100],
  ], // .sky-gradient-05
  [
    [[74, 73, 105], 0],
    [[112, 114, 171], 50],
    [[205, 130, 160], 100],
  ], // .sky-gradient-06
  [
    [[117, 122, 191], 0],
    [[133, 131, 190], 60],
    [[234, 176, 209], 100],
  ], // .sky-gradient-07
  [
    [[130, 173, 219], 0],
    [[235, 178, 177], 100],
  ], // .sky-gradient-08
  [
    [[148, 197, 248], 1],
    [[166, 230, 255], 70],
    [[177, 181, 234], 100],
  ], // .sky-gradient-09
  [
    [[183, 234, 255], 0],
    [[148, 223, 255], 100],
  ], // .sky-gradient-10
  [
    [[155, 226, 254], 0],
    [[103, 209, 251], 100],
  ], // .sky-gradient-11
  [
    [[144, 223, 254], 0],
    [[56, 163, 209], 100],
  ], // .sky-gradient-12
  [
    [[87, 193, 235], 0],
    [[36, 111, 168], 100],
  ], // .sky-gradient-13
  [
    [[45, 145, 194], 0],
    [[30, 82, 142], 100],
  ], // .sky-gradient-14
  [
    [[36, 115, 171], 0],
    [[30, 82, 142], 70],
    [[91, 121, 131], 100],
  ], // .sky-gradient-15
  [
    [[30, 82, 142], 0],
    [[38, 88, 137], 50],
    [[157, 166, 113], 100],
  ], // .sky-gradient-16
  [
    [[30, 82, 142], 0],
    [[114, 138, 124], 50],
    [[233, 206, 93], 100],
  ], // .sky-gradient-17
  [
    [[21, 66, 119], 0],
    [[87, 110, 113], 30],
    [[225, 196, 94], 70],
    [[178, 99, 57], 100],
  ], // .sky-gradient-18
  [
    [[22, 60, 82], 0],
    [[79, 79, 71], 30],
    [[197, 117, 45], 60],
    [[183, 73, 15], 80],
    [[47, 17, 7], 100],
  ], // .sky-gradient-19
  [
    [[7, 27, 38], 0],
    [[138, 59, 18], 80],
    [[36, 14, 3], 100],
  ], // .sky-gradient-20
  [
    [[1, 10, 16], 30],
    [[89, 35, 11], 80],
    [[47, 17, 7], 100],
  ], // .sky-gradient-21
  [
    [[9, 4, 1], 50],
    [[75, 29, 6], 100],
  ], // .sky-gradient-22
  [
    [[0, 0, 12], 80],
    [[21, 8, 0], 100],
  ], // .sky-gradient-23
];

export const gradients = initGradients();

function initGradients() {
  const gradients = [...initialGradients];

  // for each gradient, add 0 and 100 (%) stops, if missing
  gradients.forEach((gradient) => {
    addStopAt0(gradient);
    addStopAt100(gradient);
  });

  // get all unique stop values present in the list
  const uniqueStopPercentages = getUniqueStopPercentages(gradients);

  // for each gradient, add the missing stops from uniqueStopPercentages
  return gradients.map((gradient) =>
    addMissingStopPercentages(gradient, uniqueStopPercentages)
  );
}

function addStopAt0(gradient) {
  const [rgbArr, percent] = gradient[0];
  if (percent !== 0) gradient.unshift([rgbArr, 0]);
}

function addStopAt100(gradient) {
  const [rgbArr, percent] = gradient[gradient.length - 1];
  if (percent !== 100) gradient.push([rgbArr, 100]);
}

function getUniqueStopPercentages(gradients) {
  const uniqueStopPercentagesSet = gradients.reduce((set, gradient) => {
    gradient.forEach((stop) => set.add(stop[1]));
    return set;
  }, new Set());

  const uniqueStopPercentages = [...uniqueStopPercentagesSet].sort(
    (a, b) => a - b
  );

  return uniqueStopPercentages;
}

function addMissingStopPercentages(gradient, uniqueStopPercentages) {
  let idx = 0; // index in gradient array
  let idxPrev = 0; // index in gradient array

  const interpolatedGradient = uniqueStopPercentages.map((stopPercentage) => {
    const [rgbArrNext, percentageNext] = gradient[idx];
    if (stopPercentage === percentageNext) {
      // same stop percentage: use this stop value
      idxPrev = idx;
      idx++;
      return [rgbArrNext, percentageNext];
    } else {
      // stop value missing: interpolate between this and the previous stop value
      const [rgbArrPrev, percentagePrev] = gradient[idxPrev];

      const factor =
        (stopPercentage - percentagePrev) / (percentageNext - percentagePrev);

      const interpolatedRgbArr = interpolateColor(
        rgbArrPrev,
        rgbArrNext,
        factor
      );

      return [interpolatedRgbArr, stopPercentage];
    }
  });

  return interpolatedGradient;
}
