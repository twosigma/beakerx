/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import {createSelector} from "reselect";
import {DataModel} from "@phosphor/datagrid";
import {
  selectAlignmentByType,
  selectAlignmentForColumn,
  selectAlignmentForType,
  selectCellHighlighters,
  selectColumnOrder,
  selectColumnsFrozen,
  selectColumnsVisible,
  selectColumnTypes,
  selectHasIndex,
  selectRawColumnNames,
  selectRendererForColumn,
  selectRendererForType,
  selectStringFormatForColumn,
  selectStringFormatForType
} from "./model";
import {getAlignmentByChar} from "../../column/columnAlignment";
import {IColumnPosition} from "../../interface/IColumn";
import {ALL_TYPES} from "../../dataTypes";
import IHihglighterState from "../../interface/IHighlighterState";

export const DEFAULT_INDEX_COLUMN_NAME = 'index';


const processColumnName = (name) => {
  if (name === null) {
    return name;
  }

  if (!Array.isArray(name)) {
    return String(name);
  }

  const isDate = (value) => {
    return value instanceof Object &&
      value.hasOwnProperty('type') &&
      value.hasOwnProperty('timestamp') &&
      value.type === "Date";
  };

  return name.reduce((prev, curr, index, arr) => {
    let processed = isDate(curr) ?
      moment(curr.timestamp).format('YYYY-MM-DD') :
      String(curr);

    return index === 0 ? processed: `${prev}, ${processed}`;
  }, '');
};

export const selectColumnNames = createSelector(
  selectRawColumnNames,
  names => names.map(processColumnName)
);

export const selectBodyColumnNames = createSelector(
  [selectColumnNames, selectHasIndex],
  (columnNames, hasIndex) => hasIndex ? columnNames.slice(1) : columnNames
);

export const selectColumnIndexByName = createSelector(
  [selectBodyColumnNames, (state, name) => name],
  (names, name) => {
    const index = names.indexOf(String(name));

    return index !== -1 ? index : 0;
  }
);

export const selectIndexColumnNames = createSelector(
  [selectColumnNames, selectHasIndex],
  (columnNames, hasIndex) => hasIndex && columnNames[0] !== null ? [columnNames[0]] : [DEFAULT_INDEX_COLUMN_NAME]
);

export const selectColumnsFrozenNames = createSelector(
  [selectColumnsFrozen, selectIndexColumnNames],
  (columnsFrozen, indexColumnNames): string[] => Object.keys(columnsFrozen).filter(
    name => columnsFrozen[name] && indexColumnNames.indexOf(name) === -1
  )
);

export const selectColumnsFrozenCount = (state) => selectColumnsFrozenNames(state).length;
export const selectIsColumnFrozen = createSelector(
  [selectColumnsFrozenNames, (state, column) => column],
  (columnsFrozen, column) => columnsFrozen.indexOf(column.name) !== -1
);

export const selectColumnVisible = createSelector(
  [selectColumnsVisible, selectColumnOrder, (state, column) => column],
  (columnsVisible, columnsOrder, column) => (
    columnsVisible[column.name] !== false
    && (columnsOrder.length === 0 || columnsOrder.indexOf(column.name) !== -1)
  )
);

export const selectInitialColumnAlignment = createSelector(
  [selectAlignmentForColumn, selectAlignmentForType, selectAlignmentByType],
  (alignmentForColumn, alignmentForType, alignmentByType) => {
    if (alignmentForColumn) {
      return getAlignmentByChar(alignmentForColumn);
    }

    if (alignmentForType) {
      return getAlignmentByChar(alignmentForType);
    }

    return alignmentByType;
  }
);

export const selectVisibleColumnsFrozenCount = createSelector(
  [selectColumnsFrozenNames, selectColumnsVisible],
  (columnsFrozenNames, columnsVisible) => columnsFrozenNames
    .filter(name => columnsVisible[name] !== false)
    .length
);

export const selectColumnDataTypeByName = createSelector(
  [selectColumnTypes, selectRawColumnNames, (state, name) => name],
  (types, names, name) => ALL_TYPES[types[names.indexOf(name)]]
);

// Returns the map columnIndex => position
export const selectInitialColumnPositions = createSelector(
[selectColumnOrder, selectColumnNames, selectColumnsVisible, selectHasIndex, selectColumnsFrozenNames],
(columnOrder, allColumnNames, columnsVisible, hasIndex, columnsFrozenNames) => {
    const hasInitialOrder = columnOrder && columnOrder.length > 0;
    const columnNames = hasIndex ? allColumnNames.slice(1) : allColumnNames;
    const order = [...columnNames];
    const reversedOrder = [...columnOrder].reverse();
    const frozenColumnsOrder = [];

    if (hasInitialOrder) {
      reversedOrder.forEach((name) => {
        const columnPosition = order.indexOf(name);
        const frozenColumnIndex = columnsFrozenNames.indexOf(name);

        if (frozenColumnIndex !== -1) {
          frozenColumnsOrder.unshift(name);
        }

        if (columnPosition === -1) {
          return true;
        }

        order.splice(columnPosition, 1);
        order.unshift(name);
      });
    }

    Object.keys(columnsVisible).forEach((name) => {
      if (columnsVisible[name] === false) {
        let indexToRemove = order.indexOf(name);
        let removed = order.splice(indexToRemove, 1)[0];

        order.push(removed);
      }
    });

    columnsFrozenNames.forEach((name, index) => {
      let frozenColumnIndex = order.indexOf(name);

      if (frozenColumnIndex !== -1) {
        order.splice(frozenColumnIndex, 1);
      }

      if (frozenColumnsOrder.indexOf(name) === -1) {
        frozenColumnsOrder.push(name);
      }
    });

    const result: IColumnPosition[] = [];

    columnNames.forEach((name: string, index: number) => {
      let value = order.indexOf(name);
      let region: DataModel.ColumnRegion = 'body';

      if (value === -1) {
        value = frozenColumnsOrder.indexOf(name) + 1;
        region = 'row-header';
      }

      result[index] = { value, region };
    });

    if (hasIndex) {
      result.unshift({ value: 0, region: 'row-header' });
    }

    return result;
  }
);

export const selectRenderer = createSelector(
  [selectRendererForColumn, selectRendererForType],
  (columnRenderer, typeRenderer) => {
    if (columnRenderer || columnRenderer === null) {
      return columnRenderer;
    }

    return typeRenderer;
  }
);

export const selectColumnHighlighters = createSelector(
  [
    selectCellHighlighters,
    (state, columnName) => columnName,
    (state, columnName, highlighterType) => highlighterType
  ],
  (highlighters, columnName, highlighterType): IHihglighterState[] => highlighters.filter(
    highlighter => highlighter.colName === columnName && highlighter.type === highlighterType
  )
);

export const selectColumnFixedWidth: (state, columnName, typeName) => number|null = createSelector([
    selectStringFormatForColumn,
    selectStringFormatForType,
    (state, columnName) => columnName,
    (state, columnName, typeName) => typeName,
  ],
  (formatForColumns, formatForTypes, columnName, typeName) => {
    if (formatForColumns[columnName] && formatForColumns[columnName].width) {
      return formatForColumns[columnName].width;
    }

    if (formatForTypes[typeName] && formatForTypes[typeName].width) {
      return formatForTypes[typeName].width;
    }

    return null;
  }
);
