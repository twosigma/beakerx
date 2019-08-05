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
import * as sinon from 'sinon';
import modelStateMock from "../mock/modelStateMock";
import cellDataMock from "../mock/cellDataMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import ColumnPosition from "../../../../../src/tableDisplay/dataGrid/column/ColumnPosition";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('ColumnPosition', () => {
  const dataStore = createStore({
    ...modelStateMock,
    columnNames: ['test', 'column', 'column1'],
    types: ['double', 'double', 'double'],
    values: [[1,2,3],[1,3,2]],
    columnsFrozen: { column: true }
  });
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const columnPosition = dataGrid.columnPosition;

  it('should be an instance of ColumnFilter', () => {
    expect(columnPosition).to.be.an.instanceof(ColumnPosition);
  });

  it('should implement method startDragging', () => {
    expect(columnPosition).to.have.property('startDragging');
    expect(columnPosition.startDragging).to.be.a('function');

    columnPosition['handleDragStart'](cellDataMock);
    expect(columnPosition.grabbedCellData).to.equal(cellDataMock);
    expect(columnPosition.isDragging()).to.be.true;
    columnPosition.stopDragging();

    expect(columnPosition.isDragging()).to.be.false;
    expect(columnPosition.grabbedCellData).to.be.null;
    expect(columnPosition.dropCellData).to.be.null;
  });

  it('should implement method dropColumn', () => {
    const stub = sinon.stub(columnPosition, 'moveColumn');
    const dropData = { ...cellDataMock, column: 1 };

    columnPosition['handleDragStart'](cellDataMock);
    columnPosition.dropCellData = dropData;
    columnPosition.dropColumn();

    expect(stub.calledOnce).to.be.true;
    expect(columnPosition.isDragging()).to.be.false;
    expect(columnPosition.grabbedCellData).to.be.null;
    expect(columnPosition.dropCellData).to.be.null;

    stub.restore();
  });

  it('should implement method getColumnByPosition', () => {
    const column = dataGrid.columnManager.bodyColumns[0];
    const columnFrozen = dataGrid.columnManager.bodyColumns[1];

    expect(columnPosition.getColumnByPosition({ value: 0, region: 'body' })).to.equal(column);
    expect(columnPosition.getColumnByPosition({ value: 1, region: 'row-header' })).to.equal(columnFrozen);
  });

  it('should implement method moveColumn', () => {
    const column = dataGrid.columnManager.getColumnByName('test');
    const column1 = dataGrid.columnManager.getColumnByName('column1');
    const dropData = { ...cellDataMock, column: 1 };

    columnPosition['handleDragStart'](cellDataMock);
    columnPosition.dropCellData = dropData;
    columnPosition.dropColumn();

    expect(column1.getPosition().value).to.equal(0);
    expect(column.getPosition().value).to.equal(1);
  });

});
