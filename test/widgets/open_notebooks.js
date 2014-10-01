var Driver = require("selenium-webdriver");

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
    root: ".session",
    close: function() {
      return this.click(".close-session");
    },
    toObject: function() {
      return Driver.Promise.all([
        this.read('.caption'),
        this.read('.open-date'),
      ]).then(function(data) {
        return {
          "Name": data[0],
          "Open Date": data[1],
        }
      });
    }
  });

  this.Widgets.OpenNotebooks = this.Widget.List.extend({
    root: '.notebook-dashboard-list',
    itemClass: this.Widgets.NotebookSessionRow,
    toHash: function() {
      return this.invoke('toObject');
    }
  })
}
