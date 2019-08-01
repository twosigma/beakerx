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

import { createFormatMenuItems } from './createFormatMenuItems';
import DataGridColumn from "../column/DataGridColumn";
import { selectBodyColumnStates } from "../column/selectors";
import {COLUMN_TYPES} from "../column/enums";
import {DEFAULT_PAGE_LENGTH, scopeData} from "../consts";
import IMenuItem from "beakerx_shared/lib/contextMenu/IMenuItem";

export function createIndexMenuItems(column: DataGridColumn): IMenuItem[] {

  const dataGrid = column.dataGrid;

  if (!dataGrid) {
    return [];
  }

  const createShowColumnSubmenu = (): IMenuItem[] => {
    const items: IMenuItem[] = [];
    const columnsStates = selectBodyColumnStates(dataGrid.store.state);

    columnsStates.forEach((state) => {
      items.push({
        title: state.name,
        id: `column_${state.name}`,
        isChecked: () => {
          let column = dataGrid.columnManager && dataGrid.columnManager.getColumnByName(state.name);

          return column && column.getVisible();
        },
        action: () => {
          let column = dataGrid.columnManager.getColumnByName(state.name);

          if (!column) { return; }

          column.getVisible() ? column.hide() : column.show();
        },
        updateLayout: true
      });
    });

    return items;
  };

  const createRowsToShowSubmenu = (): IMenuItem[] => {
    const items: IMenuItem[] = [];

    scopeData.rowsToDisplayMenu[0].forEach((item, index) => {
      items.push({
        title: `${scopeData.rowsToDisplayMenu[1][index]}`,
        id: `rows_${scopeData.rowsToDisplayMenu[1][index]}`,
        isChecked: () => dataGrid.rowManager && item === dataGrid.rowManager.rowsToShow,
        action: () => dataGrid.rowManager.setRowsToShow(item)
      })
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
      title: 'Rows to Show',
      items: createRowsToShowSubmenu
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
        dataGrid.rowManager.setRowsToShow(DEFAULT_PAGE_LENGTH);
        dataGrid.columnManager.resetFilters();
        dataGrid.columnManager.showAllColumns();
        dataGrid.columnManager.resetColumnsAlignment();
        dataGrid.columnManager.resetColumnPositions();
        dataGrid.setInitialSize();
      }
    }
  ]
}
