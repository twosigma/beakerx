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

import IDataModelState from "../interface/IDataGridModelState";
import IHihglighterState from "../interface/IHighlighterState";
import {getAlignmentByChar, getAlignmentByType} from "../column/columnAlignment";
import {ALL_TYPES} from "../dataTypes";
import {TIME_UNIT_FORMATS} from "../../consts";
import { createSelector } from 'reselect'
import {IColumnPosition} from "../interface/IColumn";
import {DataModel} from "@phosphor/datagrid";

export const DEFAULT_INDEX_COLUMN_NAME = 'index';

export const selectModel = (state): IDataModelState => state.model;
export const selectValues = (state) => selectModel(state).values;
export const selectHasIndex = (state) => selectModel(state).hasIndex;
export const selectTooltips = (state) => selectModel(state).tooltips;
export const selectCellHighlighters = (state): IHihglighterState[] => selectModel(state).cellHighlighters || [];
export const selectHeadersVertical = (state) => selectModel(state).headersVertical;
export const selectHeaderFontSize = (state) => selectModel(state).headerFontSize;
export const selectDataFontSize = (state) => selectModel(state).dataFontSize;
export const selectFontColor = (state) => selectModel(state).fontColor;
export const selectRawColumnNames = (state) => selectModel(state).columnNames || [];
export const selectColumnsFrozen = (state) => selectModel(state).columnsFrozen || {};
export const selectColumnsFrozenNames = createSelector(
  [selectColumnsFrozen],
  (columnsFrozen): string[] => Object.keys(columnsFrozen).filter(key => columnsFrozen[key])
);
export const selectColumnsFrozenCount = (state) => selectColumnsFrozenNames(state).length;
export const selectIsColumnFrozen = createSelector(
  [selectColumnsFrozenNames, (state, column) => column],
  (columnsFrozen, column) => columnsFrozen.indexOf(column.name) !== -1
);
export const selectColumnNames = createSelector(selectRawColumnNames,names => names.map(name => name !== null ? String(name) : null));
export const selectBodyColumnNames = createSelector(
  [selectColumnNames, selectHasIndex],
  (columnNames, hasIndex) => hasIndex ? columnNames.slice(1) : columnNames
);
export const selectColumnTypes = (state) => selectModel(state).types;
export const selectColumnOrder = (state) => selectModel(state).columnOrder;
export const selectColumnsVisible = (state) => selectModel(state).columnsVisible || {};
export const selectColumnVisible = createSelector(
  [selectColumnsVisible, selectColumnOrder, (state, column) => column],
  (columnsVisible, columnsOrder, column) => (
    columnsVisible[column.name] !== false
    && (columnsOrder.length === 0 || columnsOrder.indexOf(column.name) !== -1)
  )
);
export const selectAlignmentForColumn = (state, dataType, columnName) => (selectModel(state).alignmentForColumn || {})[columnName];
export const selectAlignmentForType = (state, dataType) => (selectModel(state).alignmentForType || {})[ALL_TYPES[dataType]];
export const selectAlignmentByType = (state, dataType) => getAlignmentByType(dataType);
export const selectHasDoubleClickAction = (state) => selectModel(state).hasDoubleClickAction;
export const selectDoubleClickTag = (state) => selectModel(state).doubleClickTag;
export const selectContextMenuItems = (state) => selectModel(state).contextMenuItems || [];
export const selectContextMenuTags = (state) => selectModel(state).contextMenuTags || {};
export const selectStringFormatForType = (state) => selectModel(state).stringFormatForType;
export const selectStringFormatForColumn = (state) => selectModel(state).stringFormatForColumn || {};
export const selectStringFormatForTimes = (state) => selectModel(state).stringFormatForTimes;
export const selectFormatForTimes = (state) => TIME_UNIT_FORMATS[selectStringFormatForTimes(state)];
export const selectTimeStrings = (state) => selectModel(state).timeStrings;
export const selectRendererForColumn = (state, column) => selectModel(state).rendererForColumn[column.name];
export const selectRendererForType = (state, column) => selectModel(state).rendererForType[column.getDataTypeName()];
export const selectTimeZone = (state) => selectModel(state).timeZone;
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
});

export const selectRenderer = createSelector(
  [selectRendererForColumn, selectRendererForType],
  (columnRenderer, typeRenderer) => {
    if (columnRenderer || columnRenderer === null) {
      return columnRenderer;
    }

    return typeRenderer;
  }
);
