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
import {Widget} from "@phosphor/widgets";
import {DataModel} from "@phosphor/datagrid";
import {selectDataFontSize, selectHeaderFontSize, selectHeadersVertical} from "./model/selectors";
import {
  DEFAULT_GRID_BORDER_WIDTH, DEFAULT_GRID_PADDING,
  DEFAULT_ROW_HEIGHT, MIN_COLUMN_WIDTH
} from "./style/dataGridStyle";
import DataGridColumn from "./column/DataGridColumn";
import {COLUMN_TYPES} from "./column/enums";
import ColumnRegion = DataModel.ColumnRegion;
import {DataGridHelpers} from "./dataGridHelpers";
import {selectColumnWidth} from "./column/selectors";
import getStringSize = DataGridHelpers.getStringSize;

const DEFAULT_RESIZE_RECT_COLOR = 'rgba(57, 169, 237, 0.5)';
const DEFAULT_RESIZE_SECTION_SIZE_IN_PX = 6;

export class DataGridResize {
  dataGrid: BeakerXDataGrid;
  resizeRect: Widget;
  resizeStartRect: { width: number, height: number, x: number, y: number };
  resizeMode: 'h'|'v'|'both'|null;

  constructor(dataGrid: BeakerXDataGrid) {
    this.dataGrid = dataGrid;

    this.setSectionWidth = this.setSectionWidth.bind(this);
    this.updateColumnWidth = this.updateColumnWidth.bind(this);
    this.setInitialSectionWidth = this.setInitialSectionWidth.bind(this);
    this.resizeSectionWidth = this.resizeSectionWidth.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.setResizeRect();
    this.installMessageHook();
  }

  setInitialSize(): void {
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
  }

  updateWidgetWidth(): void {
    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH) + 1;
    const hasVScroll = (
      this.dataGrid.rowManager.rowsToShow !== -1 && this.dataGrid.rowManager.rowsToShow <= this.dataGrid.model.rowCount('body')
    );
    const vScrollWidth = hasVScroll ? this.dataGrid['_vScrollBarMinWidth'] + 1 : 0;
    const width = this.dataGrid.totalWidth + spacing + vScrollWidth;

