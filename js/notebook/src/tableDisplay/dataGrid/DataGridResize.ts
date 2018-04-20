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
import { IMessageHandler, Message, MessageLoop } from '@phosphor/messaging';
import {selectDataFontSize, selectHeaderFontSize, selectHeadersVertical} from "./model/selectors";
import {
  DEFAULT_GRID_BORDER_WIDTH, DEFAULT_GRID_PADDING,
  DEFAULT_ROW_HEIGHT, MIN_COLUMN_WIDTH
} from "./style/dataGridStyle";
import DataGridColumn from "./column/DataGridColumn";
import {selectColumnWidth} from "./column/selectors";
import {DataModel} from "@phosphor/datagrid";
import {COLUMN_TYPES} from "./column/enums";
import ColumnRegion = DataModel.ColumnRegion;
import {DataGridHelpers} from "./dataGridHelpers";
import getStringSize = DataGridHelpers.getStringSize;

export class DataGridResize {
  dataGrid: BeakerXDataGrid;

  constructor(dataGrid: BeakerXDataGrid) {
    this.dataGrid = dataGrid;

    this.setSectionWidth = this.setSectionWidth.bind(this);
    this.updateColumnWidth = this.updateColumnWidth.bind(this);
    this.setInitialSectionWidth = this.setInitialSectionWidth.bind(this);
    this.resizeSectionWidth = this.resizeSectionWidth.bind(this);

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

  updateColumnWidth(region: ColumnRegion): Function {
    return ({ index, size }) => {
      let columnOnPosition = this.dataGrid.columnManager.getColumnByPosition({ region, value: index });

      columnOnPosition.setWidth(size);
    }
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
