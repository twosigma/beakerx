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

import {modelData, StandardModelData, TreeMapModelData} from "./interfaces";

export namespace GroovyKernelMapping {
  export function mapModelData(modelData): modelData {
    return {
      plotId: modelData.update_id,
      type: "plot",
      title: modelData.chart_title != null ? modelData.chart_title : modelData.title,
      margin: {},
      showLegend: modelData.show_legend,
      legendPosition: modelData.legend_position != null ? modelData.legend_position : {position: "TOP_RIGHT"},
      legendLayout: modelData.legend_layout != null ? modelData.legend_layout : "VERTICAL",
      useToolTip: modelData.use_tool_tip != null ? modelData.use_tool_tip : false,
      plotSize: {
        width: modelData.init_width != null ? modelData.init_width : 1200,
        height: modelData.init_height != null ? modelData.init_height : 350
      },
      customStyles: modelData.custom_styles ? modelData.custom_styles : '',
      elementStyles: modelData.element_styles ? modelData.element_styles : ''
    }
  }

  export function mapStandardPlotModelData(modelData): StandardModelData {
    return {
      range: modelData.range != null ? modelData.range : null,
      xCursor: modelData.xCursor,
      yCursor: modelData.yCursor,

      ...mapModelData(modelData),

      userFocus: {},
      xAxis: {
        label: modelData.domain_axis_label
      },
      yAxis: {
        label: modelData.y_label,
        lowerMargin: modelData.rangeAxes[0].lower_margin,
        upperMargin: modelData.rangeAxes[0].upper_margin
      },
      yAxisR: (
        modelData.rangeAxes.length > 1
        ? {
            label: modelData.rangeAxes[1].label,
            lowerMargin: modelData.rangeAxes[1].lower_margin,
            upperMargin: modelData.rangeAxes[1].upper_margin
          }
        : null
      ),
      orientation: modelData.orientation != null ? modelData.orientation : "VERTICAL",
      omitCheckboxes: modelData.omit_checkboxes,
      nanoOffset: null,
      timezone: modelData.timezone,
      categoryNames: modelData.categoryNames,
      showXGridlines: !(modelData.orientation !== 'HORIZONTAL' && modelData.type === "CategoryPlot"),
      categoryMargin: modelData.category_margin,
      categoryNamesLabelAngle: modelData.categoryNamesLabelAngle,
      cumulative: modelData.cumulative,
      binCount: modelData.bin_count,
      normed: modelData.normed,
      rangeMin: modelData.range_min,
      rangeMax: modelData.range_max,
      displayMode: modelData.displayMode != null ? modelData.displayMode : 'OVERLAP',
      rightClose: modelData.right_close,
      tips: modelData.tips ? modelData.tips : null,
      tooltips: modelData.tooltips ? modelData.tooltips : null,
      itemLabels: modelData.itemLabels ? modelData.itemLabels : null
    }
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
