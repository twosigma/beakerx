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

import Highlighter from "./Highlighter";
import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import { reduce, each } from "@phosphor/algorithm";
import { CellRenderer } from "@phosphor/datagrid";
import { DEFAULT_CELL_BACKGROUND } from "../cell/CellRendererFactory";

export default class UniqueEntriesHighlighter extends Highlighter {
  uniqueValues: any[] = [];
  uniqueColors = {};

  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    this.generateUniqueValues();
    this.generateUniqueColors();
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return this.uniqueColors[this.getValueToHighlight(config)] || DEFAULT_CELL_BACKGROUND;
  }

  generateColor(colorNum, colors) {
    return "hsl(" + (colorNum * (360 / colors)) + ", 75%, 85%)";
  }

  generateUniqueValues() {
    reduce(
      this.column.valuesIterator.clone(),
      (acc, value) => acc.indexOf(value) === -1 && acc.push(value) && acc || acc,
      this.uniqueValues
    );
  }

  generateUniqueColors() {
    each(this.uniqueValues, (value, index) => {
      this.uniqueColors[value] = this.generateColor(index, this.uniqueValues.length);
    });
  }
}
