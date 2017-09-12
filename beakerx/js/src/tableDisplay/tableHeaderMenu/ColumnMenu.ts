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

  private commands: CommandRegistry = new CommandRegistry();

  constructor(scope, column, cellSettings) {
    this.dtApi = scope.table;
    this.column = column;
    this.cell = cellSettings.cell;
    this.dom = {
      container:  $(this.dtApi.table().container()),
      menu:       null
    };
    this.menu = new Menu({ commands: this.commands });
    this.menu.addClass('bko-header-menu');
    this.menu.addClass('dropdown');

    $(this.menu.contentNode).addClass('dropdown-menu');

    this.buildCellMenu(scope);
    // dtSettings.oApi._fnCallbackReg(dtSettings, 'aoDestroyCallback', $.proxy(this._destroy, this), 'HeaderMenu');
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

  buildCellMenu(scope: any): void {
    const menu = this.column.header && this.column.header.menu;
    const $el = $("<span/>", { 'class': 'bko-menu bko-column-header-menu' });
    const $notebookCell = scope.element.closest('.cell');
    const self = this;

    if (!this.cell || !menu || !$.isArray(menu.items)) {
      return;
    }

    $(this.cell).append($el);

    this.dom.menu = $el;
    this.dom.menu.data('columnIndex', $(this.cell).data('columnIndex'));

    this.buildMenuItems(menu.items, this.menu);

    this.dom.menu.on('click', function() {
      self.setCodeMirrorListener();

      self.menu.node.style.top =  $(self.cell).offset().top - $notebookCell.offset().top + $el.height() + 'px';
      self.menu.node.style.left = $(self.cell).offset().left - $notebookCell.offset().left + 'px';

      const fixedCols = self.dtApi.settings()[0]._oFixedColumns;
      const rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;
      let colIdx = $(this).parent().index();

      if (rightHeader && $(rightHeader).has(this).length) {
        colIdx = self.dtApi.columns(':visible')[0].length - fixedCols.s.rightColumns + colIdx;
      }

      self.dom.menu.data('columnIndex', colIdx);
      Widget.attach(self.menu, $notebookCell[0]);
      self.menu.addClass('open');
      self.menu.show();
    });
  }

  setCodeMirrorListener(): void {
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

  buildMenuItems(options: any[], menu: Menu): void {
    for (let i = 0, ien = options.length; i < ien; i++) {
      let option = options[i];
      const subitems = (typeof option.items == 'function') ? option.items(this.dom.menu) : option.items;
      const hasSubitems = $.isArray(subitems) && subitems.length;

      // var $item = $('<a/>')
      //   .attr('href', '#')
      //   .attr('tabindex', '-1')
      //   .attr('id', 'dt-select-all')
      //   .text(oItem.title)
      //   .data('action', oItem.action || '')
      //   .bind('click', function(e) {
      //     // that._handleItemClick($(this));
      //     e.preventDefault();
      //     e.stopPropagation();
      //   });
      //
      this.commands.addCommand(option.title, {
        label: option.title,
        usage: option.tooltip || '',
        iconClass: () => {
          if (option.icon) {
            return option.icon;
          }

          if (typeof option.isChecked == 'function' && option.isChecked(this.dom.menu)) {
            return 'fa fa-check';
          }

          return '';
        },
        execute: (): void => {
          if (option.action && option.action !== '' && typeof option.action == 'function') {
            option.action(this.dom.menu);
          }

          menu.hide();
        }
      });

      !hasSubitems && menu.addItem({ command: option.title });

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

      if (option.separator) {
        menu.addItem({ type: 'separator' });
      }

      //
      // if (!_.isEmpty(oItem.tooltip)) {
      //   $li.attr('title', oItem.tooltip);
      // }
    }
  }
}

export default function createColumnMenu(scope) {
  const settings = scope.table.settings()[0];
  const init = settings.oInit.columns;
  const columns = scope.columns;

  if (init !== false && (init || columns)) {
    const allColumns = { ...init, ...columns };
    const cells = settings.aoHeader[0];

    for (let i = 0, len = cells.length; i < len ; i++) {
      if (allColumns && allColumns[i] !== undefined) {
        new ColumnMenu(scope, allColumns[i], cells[i]);
      }
    }
  }

  return ColumnMenu;
};
