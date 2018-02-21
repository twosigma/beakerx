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

import MenuItem from '../../../shared/interfaces/menuItemInterface';
import { createFormatMenuItems } from './createFormatMenuItems';
import DataGridColumn, {COLUMN_TYPES} from "../column/DataGridColumn";

export function createIndexMenuItems(column: DataGridColumn): MenuItem[] {

  const dataGrid = column.dataGrid;
  const createShowColumnSubmenu = (): MenuItem[] => {
    const items: MenuItem[] = [];
    const columnsState = dataGrid.columnManager.bodyColumnsState;

    columnsState.names.forEach((name, index) => {
      items.push({
        title: name,
        isChecked: () => columnsState.visibility[index],
        action: () => {
          let column = dataGrid.columnManager.getColumnByName(name);

          if (column) {
            column.state.visible ? column.hide() : column.show();
          }
        },
        updateLayout: true
      });
    });

    return items;
  };

  return [
    {
      title: 'Show All Columns',
      action: () => dataGrid.columnManager.showAllColumns()
    },
    {
      title: 'Show Column',
      enableItemsFiltering: true,
      keepOpen: true,
      items: createShowColumnSubmenu
    },
    {
      title: 'Hide All Columns',
      action: () => {
        dataGrid.columnManager.columns[COLUMN_TYPES.body].forEach((column) => {
          column.hide();
        });
      }
    },
    {
      title: 'Format',
      separator: true,
      items: createFormatMenuItems(column)
    },
    {
      title: 'Clear selection',
      action: () => dataGrid.cellSelectionManager.clear()
    },
    {
      title: 'Copy to Clipboard',
      separator: true,
      action: () => dataGrid.cellManager.copyToClipboard()
    },
    {
      title: 'Download All as CSV',
      action: () => dataGrid.cellManager.CSVDownload(false)
    },
    {
      title: 'Download Selected as CSV',
      action: () => dataGrid.cellManager.CSVDownload(true)
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search the whole table for a substring',
      separator: true,
      action: () => dataGrid.columnManager.showSearch()
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column',
      separator: true,
      action: () => dataGrid.columnManager.showFilters()
    },
    {
      title: 'Hide Filter',
      action: () => dataGrid.columnManager.resetFilters()
    },
    {
      title: 'Reset All Interactions',
      separator: true,
      action: () => {
        dataGrid.highlighterManager.removeHighlighters();
        dataGrid.cellSelectionManager.clear();
        dataGrid.rowManager.resetSorting();
        dataGrid.columnManager.resetFilters();
        dataGrid.columnManager.showAllColumns();
      }
    }
  ]
}
