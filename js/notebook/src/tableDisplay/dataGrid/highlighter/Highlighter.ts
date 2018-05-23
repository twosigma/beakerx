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

import IHihglighterState, { HIGHLIGHTER_STYLE } from "../interface/IHighlighterState";
import { CellRenderer } from "@phosphor/datagrid";
import DataGridColumn from "../column/DataGridColumn";
import {DEFAULT_CELL_BACKGROUND} from "../style/dataGridStyle";
import {BeakerXDataGridModel} from "../model/BeakerXDataGridModel";

export default class Highlighter {
  column: DataGridColumn;
  model: BeakerXDataGridModel;
  state: IHihglighterState;

  constructor(column: DataGridColumn, state: IHihglighterState) {
    const valueResolver = column.dataGrid.model.getColumnValueResolver(column.getDataType());

    this.column = column;
    this.model = column.dataGrid.model;
    this.state = { ...state };
    this.state.style = state.style || HIGHLIGHTER_STYLE.SINGLE_COLUMN;
    this.state.minVal = valueResolver(Number.isFinite(this.state.minVal) ? this.state.minVal : this.column.minValue);
    this.state.maxVal = valueResolver(Number.isFinite(this.state.maxVal) ? this.state.maxVal : this.column.maxValue);
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return DEFAULT_CELL_BACKGROUND;
  }

  getValueToHighlight(config: CellRenderer.ICellConfig) {
    let value = config.value;
    let valueResolver = this.model.getColumnValueResolver(this.column.getDataType());

    if (this.state.style === HIGHLIGHTER_STYLE.FULL_ROW) {
      value = this.model.rowManager.getValueByColumn(config.row, this.column.index, this.column.type);
    }

    return valueResolver(value);
  }
}
