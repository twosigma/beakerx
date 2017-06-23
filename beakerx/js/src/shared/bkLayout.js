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
  setBeakerxFonts: setBeakerxFonts
};

// -----------

function setBeakerxFonts() {
  var codeMirrorLine = document.getElementsByClassName('CodeMirror-line')[0];
  var renderedHtml = document.getElementsByClassName('rendered_html')[0];
  var outputArea = document.getElementsByClassName('output_text')[0];
  var outputAreaPre = outputArea && outputArea.getElementsByTagName('pre')[0];

  if (codeMirrorLine && _elementHasFontFamily(codeMirrorLine, 'monospace')) {
    _setFontFamilyForSelector('.CodeMirror pre', 'Roboto Mono');
  }

  if (renderedHtml && _elementHasFontFamily(renderedHtml, '"Helvetica Neue", Helvetica, Arial, sans-serif')) {
    _setFontFamilyForSelector('.rendered_html, .cm-header-1, .cm-header-2, .cm-header-3, .cm-header-4, .cm-header-5, .cm-header-6', 'Lato');
    _setFontFamilyForSelector('.rendered_html pre, .rendered_html code', 'Roboto Mono');
  }

  if (outputAreaPre && _elementHasFontFamily(outputAreaPre, 'monospace')) {
    _setFontFamilyForSelector('.output_area pre', 'Roboto Mono');
  }
}

// -----------

function _setFontFamilyForSelector(cssSelector, fontFamily) {
  var styleString = cssSelector + ' {font-family: '+fontFamily+'}';
  var styleElem = document.createElement('style');

  styleElem.type='text/css';
  styleElem.appendChild(document.createTextNode(styleString));

  document.getElementsByTagName('head')[0].appendChild(styleElem);
}

function _elementHasFontFamily(element, fontFamily) {
  var computedStyle = window.getComputedStyle(element);
  var currentFontFamily = computedStyle.getPropertyValue('font-family');
  console.log('currentFontFamily', currentFontFamily);
  return currentFontFamily === fontFamily;
}
