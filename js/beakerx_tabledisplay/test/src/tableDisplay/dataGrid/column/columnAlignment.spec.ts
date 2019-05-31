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
import {DEFAULT_ALIGNMENT, getAlignmentByType} from "../../../../../src/tableDisplay/dataGrid/column/columnAlignment";
import {ALL_TYPES} from "../../../../../src/tableDisplay/dataGrid/dataTypes";

describe('columnAlignment', () => {
  it('should return default alignment', () => {
    expect(getAlignmentByType(ALL_TYPES.string)).to.equal(DEFAULT_ALIGNMENT);
  });

  it('should return left alignment for string type', () => {
    expect(getAlignmentByType(ALL_TYPES.html)).to.equal('left');
  });

  it('should return right alignment for integer and double type', () => {
    expect(getAlignmentByType(ALL_TYPES.integer)).to.equal('right');
    expect(getAlignmentByType(ALL_TYPES.double)).to.equal('right');
  });

  it('should return center alignment for integer type', () => {
    expect(getAlignmentByType(ALL_TYPES.datetime)).to.equal('center');
  });
});
