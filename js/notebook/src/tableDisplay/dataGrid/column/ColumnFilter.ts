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

import { BeakerxDataGrid } from "../BeakerxDataGrid";
import DataGridColumn from "./DataGridColumn";
import {selectColumnPosition, selectColumnWidth} from "./selectors";
import {DataGridHelpers} from "../dataGridHelpers";
import getEventKeyCode = DataGridHelpers.getEventKeyCode;
import {KEYBOARD_KEYS} from "../event/enums";
import {Widget} from "@phosphor/widgets";
import throttle = DataGridHelpers.throttle;

export default class ColumnFilter {
  dataGrid: BeakerxDataGrid;
  column: DataGridColumn;
  filterWidget: Widget;
  filterNode: HTMLElement;
  filterIcon: HTMLSpanElement;
  clearIcon: HTMLSpanElement;
  filterInput: HTMLInputElement;
  useSearch: boolean;

  constructor(dataGrid: BeakerxDataGrid, column: DataGridColumn, options: { x, y, width, height }) {
    this.dataGrid = dataGrid;
    this.column = column;

    this.filterHandler = throttle(this.filterHandler.bind(this), 100);
    this.addInputNode(options);
  }

  showSearchInput(shouldFocus: boolean) {
    this.useSearch = true;
    this.filterIcon.classList.remove('fa-filter');
    this.filterIcon.classList.add('fa-search');
    this.showInput(shouldFocus);
  }

  showFilterInput(shouldFocus: boolean) {
    this.useSearch = false;
    this.filterIcon.classList.add('fa-filter');
    this.filterIcon.classList.remove('fa-search');
    this.showInput(shouldFocus);
  }

  hideInput() {
    this.filterWidget.setHidden(true);
    this.filterInput.value = '';
  }

  updateInputNode() {
    this.filterNode.style.width = `${selectColumnWidth(this.dataGrid.store.state, this.column)}px`;
    this.updateInputPosition();
  }

  destroy() {
    this.filterWidget.isAttached && this.filterWidget.dispose();
  }

  attach(node: HTMLElement) {
    Widget.attach(this.filterWidget, node);
    this.bindEvents();
  }

  private updateInputPosition() {
    const position = this.dataGrid.getColumnOffset(
      selectColumnPosition(this.dataGrid.store.state, this.column),
      this.column.type
    );

    this.filterNode.style.left = `${position}px`;
  }

  private showInput(shouldFocus: boolean): void {
    this.updateInputNode();

    if (this.filterWidget.isVisible) {
      return;
    }

    this.filterWidget.setHidden(false);

    if (shouldFocus) {
      this.filterInput.focus();
    }
  }

  private filterHandler(event: KeyboardEvent) {
    const keyCode = getEventKeyCode(event);

    event.preventDefault();
    event.stopImmediatePropagation();

    if (
      keyCode === KEYBOARD_KEYS.Enter
      || keyCode === KEYBOARD_KEYS.Escape
      || !this.filterInput
    ) {
      return;
    }

    if (this.useSearch) {
      return this.column.search(this.createExpression(this.filterInput.value));
    }

    this.column.filter(this.createExpression(this.filterInput.value));
  }

  private createExpression(value: string) {
    if (this.useSearch) {
      return this.createSearchExpression(value);
    }

    return this.createFilterExpression(value);
  }

  private createFilterExpression(value: string): string {
    return value.replace('$', `col_${this.column.name}`);
  }

  private createSearchExpression(value: string) {
    const expression = `String($).indexOf("${String(value)}") !== -1`;

    return this.createFilterExpression(expression);
  }

  private addInputNode(options: { x, y, width, height }): void {
    this.filterWidget = new Widget();
    this.filterNode = this.filterWidget.node;

    this.filterNode.innerHTML = `<div class="input-clear">
      <span class="fa filter-icon fa-filter"></span>
      <input class="filter-input" type="text" title='filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"'>
      <span class="fa fa-times clear-filter"></span>
    </div>`;

    this.filterNode.classList.add('input-clear-growing');
    this.filterNode.style.width = `${options.width}px`;
    this.filterNode.style.height = `${this.dataGrid.baseRowSize}px`;
    this.filterNode.style.left = `${options.x}px`;
    this.filterNode.style.top = `${options.y}px`;
    this.filterNode.style.position = 'absolute';

    this.filterIcon = this.filterNode.querySelector('.filter-icon') || new HTMLSpanElement();
    this.filterInput = this.filterNode.querySelector('input') || new HTMLInputElement();
    this.clearIcon = this.filterNode.querySelector('.clear-filter') || new HTMLSpanElement();
    this.filterInput.style.height = `${this.dataGrid.baseRowSize}px`;

    this.filterWidget.setHidden(true);
  }

  private bindEvents() {
    const handleMouseDown = (event) => {
      this.dataGrid.setFocus(true);
      event.stopImmediatePropagation();
    };

    this.filterInput.addEventListener('keyup', this.filterHandler, true);
    this.filterInput.addEventListener('mousedown', handleMouseDown);
    this.filterNode.addEventListener('mousedown', handleMouseDown);

    if (this.clearIcon) {
      this.clearIcon.addEventListener('mousedown', () => {
        this.column.columnManager.resetFilters();
      });
    }
  }
}
