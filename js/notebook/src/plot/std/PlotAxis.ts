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

import * as Big from 'big.js';
import * as _ from 'underscore';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import bkUtils from "../../shared/bkUtils";

const NANOTIME_TYPE = 'nanotime';
const plotUtils = require('../plotUtils');

export default class PlotAxis {
  scope: any;
  type: string = 'axis';
  axisType: string;
  axisBase: number;
  axisTime: number;
  axisTimezone: string;
  axisValL: any;
  axisValR: any;
  axisValSpan: any;
  axisPctL: number;
  axisPctR: number;
  axisPctSpan: number;
  label: string;
  axisGridlines: any;
  axisGridlineLabels: any[];
  axisStep: number;
  axisFixed: number;
  axisMarginValL: number;
  axisMarginValR: number;
  fixedLines: any[];
  axisFixedLabels: any;
  numFixs: number[];
  dateIntws: any[];
  numIntws: any[];

  axisLabelWithCommon: any;

  UNIT: number;
  SECOND: number;
  MINUTE: number;
  HOUR: number;
  DAY: number;
  MONTH: number;
  YEAR: number;

  constructor(type: any) {
    this.axisType = type == null ? "linear" : type; // linear, log, time, category, nanotime
    this.axisBase = 10;
    this.axisTime = 0;
    this.axisTimezone = "UTC";
    this.axisValL = type === NANOTIME_TYPE ? new Big(0) : 0;
    this.axisValR = type === NANOTIME_TYPE ? new Big(1) : 1;
    this.axisValSpan = type === NANOTIME_TYPE ? new Big(1) : 1;
    this.axisPctL = 0;
    this.axisPctR = 1;
    this.axisPctSpan = 1;
    this.label = "";
    this.axisGridlines = [];
    this.axisGridlineLabels = [];
    this.axisStep = 1;
    this.axisFixed = 0;
    this.axisMarginValL = 0;
    this.axisMarginValR = 0;
    this.fixedLines = [];
    this.axisFixedLabels = {};
    this.dateIntws = [];
    this.numIntws = [];

    this.setUnits();
    this.setNumFixs();
  }

  setUnits() {
    if (this.axisType === NANOTIME_TYPE) {
      this.UNIT = 1000000;
    } else {
      this.UNIT = 1;
    }

    this.SECOND = 1000 * this.UNIT;
    this.MINUTE = 1000 * 60 * this.UNIT;
    this.HOUR = 1000 * 60 * 60 * this.UNIT;
    this.DAY = 1000 * 60 * 60 * 24 * this.UNIT;
    this.MONTH = 1000 * 60 * 60 * 24 * 30 * this.UNIT;
    this.YEAR = 1000 * 60 * 60 * 24 * 365 * this.UNIT;
  }

  setNumFixs() {
    let numFixs = [];
    let min = this.axisType === "log" ? 1 : 0;

    for (let i = 0; i < 18; i++) {
      let f = Math.max(6 - i, min);
      numFixs = numFixs.concat([f, i <= 6 ? f + 1 : f, f]);
    }

    this.numFixs = numFixs;
  }

  axisPow(pct) {
    return Math.pow(this.axisBase, pct * this.axisValSpan + this.axisValL);
  }

  setLabel(label) {
    this.label = label;
  }

  setRange(vl, vr, para): void {
    if (vl !== null) { this.axisValL = vl; }
    if (vr !== null) { this.axisValR = vr; }

    if (this.axisType === "log") {
      this.setLogAxisBase(para);
    }

    if (this.axisType === "time" || this.axisType === "nanotime") {
      this.setTimeAxisRange(para);
    }

    this.axisValSpan = plotUtils.minus(this.axisValR, this.axisValL);
  }

  setTimeAxisRange(para) {
    if (para != null) {
      this.axisTimezone = para;
    }

    if (this.axisType === "time") {
      return;
    }

    // For nanotime
    if(!(this.axisValL instanceof Big)) {
      this.axisValL = new Big(this.axisValL);
    }

    if(!(this.axisValR instanceof Big)) {
      this.axisValR = new Big(this.axisValR);
    }
  }

  setLogAxisBase(para) {
    if (para != null ) {
      this.axisBase = para;
    }

    if (this.axisBase <= 1) {
      this.axisBase = 10;
      console.error("cannot set base to <= 1");
    }
  }

  setCategoryNames(categoryNames, categoryxs) {
    this.axisFixedLabels = {};

    for (let i = 0; i < categoryxs.length; i++) {
      this.fixedLines.push(this.getPercent(categoryxs[i]));
      this.axisFixedLabels[this.fixedLines[i]] = categoryNames[i];
    }
  }

