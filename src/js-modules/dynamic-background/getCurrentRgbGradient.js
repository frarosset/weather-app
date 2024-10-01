import { gradients } from "./sampleDayGradients.js";

export function getCurrentRgbGradient(currentData) {
  const nowMin = currentData.datetimeMin;
  const nowHour = Math.floor(nowMin / 60);

  return gradients[nowHour];
}
