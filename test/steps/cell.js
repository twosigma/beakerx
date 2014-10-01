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
  this.When(/^I click the '(\d+)' cell menu$/, function(index) {
    var _this = this;

    return new this.Widgets.NotebookDebugger()
    .close()
    .then(function() {
      return new _this.Widgets.Cell({
        root: 'bk-section-cell bk-cell:nth-child('+index+')'
      }).toggleMenu();
    });
  });

  this.Then(/^I should see a open cell menu$/, function() {
    return new this.Widgets.CellMenu().find();
  });

  this.When(/^I toggle the cells input display$/, function() {
    var _this = this;

    return new this.Widgets.NotebookDebugger()
    .close()
    .then(function() {
      return new _this.Widgets.CellMenu().toggleInputCell();
    })
  });

  this.Then(/^I should not see cell '(\d+)' input$/, function(index) {
    return new this.Widgets.CodeCell({
      root: 'bk-section-cell bk-cell:nth-child('+index+')'
    }).findInput().should.eventually.eql(0);
  });

  this.Then(/^I click the '(\d+)' insert cell menu toggle$/, function(index) {
    return new this.Widgets.Cell({
      root: 'bk-section-cell bk-cell:nth-child('+index+')'
    }).toggleInsetCellMenu();
  });

  this.Then(/^I should see a open insert cell menu on cell '(\d+)'$/, function(index) {
    return new this.Widgets.Cell({
      root: 'bk-section-cell bk-cell:nth-child('+index+')'
    })
    .find('.new-cell-menu .dropdown-menu')
    .then(function(elm) {
      return elm.isDisplayed();
    })
  });
}
