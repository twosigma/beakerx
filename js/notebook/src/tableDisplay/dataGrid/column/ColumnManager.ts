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

import DataGridColumn from "./DataGridColumn";
import { ITriggerOptions } from "../headerMenu/HeaderMenu";
import { CellRenderer } from "@phosphor/datagrid";
import { chain, find } from '@phosphor/algorithm'
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { Signal } from '@phosphor/signaling';
import {ICellData} from "../interface/ICell";
import {IColumns} from "../interface/IColumn";
import {BeakerxDataStore} from "../store/dataStore";
import {selectColumnNames, selectHasIndex} from "../model/selectors";
import {DataGridColumnsAction} from "../store/DataGridAction";
import {
  selectBodyColumnNames,
  selectColumnIndexByPosition,
  selectIndexColumnNames
} from "./selectors";
import {
  UPDATE_COLUMNS_FILTERS, UPDATE_COLUMNS_VISIBILITY
} from "./reducer";
import {COLUMN_TYPES, SORT_ORDER} from "./enums";

export interface IBkoColumnsChangedArgs {
  type: COLUMN_CHANGED_TYPES,
  value: any,
  column: DataGridColumn
}

export enum COLUMN_CHANGED_TYPES {
  'columnSort'
}

export default class ColumnManager {
  store: BeakerxDataStore;
  dataGrid: BeakerxDataGrid;
  columns: IColumns = {};
  columnsChanged = new Signal<this, IBkoColumnsChangedArgs>(this);

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.store = this.dataGrid.store;
  }

  get bodyColumns() {
    return this.columns[COLUMN_TYPES.body];
  }

  get indexColumns() {
    return this.columns[COLUMN_TYPES.index];
  }

  get bodyColumnNames(): string[] {
    return selectBodyColumnNames(this.store.state);
  }
  
  get indexColumnNames(): string[] {
    return selectIndexColumnNames(this.store.state);
  }

  addColumns() {
    let bodyColumns: DataGridColumn[] = [];
    let indexColumns: DataGridColumn[] = [];

    this.columns[COLUMN_TYPES.index] = indexColumns;
    this.columns[COLUMN_TYPES.body] = bodyColumns;

    this.addIndexColumns();
    this.addBodyColumns();
  }

  getColumn(config: CellRenderer.ICellConfig): DataGridColumn {
    const columnType = DataGridColumn.getColumnTypeByRegion(config.region);
    const columnIndex = selectColumnIndexByPosition(this.store.state, columnType, config.column);

    return this.columns[columnType][columnIndex];
  }

  getColumnByIndex(columnType: COLUMN_TYPES, index: number) {
    return this.columns[columnType][index];
  }

  getColumnByPosition(columnType: COLUMN_TYPES, position: number) {
    return this.dataGrid.columnPosition.getColumnByPosition(columnType, position);
  }

  getColumnByName(columnName: string): DataGridColumn|undefined {
    return find(
      chain(this.bodyColumns, this.indexColumns),
      (column: DataGridColumn) => column.name === columnName
    );
  }

  destroy() {
    this.destroyAllColumns();
    Signal.disconnectAll(this);
  }

  sortByColumn(column: DataGridColumn, sortOrder: SORT_ORDER) {
    this.columnsChanged.emit({
      column,
      type: COLUMN_CHANGED_TYPES.columnSort,
      value: sortOrder
    });
    this.dataGrid.rowManager.sortByColumn(column);
    this.dataGrid.model.reset();
  }

  resetFilters() {
    const resetFilterFn = column => column.columnFilter.hideInput();

    this.store.dispatch(new DataGridColumnsAction(
      UPDATE_COLUMNS_FILTERS,
      {
        hasIndex: selectHasIndex(this.store.state),
        value: selectColumnNames(this.store.state).map(name => ''),
        defaultValue: ['']
      }));
    this.dataGrid.model.setFilterHeaderVisible(false);
    this.bodyColumns.forEach(resetFilterFn);
    this.indexColumns.forEach(resetFilterFn);
    this.dataGrid.rowManager.filterRows();
    this.dataGrid.repaint();
  }

  showFilters(column?: DataGridColumn) {
    this.showFilterInputs(false, column);
  }

  showSearch(column?: DataGridColumn) {
    this.showFilterInputs(true, column);
  }

  updateColumnFilterNodes() {
    this.bodyColumns.forEach(column => column.columnFilter.updateInputNode());
    this.indexColumns.forEach(column => column.columnFilter.updateInputNode());
  }

  updateColumnMenuTriggers() {
    this.bodyColumns.forEach(column => column.menu.updateTriggerPosition());
    this.indexColumns.forEach(column => column.menu.updateTriggerPosition());
  }

  takeColumnsByCells(startCell: ICellData, endCell: ICellData) {
    let result: any[] = [];

    if (endCell.type !== COLUMN_TYPES.index) {
      result = this.bodyColumns
        .map(column => this.columns[column.type][selectColumnIndexByPosition(this.store.state, column.type, column.index)])
        .filter(column => column.getVisible())
        .slice(startCell.column, endCell.column + 1);
    }

    if (startCell.type === COLUMN_TYPES.index) {
      result.unshift(this.indexColumns[0]);
    }

    return result;
  }

  takeColumnByCell(cellData: ICellData): DataGridColumn|null {
    const column = this.getColumnByPosition(cellData.type, cellData.column);

    return column ? column : null;
  }

  showAllColumns() {
    const columnNames = selectColumnNames(this.store.state);
    const hasIndex = selectHasIndex(this.store.state);

    this.store.dispatch(new DataGridColumnsAction(UPDATE_COLUMNS_VISIBILITY, {
      hasIndex,
      value: columnNames.map(() => true),
      defaultValue: [0]
    }));

    this.dataGrid.resize();
  }

  resetColumnsAlignment() {
    this.bodyColumns.forEach((column) => {
      column.resetAlignment();
    });
    this.dataGrid.model.reset();
  }

  resetColumnPositions() {
    this.dataGrid.columnPosition.reset();
  }

  resetColumnStates() {
    this.indexColumns.forEach(column => column.resetState());
    this.bodyColumns.forEach(column => column.resetState());
  }

  setColumnsDataTypePrecission(precission: number) {
    this.indexColumns.forEach(column => column.setDataTypePrecission(precission));
    this.bodyColumns.forEach(column => column.setDataTypePrecission(precission));
  }

  recalculateMinMaxValues() {
    this.recalculateColumnsMinMax(this.bodyColumns);
    this.recalculateColumnsMinMax(this.indexColumns);
  }

  private recalculateColumnsMinMax(columns: DataGridColumn[]) {
    columns.forEach(column => {
      column.addMinMaxValues();
    });
  }

  private showFilterInputs(useSearch: boolean, column?: DataGridColumn) {
    const methodToCall = useSearch ? 'showSearchInput' : 'showFilterInput';
    const showInputsFn = columnItem => columnItem.columnFilter[methodToCall](
      column === columnItem,
      this.dataGrid.getColumnOffset(columnItem.index, columnItem.type)
    );

    this.dataGrid.model.setFilterHeaderVisible(true);
    this.bodyColumns.forEach(showInputsFn);
    this.indexColumns.forEach(showInputsFn);
  }

  private addBodyColumns() {
    selectBodyColumnNames(this.store.state)
      .forEach((name, index) => this.addColumn(name, index, COLUMN_TYPES.body));
  }

  private addIndexColumns(): void {
    selectIndexColumnNames(this.store.state)
      .forEach((name, index) => this.addColumn(name, index, COLUMN_TYPES.index));
  }

  private addColumn(name, index, type) {
    let menuOptions: ITriggerOptions = {
      x: this.dataGrid.getColumnOffset(index, type),
      y: 0,
      width: this.dataGrid.baseColumnHeaderSize,
      height: this.dataGrid.baseColumnHeaderSize
    };

    let column = new DataGridColumn({
      index,
      name,
      menuOptions,
      type,
    }, this.dataGrid, this);

    this.columns[type].push(column);
  }

  private destroyAllColumns() {
    this.indexColumns.forEach((column: DataGridColumn) => column.destroy());
    this.bodyColumns.forEach((column: DataGridColumn) => column.destroy());

    Signal.disconnectAll(this);
  }
}
