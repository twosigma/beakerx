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

import {Big, BigSource} from "big.js";
import BigNumberUtils from "beakerx_shared/lib/utils/BigNumberUtils";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import * as d3 from 'd3';
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

interface IDataRange {
  xl: BigSource;
  xr: BigSource;
  yl: number;
  yr: number;
  xSpan: BigSource;
  ySpan: number;
}

export default class PlotUtils {

  public static get fonts() {
    return {
      labelWidth: 6,
      labelHeight: 12,
      tooltipWidth: 10
    }
  }
  // todo scope and return type
  public static getSavePlotAsContexMenuItems(
    scope: any
  ): any[] {
    return [
      {
        name: 'Save as SVG',
        callback: () => {
          scope.saveAsSvg()
        }
      },
      {
        name: 'Save as PNG',
        callback: () => {
          scope.saveAsPng()
        }
      },
      {
        name: 'Save as PNG at high DPI...',
        items: [2, 3, 4, 5].map(scale => {
          return {
            name: scale + 'x',
            callback: () => scope.saveAsPng(scale)
          }
        })
      }
    ]
  }

  public static useYAxisR(model: any, data: any): boolean {
    let modelAxis = model.yAxisR;
    let dataAxis = data.yAxis;
    if (dataAxis && dataAxis.hasOwnProperty('label')) {
      return modelAxis && modelAxis.label === dataAxis.label;
    }
    return modelAxis && modelAxis.label === dataAxis;
  }

  public static getDataRange(data: any): { dataRange: IDataRange; visibleItems: number; legendItems: number  } {
    let dataRange: IDataRange = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity,
      xSpan : Infinity,
      ySpan : Infinity,
    };
    let visibleItems: number = 0;
    let legendItems: number = 0;

    for (const dataItem of data) {
      if (dataItem.legend !== null && dataItem !== '') {
        legendItems++;
      }
      if (dataItem.showItem === false) {
        continue;
      }
      visibleItems++;
      let itemRange = dataItem.getRange();
      this.updateRange(dataRange, itemRange);
    }

    if (dataRange.xl === Infinity && dataRange.xr !== -Infinity) {
      dataRange.xl = BigNumberUtils.minus(dataRange.xr, 1);
    } else if (dataRange.xr === -Infinity && dataRange.xl !== Infinity) {
      dataRange.xr = BigNumberUtils.plus(dataRange.xl, 1);
    } else if (visibleItems === 0 || dataRange.xl === Infinity) {
      dataRange.xl = 0;
      dataRange.xr = 1;
    } else if (BigNumberUtils.gt(dataRange.xl, dataRange.xr)) {
      let temp = dataRange.xl;
      dataRange.xl = dataRange.xr;
      dataRange.xr = temp;
    }

    if (dataRange.yl === Infinity && dataRange.yr !== -Infinity) {
      dataRange.yl = dataRange.yr - 1;
    } else if (dataRange.yr === -Infinity && dataRange.yl !== Infinity) {
      dataRange.yr = dataRange.yl + 1;
    }
    if (visibleItems === 0 || dataRange.yl === Infinity) {
      dataRange.yl = 0;
      dataRange.yr = 1;
    } else if (dataRange.yl > dataRange.yr) {
      let temp = dataRange.yl;
      dataRange.yl = dataRange.yr;
      dataRange.yr = temp;
    }

    let increaseRange = (value: BigSource) => {
      let v = BigNumberUtils.eq(value, 0) ? 1 : value || 1;
      return BigNumberUtils.plus(value, BigNumberUtils.div(v, 10));
    };
    let decreaseRange = (value: BigSource) => {
      let v = BigNumberUtils.eq(value, 0) ? 1 : value || 1;
      return BigNumberUtils.minus(value, BigNumberUtils.div(v, 10));
    };

    if (BigNumberUtils.eq(dataRange.xl, dataRange.xr)) {
      dataRange.xl = decreaseRange(dataRange.xl);
      dataRange.xr = increaseRange(dataRange.xr);
    }
    if (dataRange.yl === dataRange.yr) {
      dataRange.yl = decreaseRange(dataRange.yl) as number;
      dataRange.yr = increaseRange(dataRange.yr) as number;
    }

    dataRange.xSpan = BigNumberUtils.minus(dataRange.xr, dataRange.xl);
    dataRange.ySpan = dataRange.yr - dataRange.yl;

