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

import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import * as _ from 'underscore';
import { isDoubleWithPrecision, getDoublePrecisionByType } from './dataTypes';
import { DataGridHelpers } from './dataGridHelpers';
import { TIME_UNIT_FORMATS } from '../consts';

const bkUtils = require('../../shared/bkUtils');

interface IFormatterOptions {
  stringFormatForColumn?: any,
  stringFormatForType?: any,
  formatForTimes?: any,
  timeStrings?: any,
  timeZone?: any,
  columnNames?: string[]
}

export const DEFAULT_TIME_FORMAT = 'YYYYMMDD HH:mm:ss.SSS ZZ';

export class DataFormatter {
  stringFormatForColumn: any;
  stringFormatForType: any;
  formatForTimes: any;
  timeStrings: any;
  timeZone: any;
  columnNames: string[];

  constructor(options: IFormatterOptions) {
    this.stringFormatForColumn = options.stringFormatForColumn || {};
    this.stringFormatForType = options.stringFormatForType || {};
    this.formatForTimes = options.formatForTimes || {};
    this.timeStrings = options.formatForTimes;
    this.timeZone = options.timeZone;
    this.columnNames = options.columnNames || [];

    this.handleNull = this.handleNull.bind(this);
    this.value = this.value.bind(this);
    this.string = this.string.bind(this);
    this.integer = this.integer.bind(this);
    this.formattedInteger = this.formattedInteger.bind(this);
    this.double = this.double.bind(this);
    this.doubleWithPrecission = this.doubleWithPrecission.bind(this);
    this.exponential_5 = this.exponential_5.bind(this);
    this.exponential_15 = this.exponential_15.bind(this);
    this.datetime = this.datetime.bind(this);
    this.boolean = this.boolean.bind(this);
    this.html = this.html.bind(this);
  }
  
  getFormatFnByType(displayType: string|number) {
    if (isDoubleWithPrecision(displayType)) {
      return this.doubleWithPrecission(getDoublePrecisionByType(displayType));
    }

    switch (displayType) {
      case 1:
        return this.integer;
      case 2:
        return this.formattedInteger;
      case 3:
        return this.double;
      case 6:
        return this.exponential_5;
      case 7:
        return this.exponential_15;
      case 8:
        return this.datetime;
      case 9:
        return this.boolean;
      case 10:
        return this.html;

      default:
        return this.string;
    }
  }

  getDoubleWithPrecissionFormatters(precissions: number[]) {
    return precissions.map(precission => this.doubleWithPrecission(precission));
  }

  private isNull(value: any) {
    return value === undefined || value === '' || value === 'null' || value === null;
  }

  private handleNull(formatFn: Function) {
    return (value: any, row: number, column: number) => {
      if (this.isNull(value)) {
        return value;
      }

      return formatFn(value, row, column);
    }
  }

  private value(value: any, row: number, column: number) {
    let columnName = this.columnNames[column];

    return this.stringFormatForColumn[columnName].values[columnName][row];
  };

  private string(value: any, row: number, column: number) {
    const objectValue = _.isObject(value);
    const stringFormatForColumn = this.stringFormatForColumn[this.columnNames[column]];
    let formattedValue = value;

    if (!objectValue && stringFormatForColumn && stringFormatForColumn.type === 'value') {
      return this.value;
    }

    if (objectValue) {
      formattedValue = value.type === 'Date' ?
        moment(value.timestamp).format(DEFAULT_TIME_FORMAT) :
        JSON.stringify(value);
    } else if (_.isString(value)) {
      const limitedText = DataGridHelpers.truncateString(value);

      formattedValue = limitedText;
    }

    return formattedValue;
  }

  private integer(value: any) {
    if (this.isNull(value)) {
      return value;
    }

    return parseInt(value);
  }

  private formattedInteger(value: any) {
    if (this.isNull(value)) {
      return value;
    }

    let x = parseInt(value);

    if (!isNaN(x)) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return x;
  }

  private double(value: any, row: number, column: number) {
    if (this.isNull(value)) {
      return value;
    }

    let doubleValue = parseFloat(value);
    let colFormat = this.stringFormatForColumn[this.columnNames[column]];
    let typeFormat = this.stringFormatForType.double;
    let format = colFormat && colFormat.type === 'decimal' ? colFormat : typeFormat;

    if (!format || format.type !== 'decimal') {
      return doubleValue;
    }

    let precision = doubleValue.toString().split('.')[1];

    if (precision && precision.length >= format.maxDecimals) {
      return doubleValue.toFixed(format.maxDecimals);
    }

    return doubleValue.toFixed(format.minDecimals);
  }

  private doubleWithPrecission(precision: any) {
    return this.handleNull((value) => {
      return parseFloat(value).toFixed(precision);
    });
  }

  private exponential_5(value: any) {
    if (this.isNull(value)) {
      return value;
    }

    return parseFloat(value).toExponential(5);
  }

  private exponential_15(value: any) {
    if (this.isNull(value)) {
      return value;
    }

    return parseFloat(value).toExponential(15);
  }

  private datetime(value: any, row: number) {
    if (this.timeStrings) {
      return this.timeStrings[row];
    }

    let format = _.isEmpty(this.formatForTimes) ?
      TIME_UNIT_FORMATS.DATETIME.format :
      TIME_UNIT_FORMATS[this.formatForTimes].format;

    if (_.isObject(value) && value.type === 'Date') {
      return bkUtils.formatTimestamp(value.timestamp, this.timeZone, format);
    }

    let milli = value * 1000;

    return bkUtils.formatTimestamp(milli, this.timeZone, format);
  }

  private boolean(value: any) {
    return (
      this.isNull(value) ||
      value === false ||
      (typeof value === 'number' && isNaN(value))
    ) ?
      'false':
      'true';
  }

  private html(value: any) {
    return value;
  }
}
