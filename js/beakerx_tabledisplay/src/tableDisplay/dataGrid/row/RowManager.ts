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
import { MapIterator, iter, toArray, filter } from '@phosphor/algorithm';
import DataGridColumn from "../column/DataGridColumn";
import ColumnManager from "../column/ColumnManager";
import {COLUMN_TYPES, SORT_ORDER} from "../column/enums";
import {DEFAULT_PAGE_LENGTH} from "../consts";
import ColumnFilter from "../column/ColumnFilter";

export default class RowManager {
  rowsIterator: MapIterator<any[], DataGridRow>;
  rows: DataGridRow[];
  filterExpression: string;
  expressionVars: string;
  sortedBy: DataGridColumn;
  columnManager: ColumnManager;
  rowsToShow: number;

  constructor(data: any[], hasIndex: boolean, columnManager: ColumnManager, rowsToShow:number) {
    this.columnManager = columnManager;
    this.rowsToShow = rowsToShow;
    this.createRows(data, hasIndex);

    this.evaluateSearchExpression = this.evaluateSearchExpression.bind(this);
    this.evaluateFilterExpression = this.evaluateFilterExpression.bind(this);
  }

  destroy(): void {
    this.rows = [];
    this.sortedBy = null;
    this.columnManager = null;
    this.rowsIterator = null;
  }

  createRows(data, hasIndex) {
    hasIndex ? this.createRowsWithIndex(data) : this.createRowsWithGeneratedIndex(data);
  }

  createRowsWithGeneratedIndex(data) {
    this.rowsIterator = new MapIterator<any[], DataGridRow>(
      iter(data),
      (values, index) => new DataGridRow(index, values)
    );
    this.rows = toArray(this.rowsIterator.clone());
  }

  createRowsWithIndex(data) {
    this.rowsIterator = new MapIterator<any[], DataGridRow>(
      iter(data),
      (values) => new DataGridRow(values[0], values.slice(1)
    ));

    this.rows = toArray(this.rowsIterator.clone());
  }

  keepSorting() {
    if(this.sortedBy!=undefined) {
      this.sortByColumn(this.sortedBy)
    }
  }

  getRow(index): DataGridRow {
    return this.rows[index];
  }

  sortByColumn(column: DataGridColumn) {
    const sortOrder = column.getSortOrder();

    this.sortedBy = column;

    if (column.type === COLUMN_TYPES.index || sortOrder === SORT_ORDER.NO_SORT) {
      return this.sortRows(column, sortOrder, this.indexValueResolver);
    }

    return this.sortRows(column, sortOrder);
  }

  sortRows(column: DataGridColumn, sortOrder: SORT_ORDER, valueResolver?: Function): void {
    const shouldReverse = sortOrder === SORT_ORDER.DESC;
    const resolverFn = valueResolver ? valueResolver : this.defaultValueResolver;
    const columnValueResolver = column.getValueResolver();
    const columnIndex = column.index;

    this.rows = this.rows.sort((row1, row2) => {
      let value1 = columnValueResolver(resolverFn(row1, columnIndex));
      let value2 = columnValueResolver(resolverFn(row2, columnIndex));
      let result = this.compareSortedValues(value1, value2);

      return shouldReverse ? -result : result;
    });
  }

  private compareSortedValues(value1, value2) {
    if (
      typeof value1 === 'number'
      && typeof value2 === 'number'
      && !isFinite(value1 - value2)
    ) {
      return !isFinite(value1) ? !isFinite(value2) ? 0 : 1 : -1;
    }

    if (value1 > value2) {
      return 1;
    }

    if (value1 < value2) {
      return -1;
    }

    return 0;
  }

  resetSorting() {
    if (this.sortedBy) {
      this.sortedBy.sort(SORT_ORDER.NO_SORT);
    }
  }

  defaultValueResolver(row: DataGridRow, columnIndex: number) {
    return row.values[columnIndex];
  }

  indexValueResolver(row, columnIndex: number) {
    return row.index;
  }

  createFilterExpressionVars() {
    this.expressionVars = '';

    const agregationFn = (column: DataGridColumn) => {
      let prefix = ColumnFilter.getColumnNameVarPrefix(column.name);
      let name = ColumnFilter.escapeColumnName(column.name);

      if (column.type === COLUMN_TYPES.index) {
        this.expressionVars += `var ${prefix}${name} = row.index;`;
      } else {
        this.expressionVars += `var ${prefix}${name} = row.values[${column.index}];`;
      }
    };

    this.columnManager.columns[COLUMN_TYPES.index].forEach(agregationFn);
    this.columnManager.columns[COLUMN_TYPES.body].forEach(agregationFn);
  }

  searchRows() {
    this.filterRows(this.evaluateSearchExpression);
  }

  filterRows(evalFn?: Function) {
    const columns = this.columnManager.columns;

    this.createFilterExpression();

    if (!this.filterExpression) {
      this.rows = toArray(this.rowsIterator.clone());
      this.columnManager.dataGrid.resize();

      return;
    }

    const formatFns = {};
    formatFns[COLUMN_TYPES.index] = columns[COLUMN_TYPES.index].map(column => column.formatFn);
    formatFns[COLUMN_TYPES.body] = columns[COLUMN_TYPES.body].map(column => column.formatFn);

    try {
      this.rows = toArray(filter(
        this.rowsIterator.clone(),
        (row) => evalFn ? evalFn(row, formatFns) : this.evaluateFilterExpression(row, formatFns)
      ));
      this.sortedBy && this.sortByColumn(this.sortedBy);
      this.columnManager.dataGrid.resize();
    } catch (e) {}
  }

  takeRows(start: number, end: number) {
    return this.rows.slice(start, end);
  }

  createFilterExpression(): void {
    let expressionParts: string[] = [];
    const agregationFn = (column: DataGridColumn) => {
      let filter = column.getFilter();

      if (filter) {
        expressionParts.push(filter);
      }
    };

    this.columnManager.columns[COLUMN_TYPES.index].forEach(agregationFn);
    this.columnManager.columns[COLUMN_TYPES.body].forEach(agregationFn);

    this.filterExpression = expressionParts.join(' && ').trim();
  }

  evaluateFilterExpression(row, formatFns) {
    const evalInContext = function(expression: string) {
      "use strict";

      const row = { ...this.row };
      const result = eval(expression);

      return result !== undefined ? result : true;
    }.bind({ row });

    return evalInContext(String(`${this.expressionVars} ${this.filterExpression}`));
  }

  evaluateSearchExpression(row, formatFns) {
    const evalInContext = function(expression: string) {
      const row = {
        index: formatFns[COLUMN_TYPES.index][0]({ row: this.row.index, value: this.row.index, column: 0 }),
        values: this.row.values.map((value, index) => formatFns[COLUMN_TYPES.body][index]({ value, row: this.row.index, column: index }))
      };
      const result = eval(expression);

      return result !== undefined ? result : true;
    }.bind({ row });

    return evalInContext(String(`${this.expressionVars} ${this.filterExpression}`));
  }

  getValueByColumn(row: number, columnIndex: number, columnType: COLUMN_TYPES) {
    return columnType === COLUMN_TYPES.body
      ? this.getRow(row).values[columnIndex]
      : this.getRow(row).index;
  }

  setRowsToShow(rows) {
    this.rowsToShow = rows;
    this.columnManager.dataGrid.dataGridResize.updateWidgetHeight();
    this.columnManager.dataGrid.dataGridResize.updateWidgetWidth();
  }
}
