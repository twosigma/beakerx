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

import { expect, assert } from 'chai';
import { DataFormatter } from '@beakerx/tableDisplay/dataGrid/DataFormatter';
import {DataGridScope} from "@beakerx/tableDisplay/dataGrid/DataGridScope";

describe('DataFormatter', () => {
  const dataFormatter = new DataFormatter({});

  it('should implement getFormatFnByType method', () => {
    expect(dataFormatter.getFormatFnByType).to.be.a('function');
  });

  describe('getFormatFnByType', () => {
    it('should throw Error while called withoud param', () => {
      assert.throws(
        () => { dataFormatter.getFormatFnByType(undefined); },
        Error,
        "Cannot read property 'toString' of undefined"
      );
    });

    it('should return function', () => {
      expect(dataFormatter.getFormatFnByType(0)).to.be.a('function');
    });

    it('should return "string" function', () => {
      expect(dataFormatter.getFormatFnByType(0)).to.equal(dataFormatter['string']);
    });

    it('should return "integer" function', () => {
      expect(dataFormatter.getFormatFnByType(1)).to.equal(dataFormatter['integer']);
    });

    it('should return "integer" function', () => {
      expect(dataFormatter.getFormatFnByType(2)).to.equal(dataFormatter['formattedInteger']);
    });

    it('should return "double" function', () => {
      expect(dataFormatter.getFormatFnByType(3)).to.equal(dataFormatter['double']);
    });
  });
});
