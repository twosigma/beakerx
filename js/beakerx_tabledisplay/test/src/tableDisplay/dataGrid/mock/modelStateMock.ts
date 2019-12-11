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

import IDataGridModelState from "../../../../../src/tableDisplay/dataGrid/interface/IDataGridModelState";
import highlighterStateMock from "./highlighterStateMock";

let modelStateMock: IDataGridModelState = {
  cellHighlighters: [{
    ...highlighterStateMock
  }],
  columnNames: ['test', 'column'],
  hasIndex: false,
  stringFormatForColumn: { column: { type: 'value', values: { column: [':)', ':('] } } },
  types: ['integer', 'integer'],
  values: [[1, 2],[0, NaN]],
  columnsVisible: {},
  tooltips: [],
  hasDoubleClickAction: false,
  columnOrder: [],
  headerFontSize: 32,
  fontColor: null,
  dataFontSize: 20,
  alignmentForColumn: { 'test': 'C' },
  alignmentForType: { 'integer': 'L' },
  columnsFrozen: {},
  contextMenuItems: [],
  contextMenuTags: {},
  doubleClickTag: null,
  headersVertical: false,
  rendererForColumn: {},
  rendererForType: {},
  stringFormatForType: {},
  subtype: 'Tabledisplay',
  timeStrings: null,
  timeZone: 'UTC',
  tooManyRows: false,
  type: 'Tabledisplay',
};

export default modelStateMock;
