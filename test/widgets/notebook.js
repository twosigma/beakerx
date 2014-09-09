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

      return this.click(".bk-section-title")
      .then(function() {
        // Since this is a content-editable
        // type, we have to do a bit of work
        // to bypass the normal input filling.
        return _this.find('.bk-section-title').then(function(el) {
          return el.sendKeys(text);
        });
      })
      .then(function() {
        return _this.click(".bk-section-title");
      });
    },

    readHeadline: function() {
      return this.read(".bk-section-title");
    }
  });
}
