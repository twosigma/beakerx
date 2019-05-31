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
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import Menu from './BkoMenu';
import DataGridColumn from "../column/DataGridColumn";
import {SORT_ORDER} from "../column/enums";
import {DataGridHelpers} from "../dataGridHelpers";
import getEventKeyCode = DataGridHelpers.getEventKeyCode;
import {KEYBOARD_KEYS} from "../event/enums";
import IMenu from "beakerx_shared/lib/contextMenu/IMenu";
import IMenuItem from "beakerx_shared/lib/contextMenu/IMenuItem";

export default abstract class HeaderMenu implements IMenu {
  columnIndex: number;

  protected commands: CommandRegistry;
  protected menu: Menu;
  protected viewport: Widget;
  protected triggerNode: HTMLElement;
  protected dataGrid: BeakerXDataGrid;
  protected column: DataGridColumn;

  private TRIGGER_CLASS_OPENED: string = 'opened';
  private TRIGGER_CLASS_SORTING_DESC: string = 'sorting_desc';
  private TRIGGER_CLASS_SORTING_ASC: string = 'sorting_asc';

  static DEFAULT_TRIGGER_HEIGHT: number = 24;
  static DEFAULT_TRIGGER_WIDTH: number = 14;

  constructor(column: DataGridColumn) {
    this.commands = new CommandRegistry();
    this.menu = new Menu({ commands: this.commands });
    this.viewport = column.dataGrid.viewport;
    this.columnIndex = column.index;
    this.dataGrid = column.dataGrid;
    this.column = column;

    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);
    this.handleMenuTriggerClick = this.handleMenuTriggerClick.bind(this);

    this.addTrigger();
    this.buildMenu();
    this.attachTriggerToMenu();
  }

  protected abstract buildMenu(): void

  updateTriggerPosition() {
    const columnPosition = this.column.getPosition();
    const scrollCompensation = columnPosition.region !== 'row-header' ? this.dataGrid.scrollX : 0;

    this.triggerNode.style.left = `${this.dataGrid.getColumnOffset(
      columnPosition.value,
      columnPosition.region
    ) - scrollCompensation}px`;
  }

  showTrigger(): void {
    this.updateTriggerPosition();
    this.assignTriggerSortingCssClass();

    if (this.triggerNode.style.visibility === 'visible') {
      return;
    }

    this.triggerNode.style.visibility = 'visible';
    this.viewport.node.appendChild(this.triggerNode);
  }

  hideTrigger() {
    if (this.column.getSortOrder() !== SORT_ORDER.NO_SORT && this.column.getVisible() || this.column.getKeepTrigger()) {
      return;
    }

    this.triggerNode.style.visibility = 'hidden';
  }

  attachTriggerToMenu() {
    this.menu.trigger = this.triggerNode;
    this.column.getKeepTrigger() && this.showTrigger();
  }

  open(submenuIndex?: number): void {
    const menuPosition = this.getMenuPosition(this.triggerNode);

    this.menu.addClass('open');
    this.menu.open(menuPosition.left, menuPosition.top);
    this.menu.node.style.bottom = '';
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

  close() {
    this.menu.close();
  }

  destroy(): void {
    this.menu.isAttached && this.menu.dispose();

    this.triggerNode.removeEventListener('mousedown', this.handleMenuTriggerClick);
    this.triggerNode.remove();
    this.triggerNode = null;

    setTimeout(() => {
      this.commands = null;
      this.viewport = null;
      this.dataGrid = null;
      this.column = null;
    });
  }

  toggleMenu(submenuIndex?: number): void {
    this.triggerNode.classList.contains(this.TRIGGER_CLASS_OPENED) ?
      this.triggerNode.classList.remove(this.TRIGGER_CLASS_OPENED) :
      this.open(submenuIndex);
  }

  createItems(items: IMenuItem[], menu: Menu): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      let menuItem = items[i];

      const subitems = (typeof menuItem.items == 'function') ? menuItem.items(this.column) : menuItem.items;
      const hasSubitems = Array.isArray(subitems) && subitems.length;

      menuItem.separator && menu.addItem({ type: 'separator' });

      if (!hasSubitems) {
        let command = this.addCommand(menuItem, menu);
        menu.addItem({ command });

        continue;
      }

      menu.addItem({ type: 'submenu', submenu: this.createSubmenu(menuItem, subitems) });
    }
  }

  addCommand(menuItem: IMenuItem, menu: Menu): string {
    const commandId = menuItem.id || menuItem.title;

    this.commands.addCommand(commandId, {
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
        command: commandId
      });
    }

    return commandId;
  }

  createSubmenu(menuItem: IMenuItem, subitems: IMenuItem[]): Menu {
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

  protected assignTriggerSortingCssClass() {
    const sortOrder = this.column.getSortOrder();

    if (sortOrder === SORT_ORDER.ASC) {
      this.triggerNode.classList.remove(this.TRIGGER_CLASS_SORTING_DESC);
      this.triggerNode.classList.add(this.TRIGGER_CLASS_SORTING_ASC);

      return;
    }

    if (sortOrder === SORT_ORDER.DESC) {
      this.triggerNode.classList.remove(this.TRIGGER_CLASS_SORTING_ASC);
      this.triggerNode.classList.add(this.TRIGGER_CLASS_SORTING_DESC);

      return;
    }

    this.triggerNode.classList.remove(this.TRIGGER_CLASS_SORTING_ASC);
    this.triggerNode.classList.remove(this.TRIGGER_CLASS_SORTING_DESC);
  }

  protected addTrigger():void {
    this.triggerNode && this.triggerNode.remove();
    this.triggerNode = document.createElement('span');

    this.triggerNode.style.height = `${HeaderMenu.DEFAULT_TRIGGER_HEIGHT}px`;
    this.triggerNode.style.width = `${HeaderMenu.DEFAULT_TRIGGER_WIDTH}px`;
    this.triggerNode.style.position = 'absolute';
    this.triggerNode.style.top = '0px';
    this.triggerNode.style.cursor = 'pointer';
    this.triggerNode.classList.add('bko-column-header-menu');
    this.triggerNode.classList.add('bko-menu');
    this.triggerNode.addEventListener('mousedown', this.handleMenuTriggerClick);
  }

  private handleMenuTriggerClick(event) {
    event.preventDefault();

    this.toggleMenu();
  }

  protected getMenuPosition(trigger: any) {
    const triggerRectObject = trigger.getBoundingClientRect();

    return {
      top: window.pageYOffset + triggerRectObject.bottom,
      left: triggerRectObject.left
    };
  }

  protected correctPosition(trigger: any) {
    const menuRectObject = this.menu.node.getBoundingClientRect();
    const triggerRectObject = trigger.getBoundingClientRect();
    const outOfViewportPartSize = triggerRectObject.bottom + menuRectObject.height - window.innerHeight;

    if (outOfViewportPartSize > 0) {
      this.menu.node.style.top = `${window.pageYOffset + triggerRectObject.bottom - outOfViewportPartSize - 10}px`;
    }

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

      if (getEventKeyCode(event) === KEYBOARD_KEYS.Escape) {
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
