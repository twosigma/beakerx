/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import {CellRenderer, DataGrid, DataModel} from "@phosphor/datagrid";
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
import RowManager from "./row/RowManager";
import CellSelectionManager from "./cell/CellSelectionManager";
import CellManager from "./cell/CellManager";
import {DataGridHelpers} from "./dataGridHelpers";
import EventManager from "./EventManager";import {
  IMessageHandler, Message
} from '@phosphor/messaging';

import getStringWidth = DataGridHelpers.getStringWidth;
import CellFocusManager from "./cell/CellFocusManager";
import findSectionIndex = DataGridHelpers.findSectionIndex;
import {
  DEFAULT_GRID_BORDER_WIDTH,
  DEFAULT_GRID_PADDING, DEFAULT_ROW_HEIGHT,
  MIN_COLUMN_WIDTH
} from "./style/dataGridStyle";
import CellTooltipManager from "./cell/CellTooltipManager";

export class BeakerxDataGrid extends DataGrid {
  columnSections: any;
  columnHeaderSections: any;
  model: BeakerxDataGridModel;
  rowHeaderSections: any;
  rowSections: any;
  viewport: Widget;
  highlighterManager: HighlighterManager;
  columnManager: ColumnManager;
  rowManager: RowManager;
  cellSelectionManager: CellSelectionManager;
  cellManager: CellManager;
  eventManager: EventManager;
  cellFocusManager: CellFocusManager;
  cellTooltipManager: CellTooltipManager;
  focused: boolean;

  headerCellHovered = new Signal<this, ICellData|null>(this);
  cellHovered = new Signal<this, ICellData|null>(this);
  commSignal = new Signal<this, {}>(this);

  constructor(options: DataGrid.IOptions, modelState: IDataModelState) {
    super(options);

    //@todo this is hack to use private properties
    this.viewport = this['_viewport'];
    this.columnHeaderSections = this['_columnHeaderSections'];
    this.rowHeaderSections = this['_rowHeaderSections'];
    this.rowSections = this['_rowSections'];
    this.columnSections = this['_columnSections'];

    this.baseRowSize = DEFAULT_ROW_HEIGHT;
    this.baseColumnHeaderSize = DEFAULT_ROW_HEIGHT;

    this.resizeColumnSection = this.resizeColumnSection.bind(this);
    this.init(modelState);
  }

  handleEvent(event: Event): void {
    this.eventManager.handleEvent(event, super.handleEvent);
  }

  messageHook(handler: IMessageHandler, msg: Message): boolean {
    super.messageHook(handler, msg);

    if (handler === this.viewport && msg.type === 'section-resize-request') {
      this.updateWidgetWidth();
    }

    return true;
  }

  destroy() {
    this.eventManager.destroy();
    this.columnManager.destroy();

    Signal.disconnectAll(this);
  }

  getColumn(config: CellRenderer.ICellConfig): DataGridColumn {
    return this.columnManager.getColumn(config);
  }

  getColumnByName(columnName: string): DataGridColumn|undefined {
    return this.columnManager.getColumnByName(columnName);
  }

  getCellData(clientX: number, clientY: number): ICellData|null {
    if (!this.viewport) {
      return null;
    }

    let column: { index: number, delta: number } | null = null;
    let rect = this.viewport.node.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Test for a match in the corner header first.
    if (x <= this.headerWidth && y <= this.headerHeight) {
      if (y <= this.headerHeight) {
        column = findSectionIndex(this.columnHeaderSections, x);
      }

      if (!column && x <= this.headerWidth) {
        column = findSectionIndex(this.rowHeaderSections, y);
      }

      if (column) {
        return {
          column: column.index,
          row: 0,
          delta: column.delta,
          type: COLUMN_TYPES.index,
          offset: this.getColumnOffset(column.index, COLUMN_TYPES.index),
          offsetTop: 0
        };
      }

      return null;
    }

    let section = this.columnSections;
    let columnType = COLUMN_TYPES.body;
    let pos = x + this.scrollX - this.headerWidth;
    if (x <= this.rowHeaderSections.totalSize) {
      section = this.rowHeaderSections;
      columnType = COLUMN_TYPES.index;
      pos += this.headerWidth;
    }

    let row: { index: number, delta: number } | null = this.findHoveredRowIndex(y);
    column = findSectionIndex(section, pos);

    if (column) {
      return {
        column: column.index,
        delta: column.delta,
        row: row ? row.index : 0,
        type: columnType,
        offset: this.getColumnOffset(column.index, columnType),
        offsetTop: row ? this.getRowOffset(row.index) : 0
      };
    }

    return null;
  }

