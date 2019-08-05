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
import createHeaderContextMenuItems
  from "../../../../../src/tableDisplay/dataGrid/contextMenu/createHeaderContextMenuItems";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('createHeaderContextMenuItems', () => {
  let dataGridScope;
  let contextMenu;

  before(() => {
    const scopeOptions = {
      element: document.createElement('div'),
      widgetView: tableDisplayWidgetMock,
      widgetModel: { model_id: '123-123-123' },
      data: modelStateMock
    };

    dataGridScope = new DataGridScope(scopeOptions);
    contextMenu = dataGridScope.contextMenu;
  });

  after(() => {
    dataGridScope.doDestroy();
  });

  it('should be a Function', () => {
    expect(createHeaderContextMenuItems).to.be.a('Function');
  });

  it('should create the header context menu items', () => {
    let items = createHeaderContextMenuItems(dataGridScope.dataGrid, contextMenu);

    expect(items).to.have.length(2);
    expect(items[0]).to.have.property('title');
    expect(items[0].title).to.equal('vertical headers');
    expect(items[0]).to.have.property('id');
    expect(items[0].id).to.equal('wrap_123-123-123_verticalHeaders');
    expect(items[0]).to.have.property('selector');
    expect(items[0].selector).to.equal('#wrap_123-123-123 canvas');
    expect(items[0]).to.have.property('isVisible');
    expect(items[0].isVisible).to.be.a('Function');

    contextMenu.event = new MouseEvent('contextmenu', { clientX: 50, clientY: 0 });
    expect(items[0].isVisible({})).to.be.true;

    expect(items[1]).to.have.property('title');
    expect(items[1].title).to.equal('horizontal headers');
    expect(items[1]).to.have.property('id');
    expect(items[1].id).to.equal('wrap_123-123-123_horizontalHeaders');
    expect(items[1]).to.have.property('selector');
    expect(items[1].selector).to.equal('#wrap_123-123-123 canvas');
    expect(items[1]).to.have.property('isVisible');
    expect(items[1].isVisible).to.be.a('Function');
    expect(items[1].isVisible({})).to.be.false;
  });

});
