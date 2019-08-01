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
import { CellRenderer, GraphicsContext, TextRenderer } from "@phosphor/datagrid";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import DataGridCell from "./DataGridCell";
import { darken, DEFAULT_DATA_FONT_SIZE, formatColor } from "../style/dataGridStyle";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
import { selectDataFontSize, selectFontColor, selectHeaderFontSize, selectRenderer } from "../model/selectors";
import IRenderer, { RENDERER_TYPE } from "../interface/IRenderer";
import { DataGridHelpers } from "../dataGridHelpers";
import getStringSize = DataGridHelpers.getStringSize;
import retrieveUrl = DataGridHelpers.retrieveUrl;
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export interface ICellRendererOptions {
  font?: string,
  color?: string,
  text?: any,
  vAlign?: string,
  hAlign?: string,
  boxHeight?: number,
  textHeight?: number
}

const TEXT_WIDTH_OFFSET = 8;

export default abstract class BeakerXCellRenderer extends TextRenderer {
  store: BeakerXDataStore;
  dataGrid: BeakerXDataGrid;
  backgroundColor: CellRenderer.ConfigOption<string>;
  horizontalAlignment: CellRenderer.ConfigOption<TextRenderer.HorizontalAlignment>;
  format: TextRenderer.FormatFunc;
  font: CellRenderer.ConfigOption<string>;
  textColor: CellRenderer.ConfigOption<string>;

  constructor(dataGrid: BeakerXDataGrid, options?: TextRenderer.IOptions) {
    super(options);
    
    this.store = dataGrid.store;
    this.dataGrid = dataGrid;
    this.backgroundColor = this.getBackgroundColor.bind(this);
    this.horizontalAlignment = this.getHorizontalAlignment.bind(this);
    this.format = this.getFormat.bind(this);
    this.font = this.getFont.bind(this);
    this.textColor = this.getTextColor.bind(this);
  }

  drawBackground(gc: GraphicsContext, config: CellRenderer.ICellConfig) {
    super.drawBackground(gc, config);

    const renderer = this.getRenderer(config);
    const isHeaderCell = DataGridCell.isHeaderCell(config);

    if (renderer && renderer.type === RENDERER_TYPE.DataBars && !isHeaderCell) {
      const barWidth = config.width/2 * renderer.percent;

      gc.fillStyle = BeakerXThemeHelper.DEFAULT_HIGHLIGHT_COLOR;
      gc.fillRect(
        config.x + config.width/2 - (renderer.direction === 'RIGHT' ? 0 : barWidth),
        config.y,
        barWidth,
        config.height - 1
      );
    }
  }

  drawTextUnderline(gc: GraphicsContext, textConfig, config) {
    let { text, textX, textY, color } = textConfig;
    let url = retrieveUrl(text);

    if (!url) {
      return;
    }

    let underlineEndX: number;
    let underlineStartX: number;
    let urlIndex = text.indexOf(url);
    let firstPart = urlIndex > 0 ? text.slice(0, urlIndex) : '';
    let fontSize = selectDataFontSize(this.store.state);
    let textWidth: number = getStringSize(text, fontSize).width - TEXT_WIDTH_OFFSET;
    let firstPartWidth = getStringSize(firstPart, fontSize).width - TEXT_WIDTH_OFFSET;
    let hAlign = CellRenderer.resolveOption(this.horizontalAlignment, config);

    // Compute the X position for the underline.
    switch (hAlign) {
      case 'left':
        underlineEndX = Math.round(textX + textWidth);
        underlineStartX = Math.round(textX + firstPartWidth);
        break;
      case 'center':
        textX = config.x + config.width / 2 - textWidth / 2;
        underlineEndX = Math.round(textX + textWidth);
        underlineStartX = textX + firstPartWidth;
        break;
      case 'right':
        underlineEndX = Math.round(textX - textWidth + firstPartWidth);
        underlineStartX = textX;
        break;
      default:
        throw 'unreachable';
    }

    gc.beginPath();
    gc.moveTo(underlineStartX, textY - 0.5);
    gc.lineTo(underlineEndX, textY - 0.5);
    gc.strokeStyle = color;
    gc.lineWidth = 1.0;
    gc.stroke();
  }

