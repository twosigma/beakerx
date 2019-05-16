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

import * as _ from 'underscore';

const commonUtils = require('./../plot/commonUtils');

export function generateId(length): string {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let textArray: string[] = [];

  if (_.isUndefined(length)) {
    length = 6;
  }

  for (let i = 0; i < length; i++) {
    textArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }

  return textArray.join('');
}

export function applyTimezone(timestamp, tz) {
  return commonUtils.applyTimezone(timestamp, tz);
}

export function formatTimestamp(timestamp, tz, format) {
  return commonUtils.formatTimestamp(timestamp, tz, format);
}

export function rgbaToHex(r, g, b, a?): string {
  if(a == undefined){
    a = 0xFF;
  }

  let num = ((a & 0xFF) << 24) |
            ((r & 0xFF) << 16) |
            ((g & 0xFF) << 8)  |
            ((b & 0xFF));
  if(num < 0) {
    num = 0xFFFFFFFF + num + 1;
  }

  return `#${num.toString(16)}`;
}

export function formatBytes(bytes: number): string {
  if (bytes <= 1000) return '0 KB';

  let k = 1000;
  let dm = 0;
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default {
  generateId,
  applyTimezone,
  formatTimestamp,
  rgbaToHex,
  formatBytes
}
