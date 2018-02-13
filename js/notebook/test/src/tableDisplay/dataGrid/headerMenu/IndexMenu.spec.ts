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

import * as sinon from 'sinon';
import { expect } from 'chai';
import { Menu } from '@phosphor/widgets';
import IndexMenu from '@beakerx/tableDisplay/dataGrid/headerMenu/IndexMenu';
import { createIndexMenuItems } from '@beakerx/tableDisplay/dataGrid/headerMenu/createIndexMenuItems';
import HeaderMenu from '@beakerx/tableDisplay/dataGrid/headerMenu/HeaderMenu';
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import {COLUMN_TYPES} from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import menuOptionsMock from "../mock/menuOptionsMock";
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import modelStateMock from "../mock/modelStateMock";
import ColumnManager from "@beakerx/tableDisplay/dataGrid/column/ColumnManager";

describe('IndexMenu', () => {
  let dataGrid;
  let indexMenu;
  let column;

  before(() => {
    dataGrid = new BeakerxDataGrid({}, modelStateMock);
    column = new DataGridColumn({
      index: 0,
      type: COLUMN_TYPES.index,
      name: 'index',
      menuOptions: menuOptionsMock
    }, dataGrid, dataGrid.columnManager);
    indexMenu = new IndexMenu(column, menuOptionsMock);
  });

  after(() => {
    dataGrid.destroy();
  });


  it('should be an instance of HeaderMenu', () => {
    expect(indexMenu).to.be.an.instanceof(HeaderMenu);
  });

  it('should implement buildMenu method', () => {
    expect(indexMenu).to.have.property('buildMenu');
  });

  it('should create the triggerNode HTMLElement', () => {
    expect(indexMenu).to.have.property('triggerNode');
    expect(indexMenu['triggerNode']).to.be.an.instanceof(HTMLElement);
  });

  it('should create the menu property instance of PhosphorJS Menu', () => {
    expect(indexMenu).to.have.property('menu');
    expect(indexMenu['menu']).to.be.an.instanceof(Menu);
  });

  it('should create index menu items', () => {
    let items = createIndexMenuItems(column);

    expect(indexMenu['menu'].items).to.have.length.gte(items.length);
  });

  it('should call the Menu.open method', () => {
    const stub = sinon.stub(indexMenu['menu'], 'open');

    indexMenu.open();
    indexMenu.toggleMenu();
    indexMenu.toggleMenu();
    expect(stub.calledTwice).to.be.true;

    stub.restore();
  });

  it('should call the createItems method', () => {
    const stub = sinon.stub(indexMenu, 'createItems');

    indexMenu.buildMenu();
    expect(stub.calledOnce).to.be.true;

    stub.restore();
  });
});
