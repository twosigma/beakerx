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
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import {COLUMN_TYPES} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import Highlighter from "../../../../../src/tableDisplay/dataGrid/highlighter/Highlighter";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('Highlighter', () => {
  const dataStore = createStore({ ...modelStateMock, values: [[null, 1],[1, null]] });
  const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
  const column = dataGrid.columnManager.columns[COLUMN_TYPES.body][0];

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
