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
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {COLUMN_TYPES} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import ColumnMenu from "../../../../../src/tableDisplay/dataGrid/headerMenu/ColumnMenu";
import {ALIGNMENTS_BY_CHAR} from "../../../../../src/tableDisplay/dataGrid/column/columnAlignment";
import {ALL_TYPES} from "../../../../../src/tableDisplay/dataGrid/dataTypes";
import IndexMenu from "../../../../../src/tableDisplay/dataGrid/headerMenu/IndexMenu";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('DataGridColumn', () => {
  const dataStore = createStore({
    ...modelStateMock,
    types: ['integer', 'integer', 'integer'],
    values: [[null, 1, 3], [2, null, NaN]],
    columnNames: ['test', 'column', 'columnNan']
  });
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const columnManager = dataGrid.columnManager;

  describe('DataGridColumn.type === "body"', () => {
    const bodyDataGridColumn = columnManager.bodyColumns[0];

    it('should have the body column type set', () => {
      expect(bodyDataGridColumn.type).to.equal(COLUMN_TYPES.body);
    });

    it('should create the ColumnMenu', () => {
      expect(bodyDataGridColumn.menu).to.be.an.instanceof(ColumnMenu);
    });

    it('should change the trigger state', () => {
      bodyDataGridColumn.handleHeaderCellHovered(
        dataGrid, { data: { type: COLUMN_TYPES.body, column: 0, row: 0, delta: 0, offset: 10, offsetTop: 10, region: 'column-header' } }
      );

      expect(bodyDataGridColumn.menu['triggerNode'].style.visibility).to.equal('visible');
    });

    it('should implement move method', () => {
      expect(bodyDataGridColumn).to.have.property('move');
      expect(bodyDataGridColumn.move).to.be.a('Function');

      bodyDataGridColumn.move(1);
      expect(bodyDataGridColumn.getPosition().value).to.equal(1);

      bodyDataGridColumn.hide();
      expect(bodyDataGridColumn.getPosition().value).to.equal(2);
      expect(columnManager.bodyColumns[1].getPosition().value).to.equal(0);

      bodyDataGridColumn.show();
      bodyDataGridColumn.move(0);

      expect(bodyDataGridColumn.getPosition().value).to.equal(0);
    });

    it('should call toggleVisibility', () => {
      const stub = sinon.stub(bodyDataGridColumn, 'toggleVisibility');

      bodyDataGridColumn.hide();
      bodyDataGridColumn.show();

      expect(stub.calledTwice).to.be.true;
      stub.restore();
    });

    it('should have the initial horizontalAlignment set', () => {
      expect(bodyDataGridColumn.getAlignment()).to.equal(ALIGNMENTS_BY_CHAR.C);
      expect(columnManager.bodyColumns[1].getAlignment()).to.equal(ALIGNMENTS_BY_CHAR.L);
    });

    it('should have the initial displayType set', () => {
      expect(bodyDataGridColumn.getDisplayType()).to.equal(ALL_TYPES.integer);
      expect(columnManager.bodyColumns[1].getDisplayType()).to.equal(ALL_TYPES.string);
    });

    it('should have the min and max values set', () => {
      const column = columnManager.bodyColumns[2];

      expect(column).to.have.property('minValue');
      expect(column).to.have.property('maxValue');
      expect(column.minValue).to.equal(3);
      expect(column.maxValue).to.equal(3);
    });
  });

  describe('DataGridColumn.type === "index"', () => {
    const indexDataGridColumn = columnManager.indexColumns[0];

    it('should have the index column type set', () => {
      expect(indexDataGridColumn.type).to.equal(COLUMN_TYPES.index);
    });

    it('should create the ColumnMenu', () => {
      expect(indexDataGridColumn.menu).to.be.an.instanceof(IndexMenu);
    });

    it('should not change the trigger state', () => {
      indexDataGridColumn.handleHeaderCellHovered(
        dataGrid, { data: { type: COLUMN_TYPES.index, column: 0, row: 0, delta: 0, offset: 0, offsetTop: 0, region: 'corner-header' } }
      );

      expect(indexDataGridColumn.menu['triggerNode'].style.visibility).to.equal('visible');
    });
  });

});
