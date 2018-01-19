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
import {getDisplayType, getTypeByName} from './dataTypes';
import { DataFormatter } from './DataFormatter';
import IDataModelOptions from './IDataModelOptions';

export class TableDataModel extends DataModel {
  private _data: any;
  private _columnNames: string[];
  private _options: IDataModelOptions;
  private _columnCount: number;
  private _rowCount: number;
  private _dataFormatter: DataFormatter;

  constructor(options: IDataModelOptions) {
    super();

    this._options = options;
    this._data = options.values;
    this._columnNames = options.columnNames;
    this._columnCount = this._columnNames.length || 0;
    this._rowCount = this._data.length;
    this._dataFormatter = new DataFormatter(options);
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
      return this._columnNames[column];
    }

    if (region === 'corner-header') {
      return '';
    }

    return this.convertData(
      this._data[row][column],
      this._options.types[column] || 'string',
      row,
      column
    );
  }

  convertData(data: any, typeName: string, row: number, column: number): any {
    const type = getTypeByName(typeName);
    const displayType = getDisplayType(
      type,
      this._options.stringFormatForType,
      this._options.stringFormatForColumn[this._columnNames[column]]
    );

    return this._dataFormatter.getFormatFnByType(displayType)(data, row, column);
  }

}
