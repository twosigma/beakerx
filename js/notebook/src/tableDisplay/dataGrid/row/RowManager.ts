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

import DataGridRow from "./DataGridRow";
import { MapIterator, iter, toArray } from '@phosphor/algorithm';
import {COLUMN_TYPES, default as DataGridColumn, SORT_ORDER} from "../column/DataGridColumn";
import {ALL_TYPES} from "../dataTypes";

export default class RowManager {
  rows: DataGridRow[];

  constructor(data: any[], hasIndex: boolean) {
    this.createRows(data, hasIndex);
  }

  createRows(data, hasIndex) {
    hasIndex ? this.createRowsWithIndex(data) : this.createRowsWithGeneratedIndex(data);
  }

  createRowsWithIndex(data) {
    this.rows = toArray(new MapIterator<number, any>(
      iter(data),
      (values, index) => new DataGridRow(index, values)
    ));
  }

  createRowsWithGeneratedIndex(data) {
    this.rows = toArray(new MapIterator<number, any>(
      iter(data),
      (values, index) => new DataGridRow(values[0], values)
    ));
  }

  getRowValues(index) {
    return this.rows[index].values;
  }

  sortByColumn(column: DataGridColumn) {
    if (column.type === COLUMN_TYPES.index || column.state.sortOrder === SORT_ORDER.NO_SORT) {
      return this.sortRows(column, this.indexValueResolver);
    }

    if (column.state.dataType === ALL_TYPES.datetime || column.state.dataType === ALL_TYPES.time) {
      return this.sortRows(column, this.dateValueResolver);
    }

    return this.sortRows(column);
  }

  sortRows(column: DataGridColumn, valueResolver?: Function): void {
    const shouldReverse = column.state.sortOrder === SORT_ORDER.DESC;
    const resolverFn = valueResolver ? valueResolver : this.defaultValueResolver;

    this.rows = this.rows.sort((row1, row2) => {
      let value1 = resolverFn(row1, column);
      let value2 = resolverFn(row2, column);
      let result = 0;

      if (value1 > value2) {
        result = 1;
      }

      if (value1 < value2) {
        result = -1;
      }

      return shouldReverse ? -result : result;
    });
  }

  defaultValueResolver(row, column) {
    return row.values[column.index];
  }

  dateValueResolver(row, column) {
    return row.values[column.index].timestamp;
  }

  indexValueResolver(row, column) {
    return row.index;
  }
}
