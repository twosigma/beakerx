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

import MenuHelper from './tableHeaderMenu/MenuHelper';

export default function extendTableScopeWithColumnReset(TableScope: any) {
  TableScope.prototype.resetColumnHeatmap = function(columnIndex: number, cellHighlighters: any) {
    const highlighter = this.cellHighlighters[columnIndex];

    if (highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter) {
      this.showHideHeatmap(columnIndex);
    }
  };

  TableScope.prototype.resetColumnDataBars = function(columnIndex: number) {
    this.barsOnColumn.hasOwnProperty(columnIndex) && this.showHideBars(columnIndex);
  };

  TableScope.prototype.resetColumnColorByUnique = function(columnIndex: number) {
    this.haColumnUniqueEntriesHighlighted(columnIndex) && this.showHideUniqueEntries(this.colorder[columnIndex]);
  };

  TableScope.prototype.resetColumnContainerFixed = function(columnIndex: number) {
    const menuHelper = new MenuHelper(this);

    if (menuHelper.isFixedRight(columnIndex)) {
      this.pagination.fixRight = 0;
    }
    if (menuHelper.isFixedLeft(columnIndex)) {
      this.pagination.fixLeft = 0;
    }

    this.updateFixedColumnsSeparator();
  };

  TableScope.prototype.resetColumnTypesAndAlignments = function(columnIndex: number) {
    const typesAndAllignments = this.getColumnTypeAndAlignment(columnIndex);
    const menuHelper = new MenuHelper(this);

    this.actualtype[columnIndex - 1] = typesAndAllignments.actualtype;
    menuHelper.doAlignment(columnIndex, typesAndAllignments.actualalign);
  };

  TableScope.prototype.resetColumnFilters = function(columnIndex: number) {
    const column = this.table.column(columnIndex);

    this.clearFilter(column, this.getColumnFilter(column));
    this.checkFilter();
  };

  TableScope.prototype.resetColumnSort = function(columnIndex: number) {
    const order = this.table.order();

    order.length && order[0][0] === columnIndex && this.table.order([]).draw();
  };

  TableScope.prototype.resetColumnSearch = function(columnIndex: number) {
    const column = this.table.column(columnIndex);

    column.search('');
    this.checkFilter();
  };

  TableScope.prototype.resetColumnWidth = function(columnIndex: number) {
    this.columnWidth = this.columnWidth.splice(columnIndex, 1);
  };
};
