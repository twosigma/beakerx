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
import DataGridColumn from "../column/DataGridColumn";
import IDataModelState from '../interface/IDataGridModelState';
import { MapIterator, iter } from '@phosphor/algorithm';
import { IColumn } from "../interface/IColumn";
import ColumnManager from "../column/ColumnManager";
import RowManager from "../row/RowManager";
import DataGridRow from "../row/DataGridRow";
import {BeakerxDataStore} from "../store/dataStore";
import {
  selectColumnsVisible,
  selectHasIndex,
  selectValues
} from "./selectors";
import DataGridAction from "../store/DataGridAction";
import {UPDATE_MODEL_DATA} from "./reducer";
import {selectBodyColumnVisibility, selectColumnIndexByPosition} from "../column/selectors";
import {COLUMN_TYPES} from "../column/enums";

export class BeakerxDataGridModel extends DataModel {
  store: BeakerxDataStore;
  dataFormatter: DataFormatter;
  columnManager: ColumnManager;
  rowManager: RowManager;
  headerRowsCount: number;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer

  private _data: Array<any>;

  constructor(store: BeakerxDataStore, columnManager: ColumnManager, rowManager: RowManager) {
    super();

    this.addProperties(store, columnManager, rowManager);
  }

  reset() {
    this.emitChanged({ type: 'model-reset' });
  }

  emitChanged(args: DataModel.ChangedArgs) {
    super.emitChanged(args);
  }

  addProperties(store: BeakerxDataStore, columnManager: ColumnManager, rowManager: RowManager) {
    this.store = store;
    this.dataFormatter = new DataFormatter(store);
    this.columnManager = columnManager;
    this.rowManager = rowManager;
    this.headerRowsCount = 1;

    this._data = selectValues(store.state);

    this.setState({
      columnsVisible: selectColumnsVisible(this.store.state) || {}
    });
  }

  updateData(state: IDataModelState) {
    this.store.dispatch(new DataGridAction(UPDATE_MODEL_DATA, state));
    this.columnManager.resetColumnStates();
    this._data = selectValues(this.store.state);
    this.rowManager.createRows(this._data, selectHasIndex(this.store.state));
    this.reset();
  }

  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? this.rowManager.rows.length : this.headerRowsCount;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body'
      ? selectBodyColumnVisibility(this.store.state).filter((value) => value).length
      : 1;
  }

  data(region: DataModel.CellRegion, row: number, position: number): any {
    const columnType = DataGridColumn.getColumnTypeByRegion(region);
    const index = selectColumnIndexByPosition(this.store.state, columnType, position);
    const dataGridRow = this.rowManager.getRow(row) || { index: row, values: [] };

    if (region === 'row-header') {
      return dataGridRow.index;
    }

    if (region === 'column-header') {
      return row === 0 ? this.columnManager.bodyColumnNames[index] : '';
    }

    if (region === 'corner-header') {
      return row === 0 ? this.columnManager.indexColumnNames[index] : '';
    }

    return dataGridRow.values[index];
  }

  setState(state) {
    this.store.dispatch(new DataGridAction(UPDATE_MODEL_DATA, state));
  }

  setFilterHeaderVisible(visible: boolean) {
    this.headerRowsCount = visible ? 2 : 1;
    this.reset();
  }

  getColumnValuesIterator(column: IColumn): MapIterator<number, number> {
    if (column.type === COLUMN_TYPES.index) {
      return new MapIterator<DataGridRow, any>(iter(this.rowManager.rows), (row) => row.index);
    }

    return new MapIterator(iter(this.rowManager.rows), (row) => row.values[column.index]);
  }

  setHeaderTextVertical(headersVertical: boolean) {
    this.setState({ headersVertical });
    this.reset();
  }
}
