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

import {Action} from "@phosphor/datastore";
import {COLUMN_TYPES} from "../column/enums";

export default class DataGridAction extends Action<string> {
  payload: any;

  constructor(type: string, payload: any) {
    super(type);

    this.payload = payload;
  }
}

export class DataGridColumnsAction extends DataGridAction {
  payload: {
    value: any,
    hasIndex?: boolean,
    defaultValue?: any,
    columnsFrozenNames?: string[],
    columnsVisible?: {},
  };

  constructor(type: string, payload: any) {
    super(type, payload);

    this.payload = payload;
  }
}

export class DataGridColumnAction extends DataGridAction {
  payload: {
    columnType: COLUMN_TYPES,
    columnIndex: number,
    columnName?: string,
    hasIndex?: boolean,
    value: any
  };

  constructor(type: string, payload: any) {
    super(type, payload);

    this.payload = payload;
  }
}
