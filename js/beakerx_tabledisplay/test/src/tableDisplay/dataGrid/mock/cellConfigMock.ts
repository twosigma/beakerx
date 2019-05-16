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

import { CellRenderer } from "@phosphor/datagrid";

const cellConfigMock: CellRenderer.ICellConfig = {
  region: "body",
  value: 1,
  column: 0,
  row: 0,
  height: 24,
  width: 64,
  x: 0,
  y: 0,
  metadata: {}
};

export default cellConfigMock;
