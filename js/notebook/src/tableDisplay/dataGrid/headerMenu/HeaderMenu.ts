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
import Menu from '../../tableHeaderMenu/BkoMenu';
import MenuItem from '../../../shared/interfaces/menuItemInterface';
import MenuInterface from '../../../shared/interfaces/menuInterface';

export interface ITriggerOptions {
  x: number,
  y: number,
  width: number,
  height: number
}

export abstract class HeaderMenu implements MenuInterface {
  columnIndex: number;

  protected commands: CommandRegistry;
  protected menu: Menu;
  protected viewport: Widget;
  protected triggerNode: HTMLElement;
  protected dataGrid: BeakerxDataGrid;

  private TRIGGER_CLASS_OPENED: string = 'opened';

  static DEBOUNCE_DELAY: number = 250;
  static DEFAULT_TRIGGER_HEIGHT: number = 20;

  constructor(columnIndex: number, dataGrid: BeakerxDataGrid, triggerOptions: ITriggerOptions) {
    this.commands = new CommandRegistry();
    this.menu = new Menu({ commands: this.commands });
    this.viewport = dataGrid.viewport;
    this.columnIndex = columnIndex;
    this.dataGrid = dataGrid;

    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);

    this.addTrigger(triggerOptions);
    this.buildMenu();
  }

  protected abstract buildMenu(): void

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
    this.triggerNode.addEventListener('mouseup', () => this.open());
  }

  showTrigger(x: number) {
    if (!isNaN(x)) {
      this.triggerNode.style.left = `${x}px`;
    }

    this.triggerNode.style.visibility = 'visible';
    this.viewport.node.appendChild(this.triggerNode);
  }

  hideTrigger() {
    this.triggerNode.style.visibility = 'hidden';
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

  toggleMenu($trigger: any, submenuIndex?: number): void {
    this.triggerNode.classList.contains(this.TRIGGER_CLASS_OPENED) ?
      this.triggerNode.classList.remove(this.TRIGGER_CLASS_OPENED) :
      this.open(submenuIndex);
  }

  createItems(items: MenuItem[], menu: Menu): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      let menuItem = items[i];

      const subitems = (typeof menuItem.items == 'function') ? menuItem.items(this.columnIndex) : menuItem.items;
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

        if (typeof menuItem.isChecked == 'function' && menuItem.isChecked(this.columnIndex)) {
          return 'fa fa-check';
        }

        return '';
      },
      execute: (): void => {
        if (menuItem.action && typeof menuItem.action == 'function') {
          menuItem.action(this.columnIndex);
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

  private handleKeydownEvent(event: KeyboardEvent): void {
    this.menu.isVisible && this.menu.handleEvent(event);
  }

  private addItemsFiltering(menu: Menu): void {
    const filterWrapper = document.createElement('div');

    filterWrapper.classList.add('dropdown-menu-search');
    filterWrapper.innerHTML = '<i class="fa fa-search"></i><input placeholder="search regexp...">';

    menu.node.insertAdjacentElement('afterbegin', filterWrapper);

    // $(menu.node)
    //   .on('mouseup', '.dropdown-menu-search input', (e) => {
    //     $(e.currentTarget).focus();
    //     e.stopImmediatePropagation();
    //   })
    //   .on('keydown.keyTable', '.dropdown-menu-search input', function(event) { event.stopImmediatePropagation(); })
    //   .on('keyup.HeaderMenu, change', '.dropdown-menu-search input', function(event) {
    //     const searchExp = this.value ? new RegExp(this.value, 'i') : null;
    //
    //     if (event.keyCode === 27) {
    //       menu.close();
    //
    //       return;
    //     }
    //
    //     menu.items.forEach((item, index) => {
    //       const node = $(menu.contentNode).find('.p-Menu-item').get(index);
    //
    //       $(node).toggleClass(
    //         'hidden',
    //         searchExp && _.isRegExp(searchExp) ? !searchExp.test(item.label) : false
    //       );
    //     });
    //   });
  }
}
