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
  this.Widgets.CodeCell = this.Widget.extend({
    evaluate: function(code, type, Driver) {
      var selector  = "document.querySelector('[evaluator-type=\""+type+"\"] .CodeMirror').CodeMirror"
      var setCode   = "return "+selector+".setValue('"+ code +"')";

      // via https://github.com/marijnh/CodeMirror/blob/eb64d4266e1395c38ac0919fe2fc49417349f2a3/test/test.js#L1133
      var evalCode = "return "+selector+".triggerOnKeyDown({type: 'keydown', keyCode: 13, ctrlKey: true})"

      return Driver.executeScript(setCode)
      .then(function() {
        return Driver.executeScript(evalCode);
      });
    },

    getResult: function() {
      return this.find('bk-output-display').then(function(elm) {
        return elm.getText();
      });
    }
  });
}
