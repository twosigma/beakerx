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

import IHihglighterState, {
  HIGHLIGHTER_STYLE,
  HIGHLIGHTER_TYPE
} from "../interface/IHighlighterState";
import Highlighter from "./Highlighter";
import HighlighterFactory from "./HighlighterFactory";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { each, iter, filter, toArray } from "@phosphor/algorithm";
import { CellRenderer } from "@phosphor/datagrid";
import {DEFAULT_CELL_BACKGROUND} from "../style/dataGridStyle";

export default class HighlighterManager {
  highlightersState: IHihglighterState[];
  highlighters: Highlighter[];
  dataGrid: BeakerxDataGrid;

  constructor(dataGrid: BeakerxDataGrid, highlightersState: IHihglighterState[]) {
    this.dataGrid = dataGrid;
    this.highlightersState = [...highlightersState];
    this.highlighters = [];

    this.createHighlighter = this.createHighlighter.bind(this);
    this.registerHighlighter = this.registerHighlighter.bind(this);
    this.unregisterHighlighter = this.unregisterHighlighter.bind(this);

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

    if (highlighter.state.type === HIGHLIGHTER_TYPE.sort) {
      this.highlighters.unshift(highlighter);
    } else {
      this.highlighters.push(highlighter);
    }
  }

  unregisterHighlighter(highlighter: Highlighter) {
    const index = this.highlighters.indexOf(highlighter);

    index !== -1 && this.highlighters.splice(index, 1);
  }

  getColumnHighlighters(column, highlighterType?: HIGHLIGHTER_TYPE): Highlighter[] {
    return toArray(filter(
      iter(this.highlighters),
      (highlighter: Highlighter) => {
        return highlighterType
          ? highlighter.column === column && highlighter.state.type === highlighterType
          : highlighter.column === column;
      }
    ));
  }

  addColumnHighlighter(column, highlighterType: HIGHLIGHTER_TYPE) {
    this.removeColumnHighlighter(column, highlighterType);
    this.registerHighlighter(HighlighterFactory.getHighlighter({
      ...HighlighterFactory.defaultHighlighterState,
      type: highlighterType,
      style: HIGHLIGHTER_STYLE.SINGLE_COLUMN,
      colName: column.name
    }, column));
  }

  removeColumnHighlighter(column, highlighterType?: HIGHLIGHTER_TYPE) {
    const highlighters = this.getColumnHighlighters(column, highlighterType);

    each(highlighters, this.unregisterHighlighter);
  }

  toggleColumnHighlighter(column, highlighterType: HIGHLIGHTER_TYPE) {
    if (this.getColumnHighlighters(column, highlighterType).length) {
      this.removeColumnHighlighter(column, highlighterType);
    } else {
      this.addColumnHighlighter(column, highlighterType);
    }

    this.dataGrid.repaint();
  }

  removeHighlighters() {
    this.highlighters.splice(0, this.highlighters.length);
    this.dataGrid.repaint();
  }

  getCellBackground(config: CellRenderer.ICellConfig): string {
    let background = DEFAULT_CELL_BACKGROUND;
    let column = this.dataGrid.getColumn(config);

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
