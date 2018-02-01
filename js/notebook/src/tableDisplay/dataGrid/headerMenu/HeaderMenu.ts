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

import { CommandRegistry } from '@phosphor/commands';
import { Widget } from '@phosphor/widgets';
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import Menu from './BkoMenu';
import MenuItem from '../../../shared/interfaces/menuItemInterface';
import MenuInterface from '../../../shared/interfaces/menuInterface';
import DataGridColumn from "../column/DataGridColumn";

export interface ITriggerOptions {
  x: number,
  y: number,
  width: number,
  height: number
}

export default abstract class HeaderMenu implements MenuInterface {
  columnIndex: number;

  protected commands: CommandRegistry;
  protected menu: Menu;
  protected viewport: Widget;
  protected triggerNode: HTMLElement;
  protected dataGrid: BeakerxDataGrid;
  protected column: DataGridColumn;

  private TRIGGER_CLASS_OPENED: string = 'opened';

  static DEFAULT_TRIGGER_HEIGHT: number = 20;

  constructor(column: DataGridColumn, triggerOptions: ITriggerOptions) {
    this.commands = new CommandRegistry();
    this.menu = new Menu({ commands: this.commands });
    this.viewport = column.dataGrid.viewport;
    this.columnIndex = column.index;
    this.dataGrid = column.dataGrid;
    this.column = column;

    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);

