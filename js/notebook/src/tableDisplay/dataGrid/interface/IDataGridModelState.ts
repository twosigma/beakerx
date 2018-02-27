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

import IHihglighterState from "./IHighlighterState";

export default interface IDataModelState {
  formatForTimes?: any;
  timeStrings?: any;

  alignmentForColumn?: {},
  alignmentForType?: {},
  cellHighlighters: IHihglighterState[],
  columnNames: string[],
  columnOrder?: number[], //@todo
  columnsFrozen?: {}, //@todo
  columnsFrozenRight?: {}, //feature is dropped
  columnsVisible: {},
  contextMenuItems?: object[], //@todo
  contextMenuTags?: {}, //@todo
  dataFontSize?: number|null,
  doubleClickTag?: string|null, //@todo
  fontColor?: string[],
  hasDoubleClickAction?: boolean, //@todo
  hasIndex: boolean,
  headerFontSize?: number|null,
  headersVertical?: boolean, //@todo Needs custom cell renderer
  rendererForColumn?: {}, //@todo Needs the DataBars highlighter
  rendererForType?: {}, //@todo Needs the DataBars highlighter
  stringFormatForColumn: {},
  stringFormatForTimes?: string|null,
  stringFormatForType?: {},
  subtype?: string, //@todo
  timeZone?: string,
  tooManyRows?: boolean,
  tooltips?: string[], //@todo
  type?: string,
  types: string[],
  values: any,
}

export interface IDataGridModelColumnState {
  names: string[],
  types: string[],
  visibility: boolean[],
  order: number[]
}
