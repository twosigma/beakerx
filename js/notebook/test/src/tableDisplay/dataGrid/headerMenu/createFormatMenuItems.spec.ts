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
import {
  createFormatMenuItems,
  createPrecisionSubitems,
  createTimeSubitems
} from '@beakerx/tableDisplay/dataGrid/headerMenu/createFormatMenuItems';
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import { scopeData, TIME_UNIT_FORMATS } from '@beakerx/tableDisplay/consts';
import { COLUMN_TYPES } from "@beakerx/tableDisplay/dataGrid/DataGridColumn";

describe('createFormatMenuItems', () => {
  const dataGrid = new BeakerxDataGrid({}, {
    values: [],
    columnNames: [],
    types: [],
    hasIndex: false,
    stringFormatForColumn: null
  });

  it('should create format menu items', () => {
    let expectedLength = scopeData.allIntTypes.length + Object.keys(TIME_UNIT_FORMATS).length - 1; // datetime is not duplicated
    let formatMenuItems = createFormatMenuItems({ index: 0, type: COLUMN_TYPES.index}, dataGrid);

    expect(formatMenuItems).to.be.an.instanceof(Array);
    expect(formatMenuItems).to.have.length(expectedLength);
  });

  describe('createPrecisionSubitems', () => {
    it('should create precission menu items', () => {
      let precissionMenuItems = createPrecisionSubitems(dataGrid);

      expect(precissionMenuItems).to.be.an.instanceof(Array);
      expect(precissionMenuItems).to.have.length(scopeData.allPrecissions.length);
    });
  });

  describe('createTimeSubitems', () => {
    it('should create time menu items', () => {
      let timeMenuItems = createTimeSubitems(dataGrid);

      expect(timeMenuItems).to.be.an.instanceof(Array);
      expect(timeMenuItems).to.have.length(Object.keys(TIME_UNIT_FORMATS).length);
    });
  });
});
