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

import { CellRenderer } from "@lumino/datagrid";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";
import { IHighlighterState, HIGHLIGHTER_STYLE } from "../interface/IHighlighterState";
import { DataGridColumn } from "../column/DataGridColumn";
import { BeakerXDataGridModel } from "../model/BeakerXDataGridModel";

export class Highlighter {
  column: DataGridColumn;
  state: IHighlighterState;
  protected dataModel: BeakerXDataGridModel;

  constructor(column: DataGridColumn, state: IHighlighterState) {
    const valueResolver = column.dataGrid.dataModel.getColumnValueResolver(column.getDataType());

    this.column = column;
    this.dataModel = column.dataGrid.dataModel;
    this.state = { ...state };
    this.state.style = state.style || HIGHLIGHTER_STYLE.SINGLE_COLUMN;
    this.state.minVal = valueResolver(Number.isFinite(this.state.minVal) ? this.state.minVal : this.column.minValue);
    this.state.maxVal = valueResolver(Number.isFinite(this.state.maxVal) ? this.state.maxVal : this.column.maxValue);
  }

  getBackgroundColor(config: CellRenderer.CellConfig) {
    return BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
  }

  getValueToHighlight(config: CellRenderer.CellConfig) {
    let value = config.value;
    let valueResolver = this.dataModel.getColumnValueResolver(this.column.getDataType());

    if (this.state.style === HIGHLIGHTER_STYLE.FULL_ROW) {
      value = this.dataModel.rowManager.getValueByColumn(config.row, this.column.index, this.column.type);
    }

    return valueResolver(value);
  }

  destroy(): void {
    this.column = null;
    this.dataModel = null;
    this.state = null;
  }
}
