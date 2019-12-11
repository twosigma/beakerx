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

import DataGridColumn from "../column/DataGridColumn";
import {DataModel, TextRenderer} from "@phosphor/datagrid";
import {ALL_TYPES} from "../dataTypes";
import {COLUMN_TYPES, SORT_ORDER} from "../column/enums";

export interface IColumn {
  index: number,
  type: COLUMN_TYPES
}

export interface IColumnOptions {
  index: number,
  name: string,
  type: COLUMN_TYPES
}

export interface IColumns {
  [key: number]: DataGridColumn[]
}

export type IColumnsState = Map<string, IColumnState>;

export interface IColumnState {
  name: string,
  index: number,
  columnType: COLUMN_TYPES,
  dataTypeName: string,
  dataType: ALL_TYPES,
  displayType: ALL_TYPES|string,
  keepTrigger: boolean,
  horizontalAlignment: TextRenderer.HorizontalAlignment,
  formatForTimes: any,
  sortOrder: SORT_ORDER,
  filter: string|null,
  position: IColumnPosition,
  width?: number
  renderer?: number
}

export interface IColumnPosition {
  value: number,
  region: DataModel.ColumnRegion
}
