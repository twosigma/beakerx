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
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import modelStateMock from "../mock/modelStateMock";
import CellManager from "@beakerx/tableDisplay/dataGrid/cell/CellManager";

describe('CellManager', () => {
  let dataGrid;
  let cellManager;

  before(() => {
    dataGrid = new BeakerxDataGrid({}, modelStateMock);
    cellManager = dataGrid.cellManager;
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of CellManager', () => {
    expect(cellManager).to.be.an.instanceof(CellManager);
  });

  it('should implement getSelectedCells method', () => {
    expect(cellManager).to.have.property('getSelectedCells');
    expect(cellManager.getSelectedCells).to.be.a('Function');
  });

  it('should implement getAllCells method', () => {
    const allCells = cellManager.getAllCells();

    expect(cellManager).to.have.property('getAllCells');
    expect(cellManager.getAllCells).to.be.a('Function');
    expect(allCells).to.have.length(3);
    expect(allCells[0][0]).to.equal('index');
    expect(allCells[0][1]).to.equal('test');
  });

  it('should implement getCells method', () => {
    expect(cellManager).to.have.property('getCells');
    expect(cellManager.getCells).to.be.a('Function');
  });

  it('should implement copyToClipboard method', () => {
    expect(cellManager).to.have.property('copyToClipboard');
    expect(cellManager.copyToClipboard).to.be.a('Function');
  });

  it('should implement CSVDownload method', () => {
    expect(cellManager).to.have.property('CSVDownload');
    expect(cellManager.CSVDownload).to.be.a('Function');
  });
});
