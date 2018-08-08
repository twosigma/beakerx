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

import {modelData, TreeMapModelData} from "./interfaces";

export namespace DefaultKernelMapping {
  export function mapModelData(modelData): modelData {
    return {
      showLegend: modelData.showLegend,
      legendPosition: modelData.legendPosition != null ? modelData.legendPosition : { position: "TOP_RIGHT" },
      legendLayout: modelData.legendLayout != null ? modelData.legendLayout : "VERTICAL",
      useToolTip: modelData.useToolTip != null ? modelData.useToolTip : false,
      margin: modelData.margin != null ? modelData.margin : {},
      plotSize: {
        width: modelData.width != null ? modelData.width : 1200,
        height: modelData.height != null ? modelData.height : 350
      }
    };
  }
  
  export function mapStandardPlotModelData(modelData) {
    return {
      nanoOffset: null,

      ...mapModelData(modelData),

      orientation: modelData.orientation != null ? modelData.orientation : "VERTICAL",
      omitCheckboxes: modelData.omitCheckboxes,
      xAxis: modelData.xAxis != null ? modelData.xAxis : {},
      yAxis: modelData.yAxis != null ? modelData.yAxis : {},
      yAxisR: modelData.yAxisR,
      range: modelData.range != null ? modelData.range : null,
      xCursor: modelData.xCursor,
      yCursor: modelData.yCursor,
      userFocus: modelData.focus != null ? modelData.focus : {},
      timezone: modelData.timezone,
      categoryNames: modelData.categoryNames,
      showXGridlines: !(modelData.orientation !== 'HORIZONTAL' && modelData.type === "CategoryPlot"),
      categoryMargin: modelData.categoryMargin,
      categoryNamesLabelAngle: modelData.categoryNamesLabelAngle,
      cumulative: modelData.cumulative,
      binCount: modelData.binCount,
      normed: modelData.normed,
      rangeMin: modelData.rangeMin,
      rangeMax: modelData.rangeMax,
      displayMode: modelData.displayMode != null ? modelData.displayMode : 'OVERLAP',
      rightClose: modelData.rightClose,
      tips: modelData.tips ? modelData.tips : null,
      tooltips: modelData.tooltips,
      itemLabels: modelData.itemLabels,
    };
  }

  export function mapTreeMapModelData(modelData): TreeMapModelData {
    return {
      ...mapModelData(modelData),
      mode: modelData.mode,
      ratio: modelData.ratio,
      sticky: modelData.sticky,
      round: modelData.round,
      valueAccessor: modelData.valueAccessor
    }
  }
}
