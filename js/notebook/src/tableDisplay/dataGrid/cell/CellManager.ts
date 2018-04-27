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
import * as bkUtils from '../../../shared/bkUtils';
import {IRangeCells} from "./CellSelectionManager";
import {CellRenderer, DataModel} from "@phosphor/datagrid";
import {COLUMN_TYPES} from "../column/enums";
import {ICellData} from "../interface/ICell";
import {DataGridHelpers} from "../dataGridHelpers";
import isUrl = DataGridHelpers.isUrl;

interface ICellDataOptions {
  row: number,
  column: number,
  value: any,
  region: DataModel.CellRegion
}

export default class CellManager {
  dataGrid: BeakerXDataGrid;
  hoveredCellData: ICellData;

  static cellsEqual(cellData: ICellData, secondCellData: ICellData): boolean {
    return (
      cellData && secondCellData
      && cellData.row === secondCellData.row
      && cellData.column === secondCellData.column
      && cellData.type === secondCellData.type
    );
  }

  constructor(dataGrid: BeakerXDataGrid) {
    this.dataGrid = dataGrid;

    this.dataGrid.cellHovered.connect(this.handleCellHovered, this);
  }

  repaintRow(cellData) {
    if(
      !cellData
      || isNaN(cellData.offset)
      || isNaN(cellData.offsetTop)
      || this.dataGrid.columnPosition.isDragging()
    ) {
      return;
    }

    this.dataGrid.repaint(
      cellData.offset,
      cellData.offsetTop,
      this.dataGrid.bodyWidth,
      this.dataGrid.baseRowSize
    );
  }

  getSelectedCells() {
    const rowsRange = this.dataGrid.cellSelectionManager.getRowsRangeCells();
    const columnsRange = this.dataGrid.cellSelectionManager.getColumnsRangeCells();

    if (!rowsRange || !columnsRange) {
      return [];
    }

    return this.getCells(rowsRange, columnsRange);
  }

  getAllCells() {
    const rowsRange = {
      startCell: {
        row: 0,
        column: 0,
        type: COLUMN_TYPES.index,
        delta: 0,
        offset: 0,
        offsetTop: 0
      },
      endCell: {
        row: this.dataGrid.rowManager.rows.length - 1,
        column: this.dataGrid.columnManager.columns[COLUMN_TYPES.body].length - 1 || 0,
        type: COLUMN_TYPES.body,
        delta: 0,
        offset: 0,
        offsetTop: 0
      }
    };
    const columnsRange = rowsRange;

    if (!rowsRange || !columnsRange) {
      return [];
    }

    return this.getCells(rowsRange, columnsRange);
  }

  getCells(rowsRange: IRangeCells, columnsRange: IRangeCells) {
    const rows = this.dataGrid.rowManager.takeRows(rowsRange.startCell.row, rowsRange.endCell.row + 1);
    const columns = this.dataGrid.columnManager.takeColumnsByCells(columnsRange.startCell, columnsRange.endCell);
    const cells: any = [];

    if (!columns || !rows) {
      return cells;
    }

    if (rows.length !== 1 || columns.length !== 1) {
      cells.push(columns.map(column => column.name));
    }

    rows.forEach(row => {
      let result: any[] = [];

      columns.forEach(column => {
        if(column.type === COLUMN_TYPES.index) {
          result.push(column.formatFn(this.createCellConfig({
            region: 'row-header',
            row: row.index,
            column: column.index,
            value: row.index
          })));
        } else {
          result.push(column.formatFn(this.createCellConfig({
            region: 'body',
            row: row.index,
            column: column.index,
            value: row.values[column.index]
          })));
        }
      });

      cells.push(result);
    });

    return cells;
  }

  copyToClipboard() {
    let queryCommandEnabled = true;

    try {
      document.execCommand('Copy');
    } catch (e) {
      queryCommandEnabled = false;
    }

    if (bkUtils.isElectron || !queryCommandEnabled) {
      return;
    }

    let cells = this.getSelectedCells();
    if (cells.length === 0) {
      cells = this.getAllCells();
    }

    this.executeCopy(this.exportCellsTo(cells, 'tabs'));
  }

  CSVDownload(selectedOnly) {
    const href = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.getCSVFromCells(selectedOnly));
    const target = '_black';
    const filename = 'tableRows.csv';
    const anchor = document.createElement('a');
    const event = document.createEvent("MouseEvents");

    anchor.href = href;
    anchor.target = target;
    anchor.download = filename;
    event.initEvent("click", true, false);
    anchor.dispatchEvent(event);
  };

  createCellConfig(
    { row = 0, column = 0, value = 0, region = 'body' }: ICellDataOptions|ICellData
  ): CellRenderer.ICellConfig {
    return {
      row,
      column,
      region,
      value,
      x: 0,
      y: 0,
      metadata: {},
      width: 0,
      height: 0
    }
  }

  private handleCellHovered(sender: BeakerXDataGrid, cellData: ICellData) {
    let cursor = this.dataGrid.viewport.node.style.cursor;

    if (cursor.indexOf('resize') !== -1 || this.dataGrid.columnPosition.isDragging()) {
      return;
    }

    let value = cellData && cellData.value;
    this.updateViewportCursor(value);

    if (CellManager.cellsEqual(cellData, this.hoveredCellData)) {
      return;
    }

    this.repaintRow(this.hoveredCellData);
    cellData && this.repaintRow(cellData);
    this.hoveredCellData = cellData;
  }

  private updateViewportCursor(value) {
    if (isUrl(value)) {
      this.dataGrid['_canvas'].style.cursor = 'pointer';
    } else {
      this.dataGrid['_canvas'].style.cursor = '';
    }
  }

  private getCSVFromCells(selectedOnly: boolean) {
    if (selectedOnly) {
      return this.exportCellsTo(this.getSelectedCells(), 'csv');
    }

    return this.exportCellsTo(this.getAllCells(), 'csv');
  }

  private executeCopy(text: string) {
    const input = document.createElement('textarea');

    document.body.appendChild(input);
    input.value = text;
    input.select();

    try {
      Jupyter.keyboard_manager.enabled = false;
      document.execCommand('Copy');
      Jupyter.keyboard_manager.enabled = true;
    } catch(error) {
      document.execCommand('Copy');
    }

    input.remove();
  }

  private exportCellsTo(cells, format) {
    let fix = (s) => s.replace(/"/g, '""');
    let exportOptions = {
      sep: ',',
      qot: '"',
      eol: '\n'
    };

    function exportCells(cells, exportOptions) {
      let out = '';

      for (let i = 0; i < cells.length; i++) {
        let row = cells[i];

        for (let j = 0; j < row.length; j++) {
          if (j !== 0) {
            out = out + exportOptions.sep;
          }

          let cellData = row[j];
          if (cellData === null) {
            cellData = '';
          }

          cellData = cellData + '';
          out = [
            out,
            exportOptions.qot,
            (cellData !== undefined && cellData !== null ? fix(cellData) : ''),
            exportOptions.qot
          ].join('');
        }

        out = out + exportOptions.eol;
      }

      return out;
    }

    if (format === 'tabs') {
      exportOptions.sep = '\t';
      exportOptions.qot = '';
      fix = (s) => s.replace(/\t/g, ' ');
    }

    if (navigator.appVersion.indexOf('Win') !== -1) {
      exportOptions.eol = '\r\n';
    }

    return exportCells(cells, exportOptions);
  };
}
