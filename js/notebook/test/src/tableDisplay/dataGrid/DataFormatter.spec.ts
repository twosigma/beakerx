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

import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { DataFormatter } from '@beakerx/tableDisplay/dataGrid/DataFormatter';
import { TIME_UNIT_FORMATS } from '@beakerx/tableDisplay/consts';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';

declare var require: Function;

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

    it('should return "string" function', () => {
      expect(dataFormatter.getFormatFnByType(400)).to.equal(dataFormatter['string']);
    });

    it('should return "integer" function', () => {
      expect(dataFormatter.getFormatFnByType(1)).to.equal(dataFormatter['integer']);
    });

    it('should return "formattedInteger" function', () => {
      expect(dataFormatter.getFormatFnByType(2)).to.equal(dataFormatter['formattedInteger']);
    });

    it('should return "double" function', () => {
      expect(dataFormatter.getFormatFnByType(3)).to.equal(dataFormatter['double']);
    });

    it('should return "exponential_5" function', () => {
      expect(dataFormatter.getFormatFnByType(6)).to.equal(dataFormatter['exponential_5']);
    });

    it('should return "exponential_15" function', () => {
      expect(dataFormatter.getFormatFnByType(7)).to.equal(dataFormatter['exponential_15']);
    });

    it('should return "datetime" function', () => {
      expect(dataFormatter.getFormatFnByType(8)).to.equal(dataFormatter['datetime']);
    });

    it('should return "boolean" function', () => {
      expect(dataFormatter.getFormatFnByType(9)).to.equal(dataFormatter['boolean']);
    });

    it('should return "html" function', () => {
      expect(dataFormatter.getFormatFnByType(10)).to.equal(dataFormatter['html']);
    });

    it('should return "doubleWithPrecission" function', () => {
      expect(dataFormatter.getFormatFnByType('4.3').toString())
        .to.equal((dataFormatter['doubleWithPrecission']('3')).toString());
    });
  });

  describe('dataFormatter.string', () => {
    const stringFormatFn = dataFormatter.getFormatFnByType(0);

    it('should return empty string', () => {
      expect(stringFormatFn('', 0, 0)).to.equal('');
    });

    it('should escape html characters', () => {
      expect(stringFormatFn('&test<>"Works"Ok/<>', 0, 0))
        .to.equal('&amp;test&lt;&gt;"Works"Ok&#47;&lt;&gt;');
    });

    it('should convert to date', () => {
      expect(stringFormatFn({ timestamp: 1516697673043, type: 'Date' }, 0, 0))
        .to.equal('20180123 09:54:33.043 +0100');
    });

    it('should return given value', () => {
      expect(stringFormatFn(1, 0, 0)).to.equal(1);
      expect(stringFormatFn(null, 0, 0)).to.equal(null);
      expect(stringFormatFn('', 0, 0)).to.equal('');
      expect(stringFormatFn(0, 0, 0)).to.equal(0);
      expect(stringFormatFn(false, 0, 0)).to.equal(false);
    });

  });

  describe('dataFormatter.integer', () => {
    const integerFormatFn = dataFormatter.getFormatFnByType(1);

    it('should return integer', () => {
      expect(integerFormatFn('1', 0, 0)).to.equal(1);
      expect(integerFormatFn('0', 0, 0)).to.equal(0);
      expect(integerFormatFn('123', 0, 0)).to.equal(123);
      expect(integerFormatFn(123, 0, 0)).to.equal(123);
      expect(integerFormatFn(1, 0, 0)).to.equal(1);
    });

    it('should return empty value', () => {
      expect(integerFormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(integerFormatFn(null, 0, 0)).to.equal(null);
      expect(integerFormatFn(0, 0, 0)).to.equal(0);
      expect(integerFormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(integerFormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(integerFormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(integerFormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.formattedInteger', () => {
    const formattedIntegerFormatFn = dataFormatter.getFormatFnByType(2);

    it('should return formatted integer', () => {
      expect(formattedIntegerFormatFn('1', 0, 0)).to.equal('1');
      expect(formattedIntegerFormatFn('0', 0, 0)).to.equal('0');
      expect(formattedIntegerFormatFn('123', 0, 0)).to.equal('123');
      expect(formattedIntegerFormatFn(123, 0, 0)).to.equal('123');
      expect(formattedIntegerFormatFn(1, 0, 0)).to.equal('1');
      expect(formattedIntegerFormatFn(0, 0, 0)).to.equal('0');
      expect(formattedIntegerFormatFn(1230, 0, 0)).to.equal('1,230');
      expect(formattedIntegerFormatFn(123023, 0, 0)).to.equal('123,023');
      expect(formattedIntegerFormatFn(1123023, 0, 0)).to.equal('1,123,023');
      expect(formattedIntegerFormatFn('1123023', 0, 0)).to.equal('1,123,023');
    });

    it('should return empty value', () => {
      expect(formattedIntegerFormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(formattedIntegerFormatFn(null, 0, 0)).to.equal(null);
      expect(formattedIntegerFormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(formattedIntegerFormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(formattedIntegerFormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(formattedIntegerFormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.double', () => {
    const doubleFormatFn = dataFormatter.getFormatFnByType(3);

    it('should return formatted double', () => {
      expect(doubleFormatFn('1', 0, 0)).to.equal(1);
      expect(doubleFormatFn('1.2', 0, 0)).to.equal(1.2);
      expect(doubleFormatFn(1.2, 0, 0)).to.equal(1.2);
    });

    it('should return empty value', () => {
      expect(doubleFormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(doubleFormatFn(null, 0, 0)).to.equal(null);
      expect(doubleFormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(doubleFormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(doubleFormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(doubleFormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.doubleWithPrecission', () => {
    const doubleWithPrecissionFormatFn = dataFormatter.getFormatFnByType('4.3');

    it('should return formatted double with precission', () => {
      expect(doubleWithPrecissionFormatFn('1', 0, 0)).to.equal('1.000');
      expect(doubleWithPrecissionFormatFn('1.2', 0, 0)).to.equal('1.200');
      expect(doubleWithPrecissionFormatFn(1.2, 0, 0)).to.equal('1.200');
      expect(doubleWithPrecissionFormatFn(1.23456, 0, 0)).to.equal('1.235');
      expect(doubleWithPrecissionFormatFn(1.23446, 0, 0)).to.equal('1.234');
    });

    it('should return empty value', () => {
      expect(doubleWithPrecissionFormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(doubleWithPrecissionFormatFn(null, 0, 0)).to.equal(null);
      expect(doubleWithPrecissionFormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(doubleWithPrecissionFormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(doubleWithPrecissionFormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(doubleWithPrecissionFormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.exponential_5', () => {
    const exponential_5FormatFn = dataFormatter.getFormatFnByType(6);

    it('should return formatted exponential_5', () => {
      expect(exponential_5FormatFn('1', 0, 0)).to.equal('1.00000e+0');
      expect(exponential_5FormatFn(1234, 0, 0)).to.equal('1.23400e+3');
      expect(exponential_5FormatFn(0, 0, 0)).to.equal('0.00000e+0');
    });

    it('should return empty value', () => {
      expect(exponential_5FormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(exponential_5FormatFn(null, 0, 0)).to.equal(null);
      expect(exponential_5FormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(exponential_5FormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(exponential_5FormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(exponential_5FormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.exponential_15', () => {
    const exponential_15FormatFn = dataFormatter.getFormatFnByType(7);

    it('should return formatted exponential_15', () => {
      expect(exponential_15FormatFn('1', 0, 0)).to.equal('1.000000000000000e+0');
      expect(exponential_15FormatFn(1234, 0, 0)).to.equal('1.234000000000000e+3');
      expect(exponential_15FormatFn(12343456, 0, 0)).to.equal('1.234345600000000e+7');
      expect(exponential_15FormatFn(0, 0, 0)).to.equal('0.000000000000000e+0');
    });

    it('should return empty value', () => {
      expect(exponential_15FormatFn(undefined, 0, 0)).to.equal(undefined);
      expect(exponential_15FormatFn(null, 0, 0)).to.equal(null);
      expect(exponential_15FormatFn('', 0, 0)).to.equal('');
    });

    it('should return NaN', () => {
      expect(exponential_15FormatFn(false, 0, 0).toString()).to.equal('NaN');
      expect(exponential_15FormatFn(NaN, 0, 0).toString()).to.equal('NaN');
      expect(exponential_15FormatFn('something', 0, 0).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.datetime', () => {
    const datetimeFormatFn = dataFormatter.getFormatFnByType(8);
    const bkUtils = require('@beakerx/shared/bkUtils');

    before (() => {
      sinon.stub(
        bkUtils,
        'formatTimestamp',
      ).callsFake((value) => moment(new Date(value)).format(TIME_UNIT_FORMATS.DATETIME.format));
    });

    after(() => {
      bkUtils.formatTimestamp.restore()
    });

    it('should return formatted datetime', () => {
      expect(datetimeFormatFn({ timestamp: 1516697673043, type: 'Date' }, 0, 0))
        .to.equal('20180123 09:54:33.043 +0100');

      expect(datetimeFormatFn(1516703121, 0, 0)).to.equal('20180123 11:25:21.000 +0100');
    });

    it('should return Invalid date', () => {
      expect(datetimeFormatFn(NaN, 0, 0).toString()).to.equal('Invalid date');
      expect(datetimeFormatFn('something', 0, 0).toString()).to.equal('Invalid date');
    });

  });

  describe('dataFormatter.boolean', () => {
    const booleanFormatFn = dataFormatter.getFormatFnByType(9);

    it('should return "true"', () => {
      expect(booleanFormatFn('something', 0, 0)).to.equal('true');
      expect(booleanFormatFn(true, 0, 0)).to.equal('true');
      expect(booleanFormatFn(0, 0, 0)).to.equal('true');
    });

    it('should return "false"', () => {
      expect(booleanFormatFn(NaN, 0, 0)).to.equal('false');
      expect(booleanFormatFn(false, 0, 0)).to.equal('false');
      expect(booleanFormatFn(undefined, 0, 0)).to.equal('false');
      expect(booleanFormatFn(null, 0, 0)).to.equal('false');
      expect(booleanFormatFn('', 0, 0)).to.equal('false');
    });

  });

  describe('dataFormatter.html', () => {
    const booleanFormatFn = dataFormatter.getFormatFnByType(10);
    const testObject = { someProp: '' };

    it('should return given value', () => {
      expect(booleanFormatFn('something', 0, 0)).to.equal('something');
      expect(booleanFormatFn(true, 0, 0)).to.equal(true);
      expect(booleanFormatFn(0, 0, 0)).to.equal(0);
      expect(booleanFormatFn(testObject, 0, 0)).to.equal(testObject);
    });

  });
});
