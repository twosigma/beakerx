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

import IHihglighterState, {HIGHLIGHTER_STYLE} from "../interface/IHighlighterState";
import Highlighter from "./Highlighter";
import HighlighterFactory from "./HighlighterFactory";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { each, iter } from "@phosphor/algorithm";
import { CellRenderer } from "@phosphor/datagrid";
import { DEFAULT_CELL_BACKGROUND } from "../cell/CellRendererFactory";

export default class HighlighterManager {
  highlightersState: IHihglighterState[];
  highlighters: Highlighter[];
  dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid, highlightersState: IHihglighterState[]) {
    this.dataGrid = dataGrid;
    this.highlightersState = highlightersState;
    this.highlighters = [];

    this.createHighlighter = this.createHighlighter.bind(this);
    this.registerHighlighter = this.registerHighlighter.bind(this);

    this.createHighlighters(this.highlightersState);
  }

  createHighlighters(state: IHihglighterState[]) {
    state.forEach(this.createHighlighter);
  }

  createHighlighter(state: IHihglighterState): void {
    let column = this.dataGrid.getColumnByName(state.colName);

    if (!column) {
      return;
    }

    this.registerHighlighter(HighlighterFactory.getHighlighter(state, column));
  }

  registerHighlighter(highlighter: Highlighter|null) {
    if (!highlighter) {
      throw new Error(`Can not register highlighter: ${highlighter}`);
    }

    this.highlighters.push(highlighter);
  }

  getCellBackground(config: CellRenderer.ICellConfig): string {
    let background = DEFAULT_CELL_BACKGROUND;
    let column = this.dataGrid.getColumn(config.column, config.region);

    each(
      iter(this.highlighters),
      (highlighter) => {
        if (
          highlighter.column === column ||
          highlighter.state.style === HIGHLIGHTER_STYLE.FULL_ROW
        ) {
          background = highlighter.getBackgroundColor(config);
        }
      }
    );

    return background;
  }
}
