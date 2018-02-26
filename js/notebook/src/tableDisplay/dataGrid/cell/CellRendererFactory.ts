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
import { darken } from "../style/dataGridStyle";

export const DEFAULT_CELL_BACKGROUND = '';
export const FOCUSED_CELL_BACKGROUND = 'rgb(200, 200, 200)';

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
      font: 'normal 13px Lato, Helvetica, sans-serif',
      textColor: config => config.region === 'column-header' || config.region === "corner-header" ? '#515A5A' : '#000000',
    });
  }
}
