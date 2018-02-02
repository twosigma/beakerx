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
import { getDisplayType, ALL_TYPES } from '../dataTypes';
import { DataFormatter } from '../DataFormatter';
import {COLUMN_TYPES, default as DataGridColumn} from "../column/DataGridColumn";
import IDataModelState from '../interface/IDataGridModelState';

export class BeakerxDataGridModel extends DataModel {
  allColumnNames: string[];
  bodyColumnNames: string[];
  indexColumnNames: string[];
  allColumnDataTypes: string[];
  bodyColumnDataTypes: string[];
  indexColumnDataTypes: string[];
  dataFormatter: DataFormatter;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer
  static DEFAULT_INDEX_COLUMN_NAME = 'index';

  private _data: any;
  private _state: IDataModelState;
  private _columnCount: number;
  private _rowCount: number;

  constructor(state: IDataModelState) {
    super();

    this.allColumnNames = state.columnNames;
    this.bodyColumnNames = state.hasIndex ? state.columnNames.slice(1) : state.columnNames;
    this.indexColumnNames = state.hasIndex
      ? state.columnNames.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_NAME];
    this.allColumnDataTypes = state.types;
    this.bodyColumnDataTypes = state.hasIndex ? state.types.slice(1) : state.types;
    this.indexColumnDataTypes = state.hasIndex
      ? state.types.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_TYPE];
    
    this.dataFormatter = new DataFormatter(state);

    this._state = state;
    this._data = state.values;
    this._columnCount = this.bodyColumnNames.length || 0;
    this._rowCount = this._data.length;
  }

  get state() {
    return this._state;
  }

  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? this._rowCount : 1;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body' ? this._columnCount : 1;
  }

  data(region: DataModel.CellRegion, row: number, columnIndex: number): any {
    if (region === 'row-header') {
      return this.state.hasIndex ? this.getFormatFn(region, row, columnIndex) : row;
    }

    if (region === 'column-header') {
      return this.bodyColumnNames[columnIndex];
    }

    if (region === 'corner-header') {
      return this.indexColumnNames[columnIndex];
    }

    return this.getFormatFn(region, row, columnIndex);
  }
  
  getValue(region: DataModel.CellRegion, row: number, columnIndex: number) {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);

    if (this.state.hasIndex && columnType === COLUMN_TYPES.body) {
      return this._data[row][columnIndex + 1];
    }
    
    return this._data[row][columnIndex];
  }
  
  getDataTypeName(region: DataModel.CellRegion, columnIndex: number) {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);

    return  columnType === COLUMN_TYPES.index
      ? this.indexColumnDataTypes[columnIndex]
      : this.bodyColumnDataTypes[columnIndex];
  }

  getColumnName(columnIndex: number, region: DataModel.CellRegion) {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);

    return columnType === COLUMN_TYPES.index
      ? this.indexColumnNames[columnIndex]
      : this.bodyColumnNames[columnIndex];
  }

  getFormatFn(region: DataModel.CellRegion, row: number, columnIndex: number): any {
    const value = this.getValue(region, row, columnIndex);
    const displayType = getDisplayType(
      this.getDataTypeName(region, columnIndex),
      this._state.stringFormatForType,
      this._state.stringFormatForColumn[this.getColumnName(columnIndex, region)]
    );

    return this.dataFormatter.getFormatFnByType(displayType)(value, row, columnIndex);
  }

  getAlignmentConfig(): { alignmentForColumn: {}, alignmentForType: {} } {
    return {
      alignmentForColumn: this._state.alignmentForColumn || {},
      alignmentForType: this._state.alignmentForType || {},
    }
  }
}
