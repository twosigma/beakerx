/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

module.exports = function() {
  this.Widgets.Notebook = this.Widget.extend({
    root: 'bk-notebook',

    getPluginManager: function() {
      return this.find('bk-plugin-manager');
    },

    getCells: function() {
      return this.find('bk-cell')
    },

    setHeadline: function(text) {
      var _this   = this;
      var elm     = _this.find(".bk-section-title");

      return elm.click()
      .then(function() {
        return elm.sendKeys(text);
      }).then(function() {
        return _this.click();
      })
    },

    readHeadline: function() {
      return this.read(".bk-section-title");
    }
  });
}
