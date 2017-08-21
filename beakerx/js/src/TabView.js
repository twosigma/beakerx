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

var TabModel = widgets.TabModel.extend({
  _model_name : 'TabModel',
  _view_name : 'TabView',
  _model_module : 'beakerx',
  _view_module : 'beakerx'
});

var TabView = widgets.TabView.extend({
  render: function() {
    TabView.__super__.render.apply(this);
    this.$el.addClass('beaker-tab-view');
  },
  _onTabChanged: function(tabBar, tabs) {
    TabView.__super__._onTabChanged.apply(this, arguments);
    this._triggerSelectEventForChildren(tabs.currentIndex);
  },
  _triggerSelectEventForChildren: function(currentIndex) {
    if (this.childrenViews._models && this.childrenViews._models.length) {
      var currentModel = this.childrenViews._models[currentIndex];
      if (currentModel && currentModel.trigger) {
        currentModel.trigger('beakerx-tabSelected');
      }
    }
  }
});

module.exports = {
  TabModel: TabModel,
  TabView: TabView
};
