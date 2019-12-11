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

import widgets from './widgets';

let currentWidgetIndex = 0;

export class CyclingDisplayBoxModel extends widgets.BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: 'CyclingDisplayBoxModel',
      _view_name: 'CyclingDisplayBoxView',
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    }
  }
}

export class CyclingDisplayBoxView extends widgets.BoxView {
  private interval: any;
  private period: number;
  initialize() {
    super.initialize.apply(this, arguments);
    this.interval = undefined;
    this.period = this.model.get("period");
  }

  update_children() {
    if(this.interval){
      clearInterval(this.interval);
    }

    this.draw_widget();
    if(this.period){
      this.interval = setInterval(() => {
        let max = this.model.get('children').length - 1;

        if(currentWidgetIndex >= max){
          currentWidgetIndex = 0;
        } else {
          currentWidgetIndex++;
        }

        this.draw_widget();
      }, this.period);
    } 
  }
  
  draw_widget() {
    const element = this.model.get('children')[currentWidgetIndex];

    if(element && this.children_views){
      this.children_views.update([element])
        .then(function(views) {
          let heights = views.map((view) => {
            return view.$el.height();
          });

          views[0].$el.parent().css('min-height', Math.max.apply(null, heights));
        });
    }
  }
}

export default {
  CyclingDisplayBoxView,
  CyclingDisplayBoxModel
};