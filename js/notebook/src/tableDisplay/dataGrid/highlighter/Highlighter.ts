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
import { find } from "@phosphor/algorithm";
import {DEFAULT_CELL_BACKGROUND} from "../style/dataGridStyle";

export default class Highlighter {
  column: DataGridColumn;
  state: IHihglighterState;

  constructor(column: DataGridColumn, state: IHihglighterState) {
    const valueResolver = column.getValueResolver();

    this.column = column;
    this.state = { ...state };
    this.state.style = state.style || HIGHLIGHTER_STYLE.SINGLE_COLUMN;
    this.state.minVal = valueResolver(this.state.minVal || this.column.minValue);
    this.state.maxVal = valueResolver(this.state.maxVal || this.column.maxValue);
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return DEFAULT_CELL_BACKGROUND;
  }

  getValueToHighlight(config: CellRenderer.ICellConfig) {
    let value = config.value;
    let valueResolver = this.column.getValueResolver();

    if (this.state.style === HIGHLIGHTER_STYLE.FULL_ROW) {
      value = find(this.column.valuesIterator.clone(), (value, index) => {
        return index === config.row;
      });
    }

    return valueResolver(value);
  }
}
