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

var jsdom = require('jsdom');

global.window = new jsdom.JSDOM().window;
global.document = window.document;
global.Element = window.Element;
global.HTMLElement = window.HTMLElement;
global.HTMLSpanElement = window.HTMLSpanElement;
global.HTMLInputElement = window.HTMLInputElement;

window.HTMLCanvasElement.prototype.getContext = function() {
  return {};
};

global.navigator = window.navigator;
global.define = function() {};
