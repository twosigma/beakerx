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
import { DataModel } from "@phosphor/datagrid";
import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('BeakerXDataGridModel', () => {
  describe('BeakerXDataGridModel.hasIndex === false', () => {
    const dataStore = createStore(modelStateMock);
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const beakerxDataGridModel = dataGrid.model;

    it('should be instance of DataModel', () => {
      expect(beakerxDataGridModel).to.be.an.instanceof(DataModel);
    });

    it('should implement the data method', () => {
      expect(beakerxDataGridModel).to.have.property('data');
    });

    it('should return proper data', () => {
      expect(beakerxDataGridModel.data('corner-header', 0, 0)).to.equal('index');
      expect(beakerxDataGridModel.data('column-header', 0, 0)).to.equal('test');
      expect(beakerxDataGridModel.data('row-header', 0, 0)).to.equal(0);
      expect(beakerxDataGridModel.data('body', 0, 0)).to.equal(1);
    });

    it('should implement the rowCount method', () => {
      expect(beakerxDataGridModel).to.have.property('rowCount');
    });

    it('should return the proper row count', () => {
      expect(beakerxDataGridModel.rowCount('body')).to.equal(2);
      expect(beakerxDataGridModel.rowCount('column-header')).to.equal(1);
    });

    it('should implement the columnCount method', () => {
      expect(beakerxDataGridModel).to.have.property('columnCount');
    });

    it('should return the proper column count', () => {
      expect(beakerxDataGridModel.columnCount('body')).to.equal(2);
      expect(beakerxDataGridModel.columnCount('row-header')).to.equal(1);
    });
  });

  describe('BeakerXDataGridModel.hasIndex === true', () => {
    const dataStore = createStore({
      ...modelStateMock,
      hasIndex: true
    });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const beakerxDataGridModel = dataGrid.model;

    it('should return proper data', () => {
      expect(beakerxDataGridModel.data('corner-header', 0, 0)).to.equal('test');
      expect(beakerxDataGridModel.data('column-header', 0, 0)).to.equal('column');
      expect(beakerxDataGridModel.data('row-header', 0, 0)).to.equal(1);
      expect(beakerxDataGridModel.data('body', 0, 0)).to.equal(2);
    });

    it('should return the proper row count', () => {
      expect(beakerxDataGridModel.rowCount('body')).to.equal(2);
      expect(beakerxDataGridModel.rowCount('column-header')).to.equal(1);
    });

    it('should return the proper column count', () => {
      expect(beakerxDataGridModel.columnCount('body')).to.equal(1);
      expect(beakerxDataGridModel.columnCount('row-header')).to.equal(1);
    });
  });

});
