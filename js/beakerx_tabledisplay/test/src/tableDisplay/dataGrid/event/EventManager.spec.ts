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
import cellDataMock from "../mock/cellDataMock";
import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import EventManager from "../../../../../src/tableDisplay/dataGrid/event/EventManager";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('EventManager', () => {
  let dataGrid;
  let eventManager;
  let dataStore;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    eventManager = dataGrid.eventManager;
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of EventManager', () => {
    expect(eventManager).to.be.an.instanceof(EventManager);
  });

  it('should implement handleEvent method', () => {
    expect(eventManager).to.have.property('handleEvent');
    expect(eventManager.handleEvent).to.be.a('Function');
  });

  it('should implement destroy method', () => {
    expect(eventManager).to.have.property('destroy');
    expect(eventManager.destroy).to.be.a('Function');
  });

  it('should implement DOM event handlers', () => {
    expect(eventManager).to.have.property('handleMouseDown');
    expect(eventManager).to.have.property('handleMouseOut');
    expect(eventManager).to.have.property('handleMouseWheel');
    expect(eventManager).to.have.property('handleKeyDown');
    expect(eventManager).to.have.property('handleDoubleClick');
  });

  it('should implement DataGrid event handlers', () => {
    expect(eventManager).to.have.property('handleHeaderClick');
    expect(eventManager).to.have.property('handleCellHover');
  });

  it('should implement handleMouseDown event handler', () => {
    expect(eventManager).to.have.property('handleMouseDown');
    expect(eventManager.handleMouseDown).to.be.a('Function');
    eventManager.handleMouseDown(new MouseEvent('mousedown', { buttons: 1 }));
    expect(dataGrid.focused).to.be.true;
    expect(dataGrid.node.classList.contains('bko-focused')).to.be.true;
  });

  it('should implement handleMouseOut event handler', () => {
    expect(eventManager).to.have.property('handleMouseDown');
    expect(eventManager.handleMouseOut).to.be.a('Function');
    eventManager.handleMouseOut(new MouseEvent('mouseout'));
    expect(dataGrid.focused).to.be.false;
    expect(dataGrid.node.classList.contains('bko-focused')).to.be.false;
  });

  it('should implement handleMouseWheel event handler', () => {
    const mouseWheelHandler = sinon.spy();

    expect(eventManager).to.have.property('handleMouseWheel');
    expect(eventManager.handleMouseWheel).to.be.a('Function');
    expect(dataGrid.focused).to.be.false;

    eventManager.handleMouseWheel(new MouseEvent('mousewheel'), mouseWheelHandler);
    expect(mouseWheelHandler.called).to.be.false;

    dataGrid.focused = true;
    eventManager.handleMouseWheel(new MouseEvent('mousewheel'), mouseWheelHandler);
    expect(mouseWheelHandler.called).to.be.true;
  });

  it('should implement handleKeyDown event handler', () => {
    const highlighterStub = sinon.stub(eventManager, 'handleHighlighterKeyDown');
    const numStub = sinon.stub(eventManager, 'handleNumKeyDown');
    const navigationStub = sinon.stub(eventManager, 'handleNavigationKeyDown');
    const columnStub = sinon.stub(dataGrid.columnManager, 'takeColumnByCell');

    expect(eventManager).to.have.property('handleKeyDown');
    expect(eventManager.handleKeyDown).to.be.a('Function');

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp' });

    dataGrid.setFocus(true);
    eventManager.handleKeyDown(event);

    expect(highlighterStub.calledOnce).to.be.true;
    expect(numStub.calledOnce).to.be.true;
    expect(navigationStub.calledOnce).to.be.true;
    expect(columnStub.calledOnce).to.be.false;

    dataGrid.cellFocusManager.setFocusedCell(cellDataMock);
    eventManager.handleKeyDown(event);

    expect(highlighterStub.calledTwice).to.be.true;
    expect(numStub.calledTwice).to.be.true;
    expect(navigationStub.calledTwice).to.be.true;
    expect(columnStub.calledOnce).to.be.true;

    highlighterStub.restore();
    numStub.restore();
    navigationStub.restore();
    columnStub.restore();
  });

});
