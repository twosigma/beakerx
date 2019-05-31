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

import IHihglighterState, { HIGHLIGHTER_STYLE } from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import Highlighter from "./Highlighter";
import {CellRenderer} from "@phosphor/datagrid";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export default class SortHighlighter extends Highlighter {

  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    this.state.style = HIGHLIGHTER_STYLE.SINGLE_COLUMN;
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return config.row % 2 === 0 ?
      BeakerXThemeHelper.HIGHLIGHTED_CELL_BACKGROUND_EVEN :
      BeakerXThemeHelper.HIGHLIGHTED_CELL_BACKGROUND_ODD;
  }
}
