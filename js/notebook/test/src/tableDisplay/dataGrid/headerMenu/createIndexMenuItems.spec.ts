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
import { createIndexMenuItems } from '@beakerx/tableDisplay/dataGrid/headerMenu/createIndexMenuItems';
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import menuOptionsMock from "../mock/menuOptionsMock";
import modelStateMock from "../mock/modelStateMock";
import createStore from "@beakerx/tableDisplay/dataGrid/store/dataStore";
import {COLUMN_TYPES} from "@beakerx/tableDisplay/dataGrid/column/enums";

describe('createIndexMenuItems', () => {
  let dataGrid;
  let dataStore;
  let column;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerxDataGrid({}, dataStore);
    column = new DataGridColumn({
      index: 0,
      type: COLUMN_TYPES.index,
      name: 'index',
      menuOptions: menuOptionsMock
    }, dataGrid, dataGrid.columnManager);
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should create index menu items', () => {
    let indexMenuItems = createIndexMenuItems(column);

    expect(indexMenuItems).to.be.an.instanceof(Array);
    expect(indexMenuItems).to.have.length(12);
  });

});
