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

export class CellRendererFactory {
  private dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
  }

  getRenderer() {
    let self = this;

    return new TextRenderer({
      horizontalAlignment(config: CellRenderer.ICellConfig) {
        let column = self.dataGrid.getColumn(config.column, config.region);

        return column ? column.state.horizontalAlignment : DEFAULT_ALIGNMENT;
      }
    });
  }
}
