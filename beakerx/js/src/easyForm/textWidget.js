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

var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var TextModel = widgets.TextModel.extend({
  defaults: function() {
    return _.extend({}, widgets.TextModel.prototype.defaults.apply(this), {
      _view_name: "TextView",
      _model_name: "TextModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx'
    });
  }
});

var TextView = widgets.TextView.extend({
  handleKeypress: function(e) {
    if (e.keyCode == 13) {
      this.send({ event: 'submit' });
      e.preventDefault();
    }
  }
});

module.exports = {
  TextModel: TextModel,
  TextView: TextView
};
