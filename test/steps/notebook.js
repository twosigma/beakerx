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


function generateCell(editorName) {
  var selector        = "[evaluator-type='"+editorName+"'].evaluator-ready";
  return new this.Widgets.CodeCell({root: selector});
}

module.exports = function() {
  this.When(/^I set the headline to "([^"]*)"$/, function(title) {
    return new this.Widgets.Notebook().setHeadline(title);
  });

  this.Then(/^I should see the headline "([^"]*)"$/, function(expectedTitle) {
    return new this.Widgets.Notebook().readHeadline().should.eventually.contain(expectedTitle);
  });

  this.Then(/^The "([^"]*)" editor is ready$/, function(editorName) {
    var _this           = this;
    var originalTimeout = this.timeout;
    this.timeout        = 20000

    return generateCell.apply(this, arguments).isPresent().then(function(v) {
      if (!v) {
        throw new Error("Cell is not present");
      }

      _this.timeout = originalTimeout;
      return true;
    })
  });

  this.Given(/^I evaluate "([^"]*)" with "([^"]*)"$/, function(editorName, code) {
    return new this.Widgets.CodeCell().evaluate(code, editorName, this.driver);
  });

  this.Then(/^I should see the "([^"]*)" editor with the result "([^"]*)"$/, function(editorName, expected) {
    return generateCell.apply(this, arguments).getResult().should.eventually.equal(expected);
  });
}

