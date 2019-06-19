/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import bkHelper from "../../../../beakerx_shared/src/bk/bkHelper";
import CommonUtils from "../../../../beakerx_shared/src/utils/CommonUtils";

enum ColorHexes {
  aliceblue            = "#f0f8ff",
  antiquewhite         = "#faebd7",
  aqua                 = "#00ffff",
  aquamarine           = "#7fffd4",
  azure                = "#f0ffff",
  beige                = "#f5f5dc",
  bisque               = "#ffe4c4",
  black                = "#000000",
  blanchedalmond       = "#ffebcd",
  blue                 = "#0000ff",
  blueviolet           = "#8a2be2",
  brown                = "#a52a2a",
  burlywood            = "#deb887",
  cadetblue            = "#5f9ea0",
  chartreuse           = "#7fff00",
  chocolate            = "#d2691e",
  coral                = "#ff7f50",
  cornflowerblue       = "#6495ed",
  cornsilk             = "#fff8dc",
  crimson              = "#dc143c",
  cyan                 = "#00ffff",
  darkblue             = "#00008b",
  darkcyan             = "#008b8b",
  darkgoldenrod        = "#b8860b",
  darkgray             = "#a9a9a9",
  darkgreen            = "#006400",
  darkkhaki            = "#bdb76b",
  darkmagenta          = "#8b008b",
  darkolivegreen       = "#556b2f",
  darkorange           = "#ff8c00",
  darkorchid           = "#9932cc",
  darkred              = "#8b0000",
  darksalmon           = "#e9967a",
  darkseagreen         = "#8fbc8f",
  darkslateblue        = "#483d8b",
  darkslategray        = "#2f4f4f",
  darkturquoise        = "#00ced1",
  darkviolet           = "#9400d3",
  deeppink             = "#ff1493",
  deepskyblue          = "#00bfff",
  dimgray              = "#696969",
  dodgerblue           = "#1e90ff",
  firebrick            = "#b22222",
  floralwhite          = "#fffaf0",
  forestgreen          = "#228b22",
  fuchsia              = "#ff00ff",
  gainsboro            = "#dcdcdc",
  ghostwhite           = "#f8f8ff",
  gold                 = "#ffd700",
  goldenrod            = "#daa520",
  gray                 = "#808080",
  green                = "#008000",
  greenyellow          = "#adff2f",
  honeydew             = "#f0fff0",
  hotpink              = "#ff69b4",
  indianred            = "#cd5c5c",
  indigo               = "#4b0082",
  ivory                = "#fffff0",
  khaki                = "#f0e68c",
  lavender             = "#e6e6fa",
  lavenderblush        = "#fff0f5",
  lawngreen            = "#7cfc00",
  lemonchiffon         = "#fffacd",
  lightblue            = "#add8e6",
  lightcoral           = "#f08080",
  lightcyan            = "#e0ffff",
  lightgoldenrodyellow = "#fafad2",
  lightgrey            = "#d3d3d3",
  lightgreen           = "#90ee90",
  lightpink            = "#ffb6c1",
  lightsalmon          = "#ffa07a",
  lightseagreen        = "#20b2aa",
  lightskyblue         = "#87cefa",
  lightslategray       = "#778899",
  lightsteelblue       = "#b0c4de",
  lightyellow          = "#ffffe0",
  lime                 = "#00ff00",
  limegreen            = "#32cd32",
  linen                = "#faf0e6",
  magenta              = "#ff00ff",
  maroon               = "#800000",
  mediumaquamarine     = "#66cdaa",
  mediumblue           = "#0000cd",
  mediumorchid         = "#ba55d3",
  mediumpurple         = "#9370d8",
  mediumseagreen       = "#3cb371",
  mediumslateblue      = "#7b68ee",
  mediumspringgreen    = "#00fa9a",
  mediumturquoise      = "#48d1cc",
  mediumvioletred      = "#c71585",
  midnightblue         = "#191970",
  mintcream            = "#f5fffa",
  mistyrose            = "#ffe4e1",
  moccasin             = "#ffe4b5",
  navajowhite          = "#ffdead",
  navy                 = "#000080",
  oldlace              = "#fdf5e6",
  olive                = "#808000",
  olivedrab            = "#6b8e23",
  orange               = "#ffa500",
  orangered            = "#ff4500",
  orchid               = "#da70d6",
  palegoldenrod        = "#eee8aa",
  palegreen            = "#98fb98",
  paleturquoise        = "#afeeee",
  palevioletred        = "#d87093",
  papayawhip           = "#ffefd5",
  peachpuff            = "#ffdab9",
  peru                 = "#cd853f",
  pink                 = "#ffc0cb",
  plum                 = "#dda0dd",
  powderblue           = "#b0e0e6",
  purple               = "#800080",
  red                  = "#ff0000",
  rosybrown            = "#bc8f8f",
  royalblue            = "#4169e1",
  saddlebrown          = "#8b4513",
  salmon               = "#fa8072",
  sandybrown           = "#f4a460",
  seagreen             = "#2e8b57",
  seashell             = "#fff5ee",
  sienna               = "#a0522d",
  silver               = "#c0c0c0",
  skyblue              = "#87ceeb",
  slateblue            = "#6a5acd",
  slategray            = "#708090",
  snow                 = "#fffafa",
  springgreen          = "#00ff7f",
  steelblue            = "#4682b4",
  tan                  = "#d2b48c",
  teal                 = "#008080",
  thistle              = "#d8bfd8",
  tomato               = "#ff6347",
  turquoise            = "#40e0d0",
  violet               = "#ee82ee",
  wheat                = "#f5deb3",
  white                = "#ffffff",
  whitesmoke           = "#f5f5f5",
  yellow               = "#ffff00",
  yellowgreen          = "#9acd32"
}

export default class PlotColorUtils {

  public static colorToHex(color: string): string | null {
    return ColorHexes[color.toLowerCase() as keyof typeof ColorHexes] || null;
  }

  public static getDefaultColor(i: number): string {
    let themeColors = bkHelper.defaultPlotColors[bkHelper.getTheme()];
    return i < themeColors.length ? themeColors[i] : this.createNiceColor(i);
  }

  public static createColor(hexstr: string, opacity: number = 1.0): string {
    let out: string = hexstr;
    if (hexstr === "none") {
      return "none";
    }
    if (hexstr === null || hexstr === undefined) {
      out = "#000000";
    }
    if (out[0] !== '#') {
      out = this.colorToHex(hexstr) || "#000000";
    }

    let r = parseInt(out.substr(1, 2), 16);
    let g = parseInt(out.substr(3, 2), 16);
    let b = parseInt(out.substr(5, 2), 16);

    return `rgba(${r},${g},${b},${opacity})`;
  }

  private static createNiceColor(n: number): string {
    let hue = n * 157.5 / 360;
    let saturation = 0.75 + Math.cos(n) / 4;
    let value = 7 / 8 + Math.cos(n / 5.1) / 8;

    let rgb = this.hsvToRgb(hue, saturation, value);

    return CommonUtils.rgbaToHex(rgb[0], rgb[1], rgb[2]);
  }

  //http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
  private static hsvToRgb(h: number, s: number, v: number): [number, number, number] {
    let r = 0, g = 0, b = 0;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return [r * 255, g * 255, b * 255];
  }

}