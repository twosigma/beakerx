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

import { expect } from 'chai';
import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import {COLUMN_TYPES, SORT_ORDER} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('RowManager', () => {
  const values = [[1,2,3,4], [5,6,7,8]];
  const columnNames = ['test', 'test1', 'test2', 'test3'];
  const types = ['double', 'double', 'double', 'double'];
  const modelState = { ...modelStateMock, values, columnNames, types };
  const dataStore = createStore(modelState);
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);

  describe('hasIndex = false', () => {
    const rowManager = dataGrid.rowManager;
    const column = dataGrid.columnManager.getColumnByName('test');

    it('should have rows property', () => {
      expect(rowManager).to.have.property('rows');
      expect(rowManager.rows).to.have.length(values.length);
    });

    it('should implement sort valueResolvers', () => {
      expect(rowManager).to.have.property('defaultValueResolver');
      expect(rowManager).to.have.property('indexValueResolver');
      expect(typeof rowManager.defaultValueResolver).to.equal('function');
      expect(typeof rowManager.indexValueResolver).to.equal('function');
    });

    it('should return proper row values', () => {
      expect(rowManager.getRow(0).values[0]).to.equal(1);
      expect(rowManager.getRow(1).values[1]).to.equal(6);
    });

    it('should sort rows', () => {
      const column = dataGrid.columnManager.getColumnByName('test');
      rowManager.sortRows(column, SORT_ORDER.DESC);

      expect(rowManager.getRow(0).values[0]).to.equal(5);
      expect(rowManager.getRow(1).values[0]).to.equal(1);
    });

    it('should filter rows', () => {
      const column = dataGrid.columnManager.getColumnByName('test');
      column.filter(column.columnFilter['createFilterExpression']('$>1'));

      expect(rowManager.getRow(0).values[0]).to.equal(5);
      expect(rowManager.rows).to.have.length(1);
    });

    it('should search rows', () => {
      const column = dataGrid.columnManager.getColumnByName('test');
      column.search(column.columnFilter['createSearchExpression']('5'));

      expect(rowManager.getRow(0).values[0]).to.equal(5);
      expect(rowManager.rows).to.have.length(1);
    });
  });

  describe('hasIndex = true', () => {
    const dataStore = createStore({ ...modelState, hasIndex: true });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const rowManager = dataGrid.rowManager;

    it('should have rows property', () => {
      expect(rowManager).to.have.property('rows');
      expect(rowManager.rows).to.have.length(values.length);
    });

    it('should return proper row values', () => {
      expect(rowManager.getRow(0).values[0]).to.equal(2);
      expect(rowManager.getRow(1).values[1]).to.equal(7);
    });

    it('should sort rows', () => {
      const column = dataGrid.columnManager.getColumnByIndex(COLUMN_TYPES.body, 0);
      rowManager.sortRows(column, SORT_ORDER.DESC);

      expect(rowManager.getRow(0).values[0]).to.equal(6);
      expect(rowManager.getRow(1).values[0]).to.equal(2);
    });

    it('should filter rows', () => {
      const column = dataGrid.columnManager.getColumnByName('test1');
      column.filter(column.columnFilter['createFilterExpression']('$>2'));

      expect(rowManager.getRow(0).values[0]).to.equal(6);
      expect(rowManager.rows).to.have.length(1);
    });

    it('should search rows', () => {
      const column = dataGrid.columnManager.getColumnByName('test1');
      column.search(column.columnFilter['createSearchExpression']('6'));

      expect(rowManager.getRow(0).values[0]).to.equal(6);
      expect(rowManager.rows).to.have.length(1);
    });
  });
});
