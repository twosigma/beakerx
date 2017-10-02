import MenuItem from "./MenuItemInterface";

declare function require(moduleName: string): any;

import _ from 'underscore';
const tableConsts = require('../consts');

export default function createFormatSubitems(scope: any, colIdx?: number) {
  const types = colIdx !== undefined ? scope.getCellDispOptsF(colIdx - 1) : scope.allTypes;
  let items: MenuItem[] = [];

  _.each(types, function(obj) {
    if (obj.type === 8) { //datetime
      items = items.concat(createTimeSubitems(scope));
      
      return;
    }
    
    let item: MenuItem = {
      title: obj.name,
      isChecked: function(colIdx) {
        return scope.actualtype[scope.colorder[colIdx] - 1] === obj.type;
      }
    };
    
    if (obj.type === 4) { //double with precision
      item.items = createPrecisionSubitems(scope);
    } else {
      item.action = function(colIdx) {
        scope.getCellDisp[scope.colorder[colIdx] - 1] = obj.type;
        scope.actualtype[scope.colorder[colIdx] - 1] = obj.type;
        scope.applyChanges();
      }
    }
    items.push(item);
  });

  return items;
}

export function createPrecisionSubitems(scope): MenuItem[] {
  const items: MenuItem[] = [];

  _.each(scope.doubleWithPrecisionConverters, function(func, precision) {
    let item = {
      title: precision,
      isChecked: function(colIdx) {
        return scope.actualtype[scope.colorder[colIdx] - 1] === scope.getActualTypeByPrecision(precision);
      },
      action: function(colIdx) {
        scope.changePrecision(scope.colorder[colIdx] - 1, precision);
      }
    };

    items.push(item);
  });

  return items;
}

export function createTimeSubitems(scope): MenuItem[] {
  const items: MenuItem[] = [];

  _.forEach(tableConsts.TIME_UNIT_FORMATS, function(value, unit) {
    if (tableConsts.TIME_UNIT_FORMATS.hasOwnProperty(unit)) {
      let item = {
        title: value.title,
        isChecked: function(colIdx) {
          return scope.actualtype[scope.colorder[colIdx] - 1] === 8 &&
            (unit === scope.formatForTimes || unit == 'DATETIME' && _.isEmpty(scope.formatForTimes));
        },
        action: function(colIdx) {
          scope.getCellDisp[scope.colorder[colIdx] - 1] = 8;
          scope.actualtype[scope.colorder[colIdx] - 1] = 8;

          scope.changeTimeFormat(unit);
        }
      };

      items.push(item);
    }
  });

  return items;
}
