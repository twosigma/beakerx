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

import createFormatSubitems from './createFormatMenuItems';
import * as MenuHelper from './MenuHelper';

export default function createColumnMenuItems(cellHighlighters) {
  var self = this;
  var menuHelper = MenuHelper(self);

  function setColumnsOrder(colIdx, newIndex) {
    var table = self.table;
    var columnIndexes = table.columns().indexes();

    columnIndexes = columnIndexes.filter(function (index) { return index !== colIdx; });
    columnIndexes.splice(newIndex, 0, colIdx);

    table.colReorder.order(columnIndexes);
  }

  return {
    items: [
      {
        title: 'Hide column',
        action: function (colIdx) {
          var table = self.table;
          var column = table.column(colIdx);

          column.visible(!column.visible());
        }
      },
      {
        title: 'Filter by Expression',
        icon: 'fa fa-filter',
        tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
        action: function (colIdx) {
          var table = self.table;
          var column = table.column(colIdx);

          self.doShowFilter(column, false);
        }
      },
      {
        title: 'Search for Substring',
        icon: 'fa fa-search',
        tooltip: 'search this column for a substring',
        action: function (colIdx) {
          var table = self.table;
          var column = table.column(colIdx);

          self.doShowFilter(column, true);
        }
      },
      {
        title: 'Format',
        action: null,
        items: (colIdx) => createFormatSubitems(self, colIdx)
      },
      {
        title: 'Sort Ascending',
        separator: true,
        isChecked: function (colIdx) {
          return menuHelper.checkSorting(colIdx, 'asc');
        },
        action: function (colIdx) {
          menuHelper.doSorting(colIdx, 'asc');
        }
      },
      {
        title: 'Sort Descending',
        isChecked: function (colIdx) {
          return menuHelper.checkSorting(colIdx, 'desc');
        },
        action: function (colIdx) {
          menuHelper.doSorting(colIdx, 'desc');
        }
      },
      {
        title: 'No Sort',
        isChecked: function (colIdx) {
          return menuHelper.checkSorting(colIdx);
        },
        action: function () {
          self.table.order([0, 'asc']).draw();
        }
      },
      {
        title: 'Align Left',
        separator: true,
        isChecked: function (colIdx) {
          return menuHelper.checkAlignment(colIdx, 'L');
        },
        action: function (colIdx) {
          menuHelper.doAlignment(colIdx, 'L');
        }
      },
      {
        title: 'Align Center',
        isChecked: function (colIdx) {
          return menuHelper.checkAlignment(colIdx, 'C');
        },
        action: function (colIdx) {
          menuHelper.doAlignment(colIdx, 'C');
        }
      },
      {
        title: 'Align Right',
        isChecked: function (colIdx) {
          return menuHelper.checkAlignment(colIdx, 'R');
        },
        action: function (colIdx) {
          menuHelper.doAlignment(colIdx, 'R');
        }
      },
      {
        title: 'Heatmap',
        shortcut: 'H',
        separator: true,
        isChecked: function (colIdx) {
          var highlighter = self.cellHighlighters[self.colorder[colIdx]];
          return highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter;
        },
        action: function (colIdx) {
          self.showHideHeatmap(self.colorder[colIdx]);
        }
      },
      {
        title: 'Data Bars',
        shortcut: 'B',
        isChecked: function (colIdx) {
          return typeof(self.barsOnColumn[self.colorder[colIdx]]) !== 'undefined';
        },
        action: function (colIdx) {
          self.showHideBars(self.colorder[colIdx]);
        }
      },
      {
        title: 'Color by unique',
        shortcut: 'U',
        isChecked: function (colIdx) {
          var highlighter = self.cellHighlighters[self.colorder[colIdx]];
          return highlighter && highlighter instanceof cellHighlighters.UniqueEntriesHighlighter;
        },
        action: function (colIdx) {
          self.showHideUniqueEntries(self.colorder[colIdx]);
        }
      },
      {
        title: 'Fix Left',
        isChecked: function (colIdx) {
          return menuHelper.isFixedLeft(colIdx);
        },
        action: function (colIdx) {
          menuHelper.doFixColumnLeft(colIdx);
        }
      },
      {
        title: 'Fix Right',
        isChecked: function (colIdx) {
          return menuHelper.isFixedRight(colIdx);
        },
        action: function (colIdx) {
          menuHelper.doFixColumnRight(colIdx);
        }
      },
      {
        title: 'Move column to front',
        separator: true,
        action: function (colIdx) {
          setColumnsOrder(colIdx, 1);
        }
      },
      {
        title: 'Move column to end',
        action: function (colIdx) {
          var columnIndexes = self.table.columns().indexes();

          setColumnsOrder(colIdx, columnIndexes.length);
        }
      },
      {
        title: 'Reset formatting',
        separator: true,
        action: function (colIdx) {
          var column = self.table.column(colIdx);

          column.state.clear();

          self.resetColumnContainerFixed(colIdx);
          self.resetColumnTypesAndAlignments(colIdx);
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
  };
}
