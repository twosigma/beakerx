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

import {CellRenderer, DataModel, GraphicsContext} from "@lumino/datagrid";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
import { DataGridHelpers } from "../dataGridHelpers";
import { ColumnManager } from "../column/ColumnManager";
import { selectColumnWidth } from "../column/selectors";
import { IColumnPosition } from "../interface/IColumn";
import { DataGridColumn } from "../column/DataGridColumn";

export class ImageCellRenderer extends CellRenderer {
  store: BeakerXDataStore;
  dataGrid: BeakerXDataGrid;
  backgroundColor: CellRenderer.ConfigOption<string>;

  constructor(dataGrid: BeakerXDataGrid) {
    super();

    this.store = dataGrid.store;
    this.dataGrid = dataGrid;
    this.backgroundColor = (config: CellRenderer.CellConfig) => DataGridHelpers.getBackgroundColor(this.dataGrid, config);
  }

  drawBackground(gc: GraphicsContext, config: CellRenderer.CellConfig): void {
    let color = CellRenderer.resolveOption(this.backgroundColor, config);

    if (!color) {
      return;
    }

    gc.fillStyle = color;
    gc.fillRect(config.x, config.y, config.width, config.height);
  }

  paint(gc: GraphicsContext, config: CellRenderer.CellConfig): void {
    this.drawBackground(gc, config);
    this.drawImage(gc, config);
  }

  async drawImage(gc: GraphicsContext, config: CellRenderer.CellConfig): Promise<void> {
    if (!config.value) {
      return;
    }

    const img = new Image();
    const dpiRatio =  this.dataGrid['_dpiRatio'];
    const x = config.x * dpiRatio;
    const y = config.y * dpiRatio;
    const width = config.width * dpiRatio;
    const height = config.height * dpiRatio;

    gc.setTransform(1, 0, 0, 1, 0, 0);
    gc.beginPath();
    gc.rect(x, y, width, height - 1);
    gc.clip();

    img.src = await this.prepareImageSrc(config);

    if (!img.complete) {
      img.onload = () => {
        this.dataGrid.repaint(x, y, img.width, img.height);
      }
    } else {
      this.resizeCell({ ...config }, img.width, img.height);

      gc.drawImage(img, x, y);
    }
  }

  resizeCell(config: CellRenderer.CellConfig, width: number, height: number) {
    setTimeout(() => {
      let position: IColumnPosition = ColumnManager.createPositionFromCell(config);
      const column: DataGridColumn = this.dataGrid.columnManager.getColumnByPosition(position);

      let rowSize = this.dataGrid.rowSize(position.region as DataModel.RowRegion, config.row);
      if (rowSize < height) {
        this.dataGrid.resizeRow(position.region as DataModel.RowRegion, config.row, height);
      }

      let columnWidth = selectColumnWidth(this.dataGrid.store.state, column);
      if (columnWidth < width) {
        column.dataGrid.dataGridResize.setSectionWidth(position.region, column, width);
        column.dataGrid.dataGridResize.updateWidgetWidth();
      }

      column.dataGrid.dataGridResize.updateWidgetHeight();
    });
  }

  private async prepareImageSrc(config): Promise<string> {
    let baseUrl;

    if (config.value[0] !== '.') {
      return `${ config.value }`;
    }

    try {
      const coreutils = await import ('@jupyterlab/coreutils');
      coreutils.PageConfig.getOption('pageUrl');
      baseUrl = coreutils.PageConfig.getBaseUrl();

    } catch (e) {
      baseUrl = `${window.location.origin}/`;
    }

    let notebookPath = `${ baseUrl }${ document.body.dataset.notebookPath}`;

    return  '/files' + new URL(config.value, notebookPath).pathname;
  }
}
