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

import {BeakerXDataGrid} from "./BeakerXDataGrid";
import { MessageLoop } from '@phosphor/messaging';
import {DataModel} from "@phosphor/datagrid";
import {selectDataFontSize, selectHeaderFontSize, selectHeadersVertical} from "./model/selectors";
import {
  DEFAULT_GRID_BORDER_WIDTH, DEFAULT_GRID_PADDING,
  DEFAULT_ROW_HEIGHT, MIN_COLUMN_WIDTH
} from "./style/dataGridStyle";
import DataGridColumn from "./column/DataGridColumn";
import ColumnRegion = DataModel.ColumnRegion;
import {DataGridHelpers} from "./dataGridHelpers";
import {selectColumnWidth} from "./column/selectors";
import getStringSize = DataGridHelpers.getStringSize;
import {ALL_TYPES} from "./dataTypes";

const DEFAULT_RESIZE_SECTION_SIZE_IN_PX = 6;
const DEFAULT_ROW_PADDING = 4;
const SCROLLBAR_WIDTH = 16;

export class DataGridResize {
  dataGrid: BeakerXDataGrid;
  resizeStartRect: { width: number, height: number, x: number, y: number };
  resizeMode: 'h'|'v'|'both'|null;
  resizing: boolean = false;
  resizedHorizontally: boolean = false;
  private maxWidth: number = 0;

  constructor(dataGrid: BeakerXDataGrid) {
    this.dataGrid = dataGrid;

    this.setSectionWidth = this.setSectionWidth.bind(this);
    this.updateColumnWidth = this.updateColumnWidth.bind(this);
    this.setInitialSectionWidth = this.setInitialSectionWidth.bind(this);
    this.resizeSectionWidth = this.resizeSectionWidth.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.fillEmptySpaceResizeFn = this.fillEmptySpaceResizeFn.bind(this);
    this.fitViewport = this.fitViewport.bind(this);

    this.installMessageHook();
  }

  destroy(): void {
    this.dataGrid = null;
  }

  setInitialSize(): void {
    this.setBaseRowSize();
    this.resizeHeader();
    this.updateWidgetHeight();
    this.setInitialSectionWidths();
    this.updateWidgetWidth();
  }

  resize(): void {
    this.updateWidgetHeight();
    this.resizeHeader();
    this.resizeSections();
    this.updateWidgetWidth();
    this.dataGrid.columnManager.updateColumnFilterNodes();
    this.dataGrid.columnManager.updateColumnMenuTriggers();
  }

  updateWidgetHeight(): void {
    this.dataGrid.node.style.minHeight = `${this.getWidgetHeight()}px`;
    this.fitViewport();
  }

  updateWidgetWidth(): void {
    if (this.maxWidth === 0) {
      return;
    }
    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH) + 1;
    const hasVScroll = (
      this.dataGrid.rowManager.rowsToShow !== -1 && this.dataGrid.rowManager.rowsToShow <= this.dataGrid.model.rowCount('body')
    );
    const vScrollWidth = hasVScroll ? SCROLLBAR_WIDTH : 0;
    const width = this.dataGrid.totalWidth + spacing + vScrollWidth;

    if (this.resizedHorizontally && width >= this.dataGrid.node.clientWidth) {
      this.fitViewport();

      return;
    }

    if (this.maxWidth && width >= this.maxWidth) {
      this.dataGrid.node.style.width = `${this.maxWidth}px`;
      this.fitViewport();

      return;
    }

