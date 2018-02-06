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
import { MapIterator, EmptyIterator, iter } from '@phosphor/algorithm';
import { IColumn } from "../interface/IColumn";

interface IColumnState {
  names: string[],
  types: string[]
}

export class BeakerxDataGridModel extends DataModel {
  columnsState: {};
  dataFormatter: DataFormatter;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer
  static DEFAULT_INDEX_COLUMN_NAME = 'index';

  private _data: any;
  private _state: IDataModelState;
  private _columnCount: number;
  private _rowCount: number;

  constructor(state: IDataModelState) {
    super();

    this.addColumnsState(state);
    this.addProperties(state);
  }

  get state() {
    return this._state;
  }

  get bodyColumnsState() {
    return this.columnsState[COLUMN_TYPES.body];
  }

  get indexColumnsState() {
    return this.columnsState[COLUMN_TYPES.index];
  }

  addColumnsState(state) {
    let bodyColumnsState: IColumnState = { names: [], types: [] };
    let indexColumnsState: IColumnState = { names: [], types: [] };

    this.columnsState = {};
    this.columnsState[COLUMN_TYPES.body] = bodyColumnsState;
    this.columnsState[COLUMN_TYPES.index] = indexColumnsState;

    this.columnsState[COLUMN_TYPES.body].names = state.hasIndex
      ? state.columnNames.slice(1)
      : state.columnNames;
    this.columnsState[COLUMN_TYPES.index].names = state.hasIndex
      ? state.columnNames.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_NAME];

    this.columnsState[COLUMN_TYPES.body].types = state.hasIndex
      ? state.types.slice(1)
      : state.types;
    this.columnsState[COLUMN_TYPES.index].types = state.hasIndex
      ? state.types.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_TYPE];
  }

  addProperties(state) {
    this.dataFormatter = new DataFormatter(state);

    this._state = state;
    this._data = state.values;
    this._columnCount = this.bodyColumnsState.names.length || 0;
    this._rowCount = this._data.length;
  }

  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? this._rowCount : 1;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body' ? this._columnCount : 1;
  }

  data(region: DataModel.CellRegion, row: number, columnIndex: number): any {
    if (region === 'row-header') {
      return this.state.hasIndex ? this.getValue(region, row, columnIndex) : row;
    }

    if (region === 'column-header') {
      return this.bodyColumnsState.names[columnIndex];
    }

    if (region === 'corner-header') {
      return this.indexColumnsState.names[columnIndex];
    }

    return this.getValue(region, row, columnIndex);
  }
  
  getValue(region: DataModel.CellRegion, row: number, columnIndex: number) {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);

    if (this.state.hasIndex && columnType === COLUMN_TYPES.body) {
      return this._data[row][columnIndex + 1];
    }
    
    return this._data[row][columnIndex];
  }

  getColumnValuesIterator(column: IColumn): MapIterator<number, number> {
    if (!this.state.hasIndex && column.type === COLUMN_TYPES.index) {
      return new MapIterator<number, any>(new EmptyIterator(), () => null);
    }

    return new MapIterator(iter(this._data), (rowValues) => rowValues[column.index]);
  }

  getAlignmentConfig(): { alignmentForColumn: {}, alignmentForType: {} } {
    return {
      alignmentForColumn: this._state.alignmentForColumn || {},
      alignmentForType: this._state.alignmentForType || {},
    }
  }
}
