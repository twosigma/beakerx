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
import {expect} from "chai";
import {BeakerxDataGrid} from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import {COLUMN_TYPES} from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import modelStateMock from "../mock/modelStateMock";

describe('ColumnIndexResolver', () => {
  const dataGrid = new BeakerxDataGrid({}, modelStateMock);
  const columnIndexResolver = dataGrid.columnManager.indexResolver;

  it('should implement resolveIndex', () => {
    expect(columnIndexResolver).to.have.property('resolveIndex');
  });

  it('should have property hasIndex', () => {
    expect(columnIndexResolver).to.have.property('hasIndex');
    expect(columnIndexResolver.hasIndex).to.be.false;
  });

  it('should have property columnIndexesMap', () => {
    expect(columnIndexResolver).to.have.property('columnIndexesMap');
  });

  it('should returned proper column index', () => {
    expect(columnIndexResolver.resolveIndex(0, COLUMN_TYPES.index)).to.equal(0);
    expect(columnIndexResolver.resolveIndex(0, COLUMN_TYPES.body)).to.equal(0);
    expect(columnIndexResolver.resolveIndex(1, COLUMN_TYPES.body)).to.equal(1);

    dataGrid.columnManager.columns[COLUMN_TYPES.body][0].hide();
    expect(columnIndexResolver.resolveIndex(0, COLUMN_TYPES.body)).to.equal(1);
    dataGrid.columnManager.columns[COLUMN_TYPES.body][0].show();
    expect(columnIndexResolver.resolveIndex(0, COLUMN_TYPES.body)).to.equal(0);
  });

  it('should remap indexes after setting column visible', () => {
    const stub = sinon.stub(columnIndexResolver, 'mapIndexes');

    dataGrid.columnManager.columns[COLUMN_TYPES.body][0].hide();
    expect(stub.calledOnce).to.be.true;
    stub.restore();
  });
});
