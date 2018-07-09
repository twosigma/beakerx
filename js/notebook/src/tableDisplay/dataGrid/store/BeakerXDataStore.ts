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
import columnReducer from "../column/reducer";
import {
  selectInitialColumnAlignment,
  selectColumnNames,
  selectColumnTypes,
  selectHasIndex,
  selectInitialColumnPositions,
  selectStringFormatForColumn,
  selectStringFormatForType,
  selectFormatForTimes,
  DEFAULT_INDEX_COLUMN_NAME,
  selectColumnFixedWidth,
} from "../model/selectors";
import {BeakerXDataGridModel} from "../model/BeakerXDataGridModel";
import {getDisplayType, getTypeByName} from "../dataTypes";
import {COLUMN_TYPES, SORT_ORDER} from "../column/enums";
import {IColumnsState, IColumnState} from "../interface/IColumn";

export interface IBeakerXDataGridState {
  model: IDataModelState,
  columns: IColumnsState
}

export type BeakerXDataStore = DataStore<IBeakerXDataGridState>;

export default function createStore(initialState: IDataModelState) {
  return new DataStore(combineReducers({
    model: dataGridModelReducer,
    columns: columnReducer
  }), { model: initialState, columns: createInitialColumnsState(initialState) });
}

export function createInitialColumnsState(initialState: IDataModelState): IColumnsState {
  const initialColumnsState: IColumnsState = new Map<string, IColumnState>();
  const state = { model: initialState, columns: initialColumnsState };
  const names = addColumnNamesState(state);
  const types = addColumnTypesState(state);
  const positions = addColumnsPositions(state);

  const addColumnState = (columnType: COLUMN_TYPES) => (name, index) => {
    let key = `${columnType}_${index}`;
    let dataType = getTypeByName(types[columnType][index]);

    initialColumnsState.set(key, {
      name,
      index,
      dataType,
      columnType,
      filter: null,
      formatForTimes: selectFormatForTimes(state),
      sortOrder: SORT_ORDER.NO_SORT,
      horizontalAlignment: selectInitialColumnAlignment(state, dataType, name),
      keepTrigger: columnType === COLUMN_TYPES.index,
      position: positions[columnType][index],
      dataTypeName: types[columnType][index],
      width: selectColumnFixedWidth(state, name, types[columnType][index]),
      displayType: getDisplayType(
        dataType,
        selectStringFormatForType(state),
        selectStringFormatForColumn(state)[name]
      )
    });
  };

  names[COLUMN_TYPES.index].forEach(addColumnState(COLUMN_TYPES.index));
  names[COLUMN_TYPES.body].forEach(addColumnState(COLUMN_TYPES.body));

  return initialColumnsState;
}

function addColumnsPositions(state: IBeakerXDataGridState) {
  return createColumnsState({
    value: selectInitialColumnPositions(state),
    defaultValue: [{ region: 'row-header', value: 0 }]
  }, state);
}

function addColumnNamesState(state: IBeakerXDataGridState) {
  const value = selectColumnNames(state);

  return createColumnsState({
    value,
    defaultValue: [DEFAULT_INDEX_COLUMN_NAME]
  }, state);
}

function addColumnTypesState(state: IBeakerXDataGridState) {
  const value = selectColumnTypes(state);

  return createColumnsState({
    value,
    defaultValue: [BeakerXDataGridModel.DEFAULT_INDEX_COLUMN_TYPE]
  }, state);
}

function createColumnsState({ value, defaultValue }, state) {
  const hasIndex = selectHasIndex(state);

  return {
    [COLUMN_TYPES.body]: hasIndex ? value.slice(1) : value,
    [COLUMN_TYPES.index]: hasIndex ? value.slice(0, 1) : defaultValue
  };
}
