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

module.exports = {
  setFontForCodeMirror: setFontForCodeMirror
};

function setFontForCodeMirror(fontFamily) {
  var elem = document.getElementsByClassName('CodeMirror-line')[0];
  var computedStyle = window.getComputedStyle(elem);
  var currentFontFamily = computedStyle.getPropertyValue('font-family');
  var fontIsDefault = currentFontFamily === 'monospace';

  if (fontIsDefault) {
    fontFamily = fontFamily || 'Roboto Mono';

    var styleString = '.CodeMirror pre  { font-family: '+fontFamily+' }';
    var styleElem = document.createElement('style');

    styleElem.type='text/css';
    styleElem.appendChild(document.createTextNode(styleString));

    document.getElementsByTagName('head')[0].appendChild(styleElem);
  }
}