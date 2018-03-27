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

export const selectModel = (state): IDataModelState => state.model;
export const selectValues = (state) => selectModel(state).values;
export const selectHasIndex = (state) => selectModel(state).hasIndex;
export const selectTooltips = (state) => selectModel(state).tooltips;
export const selectCellHighlighters = (state): IHihglighterState[] => selectModel(state).cellHighlighters || [];
export const selectHeadersVertical = (state) => selectModel(state).headersVertical;
export const selectHeaderFontSize = (state) => selectModel(state).headerFontSize;
export const selectDataFontSize = (state) => selectModel(state).dataFontSize;
export const selectFontColor = (state) => selectModel(state).fontColor;
export const selectColumnNames = (state) => selectModel(state).columnNames || [];
export const selectColumnTypes = (state) => selectModel(state).types;
export const selectColumnOrder = (state) => selectModel(state).columnOrder;
export const selectColumnsVisible = (state) => selectModel(state).columnsVisible || {};
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

// Returns the map columnIndex => position
export const selectInitialColumnPositions = createSelector(
  [selectColumnOrder, selectColumnNames, selectColumnsVisible],
  (columnOrder, columnNames, columnsVisible) => {
  const hasInitialOrder = columnOrder && columnOrder.length > 0;
  const positions = columnNames.map((name, index) => index);

  if (hasInitialOrder) {
    columnOrder.reverse().forEach((name) => {
      const columnIndex = columnNames.indexOf(name);

      if (columnIndex === -1) {
        return true;
      }

      const columnPosition = positions.indexOf(columnIndex);

      positions.splice(columnPosition, 1);
      positions.unshift(columnIndex);
    });
  }

  Object.keys(columnsVisible).forEach((name, index) => {
    if (columnsVisible[name] === false) {
      let columnIndex = columnNames.indexOf(name);
      let indexToRemove = positions.indexOf(columnIndex);
      let removed = positions.splice(indexToRemove, 1)[0];

      positions.push(removed);
    }
  });

  const result: number[] = [];

  positions.forEach((column: number, position: number) => {
    result[column] = position;
  });

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
