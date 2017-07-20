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

var interval = undefined;
var period = undefined;
var currentWidgetIndex = 0;

var CyclingDisplayBoxModel = widgets.BoxModel.extend({
  _model_name : 'CyclingDisplayBoxModel',
  _view_name : 'CyclingDisplayBoxView',
  _model_module : 'beakerx',
  _view_module : 'beakerx'
});

var CyclingDisplayBoxView = widgets.BoxView.extend({
  
  initialize: function() {
    CyclingDisplayBoxView.__super__.initialize.apply(this, arguments);
    period = this.model.get("period");
  },

  update_children: function() {
    that = this;
    if(interval){
      clearInterval(interval); 
    }

    that.draw_widget();
    if(period){
      interval = setInterval(function() {
        var max = that.model.get('children').length - 1; 
        if(currentWidgetIndex >= max){
          currentWidgetIndex = 0;
        }else{
          currentWidgetIndex++;
        }
        that.draw_widget();
        
      }, period);
    } 
  },
  
  draw_widget: function() {
    var element = this.model.get('children')[currentWidgetIndex];
    if(element && this.children_views){
      this.children_views.update([element]);
    }
  },
  

});

module.exports = {
  CyclingDisplayBoxView: CyclingDisplayBoxView,
  CyclingDisplayBoxModel: CyclingDisplayBoxModel
};