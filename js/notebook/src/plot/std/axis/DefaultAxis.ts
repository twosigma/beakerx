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

import BigNumberUtils from "beakerx_shared/lib/utils/BigNumberUtils";
import {Big, BigSource} from "big.js"

const NANOTIME_TYPE = 'nanotime';

export default class DefaultAxis {
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
  axisMarginValL: BigJs.BigSource;
  axisMarginValR: BigJs.BigSource;
  fixedLines: any[];
  axisFixedLabels: any;
  numFixs: number[];
  dateIntws: any[];
  numIntws: any[];

  axisLabelWithCommon: any;
  showGridlineLabels: boolean;

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
    this.showGridlineLabels = true;

    this.setNumFixs();
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

  setRange(vl, vr, axisBase): void {
    if (vl !== null) { this.axisValL = vl; }
    if (vr !== null) { this.axisValR = vr; }

    if (this.axisType === "log") {
      this.setLogAxisBase(axisBase);
    }

    this.axisValSpan = BigNumberUtils.minus(this.axisValR, this.axisValL);
  }

  setLogAxisBase(axisBase) {
    if (axisBase != null ) {
      this.axisBase = axisBase;
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

    this.setAxisPct(pointLeft, pointRight);

    let span = this.getSpan();

    this.setAxisSteps(span, this.numIntws, this.numFixs, count);
    this.setLinesAndLabels(pointLeft, pointRight, span);
  }

  setAxisPct(pointLeft: number, pointRight: number) {
    this.axisPctL = pointLeft;
    this.axisPctR = pointRight;
    this.axisPctSpan = pointRight - pointLeft;
  }

  getSpan() {
    if (this.axisValSpan instanceof Big) {
      return parseFloat(this.axisValSpan.times(this.axisPctSpan).toString());
    }

    return this.axisPctSpan * this.axisValSpan;
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

    let margins = BigNumberUtils.plus(this.axisMarginValL, this.axisMarginValR);

    span = BigNumberUtils.mult(this.axisPctSpan, BigNumberUtils.minus(this.axisValSpan, margins));
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

    this.addDefaultIntervals(i, intervals, prev);
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
    let valueRight: BigSource = this.getValue(pointRight);
    let value: BigSource = this.getValue(pointLeft);

    if (value instanceof Big) {
      value = value.gte(0) ? value.div(axisStep).round(0, 3).times(axisStep) : value.div(axisStep).round(0, 0).times(axisStep);
    } else {
      value = Math.ceil(value as number / axisStep) * axisStep;
    }
    
    while (BigNumberUtils.lte(value, valueRight) || BigNumberUtils.lte(value, BigNumberUtils.plus(valueRight, 1e-12))) {
      let pointCoords = this.getPercent(value);
      
      lines.push(pointCoords);
      value = BigNumberUtils.plus(value, axisStep);
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

    return {
      common : '',
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

  getGridlines(): any[] {
    return [...this.axisGridlines];
  }

  getGridlineLabels() {
    return [...this.axisGridlineLabels];
  }

  getPercent(val: any): any {
    if (BigNumberUtils.lt(val, this.axisValL)) { val = this.axisValL; }
    if (BigNumberUtils.gt(val, this.axisValR)) { val = this.axisValR; }

    if (val instanceof Big) {
      return parseFloat(val.minus(this.axisValL).div(this.axisValSpan).toString());
    }

    return (val - this.axisValL) / this.axisValSpan;
  }

  getValue(pointCoords): BigSource {
    if (pointCoords < 0) { pointCoords = 0; }
    if (pointCoords > 1) { pointCoords = 1; }

    return BigNumberUtils.plus(BigNumberUtils.mult(this.axisValSpan, pointCoords), this.axisValL);
  }

  getString(pointCoords: number, span: number): string {
    return this.getDefaultAxisStringValue(pointCoords);
  };

  getDefaultAxisStringValue(pointCoords: number): string {
    let standardResult = 0;
    let value: number = parseFloat(this.getValue(pointCoords).toString());

    if (this.axisType === "log") {
      standardResult = Math.pow(this.axisBase, value);
    } else {
      standardResult = value;
    }

    return standardResult.toLocaleString(undefined, {
      minimumFractionDigits: this.axisFixed,
      maximumFractionDigits: this.axisFixed
    });
  }
}
