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
import DataGridColumn from "../column/DataGridColumn";

export function createIndexMenuItems(column: DataGridColumn): MenuItem[] {

  const dataGrid = column.dataGrid;
  const createShowColumnSubmenu = (column): MenuItem[] => {
    const items: MenuItem[] = [];

    dataGrid.model.bodyColumnsState.names.forEach(function(columnName, index) {
      items.push({
        title: columnName,
        isChecked: () => {
          //@todo
        },
        action: () => {
          //@todo
        },
        updateLayout: true
      });
    });

    return items;
  };

  return [
    {
      title: 'Show All Columns',
      action: () => {
        //@todo
      }
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
        //@todo
      }
    },
    {
      title: 'Format',
      separator: true,
      items: createFormatMenuItems(column)
    },
    {
      title: 'Clear selection',
      action: () => {
        //@todo
      }
    },
    {
      title: 'Copy to Clipboard',
      separator: true,
      action: () => {
        //@todo
      }
    },
    {
      title: 'Download All as CSV',
      action: () => {
        //@todo
      }
    },
    {
      title: 'Download Selected as CSV',
      action: () => {
        //@todo
      }
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search the whole table for a substring',
      separator: true,
      action: () => {
        //@todo
      }
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column',
      separator: true,
      action: () => {
        //@todo
      }
    },
    {
      title: 'Hide Filter',
      action: () => {
        //@todo
      }
    },
    {
      title: 'Reset All Interactions',
      separator: true,
      action: () => {
        //@todo
      }
    }
  ]
}
