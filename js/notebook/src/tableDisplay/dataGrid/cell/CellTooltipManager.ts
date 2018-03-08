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

import {BeakerxDataGrid} from "../BeakerxDataGrid";
import {ICellData} from "../interface/ICell";
import CellTooltip from "./CellTooltip";
import {DEFAULT_GRID_PADDING} from "../style/dataGridStyle";
import {selectColumnIndexByPosition} from "../column/selectors";
import {COLUMN_TYPES} from "../column/enums";

export default class CellTooltipManager {
  dataGrid: BeakerxDataGrid;
  tooltips: string[][];
  tooltip: CellTooltip;
  lastData: ICellData;

  constructor(dataGrid: BeakerxDataGrid, tooltips: string[][]) {
    this.tooltips = tooltips;
    this.dataGrid = dataGrid;

    if (tooltips.length) {
      this.dataGrid.cellHovered.connect(this.handleCellHovered, this);
      this.tooltip = new CellTooltip(
        '',
        this.dataGrid.node
      );
    }
  }

  hideTooltip() {
    this.tooltip && this.tooltip.hide();
  }

  handleCellHovered(sender: BeakerxDataGrid, data: ICellData) {
    if (!data || data.type === COLUMN_TYPES.index) {
      return this.tooltip.hide();
    }

    if (this.isShown(data)) {
      return;
    }

    let column = selectColumnIndexByPosition(
      sender.store.state,
      data.column,
      data.type
    );
    this.tooltip.hide();
    this.lastData = data;

    setTimeout(() => {
      let x = data.offset + data.delta + DEFAULT_GRID_PADDING;

      this.tooltip.node.innerText = this.tooltips[data.row][column] || '';
      this.tooltip.show(x, data.offsetTop);
    }, 300);
  }

  private isShown(data) {
    if (!this.lastData) {
      return false;
    }

    const { row, column, type } = this.lastData;

    return row === data.row && column === data.column && type === data.type;
  }
}