  getColumnOffset(index: number, type: COLUMN_TYPES) {
    if (type === COLUMN_TYPES.index) {
      return 0;
    }

    return this.rowHeaderSections.totalSize + this.columnSections.sectionOffset(index);
  }

  getRowOffset(row: number) {
    return this.rowSections.sectionOffset(row);
  }

  isOverHeader(event: MouseEvent) {
    let rect = this.viewport.node.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return x < (this.bodyWidth + this.rowHeaderSections.totalSize) && y < this.headerHeight;
  }

  resizeMovedColumns(oldMap: number[], newMap: number[]) {
    newMap.forEach((index, position) => {
      const column = this.columnManager.getColumnByIndex(COLUMN_TYPES.body, index);

      this.columnSections.resizeSection(
        position,
        this.getSectionWidth(column)
      );
    });
  }

  updateModelData(state: IDataModelState) {
    this.model.updateData(state);
    this.columnManager.recalculateMinMaxValues();
    this.resizeSections();
  }

  resizeSections() {
    this.columnManager.columns[COLUMN_TYPES.body].forEach(this.resizeColumnSection);
    this.resizeIndexColumn();
    this.updateWidgetWidth();
  }

  private init(modelState: IDataModelState) {
    this.columnManager = new ColumnManager(modelState, this);
    this.rowManager = new RowManager(modelState.values, modelState.hasIndex, this.columnManager);
    this.cellSelectionManager = new CellSelectionManager(this);
    this.cellManager = new CellManager(this);
    this.eventManager = new EventManager(this);
    this.cellFocusManager = new CellFocusManager(this);
    this.cellTooltipManager = new CellTooltipManager(this, modelState.tooltips);
    this.model = new BeakerxDataGridModel(modelState, this.columnManager, this.rowManager);
    this.focused = false;

    this.columnManager.addColumns();
    this.rowManager.createFilterExpressionVars();

    this.addHighlighterManager(modelState);
    this.addCellRenderers();
    this.setWidgetHeight();
    this.resizeSections();
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
    this.node.style.minHeight = `${this.getWidgetHeight()}px`;
  }

  private updateWidgetWidth() {
    const bodyRowCount = this.model.rowCount('body');
    const scrollBarSpaceWidth = bodyRowCount > DEFAULT_PAGE_LENGTH ? 20 : 0;
    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH);

    this.node.style.width = `${this.totalWidth + scrollBarSpaceWidth + spacing}px`;
    this.fit();

    setTimeout(() => {
      this['_syncViewport']();
    });
  }

  private getWidgetHeight() {
    const bodyRowCount = this.model.rowCount('body');
    const rowCount = DEFAULT_PAGE_LENGTH < bodyRowCount ? DEFAULT_PAGE_LENGTH : bodyRowCount;
    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH);

    return rowCount * this.baseRowSize + this.headerHeight + spacing;
  }

  private findHoveredRowIndex(y: number) {
    // Convert the position into unscrolled coordinates.
    let pos = y + this.scrollY - this.headerHeight;

    return findSectionIndex(this.rowSections, pos);
  }

  private resizeColumnSection(column) {
    this.resizeSection(
      'column',
      column.getResolvedIndex(),
      this.getSectionWidth(column)
    );
  }

  private getSectionWidth(column) {
    const value = String(column.formatFn(this.cellManager.createCellConfig({
      region: 'body',
      value: column.maxValue,
      column: column.index,
      row: 0,
    })));
    const nameWidth = getStringWidth(column.name, this.model.state.headerFontSize);
    const valueWidth = getStringWidth(value,this.model.state.dataFontSize);
    const result = nameWidth > valueWidth ? nameWidth: valueWidth;

    return result > MIN_COLUMN_WIDTH ? result : MIN_COLUMN_WIDTH;
  }

  private resizeIndexColumn() {
    const valueCharLength = this.model.rowCount('body');
    const name = this.columnManager.getColumnByIndex(COLUMN_TYPES.index, 0).name;
    const value = name.length > valueCharLength ? name : String(valueCharLength);
    const nameWidth = getStringWidth(name, this.model.state.headerFontSize);
    const valueWidth = getStringWidth(value, this.model.state.dataFontSize);
    const result = nameWidth > valueWidth ? nameWidth: valueWidth;

    this.rowHeaderSections.resizeSection(0, result + 10);
  }
}
