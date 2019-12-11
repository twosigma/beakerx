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
import {GraphicsContext, CellRenderer} from "@phosphor/datagrid";
import modelStateMock from "../mock/modelStateMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import ImageCellRenderer from "../../../../../src/tableDisplay/dataGrid/cell/ImageCellRenderer";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('ImageCellRenderer', () => {
  let dataGrid;
  let cellRenderer;
  let dataStore;
  let gc;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);

    gc = new GraphicsContext(dataGrid['_canvasGC']);

    gc['_context'].drawImage = () => {};
    cellRenderer = new ImageCellRenderer(dataGrid);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of CellRenderer', () => {
    expect(cellRenderer).to.be.an.instanceof(CellRenderer);
  });

  it('should implement drawImage method', () => {
    expect(cellRenderer).to.have.property('drawImage');
    expect(cellRenderer.drawImage).to.be.a('Function');
  });

  it('should implement resizeCell method', () => {
    expect(cellRenderer).to.have.property('resizeCell');
    expect(cellRenderer.resizeCell).to.be.a('Function');
  });
});
