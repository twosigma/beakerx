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

import { DataGrid } from '@phosphor/datagrid';

import './dataGrid.scss';

export const silverStripeStyle: DataGrid.IStyle = {
  ...DataGrid.defaultStyle,
  voidColor: '#ffffff',
  headerBackgroundColor: '#E6E6E6',
  rowBackgroundColor: i => i % 2 === 0 ? '#f9f9f9' : ''
};
