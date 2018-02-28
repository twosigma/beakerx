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

  get bodyColumns() {
    return this.columns[COLUMN_TYPES.body];
  }

  get indexColumns() {
    return this.columns[COLUMN_TYPES.index];
  }

  get bodyColumnsState() {
    return this.columnsState[COLUMN_TYPES.body];
  }

  get indexColumnsState() {
    return this.columnsState[COLUMN_TYPES.index];
  }
  
  get bodyColumnNames() {
    return this.bodyColumnsState.names;
  }
  
  get indexColumnNames() {
    return this.indexColumnsState.names;
  }

  addColumnsState(state: IDataModelState) {
    const bodyColumnsState: IDataGridModelColumnState = { ...this.defaultColumnState };
    const indexColumnsState: IDataGridModelColumnState = { ...this.defaultColumnState };

    this.columnsState = {};
    this.columnsState[COLUMN_TYPES.body] = bodyColumnsState;
    this.columnsState[COLUMN_TYPES.index] = indexColumnsState;

    this.addColumnNamesState(state);
    this.addColumnTypesState(state);
    this.addColumnsVisibilityState(state);
    this.addColumnsOrderState(state);
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
    const resetFilterFn = column => {
      column.setState({ filter: '' });
      column.columnFilter.hideInput();
    };

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

  takeColumnsByCells(startCell: ICellData, endCell: ICellData) {
    let result: any[] = [];

    if (endCell.type !== COLUMN_TYPES.index) {
      result = this.bodyColumns
        .map(column => this.columns[column.type][column.getResolvedIndex()])
        .filter(column => column.state.visible)
        .slice(startCell.column, endCell.column + 1);
    }

    if (startCell.type === COLUMN_TYPES.index) {
      result.unshift(this.indexColumns[0]);
    }

    return result;
  }

  takeColumnByCell(cellData: ICellData): DataGridColumn|null {
    const columns = this.takeColumnsByCells(cellData, cellData);

    return columns.length ? columns[0] : null;
  }

  showAllColumns() {
    this.bodyColumns.forEach((column) => column.show());
  }

  resetColumnsAlignment() {
    this.bodyColumns.forEach((column) => {
      column.resetAlignment();
    });
    this.dataGrid.model.reset();
  }

  resetColumnsOrder() {
    const bodyColumnsOrder = this.bodyColumnsState.order;
    const indexColumnsOrder = this.indexColumnsState.order;

    this.bodyColumnsState.order = bodyColumnsOrder.map((index, order) => order);
    this.indexColumnsState.order = indexColumnsOrder.map((index, order) => order);
    this.indexResolver.mapAllColumnPositionsToIndexes(this.indexColumnsState, this.bodyColumnsState);
    this.dataGrid.resizeMovedColumns(this.indexResolver.columnIndexesMap[COLUMN_TYPES.body], this.indexResolver.columnIndexesMap[COLUMN_TYPES.body]);
    this.dataGrid.model.reset();
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
      column.updateValuesIterator();
      column.addMinMaxValues();
    });
  }
  
  private addColumnsVisibilityState(state: IDataModelState) {
    const hasInitialOrder = state.columnOrder && state.columnOrder.length > 0;
    const addVisibilityStateItem = (name) => {
      if (hasInitialOrder) {
        return state.columnOrder.indexOf(name) !== -1;
      }

      return state.columnsVisible[name] !== undefined ? state.columnsVisible[name] : true;
    };

    this.bodyColumnsState.visibility = this.bodyColumnNames.map(addVisibilityStateItem);
    this.indexColumnsState.visibility = this.indexColumnNames.map(addVisibilityStateItem);
  }
  
  private addColumnsOrderState(state: IDataModelState) {
    const hasInitialOrder = state.columnOrder && state.columnOrder.length > 0;
    
    this.bodyColumnsState.order = this.bodyColumnNames.map((name, index) => index);
    this.indexColumnsState.order = this.indexColumnNames.map((name, index) => index);

    if (hasInitialOrder) {
      const names = [...this.bodyColumnNames];

      state.columnOrder.reverse().forEach((name) => {
        const columnIndex = names.indexOf(name);

        if (columnIndex === -1) {
          return true;
        }

        const columnPosition = this.bodyColumnsState.order.indexOf(columnIndex);

        this.bodyColumnsState.order.splice(columnPosition, 1);
        this.bodyColumnsState.order.unshift(columnIndex);
      });
    }
  }

  private addColumnNamesState(state: IDataModelState) {
    this.columnsState[COLUMN_TYPES.body].names = state.hasIndex
      ? state.columnNames.slice(1)
      : state.columnNames;
    this.columnsState[COLUMN_TYPES.index].names = state.hasIndex
      ? state.columnNames.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_NAME];
  }

  private addColumnTypesState(state: IDataModelState) {
    this.columnsState[COLUMN_TYPES.body].types = state.hasIndex ? state.types.slice(1) : state.types;
    this.columnsState[COLUMN_TYPES.index].types = state.hasIndex
      ? state.types.slice(0, 1)
      : [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_TYPE];
  }

  private showFilterInputs(useSearch: boolean, column?: DataGridColumn) {
    const methodToCall = useSearch ? 'showSearchInput' : 'showFilterInput';
    const showInputsFn = columnItem => columnItem.columnFilter
      [methodToCall](
      column === columnItem,
      this.dataGrid.getColumnOffset(columnItem.index, columnItem.type)
    );

    this.dataGrid.model.setFilterHeaderVisible(true);
    this.bodyColumns.forEach(showInputsFn);
    this.indexColumns.forEach(showInputsFn);
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
    this.indexColumns.forEach((column: DataGridColumn) => column.destroy());
    this.bodyColumns.forEach((column: DataGridColumn) => column.destroy());

    Signal.disconnectAll(this);
  }

}
