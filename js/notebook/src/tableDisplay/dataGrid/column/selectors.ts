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
import {selectColumnNames} from "../model/selectors";
import {find} from "@phosphor/algorithm";
import {IColumnsState, IColumnState} from "../interface/IColumn";
import {ALL_TYPES} from "../dataTypes";
import {COLUMN_TYPES, SORT_ORDER} from "./enums";

const defaultState: IColumnState = {
  name: '',
  index: 0,
  columnType: COLUMN_TYPES.body,
  dataTypeName: '',
  dataType: ALL_TYPES.string,
  displayType: ALL_TYPES.string,
  keepTrigger: false,
  horizontalAlignment: 'left',
  formatForTimes: null,
  visible: true,
  sortOrder: SORT_ORDER.NO_SORT,
  filter: null,
  position: 0
};

export const selectColumnStates = (state: IBeakerxDataGridState): IColumnsState => state.columns;

export const selectBodyColumnStates = (state: IBeakerxDataGridState) => {
  return Array.from(selectColumnStates(state).values())
    .filter(columnState => columnState.columnType === COLUMN_TYPES.body)
    .sort((state1, state2) => state1.index - state2.index);
};

export const selectIndexColumnStates = (state: IBeakerxDataGridState) => {
  return Array.from(selectColumnStates(state).values())
    .filter(columnState => columnState.columnType === COLUMN_TYPES.index)
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

export const selectColumnStateByKey = (state, key) => selectColumnStates(state).get(key) || defaultState;

export const selectColumnState = (
  state: IBeakerxDataGridState,
  column
) => selectColumnStateByKey(state, `${column.type}_${column.index}`);

export const selectColumnDataTypeName = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).dataTypeName
);

export const selectColumnVisible = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).visible
);

export const selectColumnHorizontalAlignment = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).horizontalAlignment
);

export const selectColumnDisplayType = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).displayType
);

export const selectColumnFilter = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).filter || ''
);

export const selectColumnDataType = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).dataType
);

export const selectColumnSortOrder = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).sortOrder
);

export const selectColumnKeepTrigger = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).keepTrigger
);

export const selectColumnFormatForTimes = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).formatForTimes
);

export const selectColumnWidth = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).width || 0
);

export const selectColumnPosition = (state: IBeakerxDataGridState, column) => (
  selectColumnState(state, column).position || 0
);

export const selectColumnIndexByPosition = (
  state: IBeakerxDataGridState,
  columnType: COLUMN_TYPES,
  position: number
): number => {
  const columnState = find(
    Array.from(selectColumnStates(state).values()),
    stateItem => stateItem.columnType === columnType && stateItem.position === position
  ) || defaultState;

  return columnState.index;
};

export const selectOutputColumnLimit = (state: IBeakerxDataGridState) => (
  beakerx.prefs && beakerx.prefs.outputColumnLimit
    ? beakerx.prefs.outputColumnLimit
    : selectColumnNames(state).length
);
