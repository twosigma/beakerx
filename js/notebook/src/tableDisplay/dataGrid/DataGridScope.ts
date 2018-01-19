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

import { Widget } from '@phosphor/widgets';
import { DataGrid } from '@phosphor/datagrid';
import { TableDataModel } from './TableDataModel';
import { silverStripeStyle } from './DataGridStyle';
import IDataGridScopeOptions from "./IDataGridScopeOptions";
import IDataModelOptions from "./IDataModelOptions";

export class DataGridScope {
  private dataGrid: DataGrid;
  private element: HTMLElement;
  private modelOptions: IDataModelOptions;

  constructor(options: IDataGridScopeOptions) {
    this.element = options.element;
    this.modelOptions = options.data;
    this.dataGrid = new DataGrid({
      style: silverStripeStyle
    });

    this.dataGrid.model = new TableDataModel(this.modelOptions);
  }

  render(): void {
    Widget.attach(this.dataGrid, this.element);
  }

  doDestroy() {
    this.dataGrid.dispose();
  }
}
