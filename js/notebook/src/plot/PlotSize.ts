/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import * as _ from 'underscore';

export default class PlotSize {
  scope: any;

  constructor(scope) {
    this.scope = scope;

    this.resizeFunction = this.resizeFunction.bind(this);
  }

  updateModelWidth(newWidth) {
    if (this.scope.width === newWidth) {
      return;
    }

    this.scope.width = newWidth;
    this.scope.jqcontainer.css("width", newWidth );
    this.scope.jqsvg.css("width", newWidth );
    this.scope.plotRange.calcMapping(false);
    this.scope.legendDone = false;
    this.scope.legendResetPosition = true;
    this.scope.update();
  }

  getPlotWithLegendWidth() {
    const containerWidth = this.scope.jqcontainer.parents('.output_subarea').width();
    const plotWidth = containerWidth && containerWidth < this.scope.layout.plotSize.width
      ? containerWidth
      : this.scope.layout.plotSize.width;
    const legendPosition = this.scope.stdmodel.legendPosition.position;
    // Logic based on updateLegendPosition method
    const isLegendPlacedHorizontaly = (
      (["LEFT", "RIGHT"].indexOf(legendPosition) !== -1)
      || (["TOP", "BOTTOM"].indexOf(legendPosition) === -1 && this.scope.stdmodel.legendLayout === "VERTICAL")
    );

    let legendWidth = this.scope.jqlegendcontainer.find('.plot-legend').width() || 0;

    legendWidth = legendWidth ? legendWidth + this.scope.layout.legendMargin + 2 : 0;

    return isLegendPlacedHorizontaly ? plotWidth + legendWidth : plotWidth;
  }

  getPlotWithLegendHeight() {
    const containerHeight = this.scope.jqcontainer.parents('.output_subarea').height();
    const plotHeight = containerHeight && containerHeight < this.scope.layout.plotSize.height
      ? containerHeight
      : this.scope.layout.plotSize.height;
    const legendPosition = this.scope.stdmodel.legendPosition.position;
    // Logic based on updateLegendPosition method
    const isLegendPlacedHorizontaly = (
      (["LEFT", "RIGHT"].indexOf(legendPosition) !== -1)
      || (["TOP", "BOTTOM"].indexOf(legendPosition) === -1 && this.scope.stdmodel.legendLayout === "VERTICAL")
    );

    let legendHeight = this.scope.jqlegendcontainer.find('.plot-legend').height() || 0;

    legendHeight = legendHeight ? legendHeight + this.scope.layout.legendMargin + 2 : 0;

    return isLegendPlacedHorizontaly ? plotHeight : plotHeight + legendHeight;
  }

  setResizable() {
    this.scope.jqcontainer.resizable({
      maxWidth: this.scope.element.parent().width(), // no wider than the width of the cell
      minWidth: 150,
      minHeight: 150,
      handles: "e, s, se",
      resize : (event, ui) => {
        this.scope.width = ui.size.width;
        this.scope.height = ui.size.height;

        _.extend(this.scope.layout.plotSize, ui.size);

        this.scope.jqsvg.css({"width": this.scope.width, "height": this.scope.height});
        this.scope.jqplottitle.css({"width": this.scope.width });
        this.scope.numIntervals = {
          x: this.scope.width / this.scope.intervalStepHint.x,
          y: this.scope.height / this.scope.intervalStepHint.y
        };
        this.scope.plotRange.calcRange();
        this.scope.plotRange.calcMapping(false);
        this.scope.emitSizeChange();
        this.scope.legendDone = false;
        this.scope.legendResetPosition = true;

        this.scope.update();
      }
    });
  }

  resizeFunction() {
    // update resize maxWidth when the browser window resizes
    this.scope.jqcontainer.resizable("option", "maxWidth", this.scope.element.parent().width());
  };
}
