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
import { Menu, Widget } from '@phosphor/widgets';
import MenuItem from './MenuItemInterface';

export default abstract class HeaderMenu {
  columnIndex: number;

  protected commands: CommandRegistry;
  protected menu: Menu;
  protected dtApi: any;
  protected cell: any;

  constructor(scope) {
    this.dtApi = scope.table;
    this.commands = new CommandRegistry();
    this.menu = new Menu({ commands: this.commands });

    const dtSettings = this.dtApi.settings()[0];

    $(document).off('keydown', this.closeMenu);
    $(document).on('keydown', this.closeMenu);
    dtSettings.oApi._fnCallbackReg(dtSettings, 'aoDestroyCallback', $.proxy(this.destroy, this), 'HeaderMenu');
  }

  protected abstract destroy(): void

  protected abstract buildMenu($trigger?: any): void

  private setCodeMirrorListener(): void {
    const self = this;
    const CodeMirrorInstance = $(this.cell).find('.CodeMirror');

    if (CodeMirrorInstance) {
      CodeMirrorInstance.off('mousedown.beakerDropdown');
      CodeMirrorInstance.on('mousedown.beakerDropdown', function() {
        self.menu.hide();
        CodeMirrorInstance.off('mousedown.beakerDropdown');
      });
    }
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
    this.setCodeMirrorListener();

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

  closeMenu(): Function {
    return _.debounce((event) => {
      if (event.which === 27) {
        this.menu.hide();
      }
    }, 250);
  }

  createItems(items: MenuItem[], menu: Menu): void {
    for (let i = 0, ien = items.length; i < ien; i++) {
      let menuItem = items[i];

      const subitems = (typeof menuItem.items == 'function') ? menuItem.items(this.columnIndex) : menuItem.items;
      const hasSubitems = $.isArray(subitems) && subitems.length;

      !hasSubitems && this.commands.addCommand(menuItem.title, {
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
          }
        }
      });

      menuItem.separator && menu.addItem({ type: 'separator' });
      !hasSubitems && menu.addItem({command: menuItem.title});

      if (menuItem.shortcut) {
        this.commands.addKeyBinding({
          keys: [menuItem.shortcut],
          selector: '.cell',
          command: menuItem.title
        });
      }

      if (hasSubitems) {
        const submenu = new Menu({ commands: this.commands });

        submenu.addClass('dropdown-submenu');
        submenu.title.label = menuItem.title;
        submenu.setHidden(false);
        menu.addItem({ type: 'submenu', submenu });

        this.createItems(subitems, submenu);
      }
    }
  }
}
