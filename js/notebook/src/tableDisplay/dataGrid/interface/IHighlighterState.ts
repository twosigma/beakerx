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

export enum HIGHLIGHTER_STYLE {
  SINGLE_COLUMN = 'SINGLE_COLUMN',
  FULL_ROW = 'FULL_ROW'
}

export enum HIGHLIGHTER_TYPE {
  heatmap = 'HeatmapHighlighter',
  uniqueEntries = 'UniqueEntriesHighlighter',
  threeColorHeatmap = 'ThreeColorHeatmapHighlighter',
  value = 'ValueHighlighter',
  sort = 'SortHighlighter'
}

export default interface IHihglighterState {
  colName: string,
  maxColor: string|null,
  maxVal: number|null,
  minColor: string|null,
  minVal: number|null,
  midColor: string|null,
  midVal: number|null,
  style: HIGHLIGHTER_STYLE,
  type: HIGHLIGHTER_TYPE,
  colors: string[]|null
}
