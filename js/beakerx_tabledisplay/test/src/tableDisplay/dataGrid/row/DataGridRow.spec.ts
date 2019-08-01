/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
import DataGridRow from "../../../../../src/tableDisplay/dataGrid/row/DataGridRow";

describe('DataGridRow', () => {
  const values = [1,2,3,4];
  const row = new DataGridRow(0,values);

  it('should have index property', () => {
    expect(row).to.have.property('index');
    expect(row.index).to.equal(0);
  });

  it('should have values property', () => {
    expect(row).to.have.property('values');
    expect(row.values).to.equal(values);
  });
});
