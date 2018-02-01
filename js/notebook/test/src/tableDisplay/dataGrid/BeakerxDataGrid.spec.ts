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
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import { BeakerxDataGridModel } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGridModel";

describe('BeakerxDataGrid', () => {
  let dataGrid;

  before(() => {
    dataGrid = new BeakerxDataGrid({}, {
      values: [2.4565656],
      columnNames: ['test'],
      types: ['double'],
      stringFormatForColumn: null,
      hasIndex: false,
    });
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should create index column', () => {
    expect(dataGrid.columns).to.have.property('index');
    expect(dataGrid.columns.index).to.have.length(1);
    expect(dataGrid.columns.index[0]).to.be.an.instanceof(DataGridColumn);
  });

  it('should create body column', () => {
    expect(dataGrid.columns).to.have.property('body');
    expect(dataGrid.columns.body).to.have.length(1);
    expect(dataGrid.columns.body[0]).to.be.an.instanceof(DataGridColumn);
  });

  it('should have the model property of type BeakerxDataGridModel', () => {
    expect(dataGrid.model).to.be.an.instanceof(BeakerxDataGridModel);
  });

  it('should have the viewport set', () => {
    expect(dataGrid).to.have.property('viewport');
    expect(dataGrid.viewport).to.be.an.instanceof(Widget);
  });

  it('should implement destroy method', () => {
    const destroyStub = sinon.stub(dataGrid, 'destroyAllColumns');
    const disposeStub = sinon.stub(dataGrid, 'dispose');

    dataGrid.destroy();

    expect(destroyStub.calledOnce).to.be.true;
    expect(disposeStub.calledOnce).to.be.true;

    destroyStub.restore();
    disposeStub.restore();
  });
});
