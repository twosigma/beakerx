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

/**
 * This function should be called in tableScope context:
 * createHeaderMenuItems.call(tableScope, menuHelper, getFormatSubitems)
 *
 * @param getFormatSubitems
 * @returns Object { items: [] }
 */
function createHeaderMenuItems (cellHighlighters, getFormatSubitems) {
  var self = this;
  var menuHelper = new (require('./MenuHelper'))(self);

  function setColumnsOrder(container, newIndex) {
    var table = self.table;
    var colIdx = container.data('columnIndex');
    var columnIndexes = table.columns().indexes();

    columnIndexes = columnIndexes.filter(function (index) { return index !== colIdx; });
    columnIndexes.splice(newIndex, 0, colIdx);

    table.colReorder.order(columnIndexes);
  }

  return {
    items: [
      {
        title: 'Hide column',
        action: function (container) {
          var table = self.table;
          var colIdx = container.data('columnIndex');
          var column = table.column(colIdx);

          column.visible(!column.visible());
        }
      },
      {
        title: 'Filter by Expression',
        icon: 'fa fa-filter',
        tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
        action: function (container) {
          var table = self.table;
          var colIdx = container.data('columnIndex');
          var column = table.column(colIdx);

          self.doShowFilter(column, false);
        }
      },
      {
        title: 'Search for Substring',
        icon: 'fa fa-search',
        tooltip: 'search this column for a substring',
        action: function (container) {
          var table = self.table;
          var colIdx = container.data('columnIndex');
          var column = table.column(colIdx);

          self.doShowFilter(column, true);
        }
      },
      {
        title: 'Format',
        action: null,
        items: getFormatSubitems
      },
      {
        title: 'Sort Ascending',
        separator: true,
        isChecked: function (container) {
          return menuHelper.checkSorting(container, 'asc');
        },
        action: function (container) {
          menuHelper.doSorting(container, 'asc');
        }
      },
      {
        title: 'Sort Descending',
        isChecked: function (container) {
          return menuHelper.checkSorting(container, 'desc');
        },
        action: function (container) {
          menuHelper.doSorting(container, 'desc');
        }
      },
      {
        title: 'No Sort',
        isChecked: function (container) {
          return menuHelper.checkSorting(container);
        },
        action: function () {
          self.table.order([0, 'asc']).draw();
        }
      },
      {
        title: 'Align Left',
        separator: true,
        isChecked: function (container) {
          return menuHelper.checkAlignment(container, 'L');
        },
        action: function (container) {
          menuHelper.doAlignment(container, 'L');
        }
      },
      {
        title: 'Align Center',
        isChecked: function (container) {
          return menuHelper.checkAlignment(container, 'C');
        },
        action: function (container) {
          menuHelper.doAlignment(container, 'C');
        }
      },
      {
        title: 'Align Right',
        isChecked: function (container) {
          return menuHelper.checkAlignment(container, 'R');
        },
        action: function (container) {
          menuHelper.doAlignment(container, 'R');
        }
      },
      {
        title: 'Heatmap',
        shortcut: 'H',
        separator: true,
        isChecked: function (container) {
          var colIdx = container.data('columnIndex');
          var highlighter = self.cellHighlighters[colIdx];
          return highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter;
        },
        action: function (container) {
          var colIdx = container.data('columnIndex');
          self.showHideHeatmap(colIdx);
        }
      },
      {
        title: 'Data Bars',
        shortcut: 'B',
        isChecked: function (container) {
          var colIdx = container.data('columnIndex');
          return typeof(self.barsOnColumn[self.colorder[colIdx]]) !== 'undefined';
        },
        action: function (container) {
          var colIdx = container.data('columnIndex');
          self.showHideBars(self.colorder[colIdx]);
        }
      },
      {
        title: 'Color by unique',
        shortcut: 'U',
        isChecked: function (container) {
          var colIdx = container.data('columnIndex');
          var highlighter = self.cellHighlighters[colIdx];
          return highlighter && highlighter instanceof cellHighlighters.UniqueEntriesHighlighter;
        },
        action: function (container) {
          var colIdx = container.data('columnIndex');
          self.showHideUniqueEntries(colIdx);
        }
      },
      {
        title: 'Fix Left',
        isChecked: function (container) {
          return menuHelper.isFixedLeft(container);
        },
        action: function (container) {
          menuHelper.doFixColumnLeft(container);
        }
      },
      {
        title: 'Fix Right',
        isChecked: function (container) {
          return menuHelper.isFixedRight(container);
        },
        action: function (container) {
          menuHelper.doFixColumnRight(container);
        }
      },
      {
        title: 'Move column to front',
        separator: true,
        action: function (container) {
          setColumnsOrder(container, 1);
        }
      },
      {
        title: 'Move column to end',
        action: function (container) {
          var columnIndexes = self.table.columns().indexes();

          setColumnsOrder(container, columnIndexes.length);
        }
      },
      {
        title: 'Reset formatting',
        separator: true,
        action: function (container) {
          var colIdx = container.data('columnIndex');
          var column = self.table.column(colIdx);

          column.state.clear();

          self.resetColumnContainerFixed(container);
          self.resetColumnTypesAndAlignments(container, colIdx);
          self.resetColumnHeatmap(colIdx, cellHighlighters);
          self.resetColumnDataBars(colIdx);
          self.resetColumnFilters(colIdx);
          self.resetColumnSort(colIdx);
          self.resetColumnSearch(colIdx);
          self.resetColumnWidth(colIdx);
          self.applyChanges();
        }
      }
    ]
  }
}

module.exports = createHeaderMenuItems;
