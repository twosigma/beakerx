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
import { CENTER, LEFT, RIGHT } from "../column/columnAlignment";
import {HIGHLIGHTER_TYPE} from "../interface/IHighlighterState";
import {selectVisibleBodyColumns} from "../column/selectors";
import {SORT_ORDER} from "../column/enums";
import {selectVisibleColumnsFrozenCount} from "../model/selectors";
import IMenuItem from "beakerx_shared/lib/contextMenu/IMenuItem";

export function createColumnMenuItems(column: DataGridColumn): IMenuItem[] {
  if (!column || !column.dataGrid) {
    return [];
  }

  return [
    {
      title: 'Hide column',
      action: (column) => column.hide()
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
      action: (column) => column.columnManager.showFilters(column)
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search this column for a substring',
      action: (column) => column.columnManager.showSearch(column)
    },
    {
      title: 'Format',
      action: undefined,
      items: createFormatMenuItems(column)
    },
    {
      title: 'Sort Ascending',
      separator: true,
      isChecked: (column) => column && column.getSortOrder() === SORT_ORDER.ASC,
      action: (column) => column.sort(SORT_ORDER.ASC)
    },
    {
      title: 'Sort Descending',
      isChecked: (column) => column && column.getSortOrder() === SORT_ORDER.DESC,
      action: (column) => column.sort(SORT_ORDER.DESC)
    },
    {
      title: 'No Sort',
      isChecked: (column) => column && column.getSortOrder() === SORT_ORDER.NO_SORT,
      action: (column) => column.sort(SORT_ORDER.NO_SORT)
    },
    {
      title: 'Align Left',
      separator: true,
      isChecked: (column) => column && column.getAlignment() === LEFT,
      action: (column) => { column.setAlignment(LEFT) }
    },
    {
      title: 'Align Center',
      isChecked: (column) => column && column.getAlignment() === CENTER,
      action: (column) => { column.setAlignment(CENTER) }
    },
    {
      title: 'Align Right',
      isChecked: (column) => column && column.getAlignment() === RIGHT,
      action: (column) => { column.setAlignment(RIGHT) }
    },
    {
      title: 'Heatmap',
      shortcut: 'H',
      separator: true,
      isChecked: (column) => column && column.getHighlighter(HIGHLIGHTER_TYPE.heatmap).length,
      action: (column) => column.toggleHighlighter(HIGHLIGHTER_TYPE.heatmap)
    },
    {
      title: 'Data Bars',
      shortcut: 'B',
      isChecked: (column) => column && !!column.getRenderer(),
      action: (column) => column.toggleDataBarsRenderer()
    },
    {
      title: 'Color by unique',
      shortcut: 'U',
      isChecked: (column) => column && column.getHighlighter(HIGHLIGHTER_TYPE.uniqueEntries).length,
      action: (column) => column.toggleHighlighter(HIGHLIGHTER_TYPE.uniqueEntries)
    },
    {
      title: 'Fix Left',
      isChecked: (column) => column && column.isFrozen(),
      action: (column) => column.toggleColumnFrozen()
    },
    {
      title: 'Move column to front',
      separator: true,
      action: (column) => column.move(0)
    },
    {
      title: 'Move column to end',
      action: (column) => {
        let visibleColumnsLength = selectVisibleBodyColumns(column.dataGrid.store.state).length;
        let frozenColumnsCount = selectVisibleColumnsFrozenCount(column.dataGrid.store.state);

        if (column.getPosition().region === 'body') {
          column.move(visibleColumnsLength - 1);
        } else {
          column.move(frozenColumnsCount);
        }
      }
    },
    {
      title: 'Reset formatting',
      separator: true,
      action: (column) => column.resetState()
    }
  ];
}
