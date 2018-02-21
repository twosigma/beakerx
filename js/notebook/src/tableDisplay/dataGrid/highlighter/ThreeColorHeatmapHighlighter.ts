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
import { formatColor } from "../style/dataGridStyle";
import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import HeatmapHighlighter from "./HeatmapHighlighter";

export default class ThreeColorHeatmapHighlighter extends HeatmapHighlighter {
  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    if (typeof this.state.minVal !== 'number' || typeof this.state.maxVal !== 'number' ) {
      throw new Error('Min and Max values are not set');
    }

    this.state.midVal = column.getValueResolver()(this.state.midVal || (this.state.minVal + this.state.maxVal / 2));
    this.state.midColor = formatColor(state.midColor);

    this.colorScale = d3scale.scaleLinear()
      .domain([this.state.minVal, this.state.midVal, this.state.maxVal])
      .range([this.state.minColor, this.state.midColor, this.state.maxColor]);
  }
}
