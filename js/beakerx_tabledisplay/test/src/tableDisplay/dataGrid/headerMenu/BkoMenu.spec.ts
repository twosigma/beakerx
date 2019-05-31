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

import * as sinon from 'sinon';
import { expect } from 'chai';
import {Menu, Widget} from '@phosphor/widgets';
import {CommandRegistry} from '@phosphor/commands';
import {Message} from '@phosphor/messaging';
import BkoMenu from "../../../../../src/tableDisplay/dataGrid/headerMenu/BkoMenu";

describe('BkoMenu', () => {
  let bkoMenu;
  let commands;
  let menuItem;

  before(() => {
    commands = new CommandRegistry();
    bkoMenu = new BkoMenu({ commands });

    commands.addCommand('test', { execute: () => {} });
    bkoMenu.addItem({command: 'test', submenu: bkoMenu, type: 'submenu'});
  });

  after(() => {
    bkoMenu.dispose();
  });

  it('should be an instance of Menu', () => {
    expect(bkoMenu).to.be.an.instanceof(Menu);
  });

  it('should implement the triggerActiveItem method', () => {
    const stub = sinon.stub(commands, 'execute');

    expect(bkoMenu).to.have.property('triggerActiveItem');
    expect(bkoMenu.triggerActiveItem).to.be.a('Function');

    bkoMenu.triggerActiveItem();
    expect(stub.called).to.be.false;

    bkoMenu.keepOpen = true;
    bkoMenu.triggerActiveItem();
    expect(stub.called).to.be.false;

    bkoMenu.activateNextItem();
    bkoMenu.setFlag(Widget.Flag.IsAttached);
    bkoMenu.triggerActiveItem();

    expect(stub.calledOnce).to.be.true;
    bkoMenu.clearFlag(Widget.Flag.IsAttached);

    stub.restore();
  });

  it('should implement the close method', () => {
    expect(bkoMenu).to.have.property('close');
    expect(bkoMenu.close).to.be.a('Function');
  });

  it('should implement the onBeforeAttach method', () => {
    expect(bkoMenu).to.have.property('onBeforeAttach');
    expect(bkoMenu.onBeforeAttach).to.be.a('Function');
  });

  it('should implement the onActivateRequest method', () => {
    const stub = sinon.stub(bkoMenu, 'show');

    bkoMenu.onActivateRequest(new Message('activate'));

    expect(bkoMenu).to.have.property('onActivateRequest');
    expect(bkoMenu.onActivateRequest).to.be.a('Function');
    expect(stub.called).to.be.false;

    stub.restore();
  });

  it('should call show and hide methods', () => {
    const parentMenu = new BkoMenu({ commands });
    const stub = sinon.stub(bkoMenu, 'show');
    const stubHide = sinon.stub(bkoMenu, 'hide');

    parentMenu.addItem({command: 'test', submenu: bkoMenu, type: 'submenu'});
    parentMenu.contentNode.appendChild(document.createElement('div'));
    parentMenu.activateNextItem();

    bkoMenu['_parentMenu'] = parentMenu;
    bkoMenu.onActivateRequest(new Message('activate-request'));

    expect(stub.called).to.be.true;

    bkoMenu.onBeforeAttach();

    expect(stubHide.called).to.be.true;

    stub.restore();
  });

});
