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

import MenuItem from "../../../shared/interfaces/menuItemInterface";
import { TIME_UNIT_FORMATS, scopeData } from '../../consts';
import { getAllowedTypesByType } from "../dataTypes";
import DataGridColumn from "../column/DataGridColumn";

export function createFormatMenuItems(column: DataGridColumn) {
  const dataGrid = column.dataGrid;
  const types = getAllowedTypesByType(dataGrid.model.getColumnDataType(column));
  let items: MenuItem[] = [];

  types.forEach((obj) => {
    if (obj.type === 8) { //datetime
      items = items.concat(createTimeSubitems(column));

      return;
    }

    let item: MenuItem = {
      title: obj.name,
      isChecked: function() {
        //@todo
      }
    };

    if (obj.type === 4) { //double with precision
      item.items = createPrecisionSubitems(column);
    } else {
      item.action = function(colIdx) {
        //@todo
      }
    }
    items.push(item);
  });

  return items;
}

export function createPrecisionSubitems(column: DataGridColumn): MenuItem[] {
  const items: MenuItem[] = [];
  const formetters = column.dataGrid.model.dataFormatter.getDoubleWithPrecissionFormatters(
    scopeData.allPrecissions
  );

  formetters.forEach((formatter, precision) => {
    let item = {
      title: `${precision}`,
      isChecked: () => {
        //@todo
      },
      action: () => {
        //@todo
      }
    };

    items.push(item);
  });

  return items;
}

export function createTimeSubitems(column: DataGridColumn): MenuItem[] {
  const items: MenuItem[] = [];

  Object.keys(TIME_UNIT_FORMATS).forEach((key) => {
    if (TIME_UNIT_FORMATS.hasOwnProperty(key)) {
      let item = {
        title: TIME_UNIT_FORMATS[key].title,
        isChecked: function() {
          //@todo
        },
        action: function() {
          //@todo
        }
      };

      items.push(item);
    }
  });

  return items;
}
