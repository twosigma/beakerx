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
import Highlighter from "@beakerx/tableDisplay/dataGrid/highlighter/Highlighter";
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import highlighterStateMock from "../mock/highlighterStateMock";
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import modelStateMock from "../mock/modelStateMock";
import columnOptionsMock from "../mock/columnOptionsMock";
import createStore from "@beakerx/tableDisplay/dataGrid/store/dataStore";

describe('Highlighter', () => {
  const dataStore = createStore(modelStateMock);
  const dataGrid = new BeakerxDataGrid({}, dataStore);
  const column = new DataGridColumn(
    columnOptionsMock,
    dataGrid,
    dataGrid.columnManager
  );

  let highlighter = new Highlighter(
    column,
    highlighterStateMock
  );

  it('should be an instance of highlighter', () => {
    expect(highlighter).to.be.an.instanceof(Highlighter);
  });

  it('should have the column property', () => {
    expect(highlighter).to.have.property('column');
  });

  it('should have the state property', () => {
    expect(highlighter).to.have.property('state');
  });
});
