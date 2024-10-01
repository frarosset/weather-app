import { gradients } from "./sampleDayGradients.js";
import { interpolateGradient } from "./colorUtilities.js";

export function getCurrentRgbGradient(currentData) {
  const nowMin = currentData.datetimeMin;
  const nowHour = Math.floor(nowMin / 60);

  const nextHour = (nowHour + 1) % 24;
  const fraction = (nowMin - nowHour * 60) / (nextHour * 60 - nowHour * 60);

  return interpolateGradient(gradients[nowHour], gradients[nextHour], fraction);
}
