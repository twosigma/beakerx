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
  columnsFrozenRight?: {}, //@todo
  columnsVisible: {},
  contextMenuItems?: object[], //@todo
  contextMenuTags?: {}, //@todo
  dataFontSize?: number|null, //@todo
  doubleClickTag?: string|null, //@todo
  fontColor?: string[], //@todo
  hasDoubleClickAction?: boolean, //@todo
  hasIndex: boolean,
  headerFontSize?: number|null, //@todo
  headersVertical?: boolean, //@todo
  rendererForColumn?: {}, //@todo
  rendererForType?: {}, //@todo
  stringFormatForColumn: {},
  stringFormatForTimes?: string|null,
  stringFormatForType?: {},
  subtype?: string, //@todo
  timeZone?: string,
  tooManyRows?: boolean, //@todo
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
