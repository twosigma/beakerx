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
declare global{
 interface Window {
   chrome: any;
 }
}

import GLOBALS from './bkGlobals';
import bkCoreManager from './bkCoreManager';

const plotColors = [
  "#FF1F77B4", // blue
  "#FFFF7F0E", // orange
  "#FF2CA02C", // green
  "#FFD62728", // red
  "#FF9467BD", // purple
  "#FF8C564B", // brown
  "#FFE377C2", // pink
  "#FF7F7F7F", // gray
  "#FFBCBD22", // pear
  "#FF17BECF",  // aqua
  "#FFAEC7E8",
  "#FFFFBB78",
  "#FF98DF8A",
  "#FFFF9896",
  "#FFC5B0D5",
  "#FFC49C94",
  "#FFF7B6D2",
  "#FFC7C7C7",
  "#FFDBDB8D",
  "#FF9EDAE5"
];

export const defaultPlotColors = {
  [GLOBALS.THEMES.DEFAULT]: [...plotColors],
  [GLOBALS.THEMES.AMBIANCE]: [...plotColors]
};

export function getCurrentApp() {
  return bkCoreManager.getBkApp();
}

export const isChrome = !!window.chrome && !!window.chrome.webstore;

export function getTheme() {
  return bkCoreManager.getTheme();
}

export function getBeakerObject() {
  if (getCurrentApp() && getCurrentApp().getBeakerObject) {
    return getCurrentApp().getBeakerObject();
  }

  return {};
}

export default {
  isChrome,
  defaultPlotColors,
  getTheme,
  getBeakerObject
}
