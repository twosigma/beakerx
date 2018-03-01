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

import { DEFAULT_ALIGNMENT } from "../column/columnAlignment";
import {CellRenderer, GraphicsContext, TextRenderer} from "@phosphor/datagrid";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import DataGridCell from "./DataGridCell";
import {
  darken,
  DEFAULT_CELL_BACKGROUND,
  DEFAULT_DATA_FONT_COLOR,
  DEFAULT_DATA_FONT_SIZE,
  DEFAULT_HEADER_FONT_COLOR, formatColor
} from "../style/dataGridStyle";

export default class BeakerxCellRenderer extends TextRenderer {
  dataGrid: BeakerxDataGrid;
  backgroundColor: CellRenderer.ConfigOption<string>;
  horizontalAlignment: CellRenderer.ConfigOption<TextRenderer.HorizontalAlignment>;
  format: TextRenderer.FormatFunc;
  font: CellRenderer.ConfigOption<string>;
  textColor: CellRenderer.ConfigOption<string>;

  constructor(dataGrid: BeakerxDataGrid, options?: TextRenderer.IOptions) {
    super(options);
    
    this.dataGrid = dataGrid;
    this.backgroundColor = this.getBackgroundColor.bind(this);
    this.horizontalAlignment = this.getHorizontalAlignment.bind(this);
    this.format = this.getFormat.bind(this);
    this.font = this.getFont.bind(this);
    this.textColor = this.getTextColor.bind(this);
  }
  
  getBackgroundColor(config: CellRenderer.ICellConfig): string {
    if (DataGridCell.isHeaderCell(config)) {
      return DEFAULT_CELL_BACKGROUND;
    }

    let selectionColor = this.dataGrid.cellSelectionManager.getBackgroundColor(config);
    let highlighterColor = this.dataGrid.highlighterManager.getCellBackground(config);
    let focusedColor = this.dataGrid.cellFocusManager.getFocussedCellBackground(config);
    let initialColor = selectionColor && highlighterColor && darken(highlighterColor);

    return focusedColor && initialColor && darken(initialColor) ||
      focusedColor ||
      initialColor ||
      highlighterColor ||
      selectionColor ||
      DEFAULT_CELL_BACKGROUND;
  }
  
  getHorizontalAlignment(config: CellRenderer.ICellConfig): string {
    let column = this.dataGrid.getColumn(config);

    return column ? column.getAlignment() : DEFAULT_ALIGNMENT;
  }

  getFormat(config: CellRenderer.ICellConfig) {
    let column = this.dataGrid.getColumn(config);

    return DataGridCell.isHeaderCell(config) ? config.value : column.formatFn(config);
  }

  getFont({ region }): string {
    let fontSize = (region === 'column-header' || region === 'corner-header')
      ? this.dataGrid.model.state.headerFontSize
      : this.dataGrid.model.state.dataFontSize;

    return `normal ${fontSize || DEFAULT_DATA_FONT_SIZE}px Lato, Helvetica, sans-serif`
  }

  getTextColor(config): string {
    if (config.region === 'row-header') {
      return DEFAULT_DATA_FONT_COLOR;
    }

    let colors = this.dataGrid.model.state.fontColor;
    let dataFontColor = colors && colors[config.row]
      ? formatColor(colors[config.row][config.column])
      : DEFAULT_DATA_FONT_COLOR;

    return config.region === 'column-header' || config.region === "corner-header"
      ? DEFAULT_HEADER_FONT_COLOR
      : dataFontColor;
  }

  drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    // Resolve the font for the cell.
    let font = CellRenderer.resolveOption(this.font, config);

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

    // Format the cell value to text.
    let format = this.format;
    let text = format(config);

    // Bail if there is no text to draw.
    if (!text) {
      return;
    }

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
    let textHeight = TextRenderer.measureFontHeight(font);

    // Set up the text position variables.
    let textX: number;
    let textY: number;

    // Compute the Y position for the text.
    switch (vAlign) {
      case 'top':
        textY = config.y + 2 + textHeight;
        break;
      case 'center':
        textY = config.y + config.height / 2 + textHeight / 2;
        break;
      case 'bottom':
        textY = config.y + config.height - 2;
        break;
      default:
        throw 'unreachable';
    }

    // Compute the X position for the text.
    switch (hAlign) {
      case 'left':
        textX = config.x + 2;
        break;
      case 'center':
        textX = config.x + config.width / 2;
        break;
      case 'right':
        textX = config.x + config.width - 3;
        break;
      default:
        throw 'unreachable';
    }

    // Clip the cell if the text is taller than the text box height.
    if (textHeight > boxHeight) {
      gc.beginPath();
      gc.rect(config.x, config.y, config.width, config.height - 1);
      gc.clip();
    }

    let verticalHeader = DataGridCell.isHeaderCell(config) && this.dataGrid.model.state.headersVertical;

    // Set the gc state.
    gc.textBaseline = 'bottom';
    gc.textAlign = hAlign;

    if(verticalHeader) {
      gc.save();
      gc.rotate(-Math.PI/2);

      textX = -config.height + 2;
      textY = config.x + config.width - 3;
      gc.textBaseline = 'bottom';
      gc.textAlign = 'left';
    }

    gc.font = font;
    gc.fillStyle = color;

    // Draw the text for the cell.
    gc.fillText(text, textX, textY);
    verticalHeader && gc.restore();
  }
}
