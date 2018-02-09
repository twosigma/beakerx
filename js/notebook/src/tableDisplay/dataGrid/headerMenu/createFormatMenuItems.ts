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
import { ALL_TYPES, getAllowedTypesByType } from "../dataTypes";
import DataGridColumn from "../column/DataGridColumn";

export function createFormatMenuItems(column: DataGridColumn) {
  const types = getAllowedTypesByType(column.state.dataType);
  let items: MenuItem[] = [];

  types.forEach((obj) => {
    if (obj.type === 8) { //datetime
      items = items.concat(createTimeSubitems());

      return;
    }

    let item: MenuItem = {
      title: obj.name,
      isChecked: (column) => column.state.displayType === obj.type
    };

    if (obj.type === 4) { //double with precision
      item.items = createPrecisionSubitems(column);
    } else {
      item.action = (column) => column.setDisplayType(obj.type)
    }
    items.push(item);
  });

  return items;
}

export function createPrecisionSubitems(column: DataGridColumn): MenuItem[] {
  const items: MenuItem[] = [];
  const formetters = column.dataGrid.model.dataFormatter.getdoubleWithPrecisionFormatters(
    scopeData.allPrecissions
  );

  formetters.forEach((formatter, precision) => {
    let item = {
      title: `${precision}`,
      isChecked: (column) => `4.${precision}` === column.state.displayType,
      action: (column) => column.setDisplayType(`4.${precision}`)
    };

    items.push(item);
  });

  return items;
}

export function createTimeSubitems(): MenuItem[] {
  const items: MenuItem[] = [];

  Object.keys(TIME_UNIT_FORMATS).forEach((key) => {
    let item = {
      title: TIME_UNIT_FORMATS[key].title,
      isChecked: (column) => {
        return (
          column.state.displayType === ALL_TYPES.datetime ||
          column.state.displayType === ALL_TYPES.time
        ) && TIME_UNIT_FORMATS[key] === column.state.formatForTimes
      },
      action: (column) => column.setTimeDisplayType(TIME_UNIT_FORMATS[key])
    };

    items.push(item);
  });

  return items;
}
