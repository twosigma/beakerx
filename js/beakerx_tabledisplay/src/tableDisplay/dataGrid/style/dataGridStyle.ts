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

import './dataGrid.scss';
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import GLOBALS from "beakerx_shared/lib/bk/bkGlobals";
import {getTheme} from "beakerx_shared/lib/bk/bkHelper";

export const DEFAULT_DATA_FONT_SIZE = 13;
export const DEFAULT_BORDER_COLOR = '#D4D0D0';
export const DEFAULT_GRID_PADDING = 20;
export const DEFAULT_GRID_BORDER_WIDTH = 1;
export const MIN_COLUMN_WIDTH = 40;
export const DEFAULT_ROW_HEIGHT = 24;

export const DEFAULT_COLORS = {
  [GLOBALS.THEMES.DEFAULT]: {
    red: rgbToHex(241, 88, 84),
    blue: rgbToHex(93, 165, 218),
    green: rgbToHex(96, 189, 104)
  },
  [GLOBALS.THEMES.AMBIANCE]: {
    red: rgbToHex(191, 39, 31),
    blue: rgbToHex(46, 119, 191),
    green: rgbToHex(75, 160, 75)
  }
};

export function rgbToHex(r, g, b) {
  return formatColor(CommonUtils.rgbaToHex(r, g, b));
}

// Darken function for color in 'rgb(r, g, b)' format
export function darken(color: string, factor = 0.8): string {
  const match = color.match(/\((.*)\)/);

  if (!match) {
    return color;
  }

  const rgb: string[] = match[1].split(', ');
  const rgbArray = [
    Math.ceil(parseInt(rgb[0]) * factor),
    Math.ceil(parseInt(rgb[1]) * factor),
    Math.ceil(parseInt(rgb[2]) * factor)
  ];

  return rgbToHex(rgbArray[0],rgbArray[1],rgbArray[2]);
}

export function getDefaultColor(color) {
  return DEFAULT_COLORS[getTheme()][color];
}

export function formatColor(hexColor) {
  //remove alpha
  return hexColor.length > 7 ? '#' + hexColor.substr(3) : hexColor;
}
