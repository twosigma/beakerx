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
import HeatmapHighlighter from "@beakerx/tableDisplay/dataGrid/highlighter/HeatmapHighlighter";
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import highlighterStateMock from "../mock/highlighterStateMock";
import { BeakerXDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerXDataGrid";
import modelStateMock from "../mock/modelStateMock";
import columnOptionsMock from "../mock/columnOptionsMock";
import Highlighter from "@beakerx/tableDisplay/dataGrid/highlighter/Highlighter";
import cellConfigMock from "../mock/cellConfigMock";
import createStore from "@beakerx/tableDisplay/dataGrid/store/BeakerXDataStore";

describe('HeatmapHighlighter', () => {
  const dataStore = createStore(modelStateMock);
  const dataGrid = new BeakerXDataGrid({}, dataStore);
  const column = new DataGridColumn(
    columnOptionsMock,
    dataGrid,
    dataGrid.columnManager
  );

  const heatmapHighlighter = new HeatmapHighlighter(
    column,
    highlighterStateMock
  );

  it('should be an instance of highlighter', () => {
    expect(heatmapHighlighter).to.be.an.instanceof(Highlighter);
  });

  it('should have the getBackgroundColor method', () => {
    expect(heatmapHighlighter).to.have.property('getBackgroundColor');
  });

  it('should have the minColor state property', () => {
    expect(heatmapHighlighter.state).to.have.property('minColor');
  });

  it('should have the maxColor state property', () => {
    expect(heatmapHighlighter.state).to.have.property('maxColor');
  });

  it('should return proper backgroud color', () => {
    expect(heatmapHighlighter.getBackgroundColor(cellConfigMock)).to.equal('rgb(255, 0, 0)');

    const config = { ...cellConfigMock, value: 0 };
    expect(heatmapHighlighter.getBackgroundColor(config)).to.equal('rgb(0, 0, 255)');
  });
});
