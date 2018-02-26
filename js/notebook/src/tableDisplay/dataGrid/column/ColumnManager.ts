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

import { BeakerxDataGridModel } from "../model/BeakerxDataGridModel";
import {COLUMN_TYPES, default as DataGridColumn, SORT_ORDER} from "./DataGridColumn";
import { ITriggerOptions } from "../headerMenu/HeaderMenu";
import { CellRenderer } from "@phosphor/datagrid";
import { chain, find } from '@phosphor/algorithm'
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { Signal } from '@phosphor/signaling';
import ColumnIndexResolver from "./ColumnIndexResolver";
import IDataModelState, {IDataGridModelColumnState} from "../interface/IDataGridModelState";
import {ICellData} from "../interface/ICell";
import {IColumns, IColumnsState} from "../interface/IColumn";

export interface IBkoColumnsChangedArgs {
  type: COLUMN_CHANGED_TYPES,
  value: any,
  column: DataGridColumn
}

export enum COLUMN_CHANGED_TYPES {
  'columnVisible',
  'columnSort',
  'columnMove'
}

export default class ColumnManager {
  dataGrid: BeakerxDataGrid;
  indexResolver: ColumnIndexResolver;
  modelState: IDataModelState;
  columnsState: IColumnsState;
  columns: IColumns = {};
  columnsChanged = new Signal<this, IBkoColumnsChangedArgs>(this);

  defaultColumnState: IDataGridModelColumnState = {
    names: [],
    types: [],
    visibility: [],
    order: []
  };

  constructor(modelState: IDataModelState, dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.modelState = modelState;
    this.addColumnsState(modelState);
    this.addIndexResolver();
    this.connectToColumnsChanged();
  }

  get bodyColumnsState() {
    return this.columnsState[COLUMN_TYPES.body];
  }

  get indexColumnsState() {
    return this.columnsState[COLUMN_TYPES.index];
  }

  addColumnsState(state) {
    let bodyColumnsState: IDataGridModelColumnState = { ...this.defaultColumnState };
    let indexColumnsState: IDataGridModelColumnState = { ...this.defaultColumnState };

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

    this.columnsState[COLUMN_TYPES.body].visibility =
      this.columnsState[COLUMN_TYPES.body].names.map((name) => state.columnsVisible[name] || true);
    this.columnsState[COLUMN_TYPES.index].visibility =
      this.columnsState[COLUMN_TYPES.index].names.map((name) => state.columnsVisible[name] || true);

    this.columnsState[COLUMN_TYPES.body].order =
      this.columnsState[COLUMN_TYPES.body].names.map((name, index) => index);
    this.columnsState[COLUMN_TYPES.index].order =
      this.columnsState[COLUMN_TYPES.index].names.map((name, index) => index);
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
    const columnIndex = this.indexResolver.getIndexByColumnPosition(config.column, columnType);

    return this.columns[columnType][columnIndex];
  }

  getColumnByIndex(columnType: COLUMN_TYPES, index: number) {
    return this.columns[columnType][index];
  }

  getColumnByPosition(columnType: number, position: number) {
    const index = this.indexResolver.columnIndexesMap[columnType][position];

    return this.getColumnByIndex(columnType, index);
  }

  getColumnByName(columnName: string): DataGridColumn|undefined {
    return find(
      chain(this.columns[COLUMN_TYPES.body], this.columns[COLUMN_TYPES.index]),
      (column: DataGridColumn) => column.name === columnName
    );
  }

  destroy() {
    this.destroyAllColumns();
    Signal.disconnectAll(this.columnsChanged);
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
    const resetFilterFn = column => {
      column.setState({ filter: '' });
      column.columnFilter.hideInput();
    };

    this.dataGrid.model.setFilterHeaderVisible(false);
    this.columns[COLUMN_TYPES.body].forEach(resetFilterFn);
    this.columns[COLUMN_TYPES.index].forEach(resetFilterFn);
    this.dataGrid.rowManager.filterRows();
    this.dataGrid.repaint();
  }

  showFilters(column?: DataGridColumn) {
    this.showFilterInputs(false, column);
  }

  showSearch(column?: DataGridColumn) {
    this.showFilterInputs(true, column);
  }

