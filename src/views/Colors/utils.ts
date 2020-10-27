// Referrence：https://qastack.cn/software/44929/color-schemes-generation-theory-and-algorithms

export const rgb2Hex = (r: number, g: number, b: number): string => {
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export function HSVtoRGB(h: number, s: number, v: number) {
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

interface HSVOptionsType {
  DEBUG: boolean;
  bgS: number;
  bgV: number;
  fgS: number;
  fgV: number;
}
const defaultOptions: HSVOptionsType = {
  DEBUG: false,
  bgS: 0.1,
  bgV: 1,
  fgS: 0.6,
  fgV: 0.6
};
export const generateFromHSV = (hue: number, options: HSVOptionsType) => {
  options = Object.assign({}, defaultOptions, options || {});

  const n = typeof hue === "number" ? hue : Math.random();

  const bgColor = HSVtoRGB(n, options.bgS, options.bgV);
  const textColor = HSVtoRGB(n, options.fgS, options.fgV);
  options.DEBUG && console.log(n, options, bgColor, textColor);

  return {
    bgColor: {
      ...bgColor,
      hex: rgb2Hex(bgColor.r, bgColor.g, bgColor.b)
    },
    textColor: {
      ...textColor,
      hex: rgb2Hex(textColor.r, textColor.g, textColor.b)
    }
  };
};

export const colorFormatter = (color: { r: number; g: number; b: number }) => {
  // return `colorList.add(new Color(0x${color.r
  //   .toString(16)
  //   .padStart(2, "0")}, 0x${color.g
  //   .toString(16)
  //   .padStart(2, "0")}, 0x${color.b.toString(16).padStart(2, "0")}));\r\n`;

  return `${rgb2Hex(color.r, color.g, color.b)}`;
};
