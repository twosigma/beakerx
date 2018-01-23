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
import { getTypeByName, getDisplayType, ALL_TYPES } from '@beakerx/tableDisplay/dataGrid/dataTypes';

describe('dataTypes', () => {
  describe('getTypeByName', () => {
    it('should be a function', () => {
      expect(getTypeByName).to.be.a('function');
    });

    it('should return number', () => {
      expect(getTypeByName('integer')).to.be.a('number');
    });

    it('should return 0 as default', () => {
      expect(getTypeByName('some dummy value')).to.equal(0);
    });

    it('should return proper type number', () => {
      expect(getTypeByName('string')).to.equal(0);
      expect(getTypeByName('formatted integer')).to.equal(2);
      expect(getTypeByName('double')).to.equal(3);
      expect(getTypeByName('double with precision')).to.equal(4);
      expect(getTypeByName('exponential 5')).to.equal(6);
      expect(getTypeByName('exponential 15')).to.equal(7);
      expect(getTypeByName('datetime')).to.equal(8);
      expect(getTypeByName('boolean')).to.equal(9);
      expect(getTypeByName('html')).to.equal(10);
    });

    it('should return mapped types number', () => {
      expect(getTypeByName('integer')).to.equal(2);
      expect(getTypeByName('int64')).to.equal(0);
      expect(getTypeByName('time')).to.equal(8);
    });
  });

  describe('getDisplayType', () => {
    it('should be a function', () => {
      expect(getDisplayType).to.be.a('function');
    });

    it('should return number', () => {
      expect(getDisplayType('some dummy value')).to.be.a('number');
    });

    it('should return 0 by default', () => {
      expect(getDisplayType('some dummy value')).to.equal(0);
    });

    it('should return display type as number', () => {
      expect(getDisplayType('string')).to.equal(0);
      expect(getDisplayType('formatted integer')).to.equal(0);
      expect(getDisplayType('exponential 5')).to.equal(0);
      expect(getDisplayType('exponential 15')).to.equal(0);
      expect(getDisplayType('html')).to.equal(0);
      expect(getDisplayType('boolean')).to.equal(0);
      expect(getDisplayType('double')).to.equal('4.3');
      expect(getTypeByName('double with precision')).to.equal(4);
      expect(getDisplayType('datetime')).to.equal(8);
    });
  });
});
