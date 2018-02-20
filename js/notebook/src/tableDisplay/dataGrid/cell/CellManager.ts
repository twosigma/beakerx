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
import * as bkUtils from '../../../shared/bkUtils';
import {COLUMN_TYPES} from "../column/DataGridColumn";
import '../../../global.env';

export default class CellManager {
  dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
  }

  getSelectedCells() {
    const rowsRange = this.dataGrid.cellSelectionManager.getRowsRangeCells();
    const columnsRange = this.dataGrid.cellSelectionManager.getColumnsRangeCells();
    const rows = rowsRange && this.dataGrid.rowManager.takeRows(rowsRange.startCell.row, rowsRange.endCell.row + 1);
    const columns = columnsRange && this.dataGrid.columnManager.takeColumnsByCells(columnsRange.startCell, columnsRange.endCell);
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
          result.push(column.formatFn({
            region: 'row-headers',
            row: row.index,
            column: column.index,
            value: row.index,
          }));
        } else {
          result.push(column.formatFn({
            region: 'body',
            row: row.index,
            column: column.index,
            value: row.values[column.index]
          }));
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

    const cells = this.getSelectedCells();
    const cellsData = this.exportCellsTo(cells, 'tabs');

    this.executeCopy(cellsData);
  }

  private executeCopy(text: string) {
    var input = document.createElement('textarea');

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
