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
import { TableDataModel } from '@beakerx/tableDisplay/dataGrid/TableDataModel';
import { DataModel } from "@phosphor/datagrid";

describe('dataGridScope', () => {
  const tableDataModel = new TableDataModel({
    values: [[1]],
    columnNames: ['first column'],
    hasIndex: false,
    types: ['double'],
    stringFormatForColumn: {}
  });

  it('should be instance of DataModel', () => {
    expect(tableDataModel).to.be.an.instanceof(DataModel);
  });

  it('should implement the formatData method', () => {
    expect(tableDataModel).to.have.property('formatData');
  });

  it('should implement the data method', () => {
    expect(tableDataModel).to.have.property('data');
  });

  it('should return proper data', () => {
    expect(tableDataModel.data('corner-header', 0, 0)).to.equal('');
    expect(tableDataModel.data('column-header', 0, 0)).to.equal('first column');
    expect(tableDataModel.data('row-header', 0, 0)).to.equal(0);
    expect(tableDataModel.data('body', 0, 0)).to.equal('1.000');
  });

  it('should implement the rowCount method', () => {
    expect(tableDataModel).to.have.property('rowCount');
  });

  it('should return the proper row count', () => {
    expect(tableDataModel.rowCount('body')).to.equal(1);
    expect(tableDataModel.rowCount('column-header')).to.equal(1);
  });

  it('should implement the columnCount method', () => {
    expect(tableDataModel).to.have.property('columnCount');
  });

  it('should return the proper column count', () => {
    expect(tableDataModel.columnCount('body')).to.equal(1);
    expect(tableDataModel.columnCount('row-header')).to.equal(1);
  });

});
