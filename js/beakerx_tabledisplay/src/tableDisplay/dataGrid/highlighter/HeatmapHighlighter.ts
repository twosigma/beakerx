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

import * as d3scale from 'd3-scale';
import { formatColor, getDefaultColor } from "../style/dataGridStyle";
import Highlighter from "./Highlighter";
import IHihglighterState, {HIGHLIGHTER_STYLE} from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import { CellRenderer } from "@phosphor/datagrid";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export default class HeatmapHighlighter extends Highlighter {
  colorScale: Function;

  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    this.state.minColor = formatColor(state.minColor || getDefaultColor('blue'));
    this.state.maxColor = formatColor(state.maxColor || getDefaultColor('red'));

    this.colorScale = d3scale.scaleLinear()
      .domain([this.state.minVal, this.state.maxVal])
      .range([this.state.minColor, this.state.maxColor]);
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    const value = this.getValueToHighlight(config);
    if (this.state.style === HIGHLIGHTER_STYLE.FULL_ROW) {
      return this.colorScale(value);
    }
    return config.metadata.dataType === 'string' ? BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND : this.colorScale(value);
  }
}
