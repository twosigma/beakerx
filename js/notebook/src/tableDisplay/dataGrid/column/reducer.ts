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

import {Reducer} from "@phosphor/datastore";
import {
  default as DataGridAction,
  DataGridColumnAction,
  DataGridColumnsAction
} from "../store/DataGridAction";
import {IColumnsState, IColumnState} from "../interface/IColumn";
import {COLUMN_TYPES} from "./enums";

export const UPDATE_COLUMNS_STATES = 'UPDATE_COLUMNS_STATES';
export const UPDATE_COLUMN_STATE = 'UPDATE_COLUMNS_STATE';
export const UPDATE_COLUMNS_VISIBILITY = 'UPDATE_COLUMNS_VISIBILITY';
export const UPDATE_COLUMNS_POSITION = 'UPDATE_COLUMNS_POSITION';
export const UPDATE_COLUMN_POSITION = 'UPDATE_COLUMN_POSITION';
export const UPDATE_COLUMNS_TYPES = 'UPDATE_COLUMNS_TYPES';
export const UPDATE_COLUMNS_NAMES = 'UPDATE_COLUMNS_NAMES';
export const UPDATE_COLUMN_VISIBILITY = 'UPDATE_COLUMN_VISIBILITY';
export const UPDATE_COLUMNS_FILTERS = 'UPDATE_COLUMNS_FILTERS';
export const UPDATE_COLUMN_FILTER = 'UPDATE_COLUMN_FILTER';
export const UPDATE_COLUMN_HORIZONTAL_ALIGNMENT = 'UPDATE_COLUMN_HORIZONTAL_ALIGNMENT';
export const UPDATE_COLUMN_FORMAT_FOR_TIMES = 'UPDATE_COLUMN_FORMAT_FOR_TIMES';
export const UPDATE_COLUMN_DISPLAY_TYPE = 'UPDATE_COLUMN_DISPLAY_TYPE';
export const UPDATE_COLUMN_SORT_ORDER = 'UPDATE_COLUMN_SORT_ORDER';
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH';

const reduceColumnsVisibility = reduceColumnsState('visible');
const reduceColumnsPosition = reduceColumnsState('position');
const reduceColumnsNames = reduceColumnsState('name');
const reduceColumnsTypes = reduceColumnsState('dataTypeName');
const reduceColumnsFilters = reduceColumnsState('filter');
const reduceColumnHorizontalAlignment = reduceColumnStateProperty('horizontalAlignment');
const reduceColumnFilter = reduceColumnStateProperty('filter');
const reduceColumnFormatForTimes = reduceColumnStateProperty('formatForTimes');
const reduceColumnDisplayType = reduceColumnStateProperty('displayType');
const reduceColumnSortOrder = reduceColumnStateProperty('sortOrder');
const reduceColumnWidth = reduceColumnStateProperty('width');

const columnReducer: Reducer<IColumnsState> = (
  state: IColumnsState,
  action: DataGridColumnAction|DataGridColumnsAction|DataGridAction
): IColumnsState => {
  switch(action.type) {
    case UPDATE_COLUMNS_STATES:
      return action.payload.value;
      
    case UPDATE_COLUMN_STATE:
      return reduceColumnState(state, action);

    case UPDATE_COLUMNS_VISIBILITY:
      return reduceColumnsVisibility(state, action);

    case UPDATE_COLUMN_VISIBILITY:
      return reduceColumnVisibility(state, action);

    case UPDATE_COLUMNS_POSITION:
      return reduceColumnsPosition(state, action);

    case UPDATE_COLUMN_POSITION:
      return reduceColumnPosition(state, action);

    case UPDATE_COLUMNS_TYPES:
      return reduceColumnsTypes(state, action);

    case UPDATE_COLUMNS_NAMES:
      return reduceColumnsNames(state, action);

    case UPDATE_COLUMNS_FILTERS:
      return reduceColumnsFilters(state, action);

    case UPDATE_COLUMN_FILTER:
      return reduceColumnFilter(state, action);

    case UPDATE_COLUMN_HORIZONTAL_ALIGNMENT:
      return reduceColumnHorizontalAlignment(state, action);

    case UPDATE_COLUMN_FORMAT_FOR_TIMES:
      return reduceColumnFormatForTimes(state, action);

    case UPDATE_COLUMN_DISPLAY_TYPE:
      return reduceColumnDisplayType(state, action);

    case UPDATE_COLUMN_SORT_ORDER:
      return reduceColumnSortOrder(state, action);

    case UPDATE_COLUMN_WIDTH:
      return reduceColumnWidth(state, action);

    default:
      return state;
  }
};

function reduceColumnsState(property: string) {
  return (state, action: DataGridColumnsAction) => {
    const { value, hasIndex, defaultValue = [] } = action.payload;
    const bodyColumnValues = hasIndex ? value.slice(1) : value;
    const indexColumnValues = hasIndex ? value.slice(0, 1) : defaultValue;

    const newState = new Map<string, IColumnState>(state);

    indexColumnValues.forEach(updateColumnStateProperty(state, newState, property, COLUMN_TYPES.index));
    bodyColumnValues.forEach(updateColumnStateProperty(state, newState, property, COLUMN_TYPES.body));

    return newState;
  };
}

function updateColumnStateProperty(state, newState, property, columnType) {
  return (value, index) => {
    let key = `${columnType}_${index}`;

    newState.set(key, {
      ...state.get(key),
      [property]: value
    });
  };
}

function reduceColumnState(state, action) {
  if (!(action instanceof DataGridColumnAction)) {
    return state;
  }

  const { columnType, columnIndex, value } = action.payload;
  const key = `${columnType}_${columnIndex}`;
  const newState = new Map<string, IColumnState>(state);

  newState.set(key, { ...state.get(key), ...value });

  return newState;
}

function reduceColumnStateProperty(property: string) {
  return (state, action) => {
    if (!(action instanceof DataGridColumnAction)) {
      return state;
    }

    const { columnType, columnIndex, value } = action.payload;
    const key = `${columnType}_${columnIndex}`;
    const newState = new Map<string, IColumnState>(state);

    newState.set(key, { ...state.get(key), [property]: value });

    return newState;
  };
}

function reduceColumnVisibility(state, action) {
  const newState: IColumnsState = reduceColumnStateProperty('visible')(state, action);
  const visibleStates: IColumnState[] = Array.from(newState.values()).filter(
    columnState => columnState.columnType === COLUMN_TYPES.body && columnState.visible
  );

  // Move column to the end or behind the visible columns
  return reduceColumnPosition(newState, new DataGridColumnAction(
    UPDATE_COLUMN_POSITION,
    {
      ...action.payload,
      value: action.payload.value ? visibleStates.length - 1 : visibleStates.length
    }
  ));
}

function reduceColumnPosition(state, action) {
  const { columnType, columnIndex, value, hasIndex } = action.payload;
  const order = createBodyColumnsOrderArray(state, columnType);
  const lastPosition = order.indexOf(columnIndex);
  const resultPositions: number[] = [];

  order.splice(lastPosition, 1);
  order.splice(value, 0, columnIndex);
  order.forEach((index, position) => { resultPositions[index] = position; });

  return reduceColumnsPosition(state, new DataGridColumnsAction(UPDATE_COLUMNS_POSITION, {
    hasIndex,
    value: resultPositions,
    defaultValue: [0]
  }));
}

function createBodyColumnsOrderArray(state, columnType): number[] {
  const order: number[] = [];

  state.forEach((columnState) => {
    if (columnState.columnType === columnType) {
      order[columnState.position] = columnState.index
    }
  });

  return order;
}

export default columnReducer;