  setGridlines(pointLeft, pointRight, count, marginLeft, marginRight) {
    if (pointRight < pointLeft) {
      console.error("cannot set right coord < left coord");
      return;
    }

    this.axisPctL = pointLeft;
    this.axisPctR = pointRight;
    this.axisPctSpan = pointRight - pointLeft;

    if (this.axisType === "time" || this.axisType === "nanotime") {
      this.axisMarginValL = plotUtils.mult(this.axisValSpan, marginLeft);
      this.axisMarginValR = plotUtils.mult(this.axisValSpan, marginRight);
    }

    let span;

    if (this.axisValSpan instanceof Big) {
      span = parseFloat(this.axisValSpan.times(this.axisPctSpan).toString());
    } else {
      span =this.axisPctSpan * this.axisValSpan;
    }

    let intervals;
    let fixs;

    if (this.axisType === "time" || this.axisType === "nanotime") {
      intervals = this.dateIntws;
      fixs = {};
    } else {
      intervals = this.numIntws;
      fixs = this.numFixs;
    }

    this.setAxisSteps(span, intervals, fixs, count);
    this.setLinesAndLabels(pointLeft, pointRight, span);
  }
  
  setAxisSteps(span, intervals, fixs, count) {
    let axisStep;
    let axisFixed;
    let mindiff = 1E100;
    let diff = mindiff;
    let i = 0;

    if (count == null) {
      console.error("missing setCoords count");
      count = 1;
    }

    while (diff === mindiff && axisStep !== Infinity) {
      axisStep = this.calcAxisStep(i, intervals);
      axisFixed = this.calcAxisFixed(i, fixs);

      let nowcount = span / axisStep;

      diff = Math.abs(nowcount - count);

      if (diff < mindiff) {
        mindiff = diff;
      }

      i++;
    }

    this.axisStep = axisStep;
    this.axisFixed = axisFixed;
  }
  
  setLinesAndLabels(pointLeft, pointRight, span) {
    let lines;
    let labels;

    lines = this.calcLines(pointLeft, pointRight, this.axisStep);

    let margins = plotUtils.plus(this.axisMarginValL, this.axisMarginValR);

    span = plotUtils.mult(this.axisPctSpan, plotUtils.minus(this.axisValSpan, margins));
    labels = this.calcLabels(lines, span);

    this.axisGridlines = lines;
    this.axisGridlineLabels = labels.labels;

    if (labels.common !== ''){
      this.axisLabelWithCommon = this.label ? this.label + ' ' + labels.common : labels.common;
    } else {
      this.axisLabelWithCommon = this.label;
    }
  }

  calcAxisStep(i, intervals) {
    if (i >= intervals.length) {
      this.addIntervals(i, intervals);
    }

    return intervals[i];
  }

  calcAxisFixed(i, fixs) {
    if (i >= fixs.length) {
      return 0;
    }

    return fixs[i];
  }

  addIntervals(i:number, intervals: number[]) {
    let prev = intervals[intervals.length - 1];

    if (this.axisType === "time" || this.axisType === "nanotime") {
      this.addTimeAxisIntervals(i, intervals, prev);
    } else {
      this.addDefaultIntervals(i, intervals, prev);
    }
  }

  addTimeAxisIntervals(i: number, intervals: number[], prev: any) {
    if (i === 0) {
      intervals.push(1);
      intervals.push(5);

      return;
    }

    if (prev < this.UNIT) {
      intervals.push(prev + 5);
    } else if (prev === this.UNIT) {
      intervals.push(prev + 4 * this.UNIT);
    } else if (prev < this.SECOND) {
      intervals.push(prev + 5 * this.UNIT);
    } else if (prev === this.SECOND) {
      intervals.push(prev + this.SECOND * 4);
    } else if (prev < this.MINUTE) {
      intervals.push(prev + this.SECOND * 5);
    } else if (prev === this.MINUTE) {
      intervals.push(prev + this.MINUTE * 4);
    } else if (prev < this.HOUR) {
      intervals.push(prev + this.MINUTE * 5);
    }else if (prev < this.DAY) {
      intervals.push(prev + this.HOUR);
    } else if (prev < this.MONTH) {
      intervals.push(prev + this.DAY);
    } else if (prev < this.YEAR) {
      intervals.push(prev + this.DAY * 10);
    } else {
      intervals.push(prev + this.YEAR);
    }
  }

  addDefaultIntervals(i: number, intervals: number[], prev: any) {
    let bs = (i === 0) ? 1E-6 : (prev / 5.0) * 10;

    intervals.push(1.0 * bs);
    intervals.push(2.5 * bs);
    intervals.push(5.0 * bs);
  }

