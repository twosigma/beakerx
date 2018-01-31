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

import ColumnMenu from "./headerMenu/ColumnMenu";
import IndexMenu from "./headerMenu/IndexMenu";
import { BeakerxDataGrid } from "./BeakerxDataGrid";
import { IColumnOptions } from "./interface/IColumn";
import { ICellData } from "./interface/ICell";

export enum COLUMN_TYPES {
  'index',
  'body'
}

interface IColumnState {
  triggerShown: boolean
}

export default class DataGridColumn {
  index: number;
  type: COLUMN_TYPES;
  menu: ColumnMenu|IndexMenu;
  dataGrid: BeakerxDataGrid;
  state: IColumnState;

  constructor(options: IColumnOptions, dataGrid: BeakerxDataGrid) {
    this.index = options.index;
    this.type = options.type;
    this.dataGrid = dataGrid;
    this.state = { triggerShown: false };

    this.handleHeaderCellHovered = this.handleHeaderCellHovered.bind(this);

    this.createMenu(options.menuOptions);
  }

  createMenu(menuOptions): void {
    if (this.type === COLUMN_TYPES.index) {
      this.menu = new IndexMenu(this.index, this.dataGrid, menuOptions);

      return;
    }

    this.menu = new ColumnMenu(this.index, this.dataGrid, menuOptions);
  }

  destroy() {
    this.menu.destroy();
  }

  handleHeaderCellHovered(sender: BeakerxDataGrid, data: ICellData|null) {
    if (!data || data.index !== this.index || data.type !== this.type) {
      this.menu.hideTrigger();
      this.state.triggerShown = false;

      return;
    }

    if (this.state.triggerShown) {
      return;
    }

    this.menu.showTrigger();
    this.state.triggerShown = true;
  }
}
