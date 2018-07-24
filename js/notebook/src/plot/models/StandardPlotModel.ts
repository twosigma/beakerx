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

import AbstractPlotModel from "./AbstractPlotModel";

export default class StandardPlotModel extends AbstractPlotModel {
  createNewModel(model) {
    let newmodel = super.createNewModel(model);

    if (model.version === "groovy") {  // model returned from serializer
      return {
        ...newmodel,
        userFocus: {},
        xAxis: {label: model.domain_axis_label},
        yAxis: {label: model.y_label, lowerMargin: model.rangeAxes[0].lower_margin, upperMargin: model.rangeAxes[0].upper_margin},
        yAxisR: model.rangeAxes.length > 1 ? {label: model.rangeAxes[1].label, lowerMargin: model.rangeAxes[1].lower_margin, upperMargin: model.rangeAxes[1].upper_margin} : null,
        orientation: model.orientation != null ? model.orientation : "VERTICAL",
        omitCheckboxes: model.omit_checkboxes,
        nanoOffset: null,
        timezone: model.timezone,
        categoryNames: model.categoryNames,
        showXGridlines: !(model.orientation !== 'HORIZONTAL' && model.type === "CategoryPlot"),
        categoryMargin: model.category_margin,
        categoryNamesLabelAngle: model.categoryNamesLabelAngle,
        cumulative: model.cumulative,
        binCount: model.bin_count,
        normed: model.normed,
        rangeMin: model.range_min,
        rangeMax: model.range_max,
        displayMode: model.displayMode != null ? model.displayMode : 'OVERLAP',
        rightClose: model.right_close,
        tips: model.tips ? model.tips : null,
        tooltips: model.tooltips ? model.tooltips : null,
        itemLabels: model.itemLabels ? model.itemLabels : null
      };
    }

    return {
      ...newmodel,
      orientation: model.orientation != null ? model.orientation : "VERTICAL",
      omitCheckboxes: model.omitCheckboxes,
      xAxis: model.xAxis != null ? model.xAxis : {},
      yAxis: model.yAxis != null ? model.yAxis : {},
      yAxisR: model.yAxisR,
      range: model.range != null ? model.range : null,
      userFocus: model.focus != null ? model.focus : {},
      xCursor: model.xCursor,
      yCursor: model.yCursor,
      timezone: model.timezone,
      categoryNames: model.categoryNames,
      showXGridlines: !(model.orientation !== 'HORIZONTAL' && model.type === "CategoryPlot"),
      categoryMargin: model.categoryMargin,
      categoryNamesLabelAngle: model.categoryNamesLabelAngle,
      cumulative: model.cumulative,
      binCount: model.binCount,
      normed: model.normed,
      rangeMin: model.rangeMin,
      rangeMax: model.rangeMax,
      displayMode: model.displayMode != null ? model.displayMode : 'OVERLAP',
      rightClose: model.rightClose,
      tips: model.tips ? model.tips : null,
      tooltips: model.tooltips,
      itemLabels: model.itemLabels
    };
  }
}
