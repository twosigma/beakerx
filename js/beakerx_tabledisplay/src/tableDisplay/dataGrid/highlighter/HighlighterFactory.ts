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
import HeatmapHighlighter from "./HeatmapHighlighter";
import DataGridColumn from "../column/DataGridColumn";
import ThreeColorHeatmapHighlighter from "./ThreeColorHeatmapHighlighter";
import UniqueEntriesHighlighter from "./UniqueEntriesHighlighter";
import ValueHighlighter from "./ValueHighlighter";
import SortHighlighter from "./SortHighlighter";

export default class HighlighterFactory {
  static defaultHighlighterState: IHihglighterState = {
    style: HIGHLIGHTER_STYLE.SINGLE_COLUMN,
    type: HIGHLIGHTER_TYPE.heatmap,
    colName: '',
    maxColor: null,
    maxVal: null,
    minColor: null,
    minVal: null,
    midColor: null,
    midVal: null,
    colors: null,
  };

  static getHighlighter(config: IHihglighterState, column: DataGridColumn) {
    switch (config.type) {
      case HIGHLIGHTER_TYPE.heatmap:
        return new HeatmapHighlighter(column, config);
      case HIGHLIGHTER_TYPE.threeColorHeatmap:
        return new ThreeColorHeatmapHighlighter(column, config);
      case HIGHLIGHTER_TYPE.uniqueEntries:
        return new UniqueEntriesHighlighter(column, config);
      case HIGHLIGHTER_TYPE.value:
        return new ValueHighlighter(column, config);
      case HIGHLIGHTER_TYPE.sort:
        return new SortHighlighter(column, config);
    }
  }
}
