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
import DataGridCellValue from "../../../../../src/tableDisplay/dataGrid/row/DataGridCellValue";

describe('DataGridRow', () => {
  const cells = [
      new DataGridCellValue(1,"#000000"),
      new DataGridCellValue(2,"#000000"),
      new DataGridCellValue(3,"#000000"),
      new DataGridCellValue(4,"#000000")];
  const row = new DataGridRow(0,cells);

  it('should have index property', () => {
    expect(row).to.have.property('index');
    expect(row.index).to.equal(0);
  });

  it('should have cells property', () => {
    expect(row).to.have.property('cells');
    expect(row.cells).to.equal(cells);
  });
    it('should have getValue function', () => {
        expect(row.getValue(0)).to.equal(1);
        expect(row.getValue(3)).to.equal(4);
    });
});