  getBackgroundColor(config: CellRenderer.ICellConfig): string {
    let selectionColor = this.dataGrid.cellSelectionManager.getBackgroundColor(config);
    let highlighterColor = this.dataGrid.highlighterManager.getCellBackground(config);
    let focusedColor = this.dataGrid.cellFocusManager.getFocussedCellBackground(config);
    let initialColor = selectionColor && highlighterColor && darken(highlighterColor);

    return focusedColor && initialColor && darken(initialColor) ||
      focusedColor ||
      initialColor ||
      highlighterColor ||
      selectionColor ||
      BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
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
      ? selectHeaderFontSize(this.store.state)
      : selectDataFontSize(this.store.state);

    return `normal ${fontSize || DEFAULT_DATA_FONT_SIZE}px Lato, Helvetica, sans-serif`
  }

  getTextColor(config): string {
    if (config.region === 'row-header') {
      return BeakerXThemeHelper.DEFAULT_DATA_FONT_COLOR;
    }

    let colors = selectFontColor(this.store.state);
    let dataFontColor = colors && colors[config.row]
      ? formatColor(colors[config.row][config.column])
      : BeakerXThemeHelper.DEFAULT_DATA_FONT_COLOR;

    return config.region === 'column-header' || config.region === "corner-header"
      ? BeakerXThemeHelper.DEFAULT_HEADER_FONT_COLOR
      : dataFontColor;
  }

  getRenderer(config: CellRenderer.ICellConfig): IRenderer|undefined {
    const column = this.dataGrid.getColumn(config);
    const renderer = selectRenderer(this.store.state, column);
    const valueResolver = column.getValueResolver();

    return {
      ...renderer,
      percent: (Math.abs(parseFloat(valueResolver(config.value))) / column.maxValue),
      direction: valueResolver(config.value) > 0 ? 'RIGHT' : 'LEFT'
    };
  }

  getOptions(config: CellRenderer.ICellConfig): ICellRendererOptions {
    let result: ICellRendererOptions = {};

    // Resolve the font for the cell.
    result.font = CellRenderer.resolveOption(this.font, config);

    // Bail if there is no font to draw.
    if (!result.font) {
      return result;
    }

    // Resolve the text color for the cell.
    result.color = CellRenderer.resolveOption(this.textColor, config);

    // Bail if there is no text color to draw.
    if (!result.color) {
      return result;
    }

    // Format the cell value to text.
    let format = this.format;
    result.text = format(config);

    if (result.text === null) {
      return result;
    }

    // Resolve the vertical and horizontal alignment.
    result.vAlign = CellRenderer.resolveOption(this.verticalAlignment, config);
    result.hAlign = CellRenderer.resolveOption(this.horizontalAlignment, config);

    // Compute the padded text box height for the specified alignment.
    result.boxHeight = config.height - (result.vAlign === 'center' ? 1 : 2);

    // Bail if the text box has no effective size.
    if (result.boxHeight <= 0) {
      return result;
    }

    // Compute the text height for the gc font.
    result.textHeight = TextRenderer.measureFontHeight(result.font);

    return result;
  }

  getTextPosition(
    config: CellRenderer.ICellConfig,
    options: ICellRendererOptions,
    isHeaderCell: boolean = false
  ): { textX: number, textY: number } {
    let textX: number;
    let textY: number;

    // Compute the Y position for the text.
    switch (options.vAlign) {
      case 'top':
        textY = config.y + 2 + options.textHeight;
        break;
      case 'center':
        textY = config.y + config.height / 2 + options.textHeight / 2;
        break;
      case 'bottom':
        textY = config.y + config.height - 2;
        break;
      default:
        throw 'unreachable';
    }

    // Compute the X position for the text.
    switch (options.hAlign) {
      case 'left':
        textX = config.x + (isHeaderCell ? 10 : 2);
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

    return { textX, textY };
  }
}
