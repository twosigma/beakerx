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

declare var lab: { contextMenu: ContextMenu };

import { ContextMenu, Menu } from '@phosphor/widgets';
import { CommandRegistry } from '@phosphor/commands';
import { IDisposable } from '@phosphor/disposable';
import MenuItem from "shared/interfaces/contextMenuItemInterface";
import _ from 'underscore';
import MenuInterface from '../shared/interfaces/menuInterface'

interface addItem {
  addItem: Function
}

export default abstract class BkoContextMenu implements MenuInterface {
  protected scope: any;
  protected commands: CommandRegistry;
  protected menuItems: Menu.IItem[] = [];
  protected inLab: boolean;
  protected disposables: IDisposable[] = [];
  protected event: MouseEvent;

  public contextMenu: ContextMenu;

  constructor(scope: any) {
    this.inLab = this.isInLab();
    this.scope = scope;

    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.buildMenu();
  }

  protected abstract buildMenu(): void;
  
  protected isInLab(): boolean {
    let inLab = false;

    try {
      inLab = lab && lab.contextMenu instanceof ContextMenu;
    } catch (e) {}

    return inLab;
  }

  protected handleContextMenu(event: MouseEvent): void {
    this.event = event;

    if (this.inLab) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.open(event);
  }

  open(e: MouseEvent): void {
    this.contextMenu.open(e);
  }

  protected buildLabMenu(): void {
    this.commands = lab.contextMenu.menu.commands;
    this.contextMenu = lab.contextMenu;
  }

  protected buildBkoMenu(): void {
    this.commands = new CommandRegistry();
    this.contextMenu = new ContextMenu({ commands: this.commands });
    this.contextMenu.menu.addClass('bko-table-menu');
  }

  protected createItems(items: MenuItem[], menu: addItem): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      this.createMenuItem(items[i], menu);
    }
  }

  protected createMenuItem(menuItem: MenuItem, menu: addItem): void {
    const subitems = (typeof menuItem.items == 'function') ? menuItem.items() : menuItem.items;
    const hasSubitems = _.isArray(subitems) && subitems.length;

    menuItem.separator && this.addSeparatorItem(menuItem, menu);
    !hasSubitems && this.menuItems.push(this.addMenuItem(menuItem, menu));
    hasSubitems && this.menuItems.push(this.addSubmenuItem(menuItem, menu, subitems));
  }

  protected addMenuItem(menuItem: MenuItem, menu: addItem): Menu.IItem {
    this.addCommand(menuItem);
    this.addKeyBinding(menuItem);

    return menu.addItem({ command: menuItem.id, selector: menuItem.selector });
  }

  protected addSeparatorItem(menuItem: MenuItem, menu: addItem): Menu.IItem {
    return menu.addItem({ type: 'separator', selector: menuItem.selector });
  }

  protected addSubmenuItem(menuItem: MenuItem, menu: addItem, subitems: MenuItem[]): Menu.IItem {
    return menu.addItem({
      type: 'submenu',
      submenu: this.createSubmenu(menuItem, subitems),
      selector: menuItem.selector
    });
  }

  protected addCommand(menuItem: MenuItem): void {
    if (this.commands.hasCommand(menuItem.id)) {
      return;
    }

    const self = this;
    this.disposables.push(this.commands.addCommand(menuItem.id, {
      label: menuItem.title,
      usage: menuItem.tooltip || '',
      iconClass: () => menuItem.icon ? menuItem.icon : '',
      isVisible: menuItem.isVisible,
      execute: (): void => {
        if (menuItem.action && typeof menuItem.action == 'function') {
          menuItem.action(self.event);
        }
      }
    }));
  }

  protected addKeyBinding(menuItem: MenuItem): void {
    if (!menuItem.shortcut) {
      return;
    }

    this.disposables.push(this.commands.addKeyBinding({
      keys: [menuItem.shortcut],
      selector: menuItem.selector,
      command: menuItem.id
    }));
  }

  protected createSubmenu(menuItem: MenuItem, subitems: MenuItem[]): Menu {
    const submenu = new Menu({ commands: this.commands });

    !this.inLab && submenu.addClass('bko-table-menu');
    submenu.title.label = menuItem.title;
    submenu.setHidden(false);

    this.createItems(subitems, submenu);

    return submenu;
  }

  protected bindEvents(): void {
    this.scope.element[0].addEventListener('contextmenu', this.handleContextMenu);
  }

  destroy(): void {
    this.unbind();
    this.removeMenuItems();
    this.dispose();
  }

  removeMenuItems(): void {
    this.menuItems.forEach(item => this.contextMenu.menu.removeItem(item));
  }

  dispose(): void {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  unbind(): void {
    this.scope.element[0].removeEventListener('contextmenu', this.handleContextMenu);
  }
}
