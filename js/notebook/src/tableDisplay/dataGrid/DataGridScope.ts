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

import { StackedPanel, Widget } from '@phosphor/widgets';
import { DataGrid } from '@phosphor/datagrid';
import IDataGridScopeOptions from "./IDataGridScopeOptions";
import { TableDataModel } from './TableDataModel';

import './dataGrid.css';

export class DataGridScope {
  dataGrid: DataGrid;

  element: HTMLElement;

  data: any;

  greenStripeStyle: DataGrid.IStyle = {
    ...DataGrid.defaultStyle,
    voidColor: '#ffffff',
    headerBackgroundColor: '#E6E6E6',
    rowBackgroundColor: i => i % 2 === 0 ? '#f9f9f9' : ''
  };

  constructor(options: IDataGridScopeOptions) {
    this.element = options.element;
    this.data = options.data;
    this.dataGrid = new DataGrid({
      style: this.greenStripeStyle
    });

    this.dataGrid.model = new TableDataModel(this.data);
  }

  render(): void {
    let wrapper = this.createWrapper(this.dataGrid, 'example');
    Widget.attach(wrapper, this.element);
  }

  createWrapper(content: Widget, title: string): Widget {
    let wrapper = new StackedPanel();
    wrapper.addClass('content-wrapper');
    wrapper.addWidget(content);
    wrapper.title.label = title;

    return wrapper;
  }

  doDestroy() {
    this.dataGrid.dispose();
  }
}
