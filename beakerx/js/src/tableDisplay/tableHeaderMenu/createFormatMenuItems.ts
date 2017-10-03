import MenuItem from "./MenuItemInterface";

declare function require(moduleName: string): any;

import _ from 'underscore';
const tableConsts = require('../consts');

const getColumnTypes = (scope: any, colIdx: number): object[] => {
  if (colIdx === 0) {
    return scope.hasIndex && scope.indexType ? scope.getAllowedTypesByType(scope.indexType) : scope.allIntTypes;
  }

  return scope.getCellDispOptsF(colIdx - 1);
};

const setActualType = (colIdx: number, scope: any, type: string|number): void => {
  if (colIdx === 0) {
    scope.indexActualType = type;
  } else {
    scope.getCellDisp[scope.colorder[colIdx] - 1] = type;
    scope.actualtype[scope.colorder[colIdx] - 1] = type;
  }
};

const changeIndexColumnPrecision = (scope, precision): void => {
  if(scope.indexType === 'double') {
    scope.indexActualType = scope.getActualTypeByPrecision(precision);
    scope.applyChanges();
  }
};

export default function createFormatSubitems(scope: any, colIdx: number) {
  const types = getColumnTypes(scope, colIdx);
  let items: MenuItem[] = [];

  _.each(types, function(obj) {
    if (obj.type === 8) { //datetime
      items = items.concat(createTimeSubitems(scope));

      return;
    }

    let item: MenuItem = {
      title: obj.name,
      isChecked: function(colIdx) {
        if (colIdx === 0) {
          return obj.type === scope.indexActualType;
        }

        return scope.actualtype[scope.colorder[colIdx] - 1] === obj.type;
      }
    };

    if (obj.type === 4) { //double with precision
      item.items = createPrecisionSubitems(scope);
    } else {
      item.action = function(colIdx) {
        setActualType(colIdx, scope, obj.type);
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
        if (colIdx === 0) {
          return scope.indexActualType === scope.getActualTypeByPrecision(precision);
        }

        return scope.actualtype[scope.colorder[colIdx] - 1] === scope.getActualTypeByPrecision(precision);
      },
      action: function(colIdx) {
        if (colIdx === 0) {
          changeIndexColumnPrecision(scope, precision);
        } else {
          scope.changePrecision(scope.colorder[colIdx] - 1, precision);
        }
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
          if (colIdx === 0) {
            return scope.indexActualType === 8 &&
              (unit === scope.formatForTimes || unit == 'DATETIME' && _.isEmpty(scope.formatForTimes));
          }

          return scope.actualtype[scope.colorder[colIdx] - 1] === 8 &&
            (unit === scope.formatForTimes || unit == 'DATETIME' && _.isEmpty(scope.formatForTimes));
        },
        action: function(colIdx) {
          setActualType(colIdx, scope, 8);
          scope.changeTimeFormat(unit);
        }
      };

      items.push(item);
    }
  });

  return items;
}