  takeColumnsByCells(startCell: ICellData, endCell: ICellData) {
    let result: any[] = [];

    if (endCell.type !== COLUMN_TYPES.index) {
      result = this.columns[COLUMN_TYPES.body]
        .map(column => this.columns[column.type][column.getResolvedIndex()])
        .filter(column => column.state.visible)
        .slice(startCell.column, endCell.column + 1);
    }

    if (startCell.type === COLUMN_TYPES.index) {
      result.unshift(this.columns[COLUMN_TYPES.index][0]);
    }

    return result;
  }

  takeColumnByCell(cellData: ICellData): DataGridColumn|null {
    const columns = this.takeColumnsByCells(cellData, cellData);

    return columns.length ? columns[0] : null;
  }

  showAllColumns() {
    this.columns[COLUMN_TYPES.body].forEach((column) => column.show());
  }

  resetColumnsAlignment() {
    this.columns[COLUMN_TYPES.body].forEach((column) => {
      column.resetAlignment();
    });
    this.dataGrid.model.reset();
  }

  resetColumnsOrder() {
    const bodyColumnsOrder = this.columnsState[COLUMN_TYPES.body].order;
    const inColumnsOrder = this.columnsState[COLUMN_TYPES.index].order;

    this.columnsState[COLUMN_TYPES.body].order = bodyColumnsOrder.map((index, order) => order);
    this.columnsState[COLUMN_TYPES.index].order = inColumnsOrder.map((index, order) => order);
    this.indexResolver.mapAllColumnPositionsToIndexes(this.indexColumnsState, this.bodyColumnsState);
    this.dataGrid.resizeMovedColumns(this.indexResolver.columnIndexesMap[COLUMN_TYPES.body], this.indexResolver.columnIndexesMap[COLUMN_TYPES.body]);
    this.dataGrid.model.reset();
  }

  setColumnsDataTypePrecission(precission: number) {
    this.columns[COLUMN_TYPES.index].forEach(column => column.setDataTypePrecission(precission));
    this.columns[COLUMN_TYPES.body].forEach(column => column.setDataTypePrecission(precission));
  }

  private showFilterInputs(useSearch: boolean, column?: DataGridColumn) {
    const methodToCall = useSearch ? 'showSearchInput' : 'showFilterInput';
    const showInputsFn = columnItem => columnItem.columnFilter
      [methodToCall](
      column === columnItem,
      this.dataGrid.getColumnOffset(columnItem.index, columnItem.type)
    );

    this.dataGrid.model.setFilterHeaderVisible(true);
    this.columns[COLUMN_TYPES.body].forEach(showInputsFn);
    this.columns[COLUMN_TYPES.index].forEach(showInputsFn);
  }

  private connectToColumnsChanged() {
    this.columnsChanged.connect(
      (sender: ColumnManager, data: IBkoColumnsChangedArgs) => {
        switch(data.type) {
          case COLUMN_CHANGED_TYPES.columnVisible:
            this.setColumnVisible(data);
            break;
          case COLUMN_CHANGED_TYPES.columnMove:
            this.setColumnPosition(data);
            break;
        }

        this.handleColumnChanged(data);
      });
  }

  private handleColumnChanged(data: IBkoColumnsChangedArgs) {
    const column = data.column;
    const oldMap = [ ...this.indexResolver.columnIndexesMap[data.column.type] ];

    this.indexResolver.mapColumnsPositionToIndex(column.type, this.columnsState[column.type]);
    this.dataGrid.resizeMovedColumns(oldMap, this.indexResolver.columnIndexesMap[column.type]);
    this.dataGrid.model.reset();
  }

  private addIndexResolver() {
    this.indexResolver = new ColumnIndexResolver(
      this.indexColumnsState,
      this.bodyColumnsState
    );
  }

  private setColumnVisible(data: IBkoColumnsChangedArgs) {
    this.columnsState[data.column.type].visibility[data.column.index] = data.value;
  }

  private setColumnPosition(data: IBkoColumnsChangedArgs) {
    const column = data.column;
    const lastOrder = this.columnsState[column.type].order.indexOf(column.index);

    this.columnsState[column.type].order.splice(lastOrder, 1);
    this.columnsState[column.type].order.splice(data.value, 0, column.index);
  }

  private addBodyColumns() {
    this.bodyColumnsState.names
      .forEach((name, index) => this.addColumn(name, index, COLUMN_TYPES.body));
  }

  private addIndexColumns(): void {
    this.indexColumnsState.names
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
    this.columns[COLUMN_TYPES.index].forEach((column: DataGridColumn) => column.destroy());
    this.columns[COLUMN_TYPES.body].forEach((column: DataGridColumn) => column.destroy());

    Signal.disconnectAll(this);
  }

}
