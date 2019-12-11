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

import * as sinon from 'sinon';
import { expect } from 'chai';
import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import {COLUMN_TYPES} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import {createIndexMenuItems} from "../../../../../src/tableDisplay/dataGrid/headerMenu/createIndexMenuItems";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('createIndexMenuItems', () => {
  let dataGrid;
  let dataStore;
  let column;
  let indexMenuItems;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    column = dataGrid.columnManager.columns[COLUMN_TYPES.index][0];
    indexMenuItems = createIndexMenuItems(column);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should create index menu items', () => {
    let indexMenuItems = createIndexMenuItems(column);

    expect(indexMenuItems).to.be.an.instanceof(Array);
    expect(indexMenuItems).to.have.length(13);
  });

  it('should not create index menu items', () => {
    const indexMenuItems = createIndexMenuItems({});

    expect(indexMenuItems).to.be.an.instanceof(Array);
    expect(indexMenuItems).to.have.length(0);
  });

  it('should call columnManager.showAllColumns', () => {
    const stub = sinon.stub(column.columnManager, 'showAllColumns');

    indexMenuItems[0].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.hide', () => {
    const column = dataGrid.columnManager.columns[COLUMN_TYPES.body][0];
    const stub = sinon.stub(column, 'hide');

    indexMenuItems[2].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call cellSelectionManager.clear', () => {
    const stub = sinon.stub(dataGrid.cellSelectionManager, 'clear');

    indexMenuItems[5].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call cellManager.copyToClipboard', () => {
    const stub = sinon.stub(dataGrid.cellManager, 'copyToClipboard');

    indexMenuItems[6].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call cellManager.CSVDownload', () => {
    const stub = sinon.stub(dataGrid.cellManager, 'CSVDownload');

    indexMenuItems[7].action();
    indexMenuItems[8].action();

    expect(stub.calledTwice).to.be.true;

    stub.restore();
  });

  it('should call columnManager.showSearch', () => {
    const stub = sinon.stub(dataGrid.columnManager, 'showSearch');

    indexMenuItems[9].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call columnManager.showFilters', () => {
    const stub = sinon.stub(dataGrid.columnManager, 'showFilters');

    indexMenuItems[10].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call columnManager.resetFilters', () => {
    const stub = sinon.stub(dataGrid.columnManager, 'resetFilters');

    indexMenuItems[11].action();

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call reset methods', () => {
    const columnManagerMock = sinon.mock(dataGrid.columnManager);
    const rowManagerMock = sinon.mock(dataGrid.rowManager);
    const removeHighlightersStub = sinon.stub(dataGrid.highlighterManager, 'removeHighlighters');
    const clearSelectionStub = sinon.stub(dataGrid.cellSelectionManager, 'clear');

    rowManagerMock.expects('resetSorting');
    rowManagerMock.expects('setRowsToShow');
    columnManagerMock.expects('resetFilters');
    columnManagerMock.expects('showAllColumns');
    columnManagerMock.expects('resetColumnsAlignment');
    columnManagerMock.expects('resetColumnPositions');

    indexMenuItems[12].action();

    rowManagerMock.verify();
    columnManagerMock.verify();
    expect(clearSelectionStub.calledOnce).to.be.true;
    expect(removeHighlightersStub.calledOnce).to.be.true;

    rowManagerMock.restore();
    columnManagerMock.restore();
    removeHighlightersStub.restore();
    clearSelectionStub.restore();
  });

});
