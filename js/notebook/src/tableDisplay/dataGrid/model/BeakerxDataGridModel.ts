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
import ColumnManager, {COLUMN_CHANGED_TYPES, IcolumnsChangedArgs} from "../column/ColumnManager";

export interface IDataGridModelColumnState {
  names: string[],
  types: string[],
  visibility: boolean[]
}

export class BeakerxDataGridModel extends DataModel {
  dataFormatter: DataFormatter;
  columnManager: ColumnManager;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer
  static DEFAULT_INDEX_COLUMN_NAME = 'index';

  private _data: Array<any>;
  private _state: IDataModelState;
  private _columnCount: number;
  private _rowCount: number;

  constructor(state: IDataModelState, columnManager: ColumnManager) {
    super();

    this.addProperties(state, columnManager);
    this.connectTocolumnsChanged();
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

  addProperties(state, columnManager) {
    this.dataFormatter = new DataFormatter(state);
    this.columnManager = columnManager;

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
    return region === 'body' ? this._rowCount : 1;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body'
      ? this.columnManager.bodyColumnsState.visibility.filter((value) => value).length
      : 1;
  }

  data(region: DataModel.CellRegion, row: number, columnIndex: number): any {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);
    const index = this.columnManager.indexResolver.resolveIndex(columnIndex, columnType);

    if (region === 'row-header') {
      return this.state.hasIndex ? this.getValue(region, row, index) : row;
    }

    if (region === 'column-header') {
      return this.state.columnNames[index];
    }

    if (region === 'corner-header') {
      return this.state.hasIndex ? this.state.columnNames[index] : BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_NAME;
    }

    return this.getValue(region, row, index);
  }

  setState(state) {
    this._state = {
      ...this._state,
      ...state,
    };
  }

  connectTocolumnsChanged() {
    this.columnManager.columnsChanged.connect(this.setColumnVisible.bind(this));
  }

  private setColumnVisible(sender: ColumnManager, data: IcolumnsChangedArgs) {
    if(data.type !== COLUMN_CHANGED_TYPES.columnVisible) {
      return;
    }

    const columnsVisible = { ...this.state.columnsVisible, [data.column.name]: data.value };
    this.setState({ columnsVisible });

    this.reset();
  }

  getValue(region: DataModel.CellRegion, row: number, columnIndex: number) {
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
