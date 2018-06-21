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

import {CellRenderer, GraphicsContext} from "@phosphor/datagrid";
import DataGridCell from "./DataGridCell";
import {RENDERER_TYPE} from "../interface/IRenderer";
import BeakerXCellRenderer from "./BeakerXCellRenderer";

export default class DefaultCellRenderer extends BeakerXCellRenderer {

  drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    const options = this.getOptions(config);
    const renderer = this.getRenderer(config);

    if (
      !options.font
      || !options.color
      || options.boxHeight <= 0
      || options.text === null
      || (renderer
      && renderer.type === RENDERER_TYPE.DataBars
      && !renderer.includeText)
    ) {
      return;
    }

    const { textX, textY } = this.getTextPosition(config, options);

    // Clip the cell if the text is taller than the text box height.
    if (options.textHeight > options.boxHeight) {
      gc.beginPath();
      gc.rect(config.x, config.y, config.width, config.height - 1);
      gc.clip();
    }

    // Set the gc state.
    gc.textBaseline = 'bottom';
    gc.textAlign = options.hAlign;
    gc.font = options.font;
    gc.fillStyle = options.color;

    if (DataGridCell.isCellHovered(this.dataGrid.cellManager.hoveredCellData, config)) {
      this.drawTextUnderline(gc, { text: options.text, textX, textY, color: options.color }, config);
    }

    gc.fillText(options.text, textX, textY);
  }

}
