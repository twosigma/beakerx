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

import {CellRenderer, DataModel} from "@phosphor/datagrid";
import {ICellData} from "../interface/ICell";
import {BeakerXDataGrid} from "../BeakerXDataGrid";
import {DataGridHelpers} from "../dataGridHelpers";
import findSectionIndex = DataGridHelpers.findSectionIndex;
import {COLUMN_TYPES} from "../column/enums";
import ICellConfig = CellRenderer.ICellConfig;
import CellRegion = DataModel.CellRegion;
import ColumnManager from "../column/ColumnManager";

export default class DataGridCell {
  static isHeaderCell(config: CellRenderer.ICellConfig|ICellData) {
    return config && (config.region === 'column-header' || config.region === 'corner-header');
  }

  static getCellData(dataGrid: BeakerXDataGrid, clientX: number, clientY: number): ICellData|null {
    if (!dataGrid.viewport) {
      return null;
    }

    let column: { index: number, delta: number } | null = null;
    let rect = dataGrid.viewport.node.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    if (x > dataGrid.headerWidth + dataGrid.bodyWidth || y > dataGrid.headerHeight + dataGrid.bodyHeight) {
      return null;
    }

    // Test for a match in the corner header first.
    if (x <= dataGrid.headerWidth && y <= dataGrid.headerHeight) {
      if (x <= dataGrid.headerWidth) {
        column = findSectionIndex(dataGrid.rowHeaderSections, x);
      }

      if (column) {
        return {
          column: column.index,
          row: 0,
          delta: column.delta,
          type: column.index === 0 ? COLUMN_TYPES.index : COLUMN_TYPES.body,
          offset: dataGrid.getColumnOffset(column.index, ColumnManager.getColumnRegionByCell({ region: 'corner-header' })),
          offsetTop: dataGrid.headerHeight,
          region: 'corner-header',
          value: dataGrid.model.data('corner-header', 0, column.index),
          width: dataGrid.rowHeaderSections.sectionSize(column.index)
        };
      }

      return null;
    }

    let region: CellRegion = 'body';
    let section = dataGrid.columnSections;
    let pos = x + dataGrid.scrollX - dataGrid.headerWidth;
    if (x <= dataGrid.rowHeaderSections.totalSize) {
      section = dataGrid.rowHeaderSections;
      pos += dataGrid.headerWidth;
      region = 'row-header';
    }

    column = findSectionIndex(section, pos);

    const row: { index: number, delta: number } | null = DataGridCell.findHoveredRowIndex(dataGrid, y);
    const rowIndex = row ? row.index : 0;

    if (column) {
      const columnType = (region !== 'row-header' || column.index > 0) ? COLUMN_TYPES.body : COLUMN_TYPES.index;

      return {
        column: column.index,
        row: rowIndex,
        delta: column.delta,
        type: columnType,
        offset: dataGrid.getColumnOffset(column.index, region),
        offsetTop: row ? dataGrid.getRowOffset(row.index) + dataGrid.headerHeight : 0,
        region: y <= dataGrid.headerHeight ? 'column-header' : region,
        value: dataGrid.model.data(region, rowIndex, column.index),
        width: section.sectionSize(column.index),
      };
    }

    return null;
  }

  static dataEquals(data1: ICellData, data2: ICellData) {
    return (
      data1
      && data2
      && data1.row === data2.row
      && data1.column === data2.column
      && data1.region === data2.region
    )
  }

  static isCellHovered(hoveredCell: ICellData, comparedCell: ICellData|ICellConfig): boolean {
    return (
      hoveredCell
      && hoveredCell.row === comparedCell.row
      && hoveredCell.column === comparedCell.column
      && comparedCell.region === hoveredCell.region
    )
  }

  static findHoveredRowIndex(dataGrid: BeakerXDataGrid, y: number) {
    // Convert the position into unscrolled coordinates.
    let pos = y + dataGrid.scrollY - dataGrid.headerHeight;

    return findSectionIndex(dataGrid.rowSections, pos);
  }
}