    this.addTrigger(triggerOptions);
    this.buildMenu();
    this.attachTriggerToMenu();
  }

  protected abstract buildMenu(): void

  showTrigger(): void {
    if (this.triggerNode.style.visibility === 'visible') {
      return;
    }

    this.triggerNode.style.visibility = 'visible';
    this.viewport.node.appendChild(this.triggerNode);
  }

  hideTrigger() {
    this.triggerNode.style.visibility = 'hidden';
  }

  attachTriggerToMenu() {
    this.menu.trigger = this.triggerNode;
  }

  open(submenuIndex?: number): void {
    const menuPosition = this.getMenuPosition(this.triggerNode);

    this.menu.addClass('open');
    this.menu.open(menuPosition.left, menuPosition.top);
    this.correctPosition(this.triggerNode);

    this.triggerNode.classList.add(this.TRIGGER_CLASS_OPENED);

    if (submenuIndex !== undefined) {
      let item = this.menu.items[submenuIndex];
      if (item.type === 'submenu') {
        this.menu.activeIndex = submenuIndex;
        this.menu.triggerActiveItem();
      }
    }
  }

  destroy(): void {
    this.menu.dispose();
  }

  toggleMenu(submenuIndex?: number): void {
    this.triggerNode.classList.contains(this.TRIGGER_CLASS_OPENED) ?
      this.triggerNode.classList.remove(this.TRIGGER_CLASS_OPENED) :
      this.open(submenuIndex);
  }

  createItems(items: MenuItem[], menu: Menu): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      let menuItem = items[i];

      const subitems = (typeof menuItem.items == 'function') ? menuItem.items(this.column) : menuItem.items;
      const hasSubitems = subitems instanceof Array && subitems.length;

      menuItem.separator && menu.addItem({ type: 'separator' });

      if (!hasSubitems) {
        this.addCommand(menuItem, menu);
        menu.addItem({command: menuItem.title});

        continue;
      }

      menu.addItem({ type: 'submenu', submenu: this.createSubmenu(menuItem, subitems) });
    }
  }

  addCommand(menuItem: MenuItem, menu: Menu): void {
    this.commands.addCommand(menuItem.title, {
      label: menuItem.title,
      usage: menuItem.tooltip || '',
      iconClass: () => {
        if (menuItem.icon) {
          return menuItem.icon;
        }

        if (typeof menuItem.isChecked == 'function' && menuItem.isChecked(this.column)) {
          return 'fa fa-check';
        }

        return '';
      },
      execute: (): void => {
        if (menuItem.action && typeof menuItem.action == 'function') {
          menuItem.action(this.column);
          menuItem.updateLayout && menu.update();
        }
      }
    });

    if (menuItem.shortcut) {
      this.commands.addKeyBinding({
        keys: [menuItem.shortcut],
        selector: 'body',
        command: menuItem.title
      });
    }
  }

  createSubmenu(menuItem: MenuItem, subitems: MenuItem[]): Menu {
    const submenu = new Menu({ commands: this.commands });

    submenu.addClass('dropdown-submenu');
    submenu.addClass('bko-table-menu');
    submenu.title.label = menuItem.title;

    menuItem.enableItemsFiltering && this.addItemsFiltering(submenu);
    submenu.keepOpen = menuItem.keepOpen;

    submenu.setHidden(false);

    this.createItems(subitems, submenu);

    return submenu;
  }

  protected addTrigger({
    x, y,
    width = HeaderMenu.DEFAULT_TRIGGER_HEIGHT,
    height = HeaderMenu.DEFAULT_TRIGGER_HEIGHT
  }):void {
    this.triggerNode = document.createElement('span');

    this.triggerNode.style.height = `${height}px`;
    this.triggerNode.style.width = `${width}px`;
    this.triggerNode.style.position = 'absolute';
    this.triggerNode.style.left = `${x}px`;
    this.triggerNode.style.top = `${y}px`;
    this.triggerNode.style.cursor = 'pointer';
    this.triggerNode.classList.add('bko-column-header-menu');
    this.triggerNode.classList.add('bko-menu');
    this.triggerNode.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();

      this.toggleMenu();
    });
  }

  protected getMenuPosition(trigger: any) {
    const triggerHeight = trigger.height || 20;
    const viewportRect = this.viewport.node.getBoundingClientRect();

    return {
      top: viewportRect.top + trigger.offsetTop + triggerHeight,
      left: viewportRect.left + trigger.offsetLeft
    };
  }

  protected correctPosition(trigger: any) {
    const menuRectObject = this.menu.node.getBoundingClientRect();
    const triggerRectObject = trigger.getBoundingClientRect();

    if (menuRectObject.top < triggerRectObject.bottom && menuRectObject.left <= triggerRectObject.right) {
      this.menu.node.style.left = triggerRectObject.right + 'px';
    }
  }

  protected handleKeydownEvent(event: KeyboardEvent): void {
    this.menu.isVisible && this.menu.handleEvent(event);
  }

  protected addItemsFiltering(menu: Menu): void {
    const filterWrapper = document.createElement('div');

    filterWrapper.classList.add('dropdown-menu-search');
    filterWrapper.innerHTML = '<i class="fa fa-search"></i><input placeholder="search regexp...">';

    menu.node.insertBefore(filterWrapper, menu.node.children.item(0));

    const input = filterWrapper.querySelector('input');

    if (!input) {
      return;
    }

    menu.node.addEventListener('mouseup', (event: MouseEvent) => {
      if (event.target !== input) {
        return;
      }

      input.focus();
      event.stopImmediatePropagation();
    });

    input.addEventListener('keydown', (event: KeyboardEvent) => {
      event.stopImmediatePropagation();
    });

    input.addEventListener('keyup', (event: KeyboardEvent) => {
      event.stopImmediatePropagation();

      if (event.keyCode === 27) {
        menu.close();

        return;
      }

      this.hideMenuItems(menu, input.value);
    });
  }

  protected hideMenuItems(menu: Menu, filterValue: string): void {
    const searchExp = filterValue ? new RegExp(filterValue, 'i') : null;
    const items = menu.contentNode.querySelectorAll('.p-Menu-item');

    for (let i = 0; i < items.length; i++) {
      let item = <HTMLElement>items.item(i);
      let itemClassList = item.classList;
      let shouldHide = searchExp && searchExp.test ? !searchExp.test(item.innerText) : false;

      shouldHide ? itemClassList.add('hidden') : itemClassList.remove('hidden');
    }
  }
}
