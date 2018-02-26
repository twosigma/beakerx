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
import { Widget } from "@phosphor/widgets";
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import { BeakerxDataGridModel } from "@beakerx/tableDisplay/dataGrid/model/BeakerxDataGridModel";
import modelStateMock from "./mock/modelStateMock";
import ColumnManager from "@beakerx/tableDisplay/dataGrid/column/ColumnManager";

describe('BeakerxDataGrid', () => {
  let dataGrid;

  before(() => {
    dataGrid = new BeakerxDataGrid({}, modelStateMock);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should create the columnManager', () => {
    expect(dataGrid.columnManager).to.be.an.instanceof(ColumnManager);
  });

  it('should have the model property of type BeakerxDataGridModel', () => {
    expect(dataGrid.model).to.be.an.instanceof(BeakerxDataGridModel);
  });

  it('should have the viewport set', () => {
    expect(dataGrid).to.have.property('viewport');
    expect(dataGrid.viewport).to.be.an.instanceof(Widget);
  });

  it('should implement destroy method', () => {
    const eventManagerStub = sinon.stub(dataGrid.eventManager, 'destroy');
    const columnsDestroyStub = sinon.stub(dataGrid.columnManager, 'destroy');

    dataGrid.destroy();

    expect(eventManagerStub.calledOnce).to.be.true;
    expect(columnsDestroyStub.calledOnce).to.be.true;

    eventManagerStub.restore();
    columnsDestroyStub.restore();
  });
});
