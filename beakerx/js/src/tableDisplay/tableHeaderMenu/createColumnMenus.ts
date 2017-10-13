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

import ColumnMenu from './ColumnMenu';
import $ from 'jquery';

export default function createColumnMenus(scope) {
  const settings = scope.table.settings()[0];
  const init = settings.oInit.columns;
  const columns = scope.columns;
  const menus: ColumnMenu[] = [];

  if (init !== false && (init || columns)) {
    const allColumns = { ...init, ...columns };
    const cells = settings.aoHeader[0];

    for (let i = 0, len = cells.length; i < len ; i++) {
      if (allColumns && allColumns[i] !== undefined) {
        menus.push(new ColumnMenu(scope, allColumns[i], cells[i]));
      }
    }
  }

  $(scope.element).on('click.headermenu', '.bko-column-header-menu', function(e) {
    let colIdx = $(this).parent().index();
    const fixedCols = scope.table.settings()[0]._oFixedColumns;
    const rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;

    if (rightHeader && $(rightHeader).has(this).length) {
      colIdx = scope.table.columns(':visible')[0].length - fixedCols.s.rightColumns + colIdx;
    }

    colIdx = scope.table.columns(':visible')[0][colIdx];

    for(let i = 0; i < menus.length; i++) {
      if (menus[i].columnIndex === colIdx) {
        menus[i].open($(this));
        break;
      }
    }
  });

  return menus;
};
