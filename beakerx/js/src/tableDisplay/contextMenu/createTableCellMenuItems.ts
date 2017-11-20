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

export default function createTableCellMenuItems(scope: any, model: any): MenuItem[] {
  const selector = `#${scope.id}_wrapper thead`;
  const contextMenuItems = {};

  if (!_.isEmpty(model.contextMenuItems)) {
    _.forEach(model.contextMenuItems, function(item) {
      contextMenuItems[item] = {
        title: item,
        action: function(itemKey, options) {
          var index = scope.table.cell(options.$trigger.get(0)).index();
          scope.tableDisplayModel.send({ event: 'CONTEXT_MENU_CLICK', itemKey : itemKey, row : index.row, column : index.column - 1}, scope.tableDisplayView.callbacks());
        }
      }
    });
  }

  if (!_.isEmpty(model.contextMenuTags)) {
    _.forEach(model.contextMenuTags, function(tag, name) {
      if (model.contextMenuTags.hasOwnProperty(name)) {
        scope.contextMenuItems[name] = {
          name: name,
          callback: function(itemKey, options) {
            var index = scope.table.cell(options.$trigger.get(0)).index();
            var params = {
              actionType: 'CONTEXT_MENU_CLICK',
              contextMenuItem: itemKey,
              row: index.row,
              col: index.column - 1
            };
            scope.tableDisplayModel.send({event: 'actiondetails', params: params}, scope.tableDisplayView.callbacks());
          }
        }
      }
    });
  }

  return [
  ]
}