    return {
      "dataRange" : dataRange,
      "visibleItems" : visibleItems,
      "legendItems" : legendItems
    };
  }

  public static rangeAssert(list: number[]): boolean {
    for (const listItem of list) {
      if (Math.abs(listItem) > 1E6) {
        console.error("data not shown due to too large coordinate");
        return true;
      }
    }
    return false;
  }

  public static convertInfinityValue(value: any): any {
    if(value === "Infinity"){
      return Infinity;
    }
    if(value === "-Infinity"){
      return -Infinity;
    }
    return value;
  }

  public static getHighlightDuration(): number {
    return 100;
  }

  public static getHighlightedSize(size: number, highlighted: boolean): string {
    let newSize = size + this.getHighlightedDiff(highlighted);
    return newSize.toString();
  }

  public static getTipStringPercent(pct: any, axis: any, fixed?: boolean|number) {
    let val = axis.getValue(pct);
    if (axis.axisType === "log") {
      val = axis.axisPow(pct);
      return this.getTipString(val, axis, fixed) + " (" + axis.getString(pct) + ")";
    }
    return this.getTipString(val, axis, fixed);
  }

  public static getTipString(val: BigSource, axis: any, fixed: boolean | number) {
    if (axis.axisType === "time") {
      return CommonUtils.formatTimestamp(
        val as number,
        axis.axisTimezone,
        "YYYY MMM DD ddd, HH:mm:ss .SSS"
      );
    }
    if (axis.axisType === "nanotime") {
      val = val as Big;
      let nanosec = val.mod(1000000000).toFixed(0);
      return CommonUtils.formatTimestamp(
        parseFloat(val.div(1000000).toFixed(0)),
        axis.axisTimezone,
        "YYYY MMM DD ddd, HH:mm:ss"
      ) + "." + CommonUtils.padStr(nanosec as unknown as number, 9);
    }

    if (typeof val === "number") {
      if (fixed === true) {
        // do nothing, keep full val
      } else if (typeof fixed === "number") {
        val = val.toFixed(fixed);
      } else {
        val = val.toFixed(axis.axisFixed);
      }
    }

    return `${val}`;
  }

  public static createTipString(obj: any) {
    let txt = "";

    for (const key of Object.keys(obj)) {
      let value = obj[key];
      if (key === "title") {
        txt += `<div style="font-weight:bold">${value}</div>`;
      } else {
        txt += `<div>${key}: ${value}</div>`;
      }
    }
    return txt;
  }

  public static drawPng(canvas: HTMLCanvasElement, imgsrc: string, fileName: string) {
    let download = this.download;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    let image = new Image;
    image.onload = function() {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      download(canvas.toDataURL("image/png"), fileName);
      context.clearRect(0, 0, canvas.width, canvas.height);
      image.remove();
    };

    image.src = imgsrc;
  }

  public static download(url: string, fileName: string) {
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    PlotUtils.fireClickEvent(a);
    a.remove();
  }

  public static translate(jqelement: JQuery<Element>, x: number, y: number) {
    let getNumber = (str: string) => parseFloat(str.substring(0, str.length - 2));
    let transform = jqelement.css('transform');
    let elementTranslate = { x: 0, y: 0 };

    if (transform && transform.indexOf("translate") !== -1) {
      let translate = (transform.match(/translate(.*)/) as string[])[1].substring(1);
      let translateValues = translate.substring(0, translate.indexOf(')')).split(", ");
      elementTranslate.x = getNumber(translateValues[0]);
      elementTranslate.y = getNumber(translateValues[1]);
    }
    jqelement.css(
      "transform",
      `translate(${elementTranslate.x + x}px, ${elementTranslate.y + y}px)`
    );
  }

  public static translateChildren(element: Element, x: number, y: number) {
    for (let j = 0; j < element.childElementCount; j++) {
      let child = element.children[j];
      if (child.nodeName.toLowerCase() !== 'defs') {
        this.translate($(child), x, y);
      }
    }
  }

  public static getActionObject(plotType: string, e: any, subplotIndex?: number) {
    let actionObject: any = {};
    if (plotType === "CategoryPlot") {
      if (e.ele !== null){
        actionObject.category = e.ele.category;
        actionObject.series = e.ele.series;
        actionObject.type = "CategoryGraphicsActionObject";
      }
    } else {
      if (plotType === "CombinedPlot") {
        actionObject.subplotIndex = subplotIndex;
        actionObject.type =  "CombinedPlotActionObject";
      } else {
        actionObject.type = "XYGraphicsActionObject";
      }
      if(e.ele != null){
        actionObject.index = e.ele.index;
      }
    }
    return actionObject;
  }

  public static addTitleToSvg(svg, jqtitle, titleSize) {
    let title = jqtitle.clone();
    title.find('style').remove();
    d3.select(svg).insert("text", "g")
      .attr("id", jqtitle.attr("id"))
      .attr("class", jqtitle.attr("class"))
      .attr("x", titleSize.width / 2)
      .attr("y", titleSize.height)
      .style("text-anchor", "middle")
      .text(title.text());

    title.remove();
  }

  private static fireClickEvent(a: HTMLAnchorElement) {
    if (document.createEvent) {
      let evObj = document.createEvent('MouseEvents');
      evObj.initEvent('click', true, false);
      a.dispatchEvent(evObj);
      return
    }
    // @ts-ignore
    if (document.createEventObject) {
      // @ts-ignore
      a.fireEvent('onclick', document.createEventObject());
    }
  }

  private static getHighlightedDiff(highlighted: boolean): number {
    return highlighted ? 2 : 0;
  }

  public static addInlineFonts(element): void {
    let styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    let fontFace = '';

    fontFace += this.getFontToInject({
      fontFamily: 'Lato',
      urlformats: [{
        base64: require('../../shared/fonts/lato/Lato-Regular.woff'),
        format: 'woff'
      }],
      fontWeight: 'normal',
      fontStyle: 'normal'
    });
    fontFace += this.getFontToInject({
      fontFamily: 'Lato',
      urlformats: [{
        base64: require('../../shared/fonts/lato/Lato-Black.woff'),
        format: 'woff'
      }],
      fontWeight: 'bold',
      fontStyle: 'normal'
    });

    styleEl.innerHTML = '<![CDATA[\n' + fontFace + '\n]]>';
    let defsEl = document.createElement('defs');
    defsEl.appendChild(styleEl);
    element.insertBefore(defsEl, element.firstChild);
  }

  public static getFontToInject(font) {
    let src = '';
    for(const fontDef of font.urlformats) {
      src += `url('${fontDef.base64}')`;
    }
    src = src.replace(/,\s*$/, "");

    return `@font-face {
      font-family: '${font.fontFamily}';
      src: ${src};
      font-weight: ${font.fontWeight};
      font-style: ${font.fontWeight};
    }
    `;
  }

  public static adjustStyleForSvg(styleString: string): string {
    let colorArr = styleString.match(/color:(.*)\;/g);
    if (colorArr && colorArr.length) {
      let fill = colorArr[0].replace('color:', 'fill:');
      styleString += fill;
    }
    return styleString;
  }

  public static addInlineStyles(element, extraStyles): void {
    let styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    let elementStyles = PlotStyleUtils.getElementStyles(element);

    let extraStylesCss = '';
    if(extraStyles) {
      extraStylesCss = extraStyles.join('\n');
    }

    styleEl.innerHTML = '<![CDATA[\n' + elementStyles + '\n' + extraStylesCss + '\n]]>';
    let defsEl = document.createElement('defs');
    defsEl.appendChild(styleEl);
    element.insertBefore(defsEl, element.firstChild);
  }

  public static getFileSynchronously(file: string): string {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", file, false);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send(null);
    return xhr.responseText;
  }

  public static histogram() {

    let rightClose = false;
    let binCount;
    let rangeMin;
    let rangeMax;

    let calcRange = (values) => {
      if (rangeMin !== undefined && rangeMax !== undefined) {
        return [rangeMin, rangeMax];
      } else if (rangeMin !== undefined) {
        return [rangeMin, d3.max(values)];
      } else if (rangeMax !== undefined) {
        return [d3.min(values), rangeMax];
      }
      return [d3.min(values), d3.max(values)];
    };

    let calcThresholds = (range, values) => {
      let n = binCount !== undefined ?
        binCount :
        Math.ceil(Math.log(values.length) / Math.LN2 + 1);
      let x = -1;
      let b = +range[0];
      let m = (range[1] - b) / n;
      let f = [];
      while (++x <= n) { f[x] = m * x + b; }

      if (rightClose) {
        f.splice(0, 0, range[0] - m);
      }

      return f;
    };

    function histogram(data) {
      let bins = [],
        values = data.map(Number, this),
        range = calcRange(values),
        thresholds = calcThresholds(range, values),
        bin, i = -1,
        n = values.length,
        m = thresholds.length - 1,
        k = 1,
        x;

      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }

      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = rightClose ?
              bins[d3.bisectLeft(thresholds, x, 1, m) - 1] :
              bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }

      return bins;
    }

    histogram.rangeMin = function (x) {
      rangeMin = x;
      return histogram;
    };

    histogram.rangeMax = function (x) {
      rangeMax = x;
      return histogram;
    };

    histogram.binCount = function (x) {
      binCount = x;
      return histogram;
    };

    histogram.rightClose = function (x) {
      rightClose = x;
      return histogram;
    };

    return histogram;
  }

  public static upper_bound(a, attr, val) {
    let l = 0;
    let r = a.length - 1;
    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      if (a[m][attr] >= val) {
        r = m - 1;
      } else  {
        l = m + 1;
      }
    }
    return r;
  }

  private static updateRange(dataRange: any, itemRange: any): void {
    if (itemRange.xl !== null) { dataRange.xl = BigNumberUtils.min(dataRange.xl, itemRange.xl); }
    if (itemRange.xr !== null) { dataRange.xr = BigNumberUtils.max(dataRange.xr, itemRange.xr); }
    if (itemRange.yl !== null) { dataRange.yl = Math.min(dataRange.yl, itemRange.yl); }
    if (itemRange.yr !== null) { dataRange.yr = Math.max(dataRange.yr, itemRange.yr); }
  }

}
