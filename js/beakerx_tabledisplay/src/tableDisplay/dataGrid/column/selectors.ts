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

import {IBeakerXDataGridState} from "../store/BeakerXDataStore";
import {
  selectColumnNames, selectColumnOrder,
  selectColumnsVisible,
} from "../model/selectors";
import {find} from "@phosphor/algorithm";
import {IColumnPosition, IColumnsState, IColumnState} from "../interface/IColumn";
import {ALL_TYPES} from "../dataTypes";
import {COLUMN_TYPES, SORT_ORDER} from "./enums";
import {createSelector} from "reselect";

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
  sortOrder: SORT_ORDER.NO_SORT,
  filter: null,
  position: { value: 0, region: 'body' }
};

export const selectColumnStates = (state: IBeakerXDataGridState): IColumnsState => state.columns;
export const selectColumnStatesArray = createSelector(
  [selectColumnStates],
  (states) => Array.from(states.values())
);

export const selectBodyColumnStates = createSelector(
  [selectColumnStatesArray],
  (states) => (
    states
      .filter(columnState => columnState.columnType === COLUMN_TYPES.body)
      .sort((state1, state2) => state1.index - state2.index)
  ));

export const selectVisibleBodyColumns = createSelector(
  [selectBodyColumnStates, selectColumnsVisible, selectColumnOrder],
  (bodyColumnStates, columnsVisible, columnOrder) => (bodyColumnStates.filter(
    state => columnsVisible[state.name] !== false && (columnOrder.length === 0 || columnOrder.indexOf(state.name) !== -1)
  ))
);

export const selectColumnStateByKey = (state, key) => selectColumnStates(state).get(key) || defaultState;

export const selectColumnState = (
  state: IBeakerXDataGridState,
  column
) => selectColumnStateByKey(state, `${column.type}_${column.index}`);

export const selectColumnDataTypeName = createSelector(
  [selectColumnState],
  (state) => state.dataTypeName
);

export const selectColumnHorizontalAlignment = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).horizontalAlignment
);

export const selectColumnDisplayType = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).displayType
);

export const selectColumnFilter = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).filter || ''
);

export const selectColumnDataType = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).dataType
);

export const selectColumnSortOrder = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).sortOrder
);

export const selectColumnKeepTrigger = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).keepTrigger
);

export const selectColumnFormatForTimes = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).formatForTimes || {}
);

export const selectColumnWidth = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).width || 0
);

export const selectColumnPosition = (state: IBeakerXDataGridState, column) => (
  selectColumnState(state, column).position
);

const selectPosition = (state, position: IColumnPosition) => position;

export const selectColumnIndexByPosition = createSelector(
  [selectColumnStatesArray, selectPosition],
  (states, position: IColumnPosition): number => {
    const columnState: IColumnState = find(states,(stateItem: IColumnState) => (
      stateItem.position.region === position.region && stateItem.position.value === position.value
    ));

    return columnState.index;
  }
);

export const selectOutputColumnLimit = (state: IBeakerXDataGridState) => (
  window.beakerx && window.beakerx.prefs && window.beakerx.prefs.outputColumnLimit
    ? window.beakerx.prefs.outputColumnLimit
    : selectColumnNames(state).length
);
