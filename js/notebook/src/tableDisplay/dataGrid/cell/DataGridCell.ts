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

import { CellRenderer } from "@phosphor/datagrid";
import {ICellData} from "../interface/ICell";
import {BeakerxDataGrid} from "../BeakerxDataGrid";
import {DataGridHelpers} from "../dataGridHelpers";
import findSectionIndex = DataGridHelpers.findSectionIndex;
import {COLUMN_TYPES} from "../column/enums";

export default class DataGridCell {
  static isHeaderCell(config: CellRenderer.ICellConfig) {
    return config.region === 'column-header' || config.region === 'corner-header';
  }

  static getCellData(dataGrid: BeakerxDataGrid, clientX: number, clientY: number): ICellData|null {
    if (!dataGrid.viewport) {
      return null;
    }

    let column: { index: number, delta: number } | null = null;
    let rect = dataGrid.viewport.node.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Test for a match in the corner header first.
    if (x <= dataGrid.headerWidth && y <= dataGrid.headerHeight) {
      if (!column && x <= dataGrid.headerWidth) {
        column = findSectionIndex(dataGrid.rowHeaderSections, y);
      }

      if (column) {
        return {
          column: column.index,
          row: 0,
          delta: column.delta,
          type: COLUMN_TYPES.index,
          offset: dataGrid.getColumnOffset(column.index, COLUMN_TYPES.index),
          offsetTop: dataGrid.headerHeight
        };
      }

      return null;
    }

    let section = dataGrid.columnSections;
    let columnType = COLUMN_TYPES.body;
    let pos = x + dataGrid.scrollX - dataGrid.headerWidth;
    if (x <= dataGrid.rowHeaderSections.totalSize) {
      section = dataGrid.rowHeaderSections;
      columnType = COLUMN_TYPES.index;
      pos += dataGrid.headerWidth;
    }

    let row: { index: number, delta: number } | null = DataGridCell.findHoveredRowIndex(dataGrid, y);
    column = findSectionIndex(section, pos);

    if (column) {
      return {
        column: column.index,
        delta: column.delta,
        row: row ? row.index : 0,
        type: columnType,
        offset: dataGrid.getColumnOffset(column.index, columnType),
        offsetTop: row ? dataGrid.getRowOffset(row.index) + dataGrid.headerHeight : 0
      };
    }

    return null;
  }

  static findHoveredRowIndex(dataGrid: BeakerxDataGrid, y: number) {
    // Convert the position into unscrolled coordinates.
    let pos = y + dataGrid.scrollY - dataGrid.headerHeight;

    return findSectionIndex(dataGrid.rowSections, pos);
  }
}
