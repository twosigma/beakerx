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

import * as sinon from 'sinon';
import { expect } from 'chai';
import modelStateMock from "./mock/modelStateMock";
import createStore from "../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import {DataGridResize} from "../../../../src/tableDisplay/dataGrid/DataGridResize";
import {
  DEFAULT_GRID_BORDER_WIDTH,
  DEFAULT_GRID_PADDING, DEFAULT_ROW_HEIGHT
} from "../../../../src/tableDisplay/dataGrid/style/dataGridStyle";
import tableDisplayWidgetMock from "./mock/tableDisplayMock";

describe('DataGridResize', () => {
  let dataGrid;
  let dataStore;
  let dataGridResize;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    dataGridResize = dataGrid.dataGridResize;
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of DataGridResize', () => {
    expect(dataGridResize).to.be.an.instanceof(DataGridResize);
  });

  it('should have the resize methods implemented', () => {
    expect(dataGridResize).to.have.property('setInitialSize');
    expect(dataGridResize).to.have.property('resize');
    expect(dataGridResize).to.have.property('updateWidgetHeight');
    expect(dataGridResize).to.have.property('updateWidgetWidth');
    expect(dataGridResize).to.have.property('setInitialSectionWidths');
    expect(dataGridResize).to.have.property('setInitialSectionWidth');
    expect(dataGridResize).to.have.property('fillEmptyDataGridSpace');
    expect(dataGridResize).to.have.property('updateColumnWidth');
    expect(dataGridResize).to.have.property('startResizing');
    expect(dataGridResize).to.have.property('stopResizing');
    expect(dataGridResize).to.have.property('isResizing');
    expect(dataGridResize).to.have.property('shouldResizeDataGrid');
    expect(dataGridResize).to.have.property('setResizeMode');
    expect(dataGridResize).to.have.property('setCursorStyle');
  });

  it('should call resize methods while calling setInitialSize', () => {
    const stubs = [];

    stubs.push(sinon.stub(dataGridResize, 'setBaseRowSize'));
    stubs.push(sinon.stub(dataGridResize, 'resizeHeader'));
    stubs.push(sinon.stub(dataGridResize, 'setInitialSectionWidths'));
    stubs.push(sinon.stub(dataGridResize, 'updateWidgetHeight'));
    stubs.push(sinon.stub(dataGridResize, 'updateWidgetWidth'));

    dataGridResize.setInitialSize();

    stubs.forEach((stub) => {
      expect(stub.calledOnce).to.be.true;
      stub.restore();
    });
  });

  it('should call resize methods while calling resize', () => {
    const stubs = [];

    stubs.push(sinon.stub(dataGridResize, 'updateWidgetHeight'));
    stubs.push(sinon.stub(dataGridResize, 'resizeHeader'));
    stubs.push(sinon.stub(dataGridResize, 'resizeSections'));
    stubs.push(sinon.stub(dataGridResize, 'updateWidgetWidth'));

    dataGridResize.resize();

    stubs.forEach((stub) => {
      expect(stub.calledOnce).to.be.true;
      stub.restore();
    });
  });

  it('should call set minHeight', () => {
    dataGrid.rowManager.setRowsToShow(1);

    const spacing = 2 * (DEFAULT_GRID_PADDING + DEFAULT_GRID_BORDER_WIDTH);

    expect(dataGrid.node.style.minHeight).to.equal(`${dataGrid.baseRowSize + dataGrid.headerHeight + spacing}px`);
  });

  it('should implement the setCursorStyle method', () => {
    expect(dataGridResize).to.have.property('setCursorStyle');

    dataGridResize.setCursorStyle('ew-resize');

    expect(document.body.classList.contains('cursor-ew-resize')).to.be.true;
  });

  it('should set the base row and header size', () => {
    expect(dataGrid.baseRowSize).to.equal(28);
    expect(dataGrid.baseColumnHeaderSize).to.equal(40);
  });

  it('should set correct column header row size', () => {
    const dataStore = createStore({
      ...modelStateMock,
      headerFontSize: NaN,
      dataFontSize: null
    });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);

    expect(dataGrid.baseRowSize).to.equal(DEFAULT_ROW_HEIGHT);
    expect(dataGrid.baseColumnHeaderSize).to.equal(DEFAULT_ROW_HEIGHT);

    dataGrid.destroy();
  });

});
