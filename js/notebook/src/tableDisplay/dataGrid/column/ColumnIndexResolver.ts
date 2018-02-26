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

import { COLUMN_TYPES } from "./DataGridColumn";
import {IDataGridModelColumnState} from "../interface/IDataGridModelState";

export default class ColumnIndexResolver {
  columnIndexesMap: {};

  constructor(
    indexColumnsState: IDataGridModelColumnState,
    bodyColumnsState: IDataGridModelColumnState
  ) {
    this.columnIndexesMap = { [COLUMN_TYPES.index]: [], [COLUMN_TYPES.body]: [] };

    this.mapAllColumnPositionsToIndexes(indexColumnsState, bodyColumnsState);
  }

  mapAllColumnPositionsToIndexes(
    indexColumnsState: IDataGridModelColumnState,
    bodyColumnsState: IDataGridModelColumnState
  ) {
    this.mapColumnsPositionToIndex(COLUMN_TYPES.index, indexColumnsState);
    this.mapColumnsPositionToIndex(COLUMN_TYPES.body, bodyColumnsState);
  }

  getIndexByColumnPosition(position: number, columnType: COLUMN_TYPES) {
    return this.columnIndexesMap[columnType][position];
  }

  mapColumnsPositionToIndex(columnType: COLUMN_TYPES, columnsState: IDataGridModelColumnState) {
    this.applyOrderRules(columnType, columnsState);
    this.applyVisibilityRules(columnType, columnsState);
  }

  private applyVisibilityRules(columnType: COLUMN_TYPES, columnsState: IDataGridModelColumnState) {
    columnsState.visibility.forEach((visible, index) => {
      if (!visible) {
        let indexToRemove = this.columnIndexesMap[columnType].indexOf(index);
        let removed = this.columnIndexesMap[columnType].splice(indexToRemove, 1)[0];

        this.columnIndexesMap[columnType].push(removed);
      }
    });
  }

  private applyOrderRules(columnType: COLUMN_TYPES, columnsState: IDataGridModelColumnState) {
    columnsState.order.forEach((columnIndex, order) => {
      this.columnIndexesMap[columnType][order] = columnIndex;
    });
  }
}
