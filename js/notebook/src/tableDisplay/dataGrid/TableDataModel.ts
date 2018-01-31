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
import { getDisplayType, ALL_TYPES } from './dataTypes';
import { DataFormatter } from './DataFormatter';
import { COLUMN_TYPES } from "./DataGridColumn";
import {IColumn} from "./interface/IColumn";
import IDataModelOptions from './interface/IDataModelOptions';

export class TableDataModel extends DataModel {
  columnNames: string[];
  dataFormatter: DataFormatter;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer

  private _data: any;
  private _options: IDataModelOptions;
  private _columnCount: number;
  private _rowCount: number;

  constructor(options: IDataModelOptions) {
    super();

    this.columnNames = options.columnNames;
    this.dataFormatter = new DataFormatter(options);

    this._options = options;
    this._data = options.values;
    this._columnCount = this.columnNames.length || 0;
    this._rowCount = this._data.length;
  }

  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? this._rowCount : 1;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body' ? this._columnCount : 1;
  }

  data(region: DataModel.CellRegion, row: number, column: number): any {
    if (region === 'row-header') {
      return row;
    }

    if (region === 'column-header') {
      return this.columnNames[column];
    }

    if (region === 'corner-header') {
      return '';
    }

    return this.formatData(
      this._data[row][column],
      this._options.types[column] || 'string',
      row,
      column
    );
  }

  formatData(data: any, typeName: string, row: number, column: number): any {
    //@todo check if raw type no is required, keep only display type
    const displayType = getDisplayType(
      typeName,
      this._options.stringFormatForType,
      this._options.stringFormatForColumn[this.columnNames[column]]
    );

    return this.dataFormatter.getFormatFnByType(displayType)(data, row, column);
  }

  getColumnTypeName(column: IColumn) {
    if (column.type === COLUMN_TYPES.index) {
      return TableDataModel.DEFAULT_INDEX_COLUMN_TYPE;
    }

    return this._options.types[column.index];
  }

}
