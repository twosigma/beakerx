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

import { expect } from 'chai';

import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import ColumnFilter, {
  FILTER_INPUT_TOOLTIP,
  SEARCH_INPUT_TOOLTIP
} from "../../../../../src/tableDisplay/dataGrid/column/ColumnFilter";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('ColumnFilter', () => {
  const dataStore = createStore(modelStateMock);
  const  dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const columnManager = dataGrid.columnManager;
  const bodyDataGridColumn = columnManager.bodyColumns[0];
  const columnFilter = bodyDataGridColumn.columnFilter;

  it('should be an instance of ColumnFilter', () => {
    expect(columnFilter).to.be.an.instanceof(ColumnFilter);
  });

  it('should have HTML node properties', () => {
    expect(columnFilter).to.have.property('filterNode');
    expect(columnFilter.filterNode).to.be.an.instanceof(HTMLElement);
    expect(columnFilter).to.have.property('filterIcon');
    expect(columnFilter.filterIcon).to.be.an.instanceof(HTMLSpanElement);
    expect(columnFilter).to.have.property('clearIcon');
    expect(columnFilter.clearIcon).to.be.an.instanceof(HTMLSpanElement);
    expect(columnFilter).to.have.property('filterInput');
    expect(columnFilter.filterInput).to.be.an.instanceof(HTMLInputElement);
  });

  it('should show the filter input', () => {
    columnFilter.showFilterInput(false);
    expect(columnFilter.filterWidget.isHidden).to.be.false;
    expect(columnFilter.filterIcon.classList.contains('fa-filter')).to.be.true;
    expect(columnFilter.useSearch).to.be.false;
    expect(columnFilter.filterInput.title).to.equal(FILTER_INPUT_TOOLTIP);
  });

  it('should show the search input', () => {
    columnFilter.showSearchInput(false);
    expect(columnFilter.filterWidget.isHidden).to.be.false;
    expect(columnFilter.filterIcon.classList.contains('fa-search')).to.be.true;
    expect(columnFilter.useSearch).to.be.true;
    expect(columnFilter.filterInput.title).to.equal(SEARCH_INPUT_TOOLTIP);
  });

  it('should hide the input', () => {
    columnFilter.hideInput();
    expect(columnFilter.filterWidget.isHidden).to.be.true;
  });

  it('should filter rows', () => {
    const event = new KeyboardEvent('keyup', { key: '0', code: 'Digit0' });

    expect(dataGrid.model.rowCount('body')).to.equal(2);

    columnFilter.useSearch = false;
    columnFilter.filterInput.value = '$>0';
    columnFilter['filterHandler'](event);

    expect(dataGrid.model.rowCount('body')).to.equal(1);

    columnManager.resetFilters();
    expect(dataGrid.model.rowCount('body')).to.equal(2);
  });
});
