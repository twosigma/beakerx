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

import {BeakerxDataGrid} from "./BeakerxDataGrid";
import DataGridColumn, {COLUMN_TYPES} from "./column/DataGridColumn";
import {HIGHLIGHTER_TYPE} from "./interface/IHighlighterState";
import {DataGridHelpers} from "./dataGridHelpers";
import disableKeyboardManager = DataGridHelpers.disableKeyboardManager;
import enableKeyboardManager = DataGridHelpers.enableKeyboardManager;
import throttle = DataGridHelpers.throttle;
import {ICellData} from "./interface/ICell";

export default class EventManager {
  dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleCellHover = throttle<MouseEvent, void>(this.handleCellHover.bind(this), 150);

    this.dataGrid.node.removeEventListener('mouseout', this.handleMouseOut);
    this.dataGrid.node.addEventListener('mouseout', this.handleMouseOut);
    this.dataGrid.node.removeEventListener('dblclick', this.handleDoubleClick);
    this.dataGrid.node.addEventListener('dblclick', this.handleDoubleClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleEvent(event: Event, parentHandler: Function): void {
    switch (event.type) {
      case 'mousemove':
        this.handleCellHover(event as MouseEvent);
        break;
      case 'mousedown':
        this.handleMouseDown(event as MouseEvent);
        break;
      case 'wheel':
        this.handleMouseWheel(event as MouseEvent, parentHandler);
        return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  //@todo debounce it
  private handleCellHover(event: MouseEvent): void {
    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    this.handleBodyCellHover(data, event);
    this.handleHeaderCellHover(data, event);
  }

  private handleHeaderCellHover(data: ICellData|null, event: MouseEvent) {
    if (!this.dataGrid.isOverHeader(event)) {
      return this.dataGrid.headerCellHovered.emit(null);
    }

    this.dataGrid.headerCellHovered.emit(data);
  }

  private handleBodyCellHover(data: ICellData|null, event: MouseEvent) {
    if (this.dataGrid.isOverHeader(event)) {
      return this.dataGrid.cellHovered.emit(null);
    }

    this.dataGrid.cellHovered.emit(data);
  }

  private handleMouseDown(event: MouseEvent): void {
    this.dataGrid.focused = true;
    this.dataGrid.node.classList.add('bko-focused');
    this.handleHeaderClick(event);
    disableKeyboardManager();
  }

  private handleMouseOut(event: MouseEvent): void {
    this.dataGrid.headerCellHovered.emit(null);
    this.dataGrid.node.classList.remove('bko-focused');
    this.dataGrid.focused = false;
    this.dataGrid.cellTooltipManager.hideTooltip();
    enableKeyboardManager();
  }

  private handleMouseWheel(event: MouseEvent, parentHandler: Function): void {
    if(!this.dataGrid.focused) {
      return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  private handleHeaderClick(event: MouseEvent): void {
    if (!this.dataGrid.isOverHeader(event)) {
      return;
    }

    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (!data) {
      return;
    }

    const column = this.dataGrid.columnManager.columns[data.type][data.column];
    const destColumn = this.dataGrid.columnManager.getColumnByIndex(data.type, column.getResolvedIndex());

    destColumn.toggleSort();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.dataGrid.focused) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const focusedCell = this.dataGrid.cellFocusManager.focusedCellData;
    const column: DataGridColumn|null = focusedCell && this.dataGrid.columnManager.takeColumnByCell(focusedCell);
    const key = event.keyCode;
    const charCode = String.fromCharCode(key);

    if (!charCode) {
      return;
    }

    this.handleHighlighterKeyDown(charCode, column);
    this.handleNumKeyDown(event, charCode, column);
    this.handleArrowKeyDown(event);
  }

  private handleHighlighterKeyDown(charCode: string, column: DataGridColumn|null) {
    switch(charCode.toUpperCase()){
      case 'H':
        column && column.toggleHighlighter(HIGHLIGHTER_TYPE.heatmap);
        break;
      case 'U':
        column && column.toggleHighlighter(HIGHLIGHTER_TYPE.uniqueEntries);
        break;
    }
  }

  private handleArrowKeyDown(event: KeyboardEvent) {
    if (event.keyCode < 37 || event.keyCode > 40) {
      return;
    }

    this.dataGrid.cellFocusManager.setFocusedCellByArrowKey(event.keyCode);
  }

  private handleNumKeyDown(event: KeyboardEvent, charCode: string, column: DataGridColumn|null) {
    if (event.keyCode < 48 || event.keyCode > 57) { //not numbers 1..9
      return;
    }

    if (event.shiftKey && column) {
      column.setDataTypePrecission(parseInt(charCode));
    } else {
      this.dataGrid.columnManager.setColumnsDataTypePrecission(parseInt(charCode));
    }
  }

  private handleDoubleClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (this.dataGrid.isOverHeader(event)) {
      return;
    }

    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (!data || data.type === COLUMN_TYPES.index) {
      return;
    }

    if (this.dataGrid.model.state.hasDoubleClickAction) {
      this.dataGrid.commSignal.emit({
        event: 'DOUBLE_CLICK',
        row : data.row,
        column: data.column
      });
    }

    if (this.dataGrid.model.state.doubleClickTag) {
      this.dataGrid.commSignal.emit({
        event: 'actiondetails',
        params: {
          actionType: 'DOUBLE_CLICK',
          row: data.row,
          col: data.column
        }
      });
    }
  }
}
