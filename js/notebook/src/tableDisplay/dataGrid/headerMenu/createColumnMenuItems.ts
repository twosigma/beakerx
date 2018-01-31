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
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { IColumn } from '../interface/IColumn';

export function createColumnMenuItems(column: IColumn, dataGrid: BeakerxDataGrid): MenuItem[] {
  return [
    {
      title: 'Hide column',
      action: (column) => {}
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
      items: createFormatMenuItems(column, dataGrid)
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
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Align Center',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Align Right',
      isChecked: (column) => {},
      action: (column) => {}
    },
    {
      title: 'Heatmap',
      shortcut: 'H',
      separator: true,
      isChecked: (column) => {},
      action: (column) => {}
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
      isChecked: (column) => {},
      action: (column) => {}
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
