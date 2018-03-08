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
import DataGridAction from "../store/DataGridAction";

export const UPDATE_MODEL_DATA = 'UPDATE_MODEL_DATA';

const dataGridModelReducer: Reducer<IDataModelState> = (
  state: IDataModelState,
  action: DataGridAction
): IDataModelState => {
  if (action.type === UPDATE_MODEL_DATA) {
    return { ...state, ...action.payload };
  }

  return state;
};

export default dataGridModelReducer;
