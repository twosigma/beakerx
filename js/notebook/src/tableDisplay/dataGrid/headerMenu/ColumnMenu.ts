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

import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { createColumnMenuItems } from './createColumnMenuItems';
import HeaderMenu, { ITriggerOptions } from "./HeaderMenu";
import { COLUMN_TYPES } from "../column/DataGridColumn";

export default class ColumnMenu extends HeaderMenu {

  constructor(columnIndex: number, dataGrid: BeakerxDataGrid, triggerOptions: ITriggerOptions) {
    super(columnIndex, dataGrid, triggerOptions);
  }

  protected buildMenu(): void {
    this.menu.addClass('bko-table-menu');
    this.menu.addClass('dropdown');

    this.menu.contentNode.classList.add('dropdown-menu');
    this.menu.contentNode.classList.add('bko-table-menu-content');

    let items = createColumnMenuItems(
      { index: this.columnIndex, type: COLUMN_TYPES.body },
      this.dataGrid
    );

    this.createItems(items, this.menu);
  }
}
