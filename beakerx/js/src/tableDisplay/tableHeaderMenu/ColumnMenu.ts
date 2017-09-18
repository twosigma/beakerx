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
import { Menu, Widget } from '@phosphor/widgets';
import $ from 'jquery';
import _ from 'underscore';

interface Dom {
  container: any,
  menu: any
}

class ColumnMenu {
  private dom: Dom;
  private menu: Menu;
  private column: any;
  private dtApi: any;
  private cell: any;
  public columnIndex: any;

  private commands: CommandRegistry = new CommandRegistry();

  constructor(scope, column, cellSettings) {
    this.dtApi = scope.table;
    this.column = column;
    this.cell = cellSettings.cell;
    this.dom = {
      container:  $(this.dtApi.table().container()),
      menu:       null
    };

    this.buildMenu();

    const dtSettings = this.dtApi.settings()[0];
    dtSettings.oApi._fnCallbackReg(dtSettings, 'aoDestroyCallback', $.proxy(this.destroy, this), 'HeaderMenu');
    $(document).off('keydown', this.closeMenu);
    $(document).on('keydown', this.closeMenu);
  }

  closeMenu(): Function {
    return _.debounce((event) => {
      if (event.which === 27) {
        this.menu.hide();
      }
    }, 250);
  }

  private buildMenu(): void {
    const menu = this.column.header && this.column.header.menu;
    const $trigger = $("<span/>", { 'class': 'bko-menu bko-column-header-menu' });
    const self = this;

    if (!this.cell || !menu || !$.isArray(menu.items)) {
      return;
    }
    $(this.cell).append($trigger);

    this.dom.menu = $trigger;
    this.columnIndex = self.getColumnIndex();

    this.menu = new Menu({ commands: this.commands });
    this.menu.addClass('bko-header-menu');
    this.menu.addClass('dropdown');
    $(this.menu.contentNode).addClass('dropdown-menu');

    this.buildMenuItems(menu.items, this.menu);
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

  private getColumnIndex(): number {
    let columnIndex = this.dtApi.column($(this.cell).index() + ':visible').index();
    const fixedCols = this.dtApi.settings()[0]._oFixedColumns;
    const rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;

    if (rightHeader && $(rightHeader).has(this.dom.menu).length) {
      columnIndex = this.dtApi.columns(':visible')[0].length - fixedCols.s.rightColumns + columnIndex;
    }

    return columnIndex;
  }

  private getMenuPosition($notebookCell, $trigger) {
    const $cell = $trigger.parent();
    const rectObject = $trigger[0].getBoundingClientRect();
    const pageHeight = window.innerHeight || document.documentElement.clientHeight;
    const pixelsBelowViewport = Math.ceil($(this.menu.contentNode).height() + rectObject.bottom - pageHeight);

    return {
      top: ($cell.offset().top - $notebookCell.offset().top + $trigger.height() - (pixelsBelowViewport > 0 ? pixelsBelowViewport : 0)),
      left: $cell.offset().left - $notebookCell.offset().left + (pixelsBelowViewport > 0 ? $trigger.height() : 0)
    };
  }

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

  private buildMenuItems(options: any[], menu: Menu): void {
    for (let i = 0, ien = options.length; i < ien; i++) {
      let option = options[i];
      const subitems = (typeof option.items == 'function') ? option.items(this.columnIndex) : option.items;
      const hasSubitems = $.isArray(subitems) && subitems.length;

      this.commands.addCommand(option.title, {
        label: option.title,
        usage: option.tooltip || '',
        iconClass: () => {
          if (option.icon) {
            return option.icon;
          }

          if (typeof option.isChecked == 'function' && option.isChecked(this.columnIndex)) {
            return 'fa fa-check';
          }

          return '';
        },
        execute: (): void => {
          if (option.action && typeof option.action == 'function') {
            option.action(this.columnIndex);
          }
        }
      });

      option.separator && menu.addItem({ type: 'separator' });
      !hasSubitems && menu.addItem({command: option.title});

      if (option.shortcut) {
        this.commands.addKeyBinding({
          keys: [option.shortcut],
          selector: '.cell',
          command: option.title
        });
      }

      if (hasSubitems) {
        const submenu = new Menu({ commands: this.commands });

        submenu.addClass('dropdown-submenu');
        submenu.title.label = option.title;
        submenu.setHidden(false);
        menu.addItem({ type: 'submenu', submenu });

        this.buildMenuItems(subitems, submenu);
      }

      //
      // if (!_.isEmpty(oItem.tooltip)) {
      //   $li.attr('title', oItem.tooltip);
      // }
    }
  }

  destroy(): void {
    $(document.body).off('click.table-headermenu');
    this.dom.container.off('click.headermenu');
    this.dom.container = null;
  }
}

export default function columnColumnMenus(scope) {
  const settings = scope.table.settings()[0];
  const init = settings.oInit.columns;
  const columns = scope.columns;
  const menus: ColumnMenu[] = [];

  if (init !== false && (init || columns)) {
    const allColumns = { ...init, ...columns };
    const cells = settings.aoHeader[0];

    for (let i = 0, len = cells.length; i < len ; i++) {
      if (allColumns && allColumns[i] !== undefined) {
        menus.push(new ColumnMenu(scope, allColumns[i], cells[i]));
      }
    }
  }

  $(scope.element).on('click.headermenu', '.bko-column-header-menu', function(e) {
    var colIdx = $(this).parent().index();
    var fixedCols = scope.table.settings()[0]._oFixedColumns;
    var rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;

    if (rightHeader && $(rightHeader).has(this).length) {
      colIdx = scope.table.columns(':visible')[0].length - fixedCols.s.rightColumns + colIdx;
    }

    for(let i = 0; i < menus.length; i++) {
      if (menus[i].columnIndex === colIdx) {
        menus[i].open($(scope.element).closest('.cell'), $(this));
        break;
      }
    }
  });

  return menus;
};
