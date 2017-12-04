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

import MenuItem from '../../shared/interfaces/menuItemInterface';
import createFormatSubitems from './createFormatMenuItems';

export default function createIndexMenuItems(scope: any): MenuItem[] {

  const createShowColumnSubmenu = (): MenuItem[] => {
    const items: MenuItem[] = [];

    scope.columnNames.forEach(function(columnName, index) {
      items.push({
        title: columnName,
        isChecked: () => scope.isColumnVisible(index+1),
        action: () => scope.showColumn(index + 1),
        updateLayout: true
      });
    });

    return items;
  };


  const createRowsToShowSubmenu = (): MenuItem[] => {
    const items: MenuItem[] = [];

    scope.rowsToDisplayMenu[0].forEach((item, index) => {
      items.push({
        title: `${scope.rowsToDisplayMenu[1][index]}`,
        isChecked: () => {
          const len = scope.table.page.len();

          return scope.rowsToDisplayMenu[0].indexOf(len) === index;
        },
        action: () => scope.changePageLength(item)
      })
    });

    return items;
  };

  return [
    {
      title: 'Show All Columns',
      action: () => scope.toggleColumnsVisibility(true)
    },
    {
      title: 'Show Column',
      enableItemsFiltering: true,
      keepOpen: true,
      items: createShowColumnSubmenu
    },
    {
      title: 'Hide All Columns',
      action: () => scope.toggleColumnsVisibility(false)
    },
    {
      title: 'Format',
      separator: true,
      items: (colIdx) => createFormatSubitems(scope, colIdx)
    },
    {
      title: 'Use pagination',
      separator: true,
      action: () => scope.doUsePagination(),
      isChecked: () => scope.pagination.use
    },
    {
      title: 'Rows to Show',
      items: createRowsToShowSubmenu
    },
    {
      title: 'Clear selection',
      action: () => scope.doDeselectAll()
    },
    {
      title: 'Copy to Clipboard',
      separator: true,
      action: () => scope.doCopyToClipboard()
    },
    {
      title: 'Download All as CSV',
      action: () => scope.doCSVDownload(false)
    },
    {
      title: 'Download Selected as CSV',
      action: () => scope.doCSVDownload(true)
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search the whole table for a substring',
      separator: true,
      action: () => scope.doShowFilter(scope.table.column(0), true)
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column',
      separator: true,
      action: () => scope.doShowFilter(scope.table.column(0), true)
    },
    {
      title: 'Hide Filter',
      action: () => scope.hideFilter()
    },
    {
      title: 'Reset All Interactions',
      separator: true,
      action: () => scope.doResetAll()
    }
  ]
}
