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
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import DataGridColumn from "../../../../../src/tableDisplay/dataGrid/column/DataGridColumn";
import HighlighterFactory from "../../../../../src/tableDisplay/dataGrid/highlighter/HighlighterFactory";
import HeatmapHighlighter from "../../../../../src/tableDisplay/dataGrid/highlighter/HeatmapHighlighter";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('HighlighterFactory', () => {
  const dataStore = createStore(modelStateMock);
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const column = new DataGridColumn(
    columnOptionsMock,
    dataGrid,
    dataGrid.columnManager
  );

  it('should return HeatmapHighlighter', () => {
    expect(HighlighterFactory.getHighlighter(highlighterStateMock, column))
      .to.be.an.instanceof(HeatmapHighlighter);
  });

  it('should return undefined', () => {
    expect(HighlighterFactory.getHighlighter({}, column))
      .to.equal(undefined);
  });
});
