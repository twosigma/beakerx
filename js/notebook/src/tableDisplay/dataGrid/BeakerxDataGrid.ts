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

import { DataGrid } from "@phosphor/datagrid";
import ColumnMenu from "./headerMenu/ColumnMenu";
import { ITriggerOptions } from "./headerMenu/HeaderMenu";
import { TableDataModel } from "./TableDataModel";
import IDataModelOptions from "./interface/IDataModelOptions";
import { Widget } from "@phosphor/widgets";
import IndexMenu from "./headerMenu/IndexMenu";

interface ICellData {
  type: string,
  index: number,
  delta: number
}

export class BeakerxDataGrid extends DataGrid {
  columnMenus: ColumnMenu[] = [];
  indexMenu: IndexMenu;
  model: TableDataModel;
  menuHoveredIndex: number|null;
  columnHeaderSections: any;
  rowHeaderSections: any;
  columnSections: any;
  rowSections: any;
  viewport: Widget;

  constructor(options, modelOptions: IDataModelOptions) {
    super(options);

    //@todo this is hack to use private properties
    this.viewport = this['_viewport'];
    this.columnHeaderSections = this['_columnHeaderSections'];
    this.rowHeaderSections = this['_rowHeaderSections'];
    this.rowSections = this['_rowSections'];
    this.columnSections = this['_columnSections'];

    this.addModel(modelOptions);
    this.addColumnMenus();
    this.addIndexMenu();
  }

  handleEvent(event: Event): void {
    switch (event.type) {
      case 'mousemove':
        this.handleHeaderCellHover(event as MouseEvent);
        break;
      case 'mouseout':
        this.hideAllTriggers();
        break;
    }

    super.handleEvent(event);
  }

  destroy() {
    this.destroyAllMenus();
    this.dispose();
  }

  private addColumnMenus() {
    this.model.columnNames.forEach((columnName, index) => {
      let triggerOptions: ITriggerOptions = {
        x: this.getColumnOffset(index),
        y: 0,
        width: this.headerHeight,
        height: this.headerHeight
      };

      this.columnMenus.push(new ColumnMenu(index, this, triggerOptions));
    });
  }

  private addIndexMenu(): void {
    if (!this.rowHeaderSections.sectionCount) {
      return;
    }

    let triggerOptions: ITriggerOptions = {
      x: 0, y: 0,
      width: this.headerHeight,
      height: this.headerHeight
    };

    this.indexMenu = new IndexMenu(0, this, triggerOptions);
  }

  private addModel(modelOptions: IDataModelOptions) {
    this.model = new TableDataModel(modelOptions);
  }

  private destroyAllMenus() {
    this.columnMenus.forEach(menu => menu.destroy());
  }

  private hideAllTriggers() {
    this.columnMenus.forEach(menu => menu.hideTrigger());
    this.indexMenu.hideTrigger();
  }

  private getColumnOffset(index: number) {
    return this.rowHeaderSections.totalSize + this.columnSections.sectionOffset(index);
  }

  private handleHeaderCellHover(event: MouseEvent): void {
    const data = this.getHoveredCellData(event.clientX, event.clientY);

    if (!data) {
      this.hideAllTriggers();
      this.menuHoveredIndex = null;

      return;
    }

    switch (data.type) {
      case 'body-column':
        this.showColumnMenuTrigger(data);
        break;
      case 'header-column':
      case 'header-row':
        this.showIndexMenuTrigger();
        break;
    }
  }

  private showColumnMenuTrigger({ index }) {
    let menu: ColumnMenu = this.columnMenus[index];

    if (this.menuHoveredIndex === index) {
      return;
    }

    this.hideAllTriggers();
    menu.showTrigger(this.getColumnOffset(index));
    this.menuHoveredIndex = index;
  }

  private showIndexMenuTrigger() {
    this.hideAllTriggers();
    this.indexMenu.showTrigger(0);
  }

  private getHoveredCellData(clientX: number, clientY: number): ICellData|null {
    if (!this.viewport) {
      return null;
    }

    let rect = this.viewport.node.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Bail early if the mouse is not over a grid header.
    if (x >= this.headerWidth && y >= this.headerHeight) {
      return null;
    }

    // Test for a match in the corner header first.
    if (x <= this.headerWidth && y <= this.headerHeight) {
      let data: { index: number, delta: number } | null = null;

      if (y <= this.headerHeight) {
        data = this.findHoveredCellIndex(this.columnHeaderSections, x); //@todo this is hack
      }

      if (data) {
        return { type: 'header-column', index: data.index, delta: data.delta };
      }

      if (x <= this.headerWidth) {
        data = this.findHoveredCellIndex(this.rowHeaderSections, y); //@todo this is hack
      }

      if (data) {
        return { type: 'header-row', index: data.index, delta: data.delta };
      }

      return null;
    }

    // Test for a match in the column header second.
    if (y <= this.headerHeight) {
      // Convert the position into unscrolled coordinates.
      let pos = x + this.scrollX - this.headerWidth;
      let data = this.findHoveredCellIndex(this.columnSections, pos); //@todo this is hack

      if (data) {
        return { type: 'body-column', index: data.index, delta: data.delta };
      }

      return null;
    }

    return null;
  }

  private findHoveredCellIndex(list: any, cursorPosition: number): { index: number, delta: number } | null {
    // Bail early if the list is empty or the position is invalid.
    if (list.sectionCount === 0 || cursorPosition < 0) {
      return null;
    }

    // Compute the delta from the end of the list.
    let delta = cursorPosition - (list.totalSize - 1);
    if (delta > 0) {
      return null;
    }

    // Test whether the hover is just past the last section.
    let index = list.sectionCount - 1;
    if (delta >= -list.sectionSize(index)) {
      return { index, delta };
    }

    index = list.sectionIndex(cursorPosition);
    delta = cursorPosition - (list.sectionOffset(index) - 1);

    if (index >= 0) {
      return { index, delta };
    }

    return null;
  }
}
