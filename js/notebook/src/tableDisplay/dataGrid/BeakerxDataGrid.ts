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

import { CellRenderer, DataGrid } from "@phosphor/datagrid";
import { BeakerxDataGridModel } from "./model/BeakerxDataGridModel";
import { Widget } from "@phosphor/widgets";
import { Signal } from '@phosphor/signaling';
import { ICellData } from "./interface/ICell";
import { CellRendererFactory } from "./cell/CellRendererFactory";
import DataGridColumn, { COLUMN_TYPES } from "./column/DataGridColumn";
import IDataModelState from "./interface/IDataGridModelState";
import HighlighterManager from "./highlighter/HighlighterManager";
import IHihglighterState from "./interface/IHighlighterState";
import { DEFAULT_PAGE_LENGTH } from "../consts";
import ColumnManager from "./column/ColumnManager";

export class BeakerxDataGrid extends DataGrid {
  columnSections: any;
  columnHeaderSections: any;
  model: BeakerxDataGridModel;
  rowHeaderSections: any;
  rowSections: any;
  viewport: Widget;
  highlighterManager: HighlighterManager;
  columnManager: ColumnManager;

  headerCellHovered = new Signal<this, ICellData|null>(this);

  constructor(options: DataGrid.IOptions, modelState: IDataModelState) {
    super(options);

    //@todo this is hack to use private properties
    this.viewport = this['_viewport'];
    this.columnHeaderSections = this['_columnHeaderSections'];
    this.rowHeaderSections = this['_rowHeaderSections'];
    this.rowSections = this['_rowSections'];
    this.columnSections = this['_columnSections'];

    this.init(modelState);

    this.columnManager.addColumns();
    this.model.reset();
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
    this.columnManager.destroy();
    this.dispose();
  }

  getColumn(config: CellRenderer.ICellConfig): DataGridColumn {
    return this.columnManager.getColumn(config);
  }

  getColumnByName(columnName: string): DataGridColumn|undefined {
    return this.columnManager.getColumnByName(columnName);
  }

  getColumnOffset(index: number, type: COLUMN_TYPES) {
    if (type === COLUMN_TYPES.index) {
      return 0;
    }

    return this.rowHeaderSections.totalSize + this.columnSections.sectionOffset(index);
  }

  private init(modelState: IDataModelState) {
    this.columnManager = new ColumnManager(modelState, this);
    this.model = new BeakerxDataGridModel(modelState, this.columnManager);

    this.addHighlighterManager(modelState);
    this.addCellRenderers();
    this.setWidgetHeight();
  }

  private addHighlighterManager(modelState: IDataModelState) {
    let cellHighlighters: IHihglighterState[] = modelState && modelState.cellHighlighters
      ? modelState.cellHighlighters
      : [];

    this.highlighterManager = new HighlighterManager(this, cellHighlighters);
  }

  private addCellRenderers() {
    let cellRendererFactory = new CellRendererFactory(this);
    let defaultRenderer = cellRendererFactory.getRenderer();

    this.cellRenderers.set('body', {}, defaultRenderer);
    this.cellRenderers.set('column-header', {}, defaultRenderer);
    this.cellRenderers.set('corner-header', {}, defaultRenderer);
    this.cellRenderers.set('row-header', {}, defaultRenderer);
  }

  private setWidgetHeight() {
    let bodyRowCount = this.model.rowCount('body');
    let rowCount = DEFAULT_PAGE_LENGTH < bodyRowCount ? DEFAULT_PAGE_LENGTH : bodyRowCount;

    this.node.style.minHeight = `${ rowCount * this.baseRowSize + this.baseColumnHeaderSize }px`;
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

      if (!data && x <= this.headerWidth) {
        data = this.findHoveredCellIndex(this.rowHeaderSections, y);
      }

      if (data) {
        let index = this.model.columnManager.indexResolver.resolveIndex(data.index, COLUMN_TYPES.index);

        return {
          ...data,
          index,
          type: COLUMN_TYPES.index,
          offset: this.getColumnOffset(data.index, COLUMN_TYPES.index)
        };
      }

      return null;
    }

    // Test for a match in the column header second.
    if (y <= this.headerHeight) {
      // Convert the position into unscrolled coordinates.
      let pos = x + this.scrollX - this.headerWidth;
      let data = this.findHoveredCellIndex(this.columnSections, pos);

      if (data) {
        let index = this.model.columnManager.indexResolver.resolveIndex(data.index, COLUMN_TYPES.body);

        return {
          ...data,
          index,
          type: COLUMN_TYPES.body,
          offset: this.getColumnOffset(data.index, COLUMN_TYPES.body)
        };
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
