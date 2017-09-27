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

import $ from 'jquery';
import _ from 'underscore';
import { CommandRegistry } from '@phosphor/commands';
import { Widget } from '@phosphor/widgets';
import Menu from './BkoMenu';
import MenuItem from './MenuItemInterface';

export default abstract class HeaderMenu {
  columnIndex: number;

  protected commands: CommandRegistry;
  protected menu: Menu;
  protected dtApi: any;
  protected cell: any;
  protected scopeElement: any;

  static DEBOUNCE_DELAY: number = 250;

  constructor(scope) {
    this.dtApi = scope.table;
    this.commands = new CommandRegistry();
    this.menu = new Menu({ commands: this.commands });
    this.scopeElement = scope.element;
    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);

    this.bindEvents();
  }

  protected abstract buildMenu($trigger?: any): void

  protected destroy(): void {
    this.scopeElement.off('click.HeaderMenu, keydown.HeaderMenu');
    $(this.menu.node).off('keyup.keyTable, change');
    $(document.body).off('click.table-headermenu');
    $(document).off('keydown.keyTable', this.handleKeydownEvent);
    $(this.menu.node).off('keydown.HeaderMenu', '.dropdown-menu-search input', this.handleKeydownEvent)
  }

  protected getMenuPosition($notebookCell, $trigger) {
    const $cell = $trigger.parent();
    const rectObject = $trigger[0].getBoundingClientRect();
    const pageHeight = window.innerHeight || document.documentElement.clientHeight;
    const pixelsBelowViewport = Math.ceil($(this.menu.contentNode).height() + rectObject.bottom - pageHeight);
    const triggerHeight = $trigger.height() || 20;

    return {
      top: ($cell.offset().top - $notebookCell.offset().top + triggerHeight - (pixelsBelowViewport > 0 ? pixelsBelowViewport : 0)),
      left: $cell.offset().left - $notebookCell.offset().left + (pixelsBelowViewport > 0 ? triggerHeight : 0)
    };
  }

  open($notebookCell, $trigger): void {
    Widget.attach(this.menu, $notebookCell[0]);
    this.menu.node.style.top = null;
    this.menu.node.style.bottom = '0px';
    this.menu.addClass('open');
    this.menu.show();

    const menuPosition = this.getMenuPosition($notebookCell, $trigger);
    this.menu.node.style.top =  menuPosition.top + 'px';
    this.menu.node.style.left = menuPosition.left + 'px';
    this.menu.node.style.bottom = null;
  }

  createItems(items: MenuItem[], menu: Menu): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      let menuItem = items[i];

      const subitems = (typeof menuItem.items == 'function') ? menuItem.items(this.columnIndex) : menuItem.items;
      const hasSubitems = $.isArray(subitems) && subitems.length;

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
        selector: '.cell',
        command: menuItem.title
      });
    }
  }

  createSubmenu(menuItem: MenuItem, subitems: MenuItem[]): Menu {
    const submenu = new Menu({ commands: this.commands });

    submenu.addClass('dropdown-submenu');
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

  private bindEvents(): void {
    const dtSettings = this.dtApi.settings()[0];

    dtSettings.oApi._fnCallbackReg(dtSettings, 'aoDestroyCallback', $.proxy(this.destroy, this), 'HeaderMenu');
    this.scopeElement.on('keydown.HeaderMenu', this.handleKeydownEvent);
    $(document).on('keydown.keyTable', this.handleKeydownEvent);
  }

  private addItemsFiltering(menu: Menu): void {
    const filterWrapper = document.createElement('div');

    filterWrapper.classList.add('dropdown-menu-search');
    filterWrapper.innerHTML = '<i class="fa fa-search"></i><input placeholder="search regexp...">';

    menu.node.insertAdjacentElement('afterbegin', filterWrapper);

    $(menu.node)
      .on('mouseup', '.dropdown-menu-search input', (e) => {
        $(e.currentTarget).focus();
        e.stopImmediatePropagation();
      })
      .on('keydown.keyTable', '.dropdown-menu-search input', function(event) { event.stopImmediatePropagation(); })
      .on('keyup.HeaderMenu, change', '.dropdown-menu-search input', function(event) {
        const searchExp = this.value ? new RegExp(this.value, 'i') : null;

        if (event.keyCode === 27) {
          menu.close();

          return;
        }

        menu.items.forEach((item, index) => {
          const node = $(menu.contentNode).find('.p-Menu-item').get(index);

          $(node).toggleClass(
            'hidden',
            searchExp && _.isRegExp(searchExp) ? !searchExp.test(item.label) : false
          );
        });
      });
  }
}
