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

import { DataGrid } from '@phosphor/datagrid';
import * as bkUtils from '../../../shared/bkUtils';

import './dataGrid.scss';

const bkHelper = require('../../../shared/bkHelper');
const GLOBALS = require('../../../shared/bkGlobals');

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
  return formatColor(bkUtils.rgbaToHex(r, g, b));
}

export function getDefaultColor(color) {
  return DEFAULT_COLORS[bkHelper.getTheme()][color];
}

export function formatColor(hexColor) {
  //remove alpha
  return hexColor.length > 7 ? '#' + hexColor.substr(3) : hexColor;
}

export const silverStripeStyle: DataGrid.IStyle = {
  ...DataGrid.defaultStyle,
  voidColor: '#ffffff',
  headerBackgroundColor: '#E6E6E6',
  rowBackgroundColor: i => i % 2 === 0 ? '#f9f9f9' : ''
};
