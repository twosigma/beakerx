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

import MenuItem from '../../shared/interfaces/contextMenuItemInterface';
import _ from 'underscore';

interface cellIndex { row: number, column: number }

export default function createTableCellMenuItems(scope: any, model: any): MenuItem[] {
  const selector = `#${scope.id} tbody td`;

  function getTableCellIndex(node: HTMLElement|null): cellIndex|null {
    if (!node) {
      return null;
    }

    if (node instanceof HTMLTableCellElement) {
      return scope.table.cell(node).index();
    }

    return getTableCellIndex(node.parentElement);
  }

  function createFromModelContextMenuItems(): MenuItem[] {
    if (_.isEmpty(model.contextMenuItems)) {
      return [];
    }

    return model.contextMenuItems.map(item => ({
      id: `${item}_${scope.id}`,
      title: item,
      selector: selector,
      action: (event) => {
        const index = getTableCellIndex(<HTMLElement>event.target);

        if (!index) {
          return;
        }

        scope.tableDisplayModel.send({
          event: 'CONTEXT_MENU_CLICK',
          itemKey : item,
          row : index.row,
          column : index.column - 1
        }, scope.tableDisplayView.callbacks());
      }
    }));
  }

  function createFromModelContextMenuTags(): MenuItem[] {
    const items: MenuItem[] = [];

    _.forEach(model.contextMenuTags, function(tag, name) {
      if (!model.contextMenuTags.hasOwnProperty(name)) {
        return;
      }

      items.push({
        id: `${tag}_${scope.id}`,
        title: name,
        selector: selector,
        action: function(event) {
          const index = getTableCellIndex(<HTMLElement>event.target);

          if (!index) {
            return;
          }

          const params = {
            actionType: 'CONTEXT_MENU_CLICK',
            contextMenuItem: name,
            row: index.row,
            col: index.column - 1
          };

          scope.tableDisplayModel.send({
            event: 'actiondetails',
            params
          }, scope.tableDisplayView.callbacks());
        }
      });
    });

    return items;
  }

  return [
    ...createFromModelContextMenuItems(),
    ...createFromModelContextMenuTags()
  ]
}
