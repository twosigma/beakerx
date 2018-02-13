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
import { IDataGridModelColumnState as IColumnsState } from "../model/BeakerxDataGridModel";

export default class ColumnIndexResolver {
  hasIndex: boolean;
  columnIndexesMap: {};

  constructor(hasIndex, indexColumnsState: IColumnsState, bodyColumnsState: IColumnsState) {
    this.hasIndex = !!hasIndex;
    this.columnIndexesMap = { [COLUMN_TYPES.index]: {}, [COLUMN_TYPES.body]: {} };

    this.mapAllIndexes(indexColumnsState, bodyColumnsState);
  }

  mapAllIndexes(indexColumnsState: IColumnsState, bodyColumnsState: IColumnsState) {
    this.mapIndexes(COLUMN_TYPES.index, indexColumnsState);
    this.mapIndexes(COLUMN_TYPES.body, bodyColumnsState);
  }

  resolveIndex(index: number, columnType: COLUMN_TYPES) {
    return this.applyHasIndex(
      this.columnIndexesMap[columnType][index],
      columnType
    );
  }

  mapIndexes(columnType: COLUMN_TYPES, columnsState: IColumnsState) {
    let prevVisibleIndex = -1;

    for (let index = 0; index < columnsState.visibility.length; index++) {
      prevVisibleIndex = this.getNexVisibleIndex(
        prevVisibleIndex + 1,
        columnsState
      );

      this.columnIndexesMap[columnType][index] = prevVisibleIndex;
    }
  }

  private getNexVisibleIndex(index: number, columnsState) {
    if (columnsState.visibility[index] || index >= columnsState.visibility.length - 1) {
      return index;
    }

    return this.getNexVisibleIndex(index + 1, columnsState);
  }

  private applyHasIndex(index: number, columnType: COLUMN_TYPES) {
    return this.hasIndex && columnType === COLUMN_TYPES.body
      ? index + 1
      : index;
  }
}
