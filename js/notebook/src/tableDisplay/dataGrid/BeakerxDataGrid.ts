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
import { ITriggerOptions } from "./headerMenu/HeaderMenu";
import { BeakerxDataGridModel } from "./BeakerxDataGridModel";
import { Widget } from "@phosphor/widgets";
import { Signal } from '@phosphor/signaling';
import { ICellData } from "./interface/ICell";
import { CellRendererFactory } from "./cell/CellRendererFactory";
import DataGridColumn, { COLUMN_TYPES } from "./column/DataGridColumn";
import IDataModelState from "./interface/IDataModelState";

interface IColumns {
  index: DataGridColumn[],
  body: DataGridColumn[]
}

export class BeakerxDataGrid extends DataGrid {
  model: BeakerxDataGridModel;
  columnHeaderSections: any;
  rowHeaderSections: any;
  columnSections: any;
  rowSections: any;
  viewport: Widget;

  columns: IColumns = { index: [], body: [] };
  headerCellHovered = new Signal<this, ICellData|null>(this);

  constructor(options: DataGrid.IOptions, modelOptions: IDataModelState) {
    super(options);

    //@todo this is hack to use private properties
    this.viewport = this['_viewport'];
    this.columnHeaderSections = this['_columnHeaderSections'];
    this.rowHeaderSections = this['_rowHeaderSections'];
    this.rowSections = this['_rowSections'];
    this.columnSections = this['_columnSections'];

    this.addModel(modelOptions);
    this.addColumns();
    this.addCellRenderers();
  }

  handleEvent(event: Event): void {
    switch (event.type) {
      case 'mousemove':
        this.handleHeaderCellHover(event as MouseEvent);
        break;
      case 'mouseout':
        this.headerCellHovered.emit(null);
        break;
    }

    super.handleEvent(event);
  }

  destroy() {
    this.destroyAllColumns();
    this.dispose();
  }

  getColumn(index: number, region: string): DataGridColumn|null {
    if (region === 'body') {
      return this.columns.body[index];
    }

    if (region === 'column-header' || region === 'corner-header') {
      return this.columns.index[index];
    }

    return null;
  }

  private addModel(modelState: IDataModelState) {
    this.model = new BeakerxDataGridModel(modelState);
  }

  private addColumns() {
    this.addIndexColumns();
    this.addBodyColumns();
  }

  private addBodyColumns() {
    this.model.columnNames.forEach((name, index) => {
      let menuOptions: ITriggerOptions = {
        x: this.getColumnOffset(index),
        y: 0,
        width: this.headerHeight,
        height: this.headerHeight
      };

      let column = new DataGridColumn({
        index,
        name,
        menuOptions,
        type: COLUMN_TYPES.body
      }, this);

      this.columns.body.push(column);
    });
  }

  private addIndexColumns(): void {
    if (!this.rowHeaderSections.sectionCount) {
      return;
    }

    let column = new DataGridColumn({
      index: 0,
      name: 'index',
      menuOptions: { x: 0, y: 0, width: this.headerHeight, height: this.headerHeight },
      type: COLUMN_TYPES.index
    }, this);

    this.columns.index.push(column);
  }

  private addCellRenderers() {
    let cellRendererFactory = new CellRendererFactory(this);
    let defaultRenderer = cellRendererFactory.getRenderer();

    this.cellRenderers.set('body', {}, defaultRenderer);
    this.cellRenderers.set('column-header', {}, defaultRenderer);
    this.cellRenderers.set('row-header', {}, defaultRenderer);
  }

  private destroyAllColumns() {
    this.columns.index.forEach(column => column.destroy());
    this.columns.body.forEach(column => column.destroy());

    Signal.disconnectAll(this);
  }

  private getColumnOffset(index: number) {
    return this.rowHeaderSections.totalSize + this.columnSections.sectionOffset(index);
  }

  //@todo debounce it
  private handleHeaderCellHover(event: MouseEvent): void {
    const data = this.getHoveredCellData(event.clientX, event.clientY);

    this.headerCellHovered.emit(data);
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
        data = this.findHoveredCellIndex(this.columnHeaderSections, x);
      }

      if (data) {
        return { type: COLUMN_TYPES.index, index: data.index, delta: data.delta };
      }

      if (x <= this.headerWidth) {
        data = this.findHoveredCellIndex(this.rowHeaderSections, y);
      }

      if (data) {
        return { type: COLUMN_TYPES.index, index: data.index, delta: data.delta };
      }

      return null;
    }

    // Test for a match in the column header second.
    if (y <= this.headerHeight) {
      // Convert the position into unscrolled coordinates.
      let pos = x + this.scrollX - this.headerWidth;
      let data = this.findHoveredCellIndex(this.columnSections, pos);

      if (data) {
        return { type: COLUMN_TYPES.body, index: data.index, delta: data.delta };
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