  calcLines(pointLeft, pointRight, axisStep) {
    if (this.axisType === "category") {
      return this.getCategoryAxisLines(pointLeft, pointRight);
    }
    
    return this.getDefaultAxisLines(pointLeft, pointRight, axisStep);
  }
  
  getCategoryAxisLines(pointLeft: number, pointRight: number) {
    let lines: number[] = [];
    let valueRight = this.getValue(pointRight);
    
    for (let i = 0; i < this.fixedLines.length; i++) {
      let pointCoords = this.fixedLines[i];

      if (
        pointCoords >= this.getPercent(this.getValue(pointLeft))
        && pointCoords <= this.getPercent(valueRight)
      ) {
        lines.push(pointCoords);
      }
    }
    
    return lines;
  }

  getDefaultAxisLines(pointLeft, pointRight, axisStep) {
    let lines: number[] = [];
    let valueRight = this.getValue(pointRight);
    let value = this.getValue(pointLeft);

    if (value instanceof Big) {
      if(value.gte(0)){
        value = value.div(axisStep).round(0, 3).times(axisStep);
      } else {
        value = value.div(axisStep).round(0, 0).times(axisStep);
      }
    } else {
      value = this.normalizeValue(Math.ceil(value / axisStep) * axisStep, axisStep);
    }
    
    while (plotUtils.lte(value, valueRight) || plotUtils.lte(value, valueRight+1e-12)) {
      let pointCoords = this.getPercent(value);
      
      lines.push(pointCoords);
      value = this.normalizeValue(plotUtils.plus(value, axisStep), axisStep);
    }
    
    return lines;
  }

  calcLabels(lines, span) {
    let labels = [];

    if (this.axisType === "category") {
      labels = this.getCategoryAxisLabels(lines);
    } else {
      labels = this.getDefaultAxisLabels(lines, span);
    }

    if (this.shouldCalcTimeAxisLabels(labels, span)) {
      return this.getTimeAxisLabels(lines, span);
    }

    return {
      common : this.calcTimeAxisLabelsCommonPart(labels, span),
      labels : labels
    };
  }

  getCategoryAxisLabels(lines: any[]): string[] {
    let labels = [];
    let min = Math.min.apply(null, lines);
    let max = Math.max.apply(null, lines);

    for (let key in this.axisFixedLabels) {
      let pointCoords = parseFloat(key);

      if (!this.axisFixedLabels.hasOwnProperty(pointCoords)) {
        continue;
      }

      if(pointCoords >= min && pointCoords <= max){
        labels.push(this.axisFixedLabels[pointCoords]);
      }
    }

    return labels;
  }

  getDefaultAxisLabels(lines: any[], span: number): string[] {
    let labels = [];

    for (var i = 0; i < lines.length; i++) {
      let pointCoords = lines[i];

      labels.push(this.getString(pointCoords, span));
    }

    return labels;
  }

  shouldCalcTimeAxisLabels(labels: string[], span: number): boolean {
    return (
      (
        span > this.SECOND && this.axisType === "time"
        || this.axisType === "nanotime" && plotUtils.gt(span, this.UNIT)
      )
      && labels.length != _.uniq(labels).length
    );
  }

  getTimeAxisLabels(lines: any[], span: number) {
    if (this.axisType === "nanotime" && plotUtils.lte(span, this.SECOND)){
      span = this.UNIT;
    } else if (plotUtils.lte(span, this.MINUTE)) {
      span = this.SECOND;
    } else if (plotUtils.lte(span, this.HOUR)) {
      span = this.MINUTE;
    } else if (plotUtils.lte(span, this.DAY)) {
      span = this.HOUR;
    } else if (plotUtils.lte(span, this.MONTH)) {
      span = this.DAY;
    } else if (plotUtils.lte(span, this.YEAR)) {
      span = this.MONTH;
    } else {
      span = this.YEAR;
    }

    if (this.axisType === NANOTIME_TYPE) {
      span = new Big(span).minus(1);
    } else {
      span -= 1;
    }

    return this.calcLabels(lines, span);
  }

  calcTimeAxisLabelsCommonPart(labels, span) {
    let common = '';

    if (
      (this.axisType !== "time" && this.axisType !== "nanotime")
      || !plotUtils.gte(span, this.HOUR)
      || labels.length <= 1
    ) {
      return common;
    }

    let tokens = labels[0].split(' ');
    let index = 0;

    const checkCommon = (index) => {
      let substring = common ? `${common} ${tokens[index]}` : tokens[index];

      for (let i = 1; i < labels.length; i++) {
        if (substring !== labels[i].substring(0, substring.length)) {
          return false;
        }
      }

      return true;
    };

    while (checkCommon(index)) {
      common = (common != '') ? common + ' ' + tokens[index] : tokens[index];
      index = index+1;
    }

    if (common.length > 1) {
      for (let i = 1; i < labels.length; i++) {
        let label = labels[i];

        if (common != label.substring(0, common.length)) {
          common = '';

          break;
        }
      }
    }

    if (common.length > 1) {
      for (let i = 0; i < labels.length; i++) {
        labels[i] = labels[i].replace(common, '').trim();
      }
    }

    return common.replace(',', '').trim();
  }