    this.dataGrid.node.style.width = `${width}px`;
    this.fitViewport();
  }

  setInitialSectionWidths(): void {
    for (let index = this.dataGrid.columnSections.sectionCount - 1; index >= 0; index--) {
      this.setInitialSectionWidth({ index }, 'body');
    }

    for (let index = this.dataGrid.rowHeaderSections.sectionCount - 1; index >= 0; index--) {
      this.setInitialSectionWidth({ index }, 'row-header');
    }
  }

  setInitialSectionWidth(section, region: DataModel.ColumnRegion): void {
    const column = this.dataGrid.columnPosition.getColumnByPosition({ region, value: section.index });
    const area = region === 'row-header' ? 'row-header' : 'column';

    this.setSectionWidth(area, column, this.getSectionWidth(column));
  }

  fillEmptyDataGridSpace() {
    const space = this.dataGrid.node.clientWidth - this.dataGrid.totalWidth - 2 * DEFAULT_GRID_PADDING - this.dataGrid['_vScrollBar'].node.clientWidth;
    const value = Math.round(space / (this.dataGrid.columnSections.sectionCount + this.dataGrid.rowHeaderSections.sectionCount));

    this.dataGrid.columnSections['_sections'].forEach(this.fillEmptySpaceResizeFn('body', value));
    this.dataGrid.rowHeaderSections['_sections'].forEach(this.fillEmptySpaceResizeFn('row-header', value));

    this.fitViewport();
  }

  updateColumnWidth(region: ColumnRegion): Function {
    return ({ index, size }) => {
      let columnOnPosition = this.dataGrid.columnManager.getColumnByPosition({ region, value: index });

      columnOnPosition.setWidth(size);
    }
  }

  startResizing(event: MouseEvent) {
    if (!this.dataGrid.node.parentElement) {
      return;
    }

    const width = this.dataGrid.viewport.node.clientWidth + this.dataGrid['_vScrollBar'].node.clientWidth + 3;
    const height = this.dataGrid.viewport.node.clientHeight + this.dataGrid['_hScrollBar'].node.clientHeight + 3;

    this.resizeStartRect = { width, height, x: event.clientX, y: event.clientY };
    this.resizing = true;

    this.dataGrid.node.parentElement.addEventListener('mouseup', this.handleMouseUp, true);
    document.body.addEventListener('mousemove', this.handleMouseMove, true);
    document.body.addEventListener('mouseup', this.handleMouseUp, true);
  }

  stopResizing() {
    this.resizing = false;
    this.resizeMode = null;
    this.dataGrid.node.parentElement.removeEventListener('mouseup', this.handleMouseUp, true);
    document.body.removeEventListener('mousemove', this.handleMouseMove, true);
    document.body.removeEventListener('mouseup', this.handleMouseUp, true);

    this.setCursorStyle('auto');
  }

  isResizing() {
    return this.resizing;
  }

  shouldResizeDataGrid(event: MouseEvent): boolean {
    const { horizontal, vertical } = this.getDataGridResizeConfig(event);

    return vertical || horizontal;
  }

  setResizeMode(event: MouseEvent): void {
    const { horizontal, vertical } = this.getDataGridResizeConfig(event);

    if (!horizontal && !vertical) {
      this.setCursorStyle('auto');

      return;
    }

    if (vertical && horizontal) {
      this.resizeMode = 'both';
      this.setCursorStyle('nwse-resize');

      return;
    }

    this.resizeMode = vertical ? 'v' : 'h';
    this.setCursorStyle(vertical ? 'ns-resize' : 'ew-resize');
  }

  setCursorStyle(cursor: 'auto'|'ew-resize'|'ns-resize'|'nwse-resize') {
    document.body.classList.remove('cursor-ns-resize');
    document.body.classList.remove('cursor-ew-resize');
    document.body.classList.remove('cursor-nwse-resize');

    if (cursor !== 'auto') {
      document.body.classList.add(`cursor-${cursor}`);
    }
  }

  setSectionWidth(area, column: DataGridColumn, value: number): void {
    this.dataGrid.resizeSection(area, column.getPosition().value, value);
    column.setWidth(value);
  }

  fitViewport() {
    this.dataGrid && this.dataGrid.fit();
  }

  private fillEmptySpaceResizeFn(region: ColumnRegion, value: number) {
    return (section) => {
      let column = this.dataGrid.columnManager.getColumnByPosition({
        value: section.index,
        region
      });
      let minValue = this.getSectionWidth(column);
      let curValue = selectColumnWidth(this.dataGrid.store.state, column);

      this.setSectionWidth('column', column, curValue + value < minValue ? minValue : curValue + value);
    };
  }

  private getDataGridResizeConfig(event: MouseEvent): { vertical: boolean, horizontal: boolean } {
    const viewportRect = this.dataGrid.viewport.node.getBoundingClientRect();
    const verticalOffset = event.clientY - viewportRect.bottom - this.dataGrid['_hScrollBar'].node.clientHeight;
    const horizontalOffset = event.clientX - viewportRect.right - this.dataGrid['_vScrollBar'].node.clientWidth;
    const vertical = verticalOffset >= 0 && verticalOffset <= DEFAULT_RESIZE_SECTION_SIZE_IN_PX;
    const horizontal = horizontalOffset >= 0 && horizontalOffset <= DEFAULT_RESIZE_SECTION_SIZE_IN_PX;

    return { vertical, horizontal };
  }

  private handleMouseMove(event: MouseEvent): void {
    if (event.buttons !== 1) {
      return;
    }

    this.captureEvent(event);

    if (this.resizeMode === 'both' || this.resizeMode === 'h') {
      const width = this.getResizedWidth(event);

      this.dataGrid.node.style.width = `${width}px`;
      this.resizedHorizontally = true;
      this.fillEmptyDataGridSpace();
    }

    if (this.resizeMode === 'both' || this.resizeMode === 'v') {
      const height = this.getResizedHeight(event);

      this.dataGrid.rowManager.setRowsToShow(Math.round(height / this.dataGrid.baseRowSize) || 1);
    }
  }

  private getResizedWidth(event: MouseEvent): number {
    let width = this.resizeStartRect.width + event.clientX - this.resizeStartRect.x + 2 * DEFAULT_GRID_PADDING;

    return width < 2 * this.dataGrid.baseColumnSize ? 2 * this.dataGrid.baseColumnSize : Math.min(width, this.maxWidth);
  }

  private getResizedHeight(event: MouseEvent): number {
    let height = this.resizeStartRect.height + event.clientY - this.resizeStartRect.y;

    return height < this.dataGrid.baseRowSize ? this.dataGrid.baseRowSize : height;
  }

  private handleMouseUp(event: MouseEvent) {
    if (!this.isResizing()) {
      return;
    }

    this.captureEvent(event);
    this.setCursorStyle('auto');

    this.stopResizing();
  }

  private captureEvent(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private getWidgetHeight(): void {
    const bodyRowCount = this.dataGrid.model.rowCount('body');
    const rowsToShow = this.dataGrid.rowManager.rowsToShow;
    const rowCount = rowsToShow < bodyRowCount && rowsToShow !== -1 ? rowsToShow : bodyRowCount;
    const hasHScroll = !this.dataGrid['_hScrollBar'].isHidden;
    const scrollBarHeight = hasHScroll ? this.dataGrid['_hScrollBarMinHeight'] : 0;
    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH);
    let height = 0;

    for (let i = 0; i < rowCount; i += 1) {
      height += this.dataGrid.rowSections.sectionSize(i);
    }

    return height + this.dataGrid.headerHeight + spacing + scrollBarHeight;
  }

  private resizeSections(): void {
    this.dataGrid.columnManager.bodyColumns.forEach(this.resizeSectionWidth);
    this.dataGrid.columnManager.indexColumns.forEach(this.resizeSectionWidth);
  }

  private resizeSectionWidth(column): void {
    const position = column.getPosition();
    const value = selectColumnWidth(this.dataGrid.store.state, column);
    const area = position.region === 'row-header' ? 'row-header' : 'column';

    if (value === 0) {
      return this.setSectionWidth(area, column, this.getSectionWidth(column));
    }

    this.dataGrid.resizeSection(area, position.value, value);
  }

  private resizeHeader(): void {
    let bodyColumnNamesWidths: number[] = [];
    let indexColumnNamesWidths: number[] = [];
    let headerFontSize = selectHeaderFontSize(this.dataGrid.store.state);
    let headerRowSize = isFinite(headerFontSize)
      ? headerFontSize + 2 * DEFAULT_ROW_PADDING
      : this.dataGrid.baseRowSize;

    if (selectHeadersVertical(this.dataGrid.store.state)) {
      const mapNameToWidth = name => getStringSize(name, selectHeaderFontSize(this.dataGrid.store.state)).width;

      bodyColumnNamesWidths = this.dataGrid.columnManager.bodyColumnNames.map(mapNameToWidth);
      indexColumnNamesWidths = this.dataGrid.columnManager.indexColumnNames.map(mapNameToWidth);
    }

    this.dataGrid.baseColumnHeaderSize = Math.max.apply(
      null,
      [...bodyColumnNamesWidths, ...indexColumnNamesWidths, headerRowSize, DEFAULT_ROW_HEIGHT]
    );
  }

  private setBaseRowSize() {
    const dataFontSize = selectDataFontSize(this.dataGrid.store.state);

    this.dataGrid.baseRowSize = Number.isFinite(dataFontSize)
      ? dataFontSize + 2 * DEFAULT_ROW_PADDING
      : DEFAULT_ROW_HEIGHT;
  }

  private getSectionWidth(column): number {
    const fixedWidth = selectColumnWidth(this.dataGrid.store.state, column);
    const displayType = column.getDisplayType();

    if (displayType === ALL_TYPES.image) {
      return fixedWidth || 1;
    }

    if (displayType === ALL_TYPES.html && fixedWidth) {
      return fixedWidth;
    }

    return this.calculateSectionWidth(column);
  }

  private calculateSectionWidth(column: DataGridColumn) {
    const position = column.getPosition();
    const value = String(column.formatFn(this.dataGrid.cellManager.createCellConfig({
      region: position.region,
      value: column.longestStringValue || column.maxValue,
      column: position.value,
      row: 0,
    })));
    const nameSize = getStringSize(column.name, selectHeaderFontSize(this.dataGrid.store.state));
    const valueSize = getStringSize(value, selectDataFontSize(this.dataGrid.store.state));
    const nameSizeProp = selectHeadersVertical(this.dataGrid.store.state) ? 'height' : 'width';

    nameSize.width += 4; // Add space for the menu
    const result = nameSize[nameSizeProp] > valueSize.width - 7 ? nameSize[nameSizeProp] : valueSize.width;

    return result > MIN_COLUMN_WIDTH ? result : MIN_COLUMN_WIDTH;
  }

  private installMessageHook() {
    MessageLoop.installMessageHook(this.dataGrid.viewport, this.viewportResizeMessageHook.bind(this));
  }

  private viewportResizeMessageHook(handler, msg) {
    if (msg.type === 'before-attach') {
      this.maxWidth = this.dataGrid.tableDisplayView.$el.width();
      return true;
    }

    if (msg.type === 'after-attach') {
      const robs = new ResizeObserver(entries => {
        this.maxWidth = this.calculateMaxWidth(entries[0].contentRect.width);
        this.updateWidgetWidth();
      });
      robs.observe(this.dataGrid.tableDisplayView.$el.parents('.jp-OutputArea-child, .output_area')[0]);

    }

    if (!this.dataGrid || handler !== this.dataGrid.viewport) {
      return true;
    }

    if (msg.type === 'resize') {
      setTimeout(() => {
        this.dataGrid && this.dataGrid['_syncViewport']();
      });
    }

    if (msg.type === 'section-resize-request') {
      this.dataGrid.columnSections['_sections'].forEach(this.updateColumnWidth('body'));
      this.dataGrid.rowHeaderSections['_sections'].forEach(this.updateColumnWidth('row-header'));
      this.updateWidgetWidth();
      this.updateWidgetHeight();
    }

    return true;
  }

  private calculateMaxWidth(width: number): number {
    let outputEl = this.dataGrid.tableDisplayView.$el.parents('.jp-OutputArea-child, .output_area');
    let maxWidth = outputEl.width() - outputEl.find('.jp-OutputArea-prompt, .prompt').width();
    return Math.min(width, maxWidth);
  }
}
