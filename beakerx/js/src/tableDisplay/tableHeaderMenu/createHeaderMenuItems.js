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

  function setColumnsOrder(el, newIndex) {
    var table = self.table;
    var container = el.closest('.bko-header-menu');
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
        action: function (el) {
          var table = self.table;
          var container = el.closest('.bko-header-menu');
          var colIdx = container.data('columnIndex');
          var column = table.column(colIdx);

          column.visible(!column.visible());
        }
      },
      {
        title: 'Filter by Expression',
        icon: 'fa fa-filter',
        tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
        action: function (el) {
          var table = self.table;
          var container = el.closest('.bko-header-menu');
          var colIdx = container.data('columnIndex');
          var column = table.column(colIdx);

          self.doShowFilter(column, false);
        }
      },
      {
        title: 'Search for Substring',
        icon: 'fa fa-search',
        tooltip: 'search this column for a substring',
        action: function (el) {
          var table = self.table;
          var container = el.closest('.bko-header-menu');
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
        action: function (el) {
          menuHelper.doSorting(el, 'asc');
        }
      },
      {
        title: 'Sort Descending',
        isChecked: function (container) {
          return menuHelper.checkSorting(container, 'desc');
        },
        action: function (el) {
          menuHelper.doSorting(el, 'desc');
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
        action: function (el) {
          menuHelper.doAlignment(el, 'L');
        }
      },
      {
        title: 'Align Center',
        isChecked: function (container) {
          return menuHelper.checkAlignment(container, 'C');
        },
        action: function (el) {
          menuHelper.doAlignment(el, 'C');
        }
      },
      {
        title: 'Align Right',
        isChecked: function (container) {
          return menuHelper.checkAlignment(container, 'R');
        },
        action: function (el) {
          menuHelper.doAlignment(el, 'R');
        }
      },
      {
        title: 'Heatmap',
        shortcut: 'H',
        separator: true,
        isChecked: function (container) {
          var colIdx = container.data('columnIndex');
          var highlighter = self.cellHighlighters[self.colorder[colIdx]];
          return highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter;
        },
        action: function (el) {
          var container = el.closest('.bko-header-menu');
          var colIdx = container.data('columnIndex');
          self.showHideHeatmap(self.colorder[colIdx]);
        }
      },
      {
        title: 'Data Bars',
        shortcut: 'B',
        isChecked: function (container) {
          var colIdx = container.data('columnIndex');
          return typeof(self.barsOnColumn[self.colorder[colIdx]]) !== 'undefined';
        },
        action: function (el) {
          var container = el.closest('.bko-header-menu');
          var colIdx = container.data('columnIndex');
          self.showHideBars(self.colorder[colIdx]);
        }
      },
      {
        title: 'Fix Left',
        isChecked: function (container) {
          return menuHelper.isFixedLeft(container);
        },
        action: function (el) {
          menuHelper.doFixColumnLeft(el);
        }
      },
      {
        title: 'Fix Right',
        isChecked: function (container) {
          return menuHelper.isFixedRight(container);
        },
        action: function (el) {
          menuHelper.doFixColumnRight(el);
        }
      },
      {
        title: 'Move column to front',
        separator: true,
        action: function (el) {
          setColumnsOrder(el, 1);
        }
      },
      {
        title: 'Move column to end',
        action: function (el) {
          var columnIndexes = self.table.columns().indexes();

          setColumnsOrder(el, columnIndexes.length);
        }
      }
    ]
  }
}

module.exports = createHeaderMenuItems;
