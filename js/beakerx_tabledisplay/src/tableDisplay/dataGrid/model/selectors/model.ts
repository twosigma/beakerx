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

import {DEFAULT_PAGE_LENGTH, TIME_UNIT_FORMATS} from "../../consts";
import {getAlignmentByType} from "../../column/columnAlignment";
import {ALL_TYPES} from "../../dataTypes";
import IDataModelState from "../../interface/IDataGridModelState";
import IHihglighterState from "../../interface/IHighlighterState"

export const selectModel = (state): IDataModelState => state.model;
export const selectValues = (state) => { let model = selectModel(state); return model.hasOwnProperty("filteredValues") ? model.filteredValues: model.values };
export const selectHasIndex = (state) => selectModel(state).hasIndex;
export const selectTooltips = (state) => selectModel(state).tooltips || [];
export const selectCellHighlighters = (state): IHihglighterState[] => selectModel(state).cellHighlighters || [];
export const selectHeadersVertical = (state) => selectModel(state).headersVertical;
export const selectHeaderFontSize = (state) => selectModel(state).headerFontSize;
export const selectDataFontSize = (state) => selectModel(state).dataFontSize;
export const selectFontColor = (state) => selectModel(state).fontColor;
export const selectRawColumnNames = (state) => selectModel(state).columnNames || [];
export const selectAlignmentForColumn = (state, dataType, columnName) => (selectModel(state).alignmentForColumn || {})[columnName];
export const selectAlignmentForType = (state, dataType) => (selectModel(state).alignmentForType || {})[ALL_TYPES[dataType]];
export const selectAlignmentByType = (state, dataType) => getAlignmentByType(dataType);
export const selectHasDoubleClickAction = (state) => selectModel(state).hasDoubleClickAction;
export const selectDoubleClickTag = (state) => selectModel(state).doubleClickTag;
export const selectContextMenuItems = (state) => selectModel(state).contextMenuItems || [];
export const selectContextMenuTags = (state) => selectModel(state).contextMenuTags || {};
export const selectStringFormatForType = (state) => selectModel(state).stringFormatForType;
export const selectStringFormatForColumn = (state) => selectModel(state).stringFormatForColumn || {};
export const selectStringFormatForTimes = (state) => (selectStringFormatForType(state)["time"] || { unit: "DATETIME" })['unit'];
export const selectFormatForTimes = (state) => TIME_UNIT_FORMATS[selectStringFormatForTimes(state)];
export const selectTimeStrings = (state) => selectModel(state).timeStrings;
export const selectRendererForColumn = (state, column) => selectModel(state).rendererForColumn[column.name];
export const selectRendererForType = (state, column) => selectModel(state).rendererForType[column.getDataTypeName() || ALL_TYPES[column.getDataType()]];
export const selectTimeZone = (state) => selectModel(state).timeZone;
export const selectColumnTypes = (state) => selectModel(state).types;
export const selectColumnOrder = (state) => selectModel(state).columnOrder;
export const selectColumnsVisible = (state) => selectModel(state).columnsVisible || {};
export const selectColumnsFrozen = (state) => selectModel(state).columnsFrozen || {};
export const selectRowsToShow = (state) => selectModel(state).rowsToShow || DEFAULT_PAGE_LENGTH ;
