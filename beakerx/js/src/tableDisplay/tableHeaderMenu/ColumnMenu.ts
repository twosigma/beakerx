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

import $ from 'jquery';
import HeaderMenu from './HeaderMenu';

export default class ColumnMenu extends HeaderMenu {
  private column: any;

  constructor(scope, column, cellSettings) {
    super(scope);
    this.column = column;
    this.cell = cellSettings.cell;

    this.buildMenu();
  }

  protected buildMenu(): void {
    const menu = this.column.header && this.column.header.menu;
    const $trigger = $("<span/>", { 'class': 'bko-menu bko-column-header-menu' });
    const self = this;

    if (!this.cell || !menu || !$.isArray(menu.items)) {
      return;
    }

    $(this.cell).append($trigger);

    this.columnIndex = self.getColumnIndex($trigger);
    this.menu.addClass('bko-header-menu');
    this.menu.addClass('dropdown');
    $(this.menu.contentNode).addClass('dropdown-menu');

    this.createItems(menu.items, this.menu);
  }

  private getColumnIndex($trigger: any): number {
    let columnIndex = this.dtApi.column($(this.cell).index() + ':visible').index();
    const fixedCols = this.dtApi.settings()[0]._oFixedColumns;
    const rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;

    if (rightHeader && $(rightHeader).has($trigger).length) {
      columnIndex = this.dtApi.columns(':visible')[0].length - fixedCols.s.rightColumns + columnIndex;
    }

    return columnIndex;
  }
}
