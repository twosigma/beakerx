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

import { CellRenderer, GraphicsContext } from "@phosphor/datagrid";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
import { selectHeadersVertical } from "../model/selectors";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export default class HeaderCellRenderer extends BeakerXCellRenderer {

  getBackgroundColor(config: CellRenderer.ICellConfig): string {
    return BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
  }

  drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void {
    const options = this.getOptions(config);

    if (
      !options.font
      || !options.color
      || options.boxHeight <= 0
      || options.text === null
    ) {
      return;
    }

    // Set up the text position variables.
    let { textX, textY } = this.getTextPosition(config, options, true);

    // Clip the cell if the text is taller than the text box height.
    if (options.textHeight > options.boxHeight) {
      gc.beginPath();
      gc.rect(config.x, config.y, config.width, config.height - 1);
      gc.clip();
    }

    let verticalHeader = selectHeadersVertical(this.store.state);

    // Set the gc state.
    gc.textBaseline = 'bottom';
    gc.textAlign = options.hAlign;

    if(verticalHeader) {
      gc.save();
      gc.rotate(-Math.PI/2);

      textX = -config.height + 2;
      textY = config.x + config.width - 3;
      gc.textBaseline = 'bottom';
      gc.textAlign = 'left';
    }

    gc.font = options.font;
    gc.fillStyle = options.color;

    // Draw the text for the cell.
    gc.fillText(options.text, textX, textY);
    verticalHeader && gc.restore();
  }
}