    this.dataGrid.node.style.width = `${width}px`;
    this.dataGrid.fit();
  }

  setInitialSectionWidths(): void {
    for (let index = this.dataGrid.columnSections.sectionCount - 1; index >= 0; index--) {
      this.setInitialSectionWidth({ index }, 'body', COLUMN_TYPES.body);
    }

    for (let index = this.dataGrid.rowHeaderSections.sectionCount - 1; index >= 0; index--) {
      this.setInitialSectionWidth({ index }, 'row-header', COLUMN_TYPES.index);
    }
  }

  setInitialSectionWidth(section, region: DataModel.ColumnRegion, columnType: COLUMN_TYPES): void {
    const column = this.dataGrid.columnPosition.getColumnByPosition({ region, value: section.index });
    const area = region === 'row-header' ? 'row-header' : 'column';

    this.setSectionWidth(area, column, this.getSectionWidth(column));
  }

  fillEmptyDataGridSpace() {
    const space = this.dataGrid.node.clientWidth - this.dataGrid.totalWidth - 2 * DEFAULT_GRID_PADDING - this.dataGrid['_vScrollBar'].node.clientWidth;
    const position = this.dataGrid.columnSections.sectionCount - 1;
    const column = this.dataGrid.columnManager.getColumnByPosition({ value: position, region: 'body' });
    const value = this.dataGrid.columnSections.sectionSize(position) + space;
    const minValue = this.getSectionWidth(column);

    this.setSectionWidth('column', column, value < minValue ? minValue : value);
  }

  updateColumnWidth(region: ColumnRegion): Function {
    return ({ index, size }) => {
      let columnOnPosition = this.dataGrid.columnManager.getColumnByPosition({ region, value: index });

      columnOnPosition.setWidth(size);
    }
  }

  attachResizeRect(event: MouseEvent) {
    if (!this.dataGrid.node.parentElement) {
      return;
    }

    const width = this.dataGrid.viewport.node.clientWidth + this.dataGrid['_vScrollBar'].node.clientWidth + 3;
    const height = this.dataGrid.viewport.node.clientHeight + this.dataGrid['_hScrollBar'].node.clientHeight + 3;

    this.resizeRect.node.style.height = `${height}px`;
    this.resizeRect.node.style.width = `${width}px`;
    this.resizeStartRect = { width, height, x: event.clientX, y: event.clientY };

    if (!this.resizeRect.isAttached) {
      Widget.attach(this.resizeRect, this.dataGrid.node.parentElement);
    }

    this.resizeRect.node.addEventListener('mousedown', this.captureEvent, true);
    this.resizeRect.node.addEventListener('mousemove', this.handleMouseMove, true);
    this.dataGrid.node.parentElement.addEventListener('mouseup', this.handleMouseUp, true);
    this.dataGrid.node.parentElement.addEventListener('mousemove', this.handleMouseMove, true);
  }

  detachResizeRect() {
    this.resizeRect.isAttached && Widget.detach(this.resizeRect);

    this.resizeMode = null;
    this.dataGrid.node.parentElement.removeEventListener('mousemove', this.handleMouseMove, true);
    this.dataGrid.node.parentElement.addEventListener('mouseup', this.handleMouseUp, true);

    this.resizeRect.node.style.cursor = 'auto';
    this.dataGrid.node.style.cursor = 'auto';
    this.dataGrid.node.parentElement.style.cursor = 'auto';
    this.dataGrid['_canvas'].style.cursor = 'auto';
  }

  isResizing() {
    return this.resizeRect.isAttached;
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
    if (!this.dataGrid.node.parentElement) {
      return;
    }

    this.dataGrid.node.parentElement.classList.remove('cursor-ns-resize');
    this.dataGrid.node.parentElement.classList.remove('cursor-ew-resize');
    this.dataGrid.node.parentElement.classList.remove('cursor-nwse-resize');

    if (cursor !== 'auto') {
      this.dataGrid.node.parentElement.classList.add(`cursor-${cursor}`);
    }
  }

  private getDataGridResizeConfig(event: MouseEvent): { vertical: boolean, horizontal: boolean } {
    const viewportRect = this.dataGrid.viewport.node.getBoundingClientRect();
    const verticalOffset = event.clientY - viewportRect.bottom - this.dataGrid['_hScrollBar'].node.clientHeight;
    const horizontalOffset = event.clientX - viewportRect.right - this.dataGrid['_vScrollBar'].node.clientWidth;
    const vertical = verticalOffset >= 0 && verticalOffset <= DEFAULT_RESIZE_SECTION_SIZE_IN_PX;
    const horizontal = horizontalOffset >= 0 && horizontalOffset <= DEFAULT_RESIZE_SECTION_SIZE_IN_PX;

    return { vertical, horizontal };
  }

  private setResizeRect() {
    this.resizeRect = new Widget();
    this.resizeRect.node.style.position = 'absolute';
    this.resizeRect.node.style.background = DEFAULT_RESIZE_RECT_COLOR;
    this.resizeRect.node.style.top = `${DEFAULT_GRID_PADDING + 1}px`;
    this.resizeRect.node.style.left = `${DEFAULT_GRID_PADDING + 1}px`;
  }

  private handleMouseMove(event: MouseEvent) {
    if (event.buttons !== 1) {
      return;
    }

    this.captureEvent(event);

    if (this.resizeMode === 'both' || this.resizeMode === 'h') {
      this.resizeRect.node.style.width = `${this.resizeStartRect.width + event.clientX - this.resizeStartRect.x}px`;
    }

    if (this.resizeMode === 'both' || this.resizeMode === 'v') {
      this.resizeRect.node.style.height = `${this.resizeStartRect.height + event.clientY - this.resizeStartRect.y}px`;
    }

    if (
      (this.resizeMode === 'both' || this.resizeMode === 'v')
      && (this.resizeRect.node.clientHeight + 2 * DEFAULT_GRID_PADDING) - this.dataGrid.node.clientHeight > this.dataGrid.baseRowSize / 3
    ) {
      this.dataGrid.rowManager.setRowsToShow(this.dataGrid.rowManager.rowsToShow + 1);
    }
  }

  private handleMouseUp(event: MouseEvent) {
    if (!this.isResizing()) {
      return;
    }

    this.captureEvent(event);

    const rect = this.resizeRect.node.getBoundingClientRect();

    this.dataGrid.rowManager.setRowsToShow(Math.round((rect.height - this.dataGrid.headerHeight) / this.dataGrid.baseRowSize));
    this.dataGrid.node.style.width = `${rect.width + 2 * DEFAULT_GRID_PADDING}px`;
    this.fillEmptyDataGridSpace();
    this.setCursorStyle('auto');

    this.detachResizeRect();
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

    return rowCount * this.dataGrid.baseRowSize + this.dataGrid.headerHeight + spacing + scrollBarHeight;
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

    if (selectHeadersVertical(this.dataGrid.store.state)) {
      const mapNameToWidth = name => getStringSize(name, selectHeaderFontSize(this.dataGrid.store.state)).width;

      bodyColumnNamesWidths = this.dataGrid.columnManager.bodyColumnNames.map(mapNameToWidth);
      indexColumnNamesWidths = this.dataGrid.columnManager.indexColumnNames.map(mapNameToWidth);
    }

    this.dataGrid.baseColumnHeaderSize = Math.max.apply(
      null,
      [...bodyColumnNamesWidths, ...indexColumnNamesWidths, DEFAULT_ROW_HEIGHT]
    );
  }

  private getSectionWidth(column): number {
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

  private setSectionWidth(area, column: DataGridColumn, value: number): void {
    this.dataGrid.resizeSection(area, column.getPosition().value, value);
    column.setWidth(value);
  }

  private installMessageHook() {
    MessageLoop.installMessageHook(this.dataGrid.viewport, this.viewportResizeMessageHook.bind(this));
  }

  private viewportResizeMessageHook(handler, msg) {
    if (handler !== this.dataGrid.viewport) {
      return true;
    }

    if (msg.type === 'resize') {
      setTimeout(() => {
        this.dataGrid['_syncViewport']();
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
}
