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
import highlighterStateMock from "../mock/highlighterStateMock";
import modelStateMock from "../mock/modelStateMock";
import columnOptionsMock from "../mock/columnOptionsMock";
import cellConfigMock from "../mock/cellConfigMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import DataGridColumn from "../../../../../src/tableDisplay/dataGrid/column/DataGridColumn";
import ThreeColorHeatmapHighlighter
  from "../../../../../src/tableDisplay/dataGrid/highlighter/ThreeColorHeatmapHighlighter";
import {HIGHLIGHTER_TYPE} from "../../../../../src/tableDisplay/dataGrid/interface/IHighlighterState";
import HeatmapHighlighter from "../../../../../src/tableDisplay/dataGrid/highlighter/HeatmapHighlighter";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('ThreeColorHeatmapHighlighter', () => {
  const dataStore = createStore({ ...modelStateMock, types: ['double', 'double']});
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const column = new DataGridColumn(
    columnOptionsMock,
    dataGrid,
    dataGrid.columnManager
  );

  let threeColorHeatmapHighlighter = new ThreeColorHeatmapHighlighter(
    column,
    { ...highlighterStateMock, type: HIGHLIGHTER_TYPE.threeColorHeatmap }
  );

  it('should be an instance of highlighter', () => {
    expect(threeColorHeatmapHighlighter).to.be.an.instanceof(HeatmapHighlighter);
  });

  it('should have the getBackgroundColor method', () => {
    expect(threeColorHeatmapHighlighter).to.have.property('getBackgroundColor');
  });

  it('should have the minColor state property', () => {
    expect(threeColorHeatmapHighlighter.state).to.have.property('minColor');
  });

  it('should have the maxColor state property', () => {
    expect(threeColorHeatmapHighlighter.state).to.have.property('maxColor');
  });

  it('should have the midColor state property', () => {
    expect(threeColorHeatmapHighlighter.state).to.have.property('midColor');
  });

  it('should return proper backgroud color', () => {
    expect(threeColorHeatmapHighlighter.getBackgroundColor(cellConfigMock))
      .to.equal('rgb(255, 0, 0)');
    expect(threeColorHeatmapHighlighter.getBackgroundColor({ ...cellConfigMock, value: 0 }))
      .to.equal('rgb(0, 0, 255)');
    expect(threeColorHeatmapHighlighter.getBackgroundColor({ ...cellConfigMock, value: 0.5 }))
      .to.equal('rgb(0, 255, 0)');
  });
});
