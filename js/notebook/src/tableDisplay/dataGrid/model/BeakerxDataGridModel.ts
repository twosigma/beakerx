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

import { DataModel } from "@phosphor/datagrid";
import { ALL_TYPES } from '../dataTypes';
import { DataFormatter } from '../DataFormatter';
import {COLUMN_TYPES, default as DataGridColumn} from "../column/DataGridColumn";
import IDataModelState from '../interface/IDataGridModelState';
import { MapIterator, iter } from '@phosphor/algorithm';
import { IColumn } from "../interface/IColumn";
import ColumnManager from "../column/ColumnManager";
import RowManager from "../row/RowManager";
import DataGridRow from "../row/DataGridRow";

export class BeakerxDataGridModel extends DataModel {
  dataFormatter: DataFormatter;
  columnManager: ColumnManager;
  rowManager: RowManager;
  headerRowsCount: number;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer
  static DEFAULT_INDEX_COLUMN_NAME = 'index';

  private _data: Array<any>;
  private _state: IDataModelState;
  private _columnCount: number;
  private _rowCount: number;

  constructor(state: IDataModelState, columnManager: ColumnManager, rowManager: RowManager) {
    super();

    this.addProperties(state, columnManager, rowManager);
  }

  get state() {
    return this._state;
  }

  reset() {
    this.emitChanged({ type: 'model-reset' });
  }

  emitChanged(args: DataModel.ChangedArgs) {
    super.emitChanged(args);
  }

  addProperties(state: IDataModelState, columnManager: ColumnManager, rowManager: RowManager) {
    this.dataFormatter = new DataFormatter(state);
    this.columnManager = columnManager;
    this.rowManager = rowManager;
    this.headerRowsCount = 1;

    this._state = state;
    this._data = state.values;
    this._columnCount = this.state.hasIndex
      ? this.state.columnNames.length -1
      : this.state.columnNames.length || 0;
    this._rowCount = this._data.length;

    this.setState({
      columnsVisible: this.state.columnsVisible || {}
    });
  }

  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? this.rowManager.rows.length : this.headerRowsCount;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body'
      ? this.columnManager.bodyColumnsState.visibility.filter((value) => value).length
      : 1;
  }

  data(region: DataModel.CellRegion, row: number, columnIndex: number): any {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);
    const index = this.columnManager.indexResolver.getIndexByColumnPosition(columnIndex, columnType);
    const dataGridRow = this.rowManager.getRow(row);

    if (region === 'row-header') {
      return dataGridRow.index;
    }

    if (region === 'column-header') {
      return row === 0 ? this.columnManager.bodyColumnsState.names[index] : '';
    }

    if (region === 'corner-header') {
      return row === 0 ? this.columnManager.indexColumnsState.names[index] : '';
    }

    return dataGridRow.values[index];
  }

  setState(state) {
    this._state = {
      ...this._state,
      ...state,
    };
  }

  setFilterHeaderVisible(visible: boolean) {
    this.headerRowsCount = visible ? 2 : 1;
    this.reset();
  }

  getColumnValuesIterator(column: IColumn): MapIterator<number, number> {
    if (!this.state.hasIndex && column.type === COLUMN_TYPES.index) {
      return new MapIterator<DataGridRow, any>(iter(this.rowManager.rows), (row) => row.index);
    }

    return new MapIterator(iter(this.rowManager.rows), (row) => row.values[column.index]);
  }

  getAlignmentConfig(): { alignmentForColumn: {}, alignmentForType: {} } {
    return {
      alignmentForColumn: this._state.alignmentForColumn || {},
      alignmentForType: this._state.alignmentForType || {},
    }
  }
}
