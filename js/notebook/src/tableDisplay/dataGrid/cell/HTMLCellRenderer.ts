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
import {
  selectDataFontSize,
  selectFontColor,
  selectHeaderFontSize,
  selectHeadersVertical, selectRenderer
} from "../model/selectors";
import {DataGridHelpers} from "../dataGridHelpers";
import escapeHTML = DataGridHelpers.escapeHTML;

export default class HTMLCellRenderer extends BeakerXCellRenderer {

  paint(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    this.drawBackground(gc, config);
    this.drawHTML(gc, config);
  }

  drawHTML(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    // Resolve the font for the cell.
    const font = CellRenderer.resolveOption(this.font, config);

    // Bail if there is no font to draw.
    if (!font) {
      return;
    }

    // Resolve the text color for the cell.
    let color = CellRenderer.resolveOption(this.textColor, config);

    // Bail if there is no text color to draw.
    if (!color) {
      return;
    }

    const format = this.format;
    const text = format(config);

    // Resolve the vertical and horizontal alignment.
    let vAlign = CellRenderer.resolveOption(this.verticalAlignment, config);
    let hAlign = CellRenderer.resolveOption(this.horizontalAlignment, config);

    // Compute the padded text box height for the specified alignment.
    let boxHeight = config.height - (vAlign === 'center' ? 1 : 2);

    // Bail if the text box has no effective size.
    if (boxHeight <= 0) {
      return;
    }

    // Compute the text height for the gc font.
    const textHeight = TextRenderer.measureFontHeight(font);
    const img = new Image();
    const data = this.getSVGData(text, config, vAlign, hAlign);

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

    img.width = config.width;
    img.height = config.height;
    img.onload = (((config) => () => {
      this.dataGrid.repaint(config.x, config.y, config.width, config.height);
    })({...config}));

    img.src = "data:image/svg+xml," + data;
    img.complete && gc.drawImage(img, config.x, config.y);
  }

  getSVGData(text: string, config: CellRenderer.ICellConfig, vAlign, hAlign): string {
    const font = CellRenderer.resolveOption(this.font, config);
    const color = CellRenderer.resolveOption(this.textColor, config);

    const html = `<svg xmlns="http://www.w3.org/2000/svg" width="${config.width}px" height="${config.height}px">
      <foreignObject width="${config.width}px" height="${config.height}px">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="display: table-cell; font: ${font}; width: ${config.width}px; height: ${config.height}px; color: ${color}; vertical-align: ${vAlign === 'center' ? 'middle' : vAlign}; text-align: ${hAlign}"
        >
          <div style="display: inline-block; padding: 0 2px">${escapeHTML(text)}</div>
        </div>
      </foreignObject>
    </svg>`;

    return encodeURIComponent(html);
  }
}
