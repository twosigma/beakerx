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
import {IBeakerxDataGridState} from "../store/dataStore";
import {getAlignmentByChar, getAlignmentByType} from "../column/columnAlignment";
import {ALL_TYPES} from "../dataTypes";

export const selectModel = (state: IBeakerxDataGridState): IDataModelState => state.model;
export const selectValues = (state: IBeakerxDataGridState) => selectModel(state).values;
export const selectHasIndex = (state: IBeakerxDataGridState) => selectModel(state).hasIndex;
export const selectTooltips = (state: IBeakerxDataGridState) => selectModel(state).tooltips;
export const selectCellHighlighters = (state: IBeakerxDataGridState): IHihglighterState[] => selectModel(state).cellHighlighters || [];
export const selectHeadersVertical = (state: IBeakerxDataGridState) => selectModel(state).headersVertical;
export const selectHeaderFontSize = (state: IBeakerxDataGridState) => selectModel(state).headerFontSize;
export const selectDataFontSize = (state: IBeakerxDataGridState) => selectModel(state).dataFontSize;
export const selectFontColor = (state: IBeakerxDataGridState) => selectModel(state).fontColor;
export const selectColumnNames = (state: IBeakerxDataGridState) => selectModel(state).columnNames || [];
export const selectColumnTypes = (state: IBeakerxDataGridState) => selectModel(state).types;
export const selectColumnOrder = (state: IBeakerxDataGridState) => selectModel(state).columnOrder;
export const selectColumnsVisible = (state: IBeakerxDataGridState) => selectModel(state).columnsVisible || {};
export const selectAlignmentForColumn = (state: IBeakerxDataGridState) => selectModel(state).alignmentForColumn || {};
export const selectAlignmentForType = (state: IBeakerxDataGridState) => selectModel(state).alignmentForType || {};
export const selectHasDoubleClickAction = (state: IBeakerxDataGridState) => selectModel(state).hasDoubleClickAction;
export const selectDoubleClickTag = (state: IBeakerxDataGridState) => selectModel(state).doubleClickTag;
export const selectContextMenuItems = (state: IBeakerxDataGridState) => selectModel(state).contextMenuItems || [];
export const selectContextMenuTags = (state: IBeakerxDataGridState) => selectModel(state).contextMenuTags || {};
export const selectStringFormatForType = (state: IBeakerxDataGridState) => selectModel(state).stringFormatForType;
export const selectStringFormatForcolumn = (state: IBeakerxDataGridState) => selectModel(state).stringFormatForColumn || {};
export const selectInitialColumnAlignment = (
  state: IBeakerxDataGridState,
  dataType: ALL_TYPES,
  columnName: string
) => {
  const alignmentForColumn = selectAlignmentForColumn(state)[ALL_TYPES[dataType]];
  const alignmentForType = selectAlignmentForType(state)[columnName];

  if (alignmentForType) {
    return getAlignmentByChar(alignmentForType);
  }

  if (alignmentForColumn) {
    return getAlignmentByChar(alignmentForColumn);
  }

  return getAlignmentByType(dataType);
};

// Returns the map columnIndex => position
export const selectInitialColumnPositions = (state) => {
  const columnOrder = selectColumnOrder(state);
  const columnNames = selectColumnNames(state);
  const hasInitialOrder = columnOrder && columnOrder.length > 0;
  const positions = columnNames.map((name, index) => index);
  const columnsVisible = selectColumnsVisible(state);

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
};
