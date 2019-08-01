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

import moment from 'moment-timezone';
import * as _ from 'underscore';
import {ALL_TYPES, getDoublePrecisionByType, isDoubleWithPrecision} from './dataTypes';
import {DataGridHelpers} from './dataGridHelpers';
import {TIME_UNIT_FORMATS} from './consts';
import {CellRenderer} from "@phosphor/datagrid";
import {IColumnState} from "./interface/IColumn";
import {
  selectColumnNames,
  selectFormatForTimes,
  selectStringFormatForColumn,
  selectStringFormatForType,
  selectTimeStrings,
  selectTimeZone
} from "./model/selectors";
import {BeakerXDataStore} from "./store/BeakerXDataStore";
import Big from "big.js";
import formatTimestamp = DataGridHelpers.formatTimestamp;

export const DEFAULT_TIME_FORMAT = 'YYYYMMDD HH:mm:ss.SSS ZZ';

export class DataFormatter {
  store: BeakerXDataStore;

  constructor(store: BeakerXDataStore) {
    this.store = store;

    this.handleNull = this.handleNull.bind(this);
    this.value = this.value.bind(this);
    this.string = this.string.bind(this);
    this.integer = this.integer.bind(this);
    this.formattedInteger = this.formattedInteger.bind(this);
    this.double = this.double.bind(this);
    this.doubleWithPrecision = this.doubleWithPrecision.bind(this);
    this.exponential_5 = this.exponential_5.bind(this);
    this.exponential_15 = this.exponential_15.bind(this);
    this.datetime = this.datetime.bind(this);
    this.boolean = this.boolean.bind(this);
    this.html = this.html.bind(this);
    this.rawValue = this.rawValue.bind(this);
    this.percentage = this.percentage.bind(this);
  }

  destroy(): void {
    this.store = null;
  }

  get stringFormatForColumn() {
    return selectStringFormatForColumn(this.store.state);
  }

  get timeStrings() {
    return selectTimeStrings(this.store.state);
  }

  get timeZone() {
    return selectTimeZone(this.store.state);
  }

  get stringFormatForType() {
    return selectStringFormatForType(this.store.state);
  }

  get formatForTimes() {
    return selectFormatForTimes(this.store.state);
  }

  get columnNames() {
    return selectColumnNames(this.store.state);
  }

  getFormatFnByDisplayType(displayType, columnState?: IColumnState): CellRenderer.ConfigFunc<string> {
    if (isDoubleWithPrecision(displayType)) {
      return this.doubleWithPrecision(getDoublePrecisionByType(displayType));
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
        return this.datetimeWithFormat(this.getTimeFormatForColumn(columnState));
      case 9:
        return this.boolean;
      case 10:
        return this.html;
      case 11:
        return this.rawValue;
      case ALL_TYPES.percentage:
        return this.percentage;
      default:
        return this.string;
    }
  }

  private isNull(value: any) {
    return value === undefined || value === '' || value === 'null' || value === null;
  }

  private handleNull(formatFn: CellRenderer.ConfigFunc<string>): CellRenderer.ConfigFunc<string> {
    return (config: CellRenderer.ICellConfig): string => {
      if (this.isNull(config.value)) {
        return config.value;
      }

      return <string>formatFn(config);
    }
  }

  private rawValue(config: CellRenderer.ICellConfig) {
    return config.value;
  }

  private value(config: CellRenderer.ICellConfig): string {
    let columnName = this.columnNames[config.column];

    return this.stringFormatForColumn[columnName].values[columnName][config.row];
  };

  private string(config: CellRenderer.ICellConfig) {
    const objectValue = _.isObject(config.value);
    const stringFormatForColumn = this.stringFormatForColumn[this.columnNames[config.column]];
    let formattedValue = config.value !== null ? config.value : '';

    if (!objectValue && stringFormatForColumn && stringFormatForColumn.type === 'value') {
      return this.value(config);
    }

    if (objectValue) {
      formattedValue = config.value.type === 'Date' ?
        moment(config.value.timestamp).format(DEFAULT_TIME_FORMAT) :
        JSON.stringify(config.value);
    }

    return DataGridHelpers.truncateString(formattedValue);
  }

  private integer(config: CellRenderer.ICellConfig) {
    if (this.isNull(config.value)) {
      return config.value;
    }

    return parseInt(config.value);
  }

  private formattedInteger(config: CellRenderer.ICellConfig) {
    if (this.isNull(config.value)) {
      return config.value;
    }

    let x = parseInt(config.value);

    if (!isNaN(x)) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return x;
  }

  private double(config: CellRenderer.ICellConfig) {
    if (this.isNull(config.value)) {
      return config.value;
    }

    let doubleValue = parseFloat(config.value);
    let colFormat = this.stringFormatForColumn[this.columnNames[config.column]];
    let typeFormat = this.stringFormatForType['double'];
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

  private doubleWithPrecision(precision: any): CellRenderer.ConfigFunc<string> {
    return this.handleNull((config: CellRenderer.ICellConfig) => {
      return parseFloat(config.value).toFixed(precision);
    });
  }

  private exponential_5(config: CellRenderer.ICellConfig): string {
    if (this.isNull(config.value)) {
      return config.value;
    }

    return parseFloat(config.value).toExponential(5);
  }

  private exponential_15(config: CellRenderer.ICellConfig): string {
    if (this.isNull(config.value)) {
      return config.value;
    }

    return parseFloat(config.value).toExponential(15);
  }

  private datetime(config: CellRenderer.ICellConfig, formatForTimes: any): string {
    if (this.timeStrings) {
      return this.timeStrings[config.row];
    }
    let value = config.value;
    if (value==='NaT'){
      return value;
    }
    return this.formatDatetime(value, formatForTimes);
  }

  private formatDatetime(value:any, formatForTimes: any){
    let format = TIME_UNIT_FORMATS.DATETIME.format;
    let valueModifier = 1000;

    if (formatForTimes) {
        format = formatForTimes.format;
        valueModifier = formatForTimes.valueModifier;
    }

    if (_.isObject(value) && value.type === 'Date') {
        let tz = value.hasOwnProperty('tz') ? value.tz : this.timeZone;
        return formatTimestamp(value.timestamp, tz, format);
    }

    let milli = isNaN(value) ?
        value :
        new Big(value).times(valueModifier);

    return formatTimestamp(milli, this.timeZone, format);
  }

  private getTimeFormatForColumn(columnState?: IColumnState) {
    return columnState && columnState.formatForTimes
      ? columnState.formatForTimes
      : this.formatForTimes;
  }

  private datetimeWithFormat(formatForTimes?: any) {
    return (config) => this.datetime(config, formatForTimes);
  }

  private boolean(config: CellRenderer.ICellConfig): string {
    return (
      this.isNull(config.value) ||
      config.value === false ||
      (typeof config.value === 'number' && isNaN(config.value))
    ) ?
      'false':
      'true';
  }

  private html(config: CellRenderer.ICellConfig): string {
    return config.value;
  }

  /**
   * Format numbers as percentage
   * @param config
   */
  private percentage(config: CellRenderer.ICellConfig): string {
    if (this.isNull(config.value)) {
      return config.value;
    }

    const value = parseFloat(config.value);

    if (isNaN(value)) {
      return 'NaN';
    }

    return value.toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2});
  }
}
