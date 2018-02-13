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
import MenuItem from "../../../shared/interfaces/menuItemInterface";
import DataGridColumn from "../column/DataGridColumn";
import { CENTER, LEFT, RIGHT } from "../column/columnAlignment";
import {HIGHLIGHTER_TYPE} from "../interface/IHighlighterState";

export function createColumnMenuItems(column: DataGridColumn): MenuItem[] {
  return [
    {
      title: 'Hide column',
      action: (column) => column.hide()
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
      action: (column) => {}
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search this column for a substring',
      action: (column) => {}
    },
    {
      title: 'Format',
      action: undefined,
      items: createFormatMenuItems(column)
    },
    {
      title: 'Sort Ascending',
      separator: true,
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Sort Descending',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'No Sort',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Align Left',
      separator: true,
      isChecked: (column) => column.getAlignment() === LEFT,
      action: (column) => { column.setAlignment(LEFT) }
    },
    {
      title: 'Align Center',
      isChecked: (column) => column.getAlignment() === CENTER,
      action: (column) => { column.setAlignment(CENTER) }
    },
    {
      title: 'Align Right',
      isChecked: (column) => column.getAlignment() === RIGHT,
      action: (column) => { column.setAlignment(RIGHT) }
    },
    {
      title: 'Heatmap',
      shortcut: 'H',
      separator: true,
      isChecked: (column) => column.getHighlighter(HIGHLIGHTER_TYPE.heatmap).length,
      action: (column) => column.toggleHighlighter(HIGHLIGHTER_TYPE.heatmap)
    },
    {
      title: 'Data Bars',
      shortcut: 'B',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Color by unique',
      shortcut: 'U',
      isChecked: (column) => column.getHighlighter(HIGHLIGHTER_TYPE.uniqueEntries).length,
      action: (column) => column.toggleHighlighter(HIGHLIGHTER_TYPE.uniqueEntries)
    },
    {
      title: 'Fix Left',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Fix Right',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Move column to front',
      separator: true,
      action: (column) => {}
    },
    {
      title: 'Move column to end',
      action: (column) => {}
    },
    {
      title: 'Reset formatting',
      separator: true,
      action: (column) => {}
    }
  ];
}
