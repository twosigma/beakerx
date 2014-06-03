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
  this.Widgets.NotebookSessionRow = this.Widget.extend({
    root: '.session',
    close: function() {
      return this.find(".close-session").click();
    },
    toObject: function() {
      return $.all([
        this.read('.id'),
        this.read('.open-date'),
        this.read('.caption'),
        this.read('.description'),
        this.read('.edited'),
      ]).then(function(data) {
        return {
          "ID": data[0],
          "Open Date": data[1],
          "Name": data[2],
          "Path": data[3],
          "Edited": data[4],
          "Operation": data[5],
        }
      });
    }
  });

  this.Widgets.OpenNotebooks = this.Widget.List.extend({
    root: '.open-notebooks table',
    itemClass: this.Widgets.NotebookSessionRow,
    toHash: function() {
      return $.map(this.items(), function(item) {
        return item.toObject();
      });
    }
  })
}
