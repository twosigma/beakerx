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
import modelStateMock from "../mock/modelStateMock";
import cellConfigMock from "../mock/cellConfigMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import HeatmapHighlighter from "../../../../../src/tableDisplay/dataGrid/highlighter/HeatmapHighlighter";
import {HIGHLIGHTER_TYPE} from "../../../../../src/tableDisplay/dataGrid/interface/IHighlighterState";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('HighlighterManager', () => {
  const dataStore = createStore(modelStateMock);
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const highlighterManager = dataGrid.highlighterManager;
  const highlighter = highlighterManager.highlighters[0];

  it('should have property highlighters', () => {
    expect(highlighterManager).to.have.property('highlighters');
  });

  it('should create the HeatmapHighlighter', () => {
    expect(highlighterManager.highlighters[0]).to.be.an.instanceof(HeatmapHighlighter);
  });

  it('should implement getCellBackground method', () => {
    expect(highlighterManager).to.have.property('getCellBackground');
  });

  it('should return proper background', () => {
    expect(highlighterManager.getCellBackground(cellConfigMock)).to.equal('rgb(255, 0, 0)');
  });

  it('should return heatmap highlighter', () => {
    expect(highlighterManager.getColumnHighlighters(dataGrid.columnManager.columns[1][0], HIGHLIGHTER_TYPE.heatmap)[0])
      .to.equal(highlighterManager.highlighters[0]);
  });

  it('should unregister highlighter', () => {
    highlighterManager.unregisterHighlighter(highlighter);

    expect(highlighterManager.highlighters).to.have.length(0);
  });

  it('should register highlighter', () => {
    highlighterManager.registerHighlighter(highlighter);

    expect(highlighterManager.highlighters).to.have.length(1);
  });
});
