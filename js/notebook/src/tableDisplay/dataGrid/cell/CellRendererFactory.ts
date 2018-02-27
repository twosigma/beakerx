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

import { DEFAULT_ALIGNMENT } from "../column/columnAlignment";
import { CellRenderer, TextRenderer } from "@phosphor/datagrid";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import DataGridCell from "./DataGridCell";
import {
  darken,
  DEFAULT_CELL_BACKGROUND,
  DEFAULT_DATA_FONT_COLOR,
  DEFAULT_DATA_FONT_SIZE,
  DEFAULT_HEADER_FONT_COLOR, formatColor
} from "../style/dataGridStyle";

export class CellRendererFactory {
  private dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
  }

  getRenderer() {
    let self = this;

    return new TextRenderer({
      backgroundColor: (config: CellRenderer.ICellConfig) => {
        if (DataGridCell.isHeaderCell(config)) {
          return DEFAULT_CELL_BACKGROUND;
        }

        let selectionColor = self.dataGrid.cellSelectionManager.getBackgroundColor(config);
        let highlighterColor = self.dataGrid.highlighterManager.getCellBackground(config);
        let focusedColor = self.dataGrid.cellFocusManager.getFocussedCellBackground(config);
        let initialColor = selectionColor && highlighterColor && darken(highlighterColor);

        return focusedColor && initialColor && darken(initialColor) ||
          focusedColor ||
          initialColor ||
          highlighterColor ||
          selectionColor ||
          DEFAULT_CELL_BACKGROUND;
      },
      horizontalAlignment: (config: CellRenderer.ICellConfig) => {
        let column = self.dataGrid.getColumn(config);

        return column ? column.getAlignment() : DEFAULT_ALIGNMENT;
      },
      format: (config: CellRenderer.ICellConfig) => {
        let column = self.dataGrid.getColumn(config);

        return DataGridCell.isHeaderCell(config) ? config.value : column.formatFn(config);
      },
      font: ({ region }) => {
        let fontSize = (region === 'column-header' || region === 'corner-header')
          ? this.dataGrid.model.state.headerFontSize
          : this.dataGrid.model.state.dataFontSize;

        return `normal ${fontSize || DEFAULT_DATA_FONT_SIZE}px Lato, Helvetica, sans-serif`
      },
      textColor: (config) => {
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
    });
  }
}
