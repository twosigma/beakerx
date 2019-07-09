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
import BeakerXCellRenderer from "./BeakerXCellRenderer";
import LatexRenderer from './LatexRenderer';

import LatoRegular from '../../../shared/fonts/lato/Lato-Regular.woff';
import LatoBlack from '../../../shared/fonts/lato/Lato-Black.woff';

export default class HTMLCellRenderer extends BeakerXCellRenderer {
  dataCache = new Map<string, string>();

  drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    const font = CellRenderer.resolveOption(this.font, config);

    if (!font) {
      return;
    }

    let color = CellRenderer.resolveOption(this.textColor, config);

    if (!color) {
      return;
    }

    let text = this.format(config);

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
    img.src = data;

    if (!img.complete) {
      img.onload = this.repaintCellCallback(config.x, config.y, config.width, config.height);
    } else {
      gc.drawImage(img, x, y, width, height);
    }
  }

  getFontFaceStyle() {
    return `@font-face {
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
  }

  getSVGData(text: string, config: CellRenderer.ICellConfig, vAlign, hAlign): string {
    const cacheKey = this.getCacheKey(config, vAlign, hAlign);

    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey);
    }

    const font = CellRenderer.resolveOption(this.font, config);
    const color = CellRenderer.resolveOption(this.textColor, config);
    const width = String(config.width);
    const height = String(config.height);

    const isLatexFormula = LatexRenderer.isLatexFormula(text);
    let data: string;

    if (isLatexFormula) {
      const latexHTML = LatexRenderer.latexToHtml(text);
      data = LatexRenderer.getLatexImageData(latexHTML, width, height, color, vAlign, hAlign);
    } else {
      data = this.getHTMLImageData(text, width, height, font, color, vAlign, hAlign);
    }

    this.dataCache.set(cacheKey, data);
    return data;
  }

  getCacheKey(config, vAlign, hAlign) {
    return `${JSON.stringify(config)}|${vAlign}|${hAlign}`;
  }

  private repaintCellCallback(x: number, y: number, width: number, height: number) {
    return () => this.dataGrid.repaint(x, y, width, height);
  }

  private getHTMLImageData(text: string, width: string, height: string, font: string, color: string, vAlign: string,
                              hAlign: string) {
    const html = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
      <foreignObject width="${width}px" height="${height}px">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="display: table-cell; font: ${font}; width: ${width}px; height: ${height}px; color: ${color}; vertical-align: ${vAlign === 'center' ? 'middle' : vAlign}; text-align: ${hAlign}"
        >
          <style type="text/css">${this.getFontFaceStyle()}</style>
          <div style="display: inline-block; padding: 0 2px">${text}</div>
        </div>
      </foreignObject>
    </svg>`;

    return "data:image/svg+xml," + encodeURIComponent(html);
  }
}
