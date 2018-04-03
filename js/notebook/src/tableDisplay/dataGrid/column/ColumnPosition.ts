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

import {BeakerxDataGrid} from "../BeakerxDataGrid";
import {ICellData} from "../interface/ICell";
import {selectColumnNames, selectColumnOrder, selectHasIndex} from "../model/selectors";
import {UPDATE_COLUMN_POSITIONS} from "./reducer";
import {DataGridColumnAction, DataGridColumnsAction} from "../store/DataGridAction";
import {BeakerxDataStore} from "../store/dataStore";
import {COLUMN_TYPES} from "./enums";
import {selectColumnIndexByPosition, selectIndexColumnNames} from "./selectors";
import {DEFAULT_HIGHLIGHT_COLOR} from "../style/dataGridStyle";
import {UPDATE_COLUMN_ORDER} from "../model/reducer";
import DataGridColumn from "./DataGridColumn";

export default class ColumnPosition {
  dataGrid: BeakerxDataGrid;
  store: BeakerxDataStore;
  grabbedCellData: ICellData|null;
  dropCellData: ICellData|null;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.store = dataGrid.store;
    this.dataGrid.cellHovered.connect(this.handleCellHovered, this);
  }

  stopDragging() {
    this.grabbedCellData = null;
    this.dropCellData = null;
    this.toggleGrabbing(false);
    this.dataGrid.repaint();
  }

  isDragging() {
    return !!this.grabbedCellData;
  }

  reset() {
    const hasIndex = selectHasIndex(this.store.state);

    this.store.dispatch(new DataGridColumnsAction(UPDATE_COLUMN_POSITIONS, {
      hasIndex,
      value: selectColumnNames(this.store.state),
      defaultValue: [0]
    }));

    this.dataGrid.resize();
    this.dataGrid.model.reset();
  }

  getColumnByPosition(columnType: COLUMN_TYPES, position: number) {
    const columnIndex = selectColumnIndexByPosition(this.store.state, columnType, position);

    return this.dataGrid.columnManager.getColumnByIndex(columnType, columnIndex);
  }

  grabColumn(data: ICellData) {
    this.grabbedCellData = data;
    this.toggleGrabbing(true);
  }

  dropColumn() {
    if (!this.grabbedCellData || !this.dropCellData) {
      return this.stopDragging();
    }

    this.moveColumn(this.grabbedCellData);
    this.stopDragging();
  }

  setPosition(column: DataGridColumn, position: number) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_ORDER,
      {
        value: position,
        columnType: column.type,
        columnName: column.name,
        columnIndex: column.index,
        hasIndex: selectHasIndex(this.store.state)
      })
    );

    this.updateAll();
  }

  updateAll() {
    let order = selectColumnOrder(this.store.state);

    if (!order || !order.length) {
      order = selectColumnNames(this.store.state);
    }

    this.store.dispatch(new DataGridColumnsAction(
      UPDATE_COLUMN_POSITIONS,
      {
        value: order,
        hasIndex: selectHasIndex(this.store.state),
        defaultValue: selectIndexColumnNames(this.store.state)
      })
    );
    this.dataGrid.resize();
  }

  private moveColumn(data: ICellData) {
    const column = this.dataGrid.columnManager.getColumnByPosition(data.type, data.column);

    this.setPosition(column, this.dropCellData.column);
    this.grabbedCellData = null;
    this.dropCellData = null;
  }

  private toggleGrabbing(enable: boolean) {
    enable
      ? this.dataGrid.node.classList.add('grabbing')
      : this.dataGrid.node.classList.remove('grabbing');
  }

  private handleCellHovered(sender: BeakerxDataGrid, data: ICellData|null) {
    const pressData = this.grabbedCellData;

    if (
      !data
      || !pressData
      || pressData.column === data.column
      || pressData.type !== data.type
    ) {
      return;
    }

    this.dropCellData && this.dataGrid.colorizeColumnBorder(this.dropCellData.column, this.dataGrid.style.gridLineColor);
    this.dataGrid.colorizeColumnBorder(data.column, DEFAULT_HIGHLIGHT_COLOR);
    this.dropCellData = data;
  }
}
