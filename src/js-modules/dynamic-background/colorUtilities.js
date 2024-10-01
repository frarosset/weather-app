export function getCssRgb(rgbArr) {
  return `rgb(${rgbArr.join(",")})`;
}

export function getCssGradient(rgbGradient) {
  const gradientString = rgbGradient
    .map((stop) => {
      const [rgbArr, perc] = stop;
      return `${getCssRgb(rgbArr)} ${perc}%`;
    })
    .join(",");
  return `linear-gradient(to bottom, ${gradientString})`;
}

export function rgbToHsv([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min; // chroma

  let h;
  if (delta === 0) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
  }

  const s = max === 0 ? 0 : delta / max;

  const v = max;

  return [h, s, v];
}

export function hsvToRgb([h, s, v]) {
  let r, g, b;
  h /= 360;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
      break;
  }

  return [r, g, b].map((x) => Math.round(x * 255));
}

export function interpolateColor(col1, col2, factor) {
  return col1.map((c, i) => c + factor * (col2[i] - c));
}

export function interpolateGradient(gradient1, gradient2, factor) {
  // this assumes the stop percentages match between the colors
  return gradient1.map(([color1, percentage1], idx) => {
    const [color2, percentage2] = gradient2[idx];
    const interpolatedColor = interpolateColor(color1, color2, factor);
    if (percentage1 != percentage2) throw new Error();
    return [interpolatedColor, percentage1];
  });
}
