/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import {IBeakerxDataGridState} from "../store/dataStore";
import {IColumnsState} from "./columnReducer";
import {COLUMN_TYPES, default as DataGridColumn} from "./DataGridColumn";
import {selectColumnNames} from "../model/selectors";

export const selectColumnStates = (state: IBeakerxDataGridState): IColumnsState => state.columns;
export const selectBodyColumnKeys = (state: IBeakerxDataGridState) => (
  Object.keys(selectColumnStates(state))
    .filter(key => key.indexOf(`${COLUMN_TYPES.body}`) === 0)
);
export const selectIndexColumnKeys = (state: IBeakerxDataGridState) => (
  Object.keys(selectColumnStates(state))
    .filter(key => key.indexOf(`${COLUMN_TYPES.index}`) === 0)
);

export const selectBodyColumnStates = (state: IBeakerxDataGridState) => {
  const states = selectColumnStates(state);
  const bodyColumnkeys = selectBodyColumnKeys(state);

  return bodyColumnkeys
    .map(key => states[key])
    .sort((state1, state2) => state1.index - state2.index);
};

export const selectIndexColumnStates = (state: IBeakerxDataGridState) => {
  const states = selectColumnStates(state);
  const indexColumnkeys = selectIndexColumnKeys(state);

  return indexColumnkeys
    .map(key => states[key])
    .sort((state1, state2) => state1.index - state2.index);
};

export const selectBodyColumnNames = (state: IBeakerxDataGridState) => (
  selectBodyColumnStates(state).map(state => state.name)
);
export const selectIndexColumnNames = (state: IBeakerxDataGridState) => (
  selectIndexColumnStates(state).map(state => state.name)
);
export const selectBodyColumnVisibility = (state: IBeakerxDataGridState) => (
  selectBodyColumnStates(state).map(state => state.visible)
);

export const selectColumnState = (
  state: IBeakerxDataGridState,
  column: DataGridColumn
) => selectColumnStates(state)[`${column.type}_${column.index}`];

export const selectColumnDataTypeName = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).dataTypeName
);
export const selectColumnVisible = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).visible
);
export const selectColumnHorizontalAlignment = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).horizontalAlignment
);
export const selectColumnDisplayType = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).displayType
);
export const selectColumnFilter = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).filter || ''
);
export const selectColumnDataType = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).dataType
);
export const selectColumnSortOrder = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).sortOrder
);
export const selectColumnKeepTrigger = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).keepTrigger
);
export const selectColumnFormatForTimes = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).formatForTimes
);
export const selectColumnPosition = (state: IBeakerxDataGridState, column: DataGridColumn) => (
  selectColumnState(state, column).position
);

export const selectColumnIndexByPosition = (
  state: IBeakerxDataGridState,
  columnType: COLUMN_TYPES,
  position: number
): number => {
  const states = selectColumnStates(state);
  const keys = Object.keys(states)
    .filter(key => key.indexOf(`${columnType}`) === 0 && states[key].position === position);

  return states[keys[0]].index;
};

export const selectOutputColumnLimit = (state: IBeakerxDataGridState) => (
  beakerx.prefs && beakerx.prefs.outputColumnLimit
    ? beakerx.prefs.outputColumnLimit
    : selectColumnNames(state).length
);
