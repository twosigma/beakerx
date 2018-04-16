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
import { CellRendererFactory } from "@beakerx/tableDisplay/dataGrid/cell/CellRendererFactory";
import { BeakerXDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerXDataGrid";
import { TextRenderer } from "@phosphor/datagrid";
import modelStateMock from "../mock/modelStateMock";
import createStore from "@beakerx/tableDisplay/dataGrid/store/BeakerXDataStore";

describe('CellRendererFactory', () => {
  let dataGrid;
  let cellRendererFactory;
  let dataStore;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore);
    cellRendererFactory = new CellRendererFactory(dataGrid);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should implement getRenderer method', () => {
    expect(cellRendererFactory).to.have.property('getRenderer');
  });

  it('should return CellRenderer', () => {
    expect(cellRendererFactory.getRenderer()).to.be.an.instanceof(TextRenderer);
  });
});
