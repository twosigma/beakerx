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

import {BeakerXDataGrid} from "../BeakerXDataGrid";
import {ICellData} from "../interface/ICell";
import CellTooltip from "./CellTooltip";
import ColumnManager from "../column/ColumnManager";
import DataGridCell from "./DataGridCell";
import {COLUMN_TYPES} from "../column/enums";
import {selectHasIndex, selectTooltips} from "../model/selectors";

export default class CellTooltipManager {
  activeTooltips: CellTooltip[] = [];
  dataGrid: BeakerXDataGrid;
  tooltips: string[][];
  lastData: ICellData;
  hasIndex: boolean;

  constructor(dataGrid: BeakerXDataGrid) {
    this.tooltips = selectTooltips(dataGrid.store.state);
    this.hasIndex = selectHasIndex(dataGrid.store.state);
    this.dataGrid = dataGrid;

    this.dataGrid.cellHovered.connect(this.handleCellHovered, this);
  }

  destroy(): void {
    this.activeTooltips.forEach(tooltip => tooltip.destroy());

    setTimeout(() => {
      this.dataGrid = null;
      this.activeTooltips = null;
      this.tooltips = null;
      this.lastData = null;
    });
  }

  hideTooltips() {
    let tooltip;

    while(tooltip = this.activeTooltips.pop()) {
      tooltip.hide();
    }

    this.lastData = null;
  }

  handleCellHovered(sender: BeakerXDataGrid, { data }) {
    if (DataGridCell.dataEquals(data, this.lastData)) {
      return;
    }

    this.hideTooltips();
    if (this.shouldShowTooltip(data)) {
      this.showTooltip(data);
    }
  }

  private shouldShowTooltip(data) {
    return this.shouldShowBodyTooltip(data) || DataGridCell.isHeaderCell(data);
  }

  private shouldShowBodyTooltip(data) {
    return (
      this.tooltips.length > 0
      && (data && data.type !== COLUMN_TYPES.index || this.hasIndex)
    )
  }

  private showTooltip(data: ICellData) {
    const offsetTop = DataGridCell.isHeaderCell(data) ? 0 : data.offsetTop - this.dataGrid.scrollY;
    const offsetLeft = data.region === 'row-header' || data.region === 'corner-header'
      ? data.offset
      : data.offset - this.dataGrid.scrollX;
    const rect = this.dataGrid.node.getBoundingClientRect();
    const tooltip = new CellTooltip(
      this.getTooltipText(data),
      document.body
    );

    this.lastData = data;
    this.activeTooltips.push(tooltip);

    tooltip.show(
      Math.ceil(rect.left + offsetLeft + 20),
      Math.ceil(window.pageYOffset + rect.top + offsetTop - 10)
    );
  }

  private getTooltipText(data) {
    const column = this.dataGrid.columnManager.getColumnByPosition(
      ColumnManager.createPositionFromCell(data)
    );

    if (DataGridCell.isHeaderCell(data)) {
      return column.getDataTypeName() || typeof data.value;
    }

    return this.tooltips[data.row][column.index] || '';
  }
}
