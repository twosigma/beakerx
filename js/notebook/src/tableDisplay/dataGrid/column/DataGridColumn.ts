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

import ColumnMenu from "../headerMenu/ColumnMenu";
import IndexMenu from "../headerMenu/IndexMenu";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import {IColumnOptions} from "../interface/IColumn";
import { ICellData } from "../interface/ICell";
import { CellRenderer, DataModel, TextRenderer } from "@phosphor/datagrid";
import {ALL_TYPES, getDisplayType, isDoubleWithPrecision} from "../dataTypes";
import { minmax } from '@phosphor/algorithm';
import { HIGHLIGHTER_TYPE } from "../interface/IHighlighterState";
import ColumnManager, { COLUMN_CHANGED_TYPES, IBkoColumnsChangedArgs } from "./ColumnManager";
import ColumnFilter from "./ColumnFilter";
import CellTooltip from "../cell/CellTooltip";
import {
  selectColumnDataType,
  selectColumnDataTypeName,
  selectColumnDisplayType,
  selectColumnFilter,
  selectColumnHorizontalAlignment,
  selectColumnKeepTrigger, selectColumnPosition, selectColumnSortOrder,
  selectColumnState, selectColumnFormatForTimes
} from "./selectors";
import {DataGridColumnAction} from "../store/DataGridAction";
import {
  selectColumnsVisible,
  selectHasIndex,
  selectInitialColumnAlignment,
  selectStringFormatForColumn,
  selectFormatForTimes,
  selectStringFormatForType, selectRenderer, selectIsColumnFrozen, selectColumnVisible
} from "../model/selectors";
import {
  UPDATE_COLUMN_DISPLAY_TYPE,
  UPDATE_COLUMN_FILTER, UPDATE_COLUMN_FORMAT_FOR_TIMES,
  UPDATE_COLUMN_HORIZONTAL_ALIGNMENT,
  UPDATE_COLUMN_SORT_ORDER,
  UPDATE_COLUMN_WIDTH
} from "./reducer";
import {BeakerxDataStore} from "../store/dataStore";
import {COLUMN_TYPES, SORT_ORDER} from "./enums";
import {
  UPDATE_COLUMN_FROZEN, UPDATE_COLUMN_RENDERER,
  UPDATE_COLUMN_VISIBLE
} from "../model/reducer";
import {RENDERER_TYPE} from "../interface/IRenderer";
import DataGridCell from "../cell/DataGridCell";

export default class DataGridColumn {
  index: number;
  name: string;
  type: COLUMN_TYPES;
  menu: ColumnMenu|IndexMenu;
  dataGrid: BeakerxDataGrid;
  store: BeakerxDataStore;
  columnManager: ColumnManager;
  columnFilter: ColumnFilter;
  formatFn: CellRenderer.ConfigFunc<string>;
  minValue: any;
  maxValue: any;
  dataTypeTooltip: CellTooltip;
  longestStringValue: string;

  constructor(options: IColumnOptions, dataGrid: BeakerxDataGrid, columnManager: ColumnManager) {
    this.index = options.index;
    this.name = options.name;
    this.type = options.type;
    this.dataGrid = dataGrid;
    this.store = dataGrid.store;
    this.columnManager = columnManager;

    this.handleHeaderCellHovered = this.handleHeaderCellHovered.bind(this);

    this.assignFormatFn();
    this.createMenu();
    this.addColumnFilter();
    this.addDataTypeTooltip();
    this.connectToHeaderCellHovered();
    this.connectToColumnsChanged();
    this.addMinMaxValues();
  }

  static getColumnTypeByRegion(region: DataModel.CellRegion, position: number) {
    if ((region === 'row-header' || region === 'corner-header') && position === 0) {
      return COLUMN_TYPES.index;
    }

    return COLUMN_TYPES.body;
  }

  assignFormatFn() {
    this.formatFn = this.dataGrid.model.dataFormatter
      .getFormatFnByDisplayType(this.getDisplayType(), this.getState());
  }

  createMenu(): void {
    if (this.type === COLUMN_TYPES.index) {
      this.menu = new IndexMenu(this);

      return;
    }

    this.menu = new ColumnMenu(this);
  }

  addColumnFilter() {
    const columnPosition = this.getPosition();

    this.columnFilter = new ColumnFilter(
      this.dataGrid,
      this,
      {
        x: this.dataGrid.getColumnOffset(columnPosition.value, columnPosition.region),
        y: this.dataGrid.baseColumnHeaderSize - 1,
        width: this.dataGrid.columnSections.sectionSize(this.index),
        height: this.dataGrid.baseRowSize
      }
    );
  }
  
