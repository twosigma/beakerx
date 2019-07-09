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
import { BeakerXDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerXDataGrid";
import {GraphicsContext, TextRenderer} from "@phosphor/datagrid";
import modelStateMock from "../mock/modelStateMock";
import BeakerXCellRenderer from "@beakerx/tableDisplay/dataGrid/cell/BeakerXCellRenderer";
import createStore from "@beakerx/tableDisplay/dataGrid/store/BeakerXDataStore";
import cellConfigMock from "../mock/cellConfigMock";
import HTMLCellRenderer from "@beakerx/tableDisplay/dataGrid/cell/HTMLCellRenderer";

describe('HTMLCellRenderer', () => {
  let dataGrid;
  let cellRenderer;
  let dataStore;
  let gc: GraphicsContext;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore);

    gc = new GraphicsContext(dataGrid['_canvasGC']);

    gc['_context'].fillText = () => {};
    cellRenderer = new HTMLCellRenderer(dataGrid);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of BeakerXCellRenderer', () => {
    expect(cellRenderer).to.be.an.instanceof(BeakerXCellRenderer);
    expect(cellRenderer).to.be.an.instanceof(TextRenderer);
  });

  it('should implement drawText method', () => {
    expect(cellRenderer).to.have.property('drawText');
    expect(cellRenderer.drawText).to.be.a('Function');
  });

  it('should implement getFontFaceStyle method', () => {
    expect(cellRenderer).to.have.property('getFontFaceStyle');
    expect(cellRenderer.getFontFaceStyle).to.be.a('Function');
  });

  it('should implement getSVGData method', () => {
    expect(cellRenderer).to.have.property('getSVGData');
    expect(cellRenderer.getSVGData).to.be.a('Function');
  });

  it('should implement getCacheKey method', () => {
    expect(cellRenderer).to.have.property('getCacheKey');
    expect(cellRenderer.getCacheKey).to.be.a('Function');
  });

  it('should return proper data', () => {
    const dataString = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264px%22%20height%3D%2224px%22%3E%0A%20%20%20%20%20%20%3CforeignObject%20width%3D%2264px%22%20height%3D%2224px%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%0A%20%20%20%20%20%20%20%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%0A%20%20%20%20%20%20%20%20%20%20style%3D%22display%3A%20table-cell%3B%20font%3A%20normal%2020px%20Lato%2C%20Helvetica%2C%20sans-serif%3B%20width%3A%2064px%3B%20height%3A%2024px%3B%20color%3A%20%23000000%3B%20vertical-align%3A%20middle%3B%20text-align%3A%20left%22%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%40font-face%20%7B%0A%20%20%20%20%20%20font-family%3A%20\'Lato\'%3B%0A%20%20%20%20%20%20src%3A%20url(%22undefined%22)%3B%0A%20%20%20%20%20%20font-weight%3A%20normal%3B%0A%20%20%20%20%20%20font-style%3A%20normal%3B%0A%20%20%20%20%7D%20%40font-face%20%7B%0A%20%20%20%20%20%20font-family%3A%20\'Lato\'%3B%0A%20%20%20%20%20%20src%3A%20url(%22undefined%22)%3B%0A%20%20%20%20%20%20font-weight%3A%20bold%3B%0A%20%20%20%20%20%20font-style%3A%20normal%3B%0A%20%20%20%20%7D%3C%2Fstyle%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%22display%3A%20inline-block%3B%20padding%3A%200%202px%22%3E%3Cb%3Etest%3C%2Fb%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2FforeignObject%3E%0A%20%20%20%20%3C%2Fsvg%3E';

    expect(cellRenderer.getSVGData(
      '<b>test</b>',
      cellConfigMock,
      'center',
      'left'
    )).to.equal(dataString);
  });

  it('should call getSVGData once', () => {
    const stub = sinon.stub(cellRenderer, 'getSVGData');

    cellRenderer.drawText(gc, cellConfigMock);

    expect(stub.calledOnce).to.be.true;
  });
});
