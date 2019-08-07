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
import {createColumnMenuItems} from "../../../../../src/tableDisplay/dataGrid/headerMenu/createColumnMenuItems";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('createColumnMenuItems', () => {
  let dataGrid;
  let dataStore;
  let column;
  let columnMenuItems;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    column = dataGrid.columnManager.columns[COLUMN_TYPES.index][0];
    columnMenuItems = createColumnMenuItems(column);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should create column menu items', () => {
    expect(columnMenuItems).to.be.an.instanceof(Array);
    expect(columnMenuItems).to.have.length(17);
  });

  it('should not create column menu items', () => {
    const columnMenuItems = createColumnMenuItems(null);

    expect(columnMenuItems).to.be.an.instanceof(Array);
    expect(columnMenuItems).to.have.length(0);
  });

  it('should call column.move', () => {
    const stub = sinon.stub(column, 'move');

    columnMenuItems[15].action(column);
    columnMenuItems[14].action(column);

    expect(stub.calledTwice).to.be.true;

    stub.restore();
  });

  it('should call column.toggleColumnFrozen', () => {
    const stub = sinon.stub(column, 'toggleColumnFrozen');

    columnMenuItems[13].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.resetState', () => {
    const stub = sinon.stub(column, 'resetState');

    columnMenuItems[16].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.toggleHighlighter', () => {
    const stub = sinon.stub(column, 'toggleHighlighter');

    columnMenuItems[12].action(column);
    columnMenuItems[10].action(column);

    expect(stub.calledTwice).to.be.true;

    stub.restore();
  });

  it('should call column.toggleDataBarsRenderer', () => {
    const stub = sinon.stub(column, 'toggleDataBarsRenderer');

    columnMenuItems[11].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.setAlignment', () => {
    const stub = sinon.stub(column, 'setAlignment');

    columnMenuItems[9].action(column);
    columnMenuItems[8].action(column);
    columnMenuItems[7].action(column);

    expect(stub.calledThrice).to.be.true;

    stub.restore();
  });

  it('should call column.sort', () => {
    const stub = sinon.stub(column, 'sort');

    columnMenuItems[6].action(column);
    columnMenuItems[5].action(column);
    columnMenuItems[4].action(column);

    expect(stub.calledThrice).to.be.true;

    stub.restore();
  });

  it('should call column.showSearch', () => {
    const stub = sinon.stub(column.columnManager, 'showSearch');

    columnMenuItems[2].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.showFilters', () => {
    const stub = sinon.stub(column.columnManager, 'showFilters');

    columnMenuItems[1].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

  it('should call column.hide', () => {
    const stub = sinon.stub(column, 'hide');

    columnMenuItems[0].action(column);

    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });

});
