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

import { TIME_UNIT_FORMATS, scopeData } from '../consts';
import { ALL_TYPES, getAllowedTypesByType } from "../dataTypes";
import DataGridColumn from "../column/DataGridColumn";
import IMenuItem from "beakerx_shared/lib/contextMenu/IMenuItem";

export function createFormatMenuItems(column: DataGridColumn) {
  const types = getAllowedTypesByType(column.getDataType());
  let items: IMenuItem[] = [];

  if (!column.dataGrid) {
    return [];
  }

  types.forEach((obj) => {
    if (obj.type === 8) { //datetime
      items = items.concat(createTimeSubitems());

      return;
    }

    let item: IMenuItem = {
      title: obj.name,
      id: `format_${obj.name}`,
      isChecked: (column) => column && column.getDisplayType() === obj.type
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

export function createPrecisionSubitems(column: DataGridColumn): IMenuItem[] {
  const items: IMenuItem[] = [];

  scopeData.allPrecissions.forEach((precision) => {
    let item = {
      title: `${precision}`,
      id: `precision_${precision}`,
      isChecked: (column) => `4.${precision}` === column.getDisplayType(),
      action: (column) => column.setDisplayType(`4.${precision}`)
    };

    items.push(item);
  });

  return items;
}

export function createTimeSubitems(): IMenuItem[] {
  const items: IMenuItem[] = [];

  Object.keys(TIME_UNIT_FORMATS).forEach((key) => {
    let item = {
      title: TIME_UNIT_FORMATS[key].title,
      id: `timeunit_${TIME_UNIT_FORMATS[key].title}`,
      isChecked: (column) => {
        const displayType = column && column.getDisplayType();

        return (
          displayType === ALL_TYPES.datetime ||
          displayType === ALL_TYPES.time
        ) && TIME_UNIT_FORMATS[key].format === column.getFormatForTimes().format
          && TIME_UNIT_FORMATS[key].valueModifier === column.getFormatForTimes().valueModifier
      },
      action: (column) => column.setTimeDisplayType(TIME_UNIT_FORMATS[key])
    };

    items.push(item);
  });

  return items;
}
