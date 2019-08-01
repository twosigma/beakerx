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
} from "../../../../../src/tableDisplay/dataGrid/interface/IHighlighterState";

let highlighterStateMock: IHihglighterState = {
  colName: 'test',
  maxColor: '#ff0000',
  maxVal: 1,
  midColor: '#00ff00',
  midVal: 0.5,
  minColor: '#0000ff',
  minVal: 0,
  style: HIGHLIGHTER_STYLE.SINGLE_COLUMN,
  type: HIGHLIGHTER_TYPE.heatmap,
  colors: ['#ff0000', '#00ff00', '#0000ff']
};

export default highlighterStateMock;
