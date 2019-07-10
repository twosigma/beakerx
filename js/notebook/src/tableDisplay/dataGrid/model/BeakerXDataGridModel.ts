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
import IDataModelState from '../interface/IDataGridModelState';
import { MapIterator, iter } from '@phosphor/algorithm';
import { IColumn } from "../interface/IColumn";
import ColumnManager from "../column/ColumnManager";
import RowManager from "../row/RowManager";
import DataGridRow from "../row/DataGridRow";
import {BeakerXDataStore} from "../store/BeakerXDataStore";
import {
  selectColumnsFrozenCount,
  selectColumnsVisible,
  selectHasIndex,
  selectValues, selectVisibleColumnsFrozenCount
} from "./selectors";
import DataGridAction from "../store/DataGridAction";
import {UPDATE_MODEL_DATA} from "./reducer";
import {
  selectColumnDataType,
  selectColumnIndexByPosition,
  selectVisibleBodyColumns
} from "../column/selectors";
import {COLUMN_TYPES} from "../column/enums";

export class BeakerXDataGridModel extends DataModel {
  store: BeakerXDataStore;
  dataFormatter: DataFormatter;
  columnManager: ColumnManager;
  rowManager: RowManager;
  headerRowsCount: number;

  static DEFAULT_INDEX_COLUMN_TYPE = ALL_TYPES[1]; // integer

  private _data: Array<any>;

  constructor(store: BeakerXDataStore, columnManager: ColumnManager, rowManager: RowManager) {
    super();

    this.addProperties(store, columnManager, rowManager);
  }

  destroy(): void {
    this.dataFormatter.destroy();

    setTimeout(() => {
      this.store = null;
      this.dataFormatter = null;
      this.columnManager = null;
      this.rowManager = null;
    });
  }

  reset() {
    this.emitChanged({ type: 'model-reset' });
  }

  emitChanged(args: DataModel.ChangedArgs) {
    super.emitChanged(args);
  }

  addProperties(store: BeakerXDataStore, columnManager: ColumnManager, rowManager: RowManager) {
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
    this.columnManager.resetColumnStates();
    this.store.dispatch(new DataGridAction(UPDATE_MODEL_DATA, state));
    this._data = selectValues(this.store.state);
    this.rowManager.createRows(this._data, selectHasIndex(this.store.state));
    this.reset();
  }

  rowCount(region: DataModel.RowRegion): number {
    if (region !== 'body') { return this.headerRowsCount; }
    if (this.rowManager === null) { return 0; }
    return this.rowManager.rows.length;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    if (this.store === null) { return 0; }
    const frozenColumnsCount = selectVisibleColumnsFrozenCount(this.store.state);

    if (region === 'row-header') {
      return frozenColumnsCount + 1
    }

    return region === 'body'
      ? selectVisibleBodyColumns(this.store.state).length - frozenColumnsCount
      : 1;
  }

  data(region: DataModel.CellRegion, row: number, position: number): any {
    const columnRegion = ColumnManager.getColumnRegionByCell({ region });
    const index = selectColumnIndexByPosition(this.store.state, { region: columnRegion, value: position });
    const dataGridRow = this.rowManager.getRow(row) || { index: row, values: [] };

    if (region === 'row-header' && position === 0) {
      return dataGridRow.index;
    }

    if (region === 'column-header' || region === 'corner-header' && position > 0) {
      return row === 0 ? this.columnManager.bodyColumnNames[index] : '';
    }

    if (region === 'corner-header') {
      return row === 0 ? this.columnManager.indexColumnNames[index] : '';
    }

    return dataGridRow.values[index];
  }

  metadata(region: DataModel.CellRegion, position: number): DataModel.Metadata {
    let column = this.columnManager.getColumnByPosition({
      value: position,
      region: ColumnManager.getColumnRegionByCell({ region })
    });

    return {
      dataType: ALL_TYPES[column.getDisplayType()]
    };
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

  getColumnValueResolver(dataType: ALL_TYPES): Function {
    switch (dataType) {
      case ALL_TYPES.datetime:
      case ALL_TYPES.time:
        return this.dateValueResolver;

      case ALL_TYPES.double:
      case ALL_TYPES['double with precision']:
        return this.doubleValueResolver;

      case ALL_TYPES.integer:
      case ALL_TYPES.int64:
        return this.integerValueResolver;

      case ALL_TYPES.html:
        return this.htmlTextContentResolver;

      default:
        return this.defaultValueResolver;
    }
  }

  private htmlTextContentResolver(value) {
    const div = document.createElement('div');

    div.innerHTML = value;

    return div.textContent;
  }

  private dateValueResolver(value) {
    return value.timestamp;
  }

  private defaultValueResolver(value) {
    return value;
  }

  private doubleValueResolver(value) {
    return parseFloat(value);
  }

  private integerValueResolver(value) {
    return parseInt(value);
  }
}
