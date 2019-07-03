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
import * as _ from 'underscore';
import PlotLayout from "./plot/PlotLayout";
import PlotScope from "./plot/PlotScope";
import CombinedPlotScope from "./plot/CombinedPlotScope";

const OUTUPT_POINTS_LIMIT = 1000000;
const OUTUPT_POINTS_PREVIEW_NUMBER = 10000;

export class PlotModel extends widgets.DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),_model_name : 'PlotModel',
      _view_name : 'PlotView',
      _model_module : 'beakerx',
      _view_module : 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    }
  }
}

export class PlotView extends widgets.DOMWidgetView {
  private _currentScope: any;
  render() {
    this._currentScope = null;

    this.displayed.then(() => {
      const plotModel = this.model.get('model');
      const type = plotModel.type || 'Text';

      this.limitPoints(plotModel);

      switch (type) {
        case 'CombinedPlot':
          this.initCombinedPlot(plotModel);
          break;
        default:
          this.initStandardPlot(plotModel);
          break;
      }

      this.listenTo(this.model, 'change:updateData', this.handleUpdateData);
      this.listenTo(this.model, 'change:model', this.handleModelUpdate);
      this.listenTo(this.model, 'beakerx-tabSelected', () => {
        this._currentScope.adjustModelWidth();
      });

      this.on('remove', () => {
        if (this._currentScope instanceof CombinedPlotScope) {
          this._currentScope.scopes.forEach(function(scope) {
            scope.destroy();
          });
        } else if (this._currentScope) {
          this._currentScope.destroy();
        }
        setTimeout(() => { this._currentScope = null; });
      });
    });
  }

  getNumberOfPointsForPlot(plotModel) {
    switch(plotModel.type) {
      case "Histogram":
        return Math.max.apply(null, plotModel.graphics_list.map((graphic) => {
          return graphic.length;
        }));
      default:
        return Math.max.apply(null, plotModel.graphics_list.map((graphic) => {
          const points = graphic.x ? graphic.x : graphic.y;

          return points ? points.length : 0;
        }));
    }
  }

  truncatePointsForPlot(plotModel) {
    switch(plotModel.type) {
      case "Histogram":
        plotModel.graphics_list.forEach((graphic) => {
          graphic = graphic.slice(0, OUTUPT_POINTS_PREVIEW_NUMBER);
        });
        break;
      default:
        plotModel.graphics_list.forEach((graphic) => {
          if (graphic.x && graphic.y) {
            graphic.x = graphic.x.slice(0, OUTUPT_POINTS_PREVIEW_NUMBER);
            graphic.y = graphic.y.slice(0, OUTUPT_POINTS_PREVIEW_NUMBER);
          }
        });
    }
  }

  limitPoints(plotModel) {
    let numberOfPoints;

    if (!_.isArray(plotModel.graphics_list)) {
      return;
    }

    if (!plotModel.plots) {
      numberOfPoints = this.getNumberOfPointsForPlot(plotModel);
      this.limitPointsForPlot(plotModel, numberOfPoints);

      return;
    }

    numberOfPoints = Math.max.apply(plotModel.plots.map(this.getNumberOfPointsForPlot));
    plotModel.plots.forEach((standardPlotModel) => {
      this.limitPointsForPlot(standardPlotModel, numberOfPoints);
    });
  }

  limitPointsForPlot(plotModel, numberOfPoints) {
    this.truncatePointsForPlot(plotModel);

    plotModel.numberOfPoints = numberOfPoints;
    plotModel.outputPointsLimit = OUTUPT_POINTS_LIMIT;
    plotModel.outputPointsPreviewNumber = OUTUPT_POINTS_PREVIEW_NUMBER;
  }

  handleModelUpdate() {
    const newModel = this.model.get('model');
    this._currentScope.updateModelData && this._currentScope.updateModelData(newModel);
    this._currentScope.updatePlot();
  }

  handleUpdateData() {
    const change = this.model.get('updateData');
    const currentModel = this.model.get('model');
    const updatedModel = _.extend(currentModel, change);
    this.model.set('model', updatedModel, {updated_view: this});
    this.handleModelUpdate();
  }

  initStandardPlot(model) {
    const wrapperId = `wrap_${this.model.model_id}`;
    this._currentScope = new PlotScope(wrapperId);
    const tmpl = PlotLayout.buildTemplate(wrapperId);
    const tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    this._currentScope.setWidgetModel(this.model);
    this._currentScope.setElement(tmplElement.children('.dtcontainer'));
    this._currentScope.setModelData(model);
    this._currentScope.setWidgetView(this);
    this._currentScope.init(this.model);
  }

  initCombinedPlot(model) {
    this._currentScope = new CombinedPlotScope(`wrap_${this.id}`);
    const tmpl = this._currentScope.buildTemplate();
    const tmplElement = $(tmpl);
    
    tmplElement.appendTo(this.$el);
    
    this._currentScope.setModelData(model);
    this._currentScope.setElement(tmplElement);
    this._currentScope.setWidgetView(this);
    this._currentScope.init(this.model);
  }
}

export default {
  PlotModel,
  PlotView
};
