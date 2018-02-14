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
import RowManager from "@beakerx/tableDisplay/dataGrid/row/RowManager";
import {SORT_ORDER} from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";

describe('RowManager', () => {
  const data = [[1,2,3,4], [5,6,7,8]];

  describe('hasIndex = false', () => {
    const rowManager = new RowManager(data, false);

    it('should have rows property', () => {
      expect(rowManager).to.have.property('rows');
      expect(rowManager.rows).to.have.length(data.length);
    });

    it('should implement sort valueResolvers', () => {
      expect(rowManager).to.have.property('defaultValueResolver');
      expect(rowManager).to.have.property('dateValueResolver');
      expect(rowManager).to.have.property('indexValueResolver');
      expect(typeof rowManager.defaultValueResolver).to.equal('function');
      expect(typeof rowManager.dateValueResolver).to.equal('function');
      expect(typeof rowManager.indexValueResolver).to.equal('function');
    });

    it('should return proper row values', () => {
      expect(rowManager.getRow(0).values[0]).to.equal(1);
      expect(rowManager.getRow(1).values[1]).to.equal(6);
    });

    it('should sort rows', () => {
      rowManager.sortRows(0, SORT_ORDER.DESC);

      expect(rowManager.getRow(0).values[0]).to.equal(5);
      expect(rowManager.getRow(1).values[0]).to.equal(1);
    });
  });

  describe('hasIndex = true', () => {
    const rowManager = new RowManager(data, true);

    it('should have rows property', () => {
      expect(rowManager).to.have.property('rows');
      expect(rowManager.rows).to.have.length(data.length);
    });

    it('should return proper row values', () => {
      expect(rowManager.getRow(0).values[0]).to.equal(2);
      expect(rowManager.getRow(1).values[1]).to.equal(7);
    });

    it('should sort rows', () => {
      rowManager.sortRows(0, SORT_ORDER.DESC);

      expect(rowManager.getRow(0).values[0]).to.equal(6);
      expect(rowManager.getRow(1).values[0]).to.equal(2);
    });
  });
});
