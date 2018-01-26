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

import { createFormatSubitems } from './createFormatMenuItems';
import MenuItem from "../../../shared/interfaces/menuItemInterface";
import { BeakerxDataGrid } from "../BeakerxDataGrid";

export function createColumnMenuItems(columnIndex: number, dataGrid: BeakerxDataGrid): MenuItem[] {
  return [
    {
      title: 'Hide column',
      action: (colIdx) => {}
    },
    {
      title: 'Filter by Expression',
      icon: 'fa fa-filter',
      tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
      action: (colIdx) => {}
    },
    {
      title: 'Search for Substring',
      icon: 'fa fa-search',
      tooltip: 'search this column for a substring',
      action: (colIdx) => {}
    },
    {
      title: 'Format',
      action: undefined,
      items: createFormatSubitems(columnIndex, dataGrid)
    },
    {
      title: 'Sort Ascending',
      separator: true,
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Sort Descending',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'No Sort',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Align Left',
      separator: true,
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Align Center',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Align Right',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Heatmap',
      shortcut: 'H',
      separator: true,
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Data Bars',
      shortcut: 'B',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Color by unique',
      shortcut: 'U',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Fix Left',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Fix Right',
      isChecked: (colIdx) => {},
      action: (colIdx) => {}
    },
    {
      title: 'Move column to front',
      separator: true,
      action: (colIdx) => {}
    },
    {
      title: 'Move column to end',
      action: (colIdx) => {}
    },
    {
      title: 'Reset formatting',
      separator: true,
      action: (colIdx) => {}
    }
  ];
}
