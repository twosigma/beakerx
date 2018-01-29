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
import { createColumnMenuItems } from '@beakerx/tableDisplay/dataGrid/headerMenu/createColumnMenuItems';
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";

describe('createColumnMenuItems', () => {
  const dataGrid = new BeakerxDataGrid({}, {
    values: [],
    columnNames: [],
    types: [],
    hasIndex: false,
    stringFormatForColumn: null
  });

  it('should create column menu items', () => {
    let formatMenuItems = createColumnMenuItems({ index: 0, region: 'body'}, dataGrid);

    expect(formatMenuItems).to.be.an.instanceof(Array);
    expect(formatMenuItems).to.have.length(18);
  });

});
