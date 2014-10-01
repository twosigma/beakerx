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
  var World = this;

  this.Widgets.Cell = this.Widget.extend({
    root: 'bk-cell',
    toggleMenu: function() {
      var _this = this;

      return new World.Widgets.NotebookDebugger().close()
      .then(function() {
        return _this.click(".toggle-menu .cell-dropdown");
      });
    },

    toggleInsetCellMenu: function() {
      var _this = this;

      return new World.Widgets.NotebookDebugger().close()
      .then(function() {
        return _this.hover('bk-new-cell-menu');
      })
      .then(function() {
        return _this.click(".insert-cell-indicator");
      });
    }
  })
}
