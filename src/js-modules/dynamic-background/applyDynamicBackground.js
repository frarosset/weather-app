import { getCssRgb } from "./colorUtilities.js";

export default function applyDynamicBackground(propertyName, data) {
  const background = computeDynamicBackground(data);
  document.documentElement.style.setProperty(propertyName, background);
}

function computeDynamicBackground(data) {
  const rgbColor = data.current.isDay ? [255, 215, 0] : [0, 128, 128];

  return getCssRgb(rgbColor); // todo
}
