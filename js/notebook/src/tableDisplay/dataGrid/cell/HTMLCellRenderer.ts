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

import {CellRenderer, GraphicsContext, TextRenderer} from "@phosphor/datagrid";
import {createSelector} from "reselect";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
import {BeakerXDataGrid} from "../BeakerXDataGrid";

import LatoRegular from '../../../shared/fonts/lato/Lato-Regular.woff';
import LatoBlack from '../../../shared/fonts/lato/Lato-Black.woff';

export default class HTMLCellRenderer extends BeakerXCellRenderer {
  svg: HTMLElement;
  container: HTMLElement;
  foreignObject: HTMLElement;
  content: HTMLElement;
  dataCache = new Map<string, string>();

  constructor(dataGrid: BeakerXDataGrid, options?: TextRenderer.IOptions) {
    super(dataGrid, options);

    this.createSVG();
  }

  paint(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    this.drawBackground(gc, config);
    this.drawHTML(gc, config);
  }

  drawHTML(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    const font = CellRenderer.resolveOption(this.font, config);

    if (!font) {
      return;
    }

    let color = CellRenderer.resolveOption(this.textColor, config);

    if (!color) {
      return;
    }

    const format = this.format;
    const text = format(config);

    let vAlign = CellRenderer.resolveOption(this.verticalAlignment, config);
    let hAlign = CellRenderer.resolveOption(this.horizontalAlignment, config);

    // Compute the padded text box height for the specified alignment.
    let boxHeight = config.height - (vAlign === 'center' ? 1 : 2);

    if (boxHeight <= 0) {
      return;
    }

    const textHeight = TextRenderer.measureFontHeight(font);
    const img = new Image();
    const data = this.getSVGData(text, config, vAlign, hAlign);
    const dpiRatio =  this.dataGrid['_dpiRatio'];
    const x = config.x * dpiRatio;
    const y = config.y * dpiRatio;
    const width = config.width * dpiRatio;
    const height = config.height * dpiRatio;

    gc.setTransform(1, 0, 0, 1, 0, 0);
    gc.textBaseline = 'bottom';
    gc.textAlign = hAlign;
    gc.font = font;
    gc.fillStyle = color;

    if (textHeight > boxHeight) {
      gc.beginPath();
      gc.rect(config.x, config.y, config.width, config.height - 1);
      gc.clip();
    }

    img.width = width;
    img.height = height;
    img.src = "data:image/svg+xml," + data;

    if (!img.complete) {
      img.onload = () => { this.dataGrid.repaint(config.x, config.y, config.width, config.height); };
    } else {
      gc.drawImage(img, x, y, width, height);
    }
  }

  createSVG() {
    this.svg = document.createElement('svg');
    this.svg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    this.svg.innerHTML = '<foreignObject><div class="container" xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell"><div class="content" style="display: inline-block; padding: 0 2px"></div></div></foreignObject>';

    this.foreignObject = this.svg.querySelector('foreignObject') as HTMLElement;
    this.container = this.svg.querySelector('.container') as HTMLElement;
    this.content = this.svg.querySelector('.content') as HTMLElement;

    const style = document.createElement('style');

    style.type = 'text/css';
    style.innerHTML = `@font-face {
      font-family: 'Lato';
      src: url("${LatoRegular}");
      font-weight: normal;
      font-style: normal;
    } @font-face {
      font-family: 'Lato';
      src: url("${LatoBlack}");
      font-weight: bold;
      font-style: normal;
    }`;

    this.container.insertBefore(style, this.content);
  }

  setSize(element: HTMLElement, config: CellRenderer.ICellConfig) {
    element.setAttribute('width', `${config.width}px`);
    element.setAttribute('height', `${config.height}px`);
  }

  getSVGData(text: string, config: CellRenderer.ICellConfig, vAlign, hAlign): string {
    const cacheKey = this.getCacheKey(config, vAlign, hAlign);

    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey);
    }

    const font = CellRenderer.resolveOption(this.font, config);
    const color = CellRenderer.resolveOption(this.textColor, config);

    this.setSize(this.svg, config);
    this.setSize(this.foreignObject, config);

    this.container.style.width = `${config.width}px`;
    this.container.style.height = `${config.height}px`;
    this.container.style.font = font;
    this.container.style.color = color;
    this.container.style.verticalAlign = vAlign === 'center' ? 'middle' : vAlign;
    this.container.style.textAlign = hAlign;
    this.content.innerHTML = text;

    const div = document.createElement('div');
    div.innerHTML = this.svg.outerHTML;

    const data = encodeURIComponent(div.innerHTML);
    this.dataCache.set(cacheKey, data);

    return data;
  }

  getCacheKey(config, vAlign, hAlign) {
    return `${JSON.stringify(config)}|${vAlign}|${hAlign}`;
  }
}
