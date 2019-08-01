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
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import modelStateMock from "./mock/modelStateMock";
import cellConfigMock from "./mock/cellConfigMock";
import createStore from "../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {DataFormatter} from "../../../../src/tableDisplay/dataGrid/DataFormatter";
import {ALL_TYPES} from "../../../../src/tableDisplay/dataGrid/dataTypes";
import {TIME_UNIT_FORMATS} from "../../../../src/tableDisplay/dataGrid/consts";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";

describe('DataFormatter', () => {
  const dataStore = createStore(modelStateMock);
  const dataFormatter = new DataFormatter(dataStore);
  const cellConfig = cellConfigMock;

  it('should implement getFormatFnByDisplayType method', () => {
    expect(dataFormatter.getFormatFnByDisplayType).to.be.a('function');
  });

  describe('getFormatFnByDisplayType', () => {
    it('should throw Error while called withoud param', () => {
      assert.throws(
        () => { dataFormatter.getFormatFnByDisplayType(undefined); },
        Error,
        "Cannot read property 'toString' of undefined"
      );
    });

    it('should return function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.integer)).to.be.a('function');
    });

    it('should return "string" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType('')).to.equal(dataFormatter['string']);
    });

    it('should return "string" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.string)).to.equal(dataFormatter['string']);
    });

    it('should return "integer" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.integer)).to.equal(dataFormatter['integer']);
    });

    it('should return "formattedInteger" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES['formatted integer'])).to.equal(dataFormatter['formattedInteger']);
    });

    it('should return "double" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.double)).to.equal(dataFormatter['double']);
    });

    it('should return "exponential_5" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES['exponential 5'])).to.equal(dataFormatter['exponential_5']);
    });

    it('should return "exponential_15" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES['exponential 15'])).to.equal(dataFormatter['exponential_15']);
    });

    it('should return "datetime" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.datetime).toString()).to.equal(dataFormatter['datetimeWithFormat']({}).toString());
    });

    it('should return "boolean" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.boolean)).to.equal(dataFormatter['boolean']);
    });

    it('should return "html" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType(ALL_TYPES.html)).to.equal(dataFormatter['html']);
    });

    it('should return "doubleWithPrecision" function', () => {
      expect(dataFormatter.getFormatFnByDisplayType('4.3').toString()).to.equal((dataFormatter['doubleWithPrecision']('3')).toString());
    });
  });

  describe('dataFormatter.string', () => {
    const stringFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.string);

    it('should return empty string', () => {
      expect(stringFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should not escape html characters', () => {
      expect(stringFormatFn({ ...cellConfig, value: '&test<>"Works"Ok/<>' }))
        .to.equal('&test<>"Works"Ok/<>');
    });

/*
    it('should convert to date', () => {
      expect(stringFormatFn({ ...cellConfig, value: { timestamp: 1516697673043, type: 'Date' }}))
        .to.equal('20180123 03:54:33.043 -0500');
    });
*/

    it('should return given value', () => {
      expect(stringFormatFn({ ...cellConfig, value: 1 })).to.equal(1);
      expect(stringFormatFn({ ...cellConfig, value: null })).to.equal('');
      expect(stringFormatFn({ ...cellConfig, value: '' })).to.equal('');
      expect(stringFormatFn({ ...cellConfig, value: 0 })).to.equal(0);
      expect(stringFormatFn({ ...cellConfig, value: false })).to.equal(false);
    });

  });

  describe('dataFormatter.integer', () => {
    const integerFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.integer);

    it('should return integer', () => {
      expect(integerFormatFn({ ...cellConfig, value: '1' })).to.equal(1);
      expect(integerFormatFn({ ...cellConfig, value: '0' })).to.equal(0);
      expect(integerFormatFn({ ...cellConfig, value: '123' })).to.equal(123);
      expect(integerFormatFn({ ...cellConfig, value: 123 })).to.equal(123);
      expect(integerFormatFn({ ...cellConfig, value: 1 })).to.equal(1);
    });

    it('should return empty value', () => {
      expect(integerFormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(integerFormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(integerFormatFn({ ...cellConfig, value: 0 })).to.equal(0);
      expect(integerFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(integerFormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(integerFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(integerFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.formattedInteger', () => {
    const formattedIntegerFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES['formatted integer']);

    it('should return formatted integer', () => {
      expect(formattedIntegerFormatFn({ ...cellConfig, value: '1' })).to.equal('1');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: '0' })).to.equal('0');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: '123' })).to.equal('123');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 123 })).to.equal('123');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 1 })).to.equal('1');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 0 })).to.equal('0');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 1230 })).to.equal('1,230');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 123023 })).to.equal('123,023');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 1123023 })).to.equal('1,123,023');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: '1123023' })).to.equal('1,123,023');
    });

    it('should return empty value', () => {
      expect(formattedIntegerFormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(formattedIntegerFormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(formattedIntegerFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(formattedIntegerFormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(formattedIntegerFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.double', () => {
    const doubleFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.double);

    it('should return formatted double', () => {
      expect(doubleFormatFn({ ...cellConfig, value: '1' })).to.equal(1);
      expect(doubleFormatFn({ ...cellConfig, value: '1.2' })).to.equal(1.2);
      expect(doubleFormatFn({ ...cellConfig, value: 1.2 })).to.equal(1.2);
    });

    it('should return empty value', () => {
      expect(doubleFormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(doubleFormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(doubleFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(doubleFormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(doubleFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(doubleFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.doubleWithPrecision', () => {
    const doubleWithPrecisionFormatFn = dataFormatter.getFormatFnByDisplayType('4.3');

    it('should return formatted double with precission', () => {
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: '1' })).to.equal('1.000');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: '1.2' })).to.equal('1.200');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: 1.2 })).to.equal('1.200');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: 1.23456 })).to.equal('1.235');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: 1.23446 })).to.equal('1.234');
    });

    it('should return empty value', () => {
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(doubleWithPrecisionFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.exponential_5', () => {
    const exponential_5FormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES['exponential 5']);

    it('should return formatted exponential_5', () => {
      expect(exponential_5FormatFn({ ...cellConfig, value: '1' })).to.equal('1.00000e+0');
      expect(exponential_5FormatFn({ ...cellConfig, value: 1234 })).to.equal('1.23400e+3');
      expect(exponential_5FormatFn({ ...cellConfig, value: 0 })).to.equal('0.00000e+0');
    });

    it('should return empty value', () => {
      expect(exponential_5FormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(exponential_5FormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(exponential_5FormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(exponential_5FormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(exponential_5FormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(exponential_5FormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.exponential_15', () => {
    const exponential_15FormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES['exponential 15']);

    it('should return formatted exponential_15', () => {
      expect(exponential_15FormatFn({ ...cellConfig, value: '1' })).to.equal('1.000000000000000e+0');
      expect(exponential_15FormatFn({ ...cellConfig, value: 1234 })).to.equal('1.234000000000000e+3');
      expect(exponential_15FormatFn({ ...cellConfig, value: 12343456 })).to.equal('1.234345600000000e+7');
      expect(exponential_15FormatFn({ ...cellConfig, value: 0 })).to.equal('0.000000000000000e+0');
    });

    it('should return empty value', () => {
      expect(exponential_15FormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(exponential_15FormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(exponential_15FormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(exponential_15FormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(exponential_15FormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(exponential_15FormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });

  });

  describe('dataFormatter.datetime', () => {
    const datetimeFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.datetime);
    let st;
    before (() => {
      st = sinon.stub(
        CommonUtils,
        'formatTimestamp',
      ).callsFake((value) => moment(new Date(value)).format(TIME_UNIT_FORMATS.DATETIME.format));
    });

    after(() => {
      st.restore()
    });

    it('should return formatted datetime', () => {
      expect(datetimeFormatFn({ ...cellConfig, value: { timestamp: 1516697673043, type: 'Date' }}))
        .to.equal('20180123 08:54:33.043 +0000');

      expect(datetimeFormatFn({ ...cellConfig, value: 1516703121 })).to.equal('20180123 10:25:21.000 +0000');
    });

    it('should return Invalid date', () => {
      expect(datetimeFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('Invalid date');
      expect(datetimeFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('Invalid date');
    });

    it('should return NaT', () => {
        expect(datetimeFormatFn({ ...cellConfig, value: 'NaT' }).toString()).to.equal('NaT');
    });

  });

  describe('dataFormatter.boolean', () => {
    const booleanFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.boolean);

    it('should return "true"', () => {
      expect(booleanFormatFn({ ...cellConfig, value: 'something' })).to.equal('true');
      expect(booleanFormatFn({ ...cellConfig, value: true })).to.equal('true');
      expect(booleanFormatFn({ ...cellConfig, value: 0 })).to.equal('true');
    });

    it('should return "false"', () => {
      expect(booleanFormatFn({ ...cellConfig, value: NaN })).to.equal('false');
      expect(booleanFormatFn({ ...cellConfig, value: false })).to.equal('false');
      expect(booleanFormatFn({ ...cellConfig, value: undefined })).to.equal('false');
      expect(booleanFormatFn({ ...cellConfig, value: null })).to.equal('false');
      expect(booleanFormatFn({ ...cellConfig, value: '' })).to.equal('false');
    });

  });

  describe('dataFormatter.html', () => {
    const booleanFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.html);
    const testObject = { someProp: '' };

    it('should return given value', () => {
      expect(booleanFormatFn({ ...cellConfig, value: 'something' })).to.equal('something');
      expect(booleanFormatFn({ ...cellConfig, value: true })).to.equal(true);
      expect(booleanFormatFn({ ...cellConfig, value: 0 })).to.equal(0);
      expect(booleanFormatFn({ ...cellConfig, value: testObject })).to.equal(testObject);
    });

  });

  describe('dataFormatter.percentage', () => {
    const percentageFormatFn = dataFormatter.getFormatFnByDisplayType(ALL_TYPES.percentage);

    it('should return formatted percentage', () => {
      expect(percentageFormatFn({ ...cellConfig, value: '1' })).to.equal('100.00%');
      expect(percentageFormatFn({ ...cellConfig, value: 1 })).to.equal('100.00%');
      expect(percentageFormatFn({ ...cellConfig, value: 1234 })).to.equal('123,400.00%');
      expect(percentageFormatFn({ ...cellConfig, value: 0 })).to.equal('0.00%');
      expect(percentageFormatFn({ ...cellConfig, value: 0.1 })).to.equal('10.00%');
      expect(percentageFormatFn({ ...cellConfig, value: 0.123 })).to.equal('12.30%');
    });

    it('should return empty value', () => {
      expect(percentageFormatFn({ ...cellConfig, value: undefined })).to.equal(undefined);
      expect(percentageFormatFn({ ...cellConfig, value: null })).to.equal(null);
      expect(percentageFormatFn({ ...cellConfig, value: '' })).to.equal('');
    });

    it('should return NaN', () => {
      expect(percentageFormatFn({ ...cellConfig, value: false }).toString()).to.equal('NaN');
      expect(percentageFormatFn({ ...cellConfig, value: true }).toString()).to.equal('NaN');
      expect(percentageFormatFn({ ...cellConfig, value: NaN }).toString()).to.equal('NaN');
      expect(percentageFormatFn({ ...cellConfig, value: 'something' }).toString()).to.equal('NaN');
    });
  });
});