  setDisplayType(displayType: ALL_TYPES|string) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_DISPLAY_TYPE,
      { value: displayType, columnIndex: this.index, columnType: this.type }
    ));

    const position = this.getPosition();

    this.assignFormatFn();
    this.dataGrid.dataGridResize.setInitialSectionWidth({ index: position.value }, position.region, this.type);
  }

  setTimeDisplayType(timeUnit) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_FORMAT_FOR_TIMES,
      { value: timeUnit, columnIndex: this.index, columnType: this.type }
    ));
    this.setDisplayType(ALL_TYPES.datetime);
  }

  hide() {
    this.menu.hideTrigger();
    this.toggleVisibility(false);
  }

  show() {
    this.toggleVisibility(true);
  }

  search(filter: string) {
    this.filter(filter, true);
  }

  filter(filter: string, search?: boolean) {
    if (filter === this.getFilter()) {
      return;
    }

    this.updateColumnFilter(filter);
    search ? this.dataGrid.rowManager.searchRows() : this.dataGrid.rowManager.filterRows();
    this.dataGrid.model.reset();
  }

  resetFilter() {
    this.updateColumnFilter('');
    this.dataGrid.rowManager.filterRows();
    this.dataGrid.model.reset();
  }

  connectToColumnsChanged() {
    this.columnManager.columnsChanged.connect(this.onColumnsChanged.bind(this));
  }

  connectToHeaderCellHovered() {
    this.dataGrid.cellHovered.connect(this.handleHeaderCellHovered);
  }

  handleHeaderCellHovered(sender: BeakerxDataGrid, data: ICellData) {
    const column = data && this.columnManager.getColumnByPosition(ColumnManager.createPositionFromCell(data));

    if (!data || column !== this || !DataGridCell.isHeaderCell(data)) {
      this.toggleDataTooltip(false);
      this.menu.hideTrigger();

      return;
    }

    this.menu.showTrigger();
    this.toggleDataTooltip(true, data);
  }

  getAlignment() {
    return selectColumnHorizontalAlignment(this.store.state, this);
  }

  setAlignment(horizontalAlignment: TextRenderer.HorizontalAlignment) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_HORIZONTAL_ALIGNMENT,
      { value: horizontalAlignment, columnIndex: this.index, columnType: this.type }
    ));
  }

  resetAlignment() {
    this.setAlignment(selectInitialColumnAlignment(
      this.store.state,
      this.getDataType(),
      this.name
    ));
  }

  setWidth(width: number) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_WIDTH,
      { value: width, columnIndex: this.index, columnType: this.type }
    ));
    this.columnManager.updateColumnFilterNodes();
    this.columnManager.updateColumnMenuTriggers();
    this.dataGrid.resize();
  }

  getState() {
    return selectColumnState(this.store.state, this);
  }

  getVisible() {
    return selectColumnVisible(this.store.state, this);
  }

  getDataType() {
    return selectColumnDataType(this.store.state, this);
  }

  getSortOrder() {
    return selectColumnSortOrder(this.store.state, this);
  }

  getFilter() {
    return selectColumnFilter(this.store.state, this);
  }

  getKeepTrigger() {
    return selectColumnKeepTrigger(this.store.state, this);
  }

  getDataTypeName(): string {
    return selectColumnDataTypeName(this.store.state, this);
  }

  getDisplayType() {
    return selectColumnDisplayType(this.store.state, this);
  }

  getFormatForTimes() {
    return selectColumnFormatForTimes(this.store.state, this);
  }

  getPosition() {
    return selectColumnPosition(this.store.state, this);
  }

  getRenderer() {
    return selectRenderer(this.store.state, this);
  }

  getHighlighter(highlighterType: HIGHLIGHTER_TYPE) {
    return this.dataGrid.highlighterManager.getColumnHighlighters(this, highlighterType);
  }

  toggleHighlighter(highlighterType: HIGHLIGHTER_TYPE) {
    this.dataGrid.highlighterManager.toggleColumnHighlighter(this, highlighterType);
  }

  resetHighlighters() {
    this.dataGrid.highlighterManager.removeColumnHighlighter(this);
  }

  sort(sortOrder: SORT_ORDER) {
    this.columnManager.sortByColumn(this, sortOrder);
  }

  toggleSort() {
    if (this.getSortOrder() !== SORT_ORDER.ASC) {
      return this.sort(SORT_ORDER.ASC);
    }

    this.sort(SORT_ORDER.DESC);
  }

  getValueResolver(): Function {
    const dataType = this.getDataType();

    switch (dataType) {
      case ALL_TYPES.datetime:
      case ALL_TYPES.time:
        return this.dateValueResolver;

      case ALL_TYPES.double:
      case ALL_TYPES['double with precision']:
        return this.doubleValueResolver;

      case ALL_TYPES.integer:
      case ALL_TYPES.int64:
        return this.integerValueResolver;

      default:
        return this.defaultValueResolver;
    }
  }

  move(destination: number) {
    this.dataGrid.columnPosition.setPosition(this, { ...this.getPosition(), value: destination });
    this.menu.hideTrigger();
    this.dataGrid.resize();
  }

  setDataTypePrecission(precission: number) {
    if (isDoubleWithPrecision(this.getDisplayType())) {
      this.setDisplayType(`4.${precission}`);
    }
  }

  addMinMaxValues() {
    let valueResolver = this.getValueResolver();
    let valuesIterator = this.dataGrid.model.getColumnValuesIterator(this);
    let dataType = this.getDataType();
    let minMax = minmax(valuesIterator, (a:any, b:any) => {
      let value1 = valueResolver(a);
      let value2 = valueResolver(b);

      if (dataType === ALL_TYPES.string || dataType === ALL_TYPES['formatted integer'] || dataType === ALL_TYPES.html) {
        let aLength = a ? a.length : 0;
        let bLength = b ? b.length : 0;
        let longer = aLength > bLength ? a : b;

        if (!this.longestStringValue || this.longestStringValue.length < longer.length) {
          this.longestStringValue = longer;
        }
      }

      if (value1 === value2) {
        return 0;
      }

      return value1 < value2 ? -1 : 1;
    });

    this.minValue = minMax ? minMax[0] : null;
    this.maxValue = minMax ? minMax[1] : null;
  }

  resetState() {
    this.setTimeDisplayType(selectFormatForTimes(this.store.state));
    this.setDisplayType(getDisplayType(
      this.getDataType(),
      selectStringFormatForType(this.store.state),
      selectStringFormatForColumn(this.store.state)[this.name]
    ));
    this.setAlignment(selectInitialColumnAlignment(this.store.state, this.getDataType(), name));
    this.toggleVisibility(selectColumnsVisible(this.store.state)[this.name] !== false);
    this.toggleDataBarsRenderer(false);
    this.resetHighlighters();
    this.resetFilter();
    this.move(this.index);
    this.assignFormatFn();

    const position = this.getPosition();
    this.dataGrid.dataGridResize.setInitialSectionWidth(this, position.region, this.type);
    this.dataGrid.dataGridResize.updateWidgetWidth();
  }

  destroy() {
    this.menu.destroy();
    this.dataTypeTooltip.hide();
  }

  toggleDataBarsRenderer(enable?: boolean) {
    const renderer = this.getRenderer();
    const enabled = enable === false || renderer && renderer.type === RENDERER_TYPE.DataBars;

    this.store.dispatch(new DataGridColumnAction(UPDATE_COLUMN_RENDERER, {
      columnType: this.type,
      columnName: this.name,
      value: enabled ? null : { type: RENDERER_TYPE.DataBars, includeText: true }
    }));
  }

  isFrozen() {
    return selectIsColumnFrozen(this.store.state, this);
  }

  toggleColumnFrozen() {
    this.store.dispatch(new DataGridColumnAction(UPDATE_COLUMN_FROZEN, {
      columnType: this.type,
      columnName: this.name,
      value: !this.isFrozen()
    }));

    this.dataGrid.columnPosition.updateAll();
  }

  private updateColumnFilter(filter: string) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_FILTER,
      { value: filter, columnIndex: this.index, columnType: this.type }
    ));
  }

  private toggleVisibility(value) {
    this.store.dispatch(new DataGridColumnAction(UPDATE_COLUMN_VISIBLE, {
      value,
      columnIndex: this.index,
      columnType: this.type,
      columnName: this.name,
      hasIndex: selectHasIndex(this.store.state)
    }));
    this.dataGrid.columnPosition.updateAll();
  }

  private dateValueResolver(value) {
    return value.timestamp;
  }

  private defaultValueResolver(value) {
    return value;
  }

  private doubleValueResolver(value) {
    return parseFloat(value);
  }

  private integerValueResolver(value) {
    return parseInt(value);
  }

  private onColumnsChanged(sender: ColumnManager, args: IBkoColumnsChangedArgs) {
    if (args.type !== COLUMN_CHANGED_TYPES.columnSort) {
      return;
    }

    if (args.column === this && args.value !== SORT_ORDER.NO_SORT) {
      this.setColumnSortOrder(args.value);
      this.dataGrid.highlighterManager.addColumnHighlighter(this, HIGHLIGHTER_TYPE.sort);
      this.menu.showTrigger();
    } else {
      this.setColumnSortOrder(SORT_ORDER.NO_SORT);
      this.dataGrid.highlighterManager.removeColumnHighlighter(this, HIGHLIGHTER_TYPE.sort);
      this.menu.hideTrigger();
    }
  }

  private setColumnSortOrder(order: SORT_ORDER) {
    this.store.dispatch(new DataGridColumnAction(
      UPDATE_COLUMN_SORT_ORDER,
      { value: order, columnIndex: this.index, columnType: this.type })
    );
  }

  private addDataTypeTooltip() {
    this.dataTypeTooltip = new CellTooltip(this.getDataTypeName(), document.body);
  }

  private toggleDataTooltip(show: boolean, data?: ICellData) {
    const rect = this.dataGrid.node.getBoundingClientRect();

    if (show && data) {
      return this.dataTypeTooltip.show(
        Math.ceil(rect.left + data.offset + 20),
        Math.ceil(rect.top - 10)
      );
    }

    this.dataTypeTooltip.hide();
  }
}
