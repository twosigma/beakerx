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

var commonUtils = require('./../plot/commonUtils');
var _ = require('underscore');

module.exports = {
  generateId: function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if (_.isUndefined(length)) {
      length = 6;
    }
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  applyTimezone: function(timestamp, tz) {
    return commonUtils.applyTimezone(timestamp, tz);
  },
  formatTimestamp: function(timestamp, tz, format) {
    return commonUtils.formatTimestamp(timestamp, tz, format);
  },
  rgbaToHex: function (r, g, b, a) {
    if(a == undefined){
      a = 0xFF;
    }
    var num = ((a & 0xFF) << 24) |
              ((r & 0xFF) << 16) |
              ((g & 0xFF) << 8)  |
              ((b & 0xFF));
    if(num < 0) {
      num = 0xFFFFFFFF + num + 1;
    }
    return "#" + num.toString(16);
  },
  timeout: function(fn, ms) {
    return setTimeout(fn, ms);
  },
  newDeferred: function() {
    return jQuery.Deferred();
  }
};
