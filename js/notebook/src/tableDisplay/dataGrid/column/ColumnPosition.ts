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
import {selectColumnNames, selectHasIndex} from "../model/selectors";
import {UPDATE_COLUMNS_POSITION} from "./reducer";
import {DataGridColumnsAction} from "../store/DataGridAction";
import {BeakerxDataStore} from "../store/dataStore";
import {COLUMN_TYPES} from "./enums";
import {selectColumnIndexByPosition} from "./selectors";

export default class ColumnPosition {
  dataGrid: BeakerxDataGrid;
  store: BeakerxDataStore;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.store = dataGrid.store;
    this.dataGrid.cellHovered.connect(this.handleCellHovered, this);
  }

  reset() {
    const columnNames = selectColumnNames(this.store.state);
    const hasIndex = selectHasIndex(this.store.state);

    this.store.dispatch(new DataGridColumnsAction(UPDATE_COLUMNS_POSITION, {
      hasIndex,
      value: columnNames.map((index, order) => order),
      defaultValue: [0]
    }));

    this.dataGrid.resize();
    this.dataGrid.model.reset();
  }

  getColumnByPosition(columnType: COLUMN_TYPES, position: number) {
    const columnIndex = selectColumnIndexByPosition(this.store.state, columnType, position);

    return this.dataGrid.columnManager.getColumnByIndex(columnType, columnIndex);
  }

  private handleCellHovered(sender: BeakerxDataGrid, data: ICellData|null) {
    const pressData = this.dataGrid.eventManager.pressData;

    if (
      !data
      || !pressData
      || pressData.column === data.column
      || pressData.type !== data.type
    ) {
      return;
    }

    this.dataGrid.eventManager.setPressData(data);
    const srcColumn = this.dataGrid.columnManager.getColumnByPosition(pressData.type, pressData.column);
    const destPosition = data.column;

    srcColumn.move(destPosition);
  }
}
