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
import IDataModelState from "../interface/IDataGridModelState";
import DataGridAction, {DataGridColumnAction} from "../store/DataGridAction";

export const UPDATE_MODEL_DATA = 'UPDATE_MODEL_DATA';
export const UPDATE_COLUMN_RENDERER = 'UPDATE_COLUMN_RENDERER';
export const UPDATE_COLUMN_ORDER = 'UPDATE_COLUMN_ORDER';

const dataGridModelReducer: Reducer<IDataModelState> = (
  state: IDataModelState,
  action: DataGridAction|DataGridColumnAction
): IDataModelState => {
  switch(action.type) {
    case UPDATE_MODEL_DATA:
      return { ...state, ...action.payload };

    case UPDATE_COLUMN_RENDERER:
      return {
        ...state,
        rendererForColumn: {
          ...state.rendererForColumn,
          [action.payload.columnName]: action.payload.value
        }
      };

    case UPDATE_COLUMN_ORDER:
      return reduceColumnPosition(state, action);
  }

  return state;
};

function reduceColumnPosition(state, action: DataGridColumnAction) {
  const { columnName, value, hasIndex } = action.payload;
  const columnOrder = getColumnOrderArray(state);
  const lastPosition = columnOrder.indexOf(columnName);
  const newPosition = hasIndex ? value + 1 : value;

  if (lastPosition !== -1) {
    columnOrder.splice(lastPosition, 1);
  }

  columnOrder.splice(newPosition, 0, columnName);

  return {
    ...state,
    columnOrder
  };
}

function getColumnOrderArray(state): string[] {
  const columnOrder = state.columnOrder;
  const order = [...state.columnNames];

  columnOrder.reverse().forEach((name) => {
    const columnPosition = order.indexOf(name);

    if (columnPosition === -1) {
      return true;
    }

    order.splice(columnPosition, 1);
    order.unshift(name);
  });

  return order;
}

export default dataGridModelReducer;
