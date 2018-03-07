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

import {DataStore, combineReducers} from "@phosphor/datastore";
import dataGridModelReducer from "../model/reducer";
import IDataModelState from "../interface/IDataGridModelState";
import columnReducer, {IColumnsState} from "../column/columnReducer";
import {
  selectInitialColumnAlignment,
  selectColumnNames,
  selectColumnOrder,
  selectColumnsVisible,
  selectColumnTypes,
  selectHasIndex,
  selectInitialColumnPositions,
  selectStringFormatForcolumn,
  selectStringFormatForType
} from "../model/selectors";
import {BeakerxDataGridModel} from "../model/BeakerxDataGridModel";
import {COLUMN_TYPES, SORT_ORDER} from "../column/DataGridColumn";
import {selectOutputColumnLimit} from "../column/selectors";
import {getDisplayType, getTypeByName} from "../dataTypes";

export interface IBeakerxDataGridState {
  model: IDataModelState,
  columns: IColumnsState
}

export type BeakerxDataStore = DataStore<IBeakerxDataGridState>;

export default function createStore(initialState: IDataModelState) {
  return new DataStore(combineReducers({
    model: dataGridModelReducer,
    columns: columnReducer
  }), { model: initialState, columns: createInitialColumnsState(initialState) });
}

function createInitialColumnsState(initialState: IDataModelState): IColumnsState {
  const names = addColumnNamesState({ model: initialState, columns: {} });
  const types = addColumnTypesState({ model: initialState, columns: {} });
  const visibility = addColumnsVisibilityState({ model: initialState, columns: {} });
  const positions = addColumnsPositions({ model: initialState, columns: {} });
  const initialColumnsState: IColumnsState = {};

  const addColumnState = (columnType: COLUMN_TYPES) => (name, index) => {
    let key = `${columnType}_${index}`;
    let dataType = getTypeByName(types[columnType][index]);
    let state = { model: initialState, columns: {} };

    initialColumnsState[key] = {
      name,
      index,
      dataType,
      columnType,
      filter: null,
      formatForTimes: {},
      sortOrder: SORT_ORDER.NO_SORT,
      horizontalAlignment: selectInitialColumnAlignment(state, dataType, name),
      keepTrigger: columnType === COLUMN_TYPES.index,
      position: positions[columnType][index],
      visible: visibility[columnType][index],
      dataTypeName: types[columnType][index],
      displayType: getDisplayType(
        dataType,
        selectStringFormatForType(state),
        selectStringFormatForcolumn(state)[name]
      )
    };
  };

  names[COLUMN_TYPES.index].forEach(addColumnState(COLUMN_TYPES.index));
  names[COLUMN_TYPES.body].forEach(addColumnState(COLUMN_TYPES.body));

  return initialColumnsState;
}

function addColumnsVisibilityState(state: IBeakerxDataGridState) {
  const columnOrder = selectColumnOrder(state);
  const columnsVisible = selectColumnsVisible(state);
  const columnNames = selectColumnNames(state);
  const hasInitialOrder = columnOrder && columnOrder.length > 0;
  const outputColumnLimit = selectOutputColumnLimit(state);
  const addVisibilityStateItem = (name, index) => {
    if (index >= outputColumnLimit) {
      return false;
    }

    if (hasInitialOrder) {
      return columnOrder.indexOf(name) !== -1;
    }

    return columnsVisible[name] !== undefined ? columnsVisible[name] : true;
  };

  return createColumnsState({
    value: columnNames.map(addVisibilityStateItem),
    defaultValue: [true]
  }, state);
}

function addColumnsPositions(state: IBeakerxDataGridState) {
  return createColumnsState({
    value: selectInitialColumnPositions(state),
    defaultValue: [0]
  }, state);
}

function addColumnNamesState(state: IBeakerxDataGridState) {
  const value = selectColumnNames(state);

  return createColumnsState({
    value,
    defaultValue: [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_NAME]
  }, state);
}

function addColumnTypesState(state: IBeakerxDataGridState) {
  const value = selectColumnTypes(state);

  return createColumnsState({
    value,
    defaultValue: [BeakerxDataGridModel.DEFAULT_INDEX_COLUMN_TYPE]
  }, state);
}

function createColumnsState({ value, defaultValue }, state) {
  const hasIndex = selectHasIndex(state);

  return {
    [COLUMN_TYPES.body]: hasIndex ? value.slice(1) : value,
    [COLUMN_TYPES.index]: hasIndex ? value.slice(0, 1) : defaultValue
  };
}
