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

import { expect } from 'chai';
import {Widget} from '@phosphor/widgets';
import modelStateMock from "../mock/modelStateMock";
import {DataGridScope} from "../../../../../src/tableDisplay/dataGrid";
import createCellContextMenuItems
  from "../../../../../src/tableDisplay/dataGrid/contextMenu/createCellContextMenuItems";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('createCellContextMenuItems', () => {
  let dataGridScope;
  let contextMenu;

  before(() => {
    const scopeOptions = {
      element: document.createElement('div'),
      widgetView: tableDisplayWidgetMock,
      widgetModel: { model_id: '123-123-123' },
      data: {
        ...modelStateMock,
        contextMenuItems: ['test', 'test2'],
        contextMenuTags: { run: 'run', run2: 'run2'}
      }
    };

    dataGridScope = new DataGridScope(scopeOptions);
    contextMenu = dataGridScope.contextMenu;
  });

  after(() => {
    dataGridScope.doDestroy();
  });

  it('should be a Function', () => {
    expect(createCellContextMenuItems).to.be.a('Function');
  });

  it('should create the header context menu items', () => {
    let items = createCellContextMenuItems(dataGridScope.dataGrid, contextMenu);

    expect(items).to.have.length(4);
    expect(items[0]).to.have.property('title');
    expect(items[0].title).to.equal('test');
    expect(items[0]).to.have.property('id');
    expect(items[0].id).to.equal('test_wrap_123-123-123');
    expect(items[0]).to.have.property('selector');
    expect(items[0].selector).to.equal('#wrap_123-123-123 canvas');
    expect(items[2]).to.have.property('title');
    expect(items[2].title).to.equal('run');
    expect(items[2]).to.have.property('id');
    expect(items[2].id).to.equal('run_wrap_123-123-123');
    expect(items[2]).to.have.property('selector');
    expect(items[2].selector).to.equal('#wrap_123-123-123 canvas');
  });

});
