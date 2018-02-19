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
import DataGridColumn, {COLUMN_TYPES} from "./DataGridColumn";

export default class ColumnFilter {
  dataGrid: BeakerxDataGrid;
  column: DataGridColumn;
  filterNode: HTMLElement;
  filterIcon: HTMLSpanElement;
  clearIcon: HTMLSpanElement;
  filterInput: HTMLInputElement;
  debounceId: any;
  useSearch: boolean;

  static DEBOUNCE_TIME_IN_MS = 250;

  constructor(dataGrid: BeakerxDataGrid, column: DataGridColumn, options: { x, y, width, height }) {
    this.dataGrid = dataGrid;
    this.column = column;

    this.addInputNode(options);
  }

  showSearchInput(shouldFocus: boolean, x?: number) {
    this.useSearch = true;
    this.filterIcon.classList.remove('fa-filter');
    this.filterIcon.classList.add('fa-search');
    this.showInput(shouldFocus, x);
  }

  showFilterInput(shouldFocus: boolean, x?: number) {
    this.useSearch = false;
    this.filterIcon.classList.add('fa-filter');
    this.filterIcon.classList.remove('fa-search');
    this.showInput(shouldFocus, x);
  }

  hideInput() {
    this.filterNode.style.visibility = 'hidden';
  }

  private showInput(shouldFocus: boolean, x?: number): void {
    if (this.filterNode.style.visibility === 'visible') {
      return;
    }

    if (x && !isNaN(x)) {
      this.filterNode.style.left = `${x}px`;
    }

    this.filterNode.style.visibility = 'visible';
    this.dataGrid.viewport.node.appendChild(this.filterNode);

    if (shouldFocus) {
      this.filterInput.focus();
    }
  }

  private filterHandler(event: KeyboardEvent) {
    if (event.keyCode === 27 || event.keyCode === 13 || !this.filterInput) { return; }

    if (this.useSearch) {
      return this.column.search(this.createExpression(this.filterInput.value));
    }

    this.column.filter(this.createExpression(this.filterInput.value));
  }

  private debouncedFilterHandler(event: KeyboardEvent) {
    clearTimeout(this.debounceId);
    this.debounceId = setTimeout(
      () => this.filterHandler(event),
      ColumnFilter.DEBOUNCE_TIME_IN_MS
    );
  }

  private createExpression(value: string) {
    if (this.useSearch) {
      return this.createSearchExpression(value);
    }

    return this.createFilterExpression(value);
  }

  private createFilterExpression(value: string): string {
    return value.replace('$', `${this.column.name}`);
  }

  private createSearchExpression(value: string) {
    const expression = `String($).indexOf("${String(value)}") !== -1`;

    return this.createFilterExpression(expression);
  }

  private addInputNode(options: { x, y, width, height }): void {
    const filterNode = document.createElement('div');

    filterNode.innerHTML = `<div class="input-clear">
      <span class="fa filter-icon fa-filter"></span>
      <input class="filter-input" type="text" title='filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"'>
      <span class="fa fa-times clear-filter"></span>
    </div>`;

    filterNode.classList.add('input-clear-growing');
    filterNode.style.width = `${options.width}px`;
    filterNode.style.height = `${options.height}px`;
    filterNode.style.left = `${options.x}px`;
    filterNode.style.top = `${options.y}px`;
    filterNode.style.position = 'absolute';

    this.filterNode = filterNode;
    this.filterIcon = this.filterNode.querySelector('.filter-icon') || new HTMLSpanElement();
    this.filterInput = this.filterNode.querySelector('input') || new HTMLInputElement();
    this.clearIcon = this.filterNode.querySelector('.clear-filter') || new HTMLSpanElement();
    this.bindEvents();
  }

  private bindEvents() {
    this.filterInput.addEventListener('mousedown', (event) => event.stopImmediatePropagation());
    this.filterNode.addEventListener('mousedown', (event) => event.stopImmediatePropagation());
    this.filterInput.addEventListener('keyup', this.debouncedFilterHandler.bind(this));

    if (this.clearIcon) {
      this.clearIcon.addEventListener('mousedown', () => {
        this.column.filter('');
        this.filterInput.value = '';
      });
    }
  }
}