  selectStartOrEndInterval(value, interval) {
    const nextIntervalStart = bkUtils.applyTimezone(value, this.axisTimezone).endOf(interval).add(1, "ms");
    const intervalStart = bkUtils.applyTimezone(value, this.axisTimezone).startOf(interval);
    
    return  ((nextIntervalStart - value) > (value - intervalStart)) ? intervalStart : nextIntervalStart;
  }
  
  normalizeValue(value, axisStep) {
    if (this.axisType !== "time" || !plotUtils.gt(axisStep, this.DAY)) {
      return value;
    }
    
    if (plotUtils.lte(axisStep, this.MONTH)) {
      value = this.selectStartOrEndInterval(value, "day");
    } else if (plotUtils.lte(axisStep, this.YEAR)) {
      value = this.selectStartOrEndInterval(value, "month");
    } else {
      value = this.selectStartOrEndInterval(value, "year");
    }

    return value;
  }

  getGridlines(): any[] {
    return [...this.axisGridlines];
  }

  getGridlineLabels() {
    return [...this.axisGridlineLabels];
  }

  getPercent(val: any): any {
    if (plotUtils.lt(val, this.axisValL)) { val = this.axisValL; }
    if (plotUtils.gt(val, this.axisValR)) { val = this.axisValR; }

    if (val instanceof Big) {
      return parseFloat(val.minus(this.axisValL).div(this.axisValSpan).toString());
    }

    return (val - this.axisValL) / this.axisValSpan;
  }

  getValue(pointCoords): any {
    if (pointCoords < 0) { pointCoords = 0; }
    if (pointCoords > 1) { pointCoords = 1; }

    return plotUtils.plus(plotUtils.mult(this.axisValSpan, pointCoords), this.axisValL);
  }

  getString(pointCoords: number, span: number): string {
    if (this.axisType != "time" && this.axisType != "nanotime") {
      return this.getDefaultAxisStringValue(pointCoords);
    }

    return this.getTimeAxisStringValue(pointCoords, span);
  };

  getDefaultAxisStringValue(pointCoords: number) {
    let standardResult = 0;

    if (this.axisType === "log") {
      standardResult = Math.pow(this.axisBase, this.getValue(pointCoords));
    } else {
      standardResult = this.getValue(pointCoords);
    }

    return standardResult.toLocaleString(undefined, {
      minimumFractionDigits: this.axisFixed,
      maximumFractionDigits: this.axisFixed
    });
  }

  getTimeAxisStringValue(pointCoords: number, span: number) {
    let value = this.getValue(pointCoords);
    let timestamp;
    let nanosec;

    if (this.axisType === "time") {
      timestamp = Math.ceil(value * 1000) / 1000;
    }

    else if (this.axisType === "nanotime") {
      timestamp = parseFloat(value.div(1000000).toFixed(0));
      nanosec = value.mod(1000000000).toFixed(0);
    }

    if (plotUtils.lte(span, this.SECOND) && this.axisType === "time") {
      return bkUtils.formatTimestamp(
        timestamp, this.axisTimezone, ".SSS"
      ) + ( (timestamp - Math.floor(timestamp)).toFixed(this.axisFixed));
    }

    if (plotUtils.lte(span, this.MINUTE) && this.axisType === "time") {
      return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "mm:ss.SSS");
    }

    if (plotUtils.lte(span, this.HOUR)) {
      if (this.axisType !== "nanotime") {
        return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "HH:mm:ss");
      }

      if (moment(timestamp) < this.SECOND) {
        return "." + plotUtils.padStr(nanosec, 9);
      }

      return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "HH:mm:ss") + "." + plotUtils.padStr(nanosec, 9);
    }

    if (plotUtils.lte(span, this.DAY)) {
      return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "YYYY MMM DD, HH:mm");
    }

    if (plotUtils.lte(span, this.MONTH)) {
      return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "YYYY MMM DD");
    }

    if (plotUtils.lte(span, this.YEAR)) {
      return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "YYYY MMM");
    }

    return bkUtils.formatTimestamp(timestamp, this.axisTimezone, "YYYY");
  }
}
