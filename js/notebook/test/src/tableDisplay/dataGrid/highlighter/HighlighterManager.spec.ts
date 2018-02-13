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
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import HighlighterManager from "@beakerx/tableDisplay/dataGrid/highlighter/HighlighterManager";
import highlighterStateMock from "../mock/highlighterStateMock";
import modelStateMock from "../mock/modelStateMock";
import HeatmapHighlighter from "@beakerx/tableDisplay/dataGrid/highlighter/HeatmapHighlighter";
import cellConfigMock from "../mock/cellConfigMock";
import DataGridColumn, {COLUMN_TYPES} from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import columnOptionsMock from "../mock/columnOptionsMock";
import {HIGHLIGHTER_TYPE} from "@beakerx/tableDisplay/dataGrid/interface/IHighlighterState";

describe('HighlighterManager', () => {
  const dataGrid = new BeakerxDataGrid({}, modelStateMock);
  const highlighterManager = new HighlighterManager(dataGrid, [highlighterStateMock]);
  const highlighter = highlighterManager.highlighters[0];

  it('should have property highlightersState', () => {
    expect(highlighterManager).to.have.property('highlightersState');
  });

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
