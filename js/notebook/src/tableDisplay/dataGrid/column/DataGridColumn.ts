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

import ColumnMenu from "../headerMenu/ColumnMenu";
import IndexMenu from "../headerMenu/IndexMenu";
import { BeakerxDataGrid } from "../BeakerxDataGrid";
import { IColumnOptions} from "../interface/IColumn";
import { ICellData } from "../interface/ICell";
import { getAlignmentByChar, getAlignmentByType} from "./columnAlignment";
import {CellRenderer, DataModel, TextRenderer} from "@phosphor/datagrid";
import {ALL_TYPES, getDisplayType, getTypeByName} from "../dataTypes";
import { minmax, MapIterator } from '@phosphor/algorithm';
import {HIGHLIGHTER_TYPE} from "../interface/IHighlighterState";

export enum COLUMN_TYPES {
  'index',
  'body'
}

interface IColumnState {
  dataType: ALL_TYPES,
  displayType: ALL_TYPES|string,
  triggerShown: boolean,
  horizontalAlignment: TextRenderer.HorizontalAlignment
}

export default class DataGridColumn {
  index: number;
  name: string;
  type: COLUMN_TYPES;
  menu: ColumnMenu|IndexMenu;
  dataGrid: BeakerxDataGrid;
  formatFn: CellRenderer.ConfigFunc<string>;
  valuesIterator: MapIterator<number, any>;
  minValue: any;
  maxValue: any;

  state: IColumnState;

  constructor(options: IColumnOptions, dataGrid: BeakerxDataGrid) {
    this.index = options.index;
    this.name = options.name;
    this.type = options.type;
    this.dataGrid = dataGrid;
    this.valuesIterator = dataGrid.model.getColumnValuesIterator(this);

    this.setInitialState();
    this.assignFormatFn();
    this.handleHeaderCellHovered = this.handleHeaderCellHovered.bind(this);
    this.createMenu(options.menuOptions);
    this.connectToHeaderCellHovered();
    this.addMinMaxValues();
  }

  static getColumnTypeByRegion(region: DataModel.CellRegion) {
    if (region === 'row-header' || region === 'corner-header') {
      return COLUMN_TYPES.index;
    }

    return COLUMN_TYPES.body;
  }

  setInitialState() {
    const dataType = this.getDataType();
    const displayType = getDisplayType(
      dataType,
      this.dataGrid.model.dataFormatter.stringFormatForType,
      this.dataGrid.model.dataFormatter.stringFormatForColumn[this.name]
    );

    this.state = {
      dataType,
      displayType,
      triggerShown: false,
      horizontalAlignment: this.getInitialAlignment(dataType)
    };
  }

  assignFormatFn() {
    this.formatFn = this.dataGrid.model.dataFormatter.getFormatFnByDisplayType(this.state.displayType);
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.dataGrid['repaint']();
  }
  
  setDisplayType(displayType: ALL_TYPES|string) {
    this.setState({ displayType });
    this.assignFormatFn();
    this.dataGrid.repaint();
  }

  createMenu(menuOptions): void {
    if (this.type === COLUMN_TYPES.index) {
      this.menu = new IndexMenu(this, menuOptions);

      return;
    }

    this.menu = new ColumnMenu(this, menuOptions);
  }

  destroy() {
    this.menu.destroy();
  }

  connectToHeaderCellHovered() {
    this.dataGrid.headerCellHovered.connect(this.handleHeaderCellHovered);
  }

  handleHeaderCellHovered(sender: BeakerxDataGrid, data: ICellData|null) {
    if (!data || data.index !== this.index || data.type !== this.type) {
      this.menu.hideTrigger();
      this.state.triggerShown = false;

      return;
    }

    if (this.state.triggerShown) {
      return;
    }

    this.menu.showTrigger(data.offset);
    this.state.triggerShown = true;
  }

  getInitialAlignment(dataType) {
    let config = this.dataGrid.model.getAlignmentConfig();
    let alignmentForType = config.alignmentForType[ALL_TYPES[dataType]];
    let alignmentForColumn = config.alignmentForColumn[this.name];

    if (alignmentForType) {
      return getAlignmentByChar(alignmentForType);
    }

    if (alignmentForColumn) {
      return getAlignmentByChar(alignmentForColumn);
    }

    return getAlignmentByType(dataType);
  }

  getAlignment() {
    return this.state.horizontalAlignment;
  }

  setAlignment(horizontalAlignment: TextRenderer.HorizontalAlignment) {
    this.setState({ horizontalAlignment });
  }

  getHighlighter(highlighterType: HIGHLIGHTER_TYPE) {
    return this.dataGrid.highlighterManager.getColumnHighlighters(this, highlighterType);
  }

  toggleHighlighter(highlighterType: HIGHLIGHTER_TYPE) {
    this.dataGrid.highlighterManager.toggleColumnHighlighter(this, highlighterType);
  }

  private getDataTypeName(): string {
    return this.type === COLUMN_TYPES.index
      ? this.dataGrid.model.indexColumnsState.types[this.index]
      : this.dataGrid.model.bodyColumnsState.types[this.index];
  }

  private getDataType(): ALL_TYPES {
    return getTypeByName(this.getDataTypeName());
  }

  private addMinMaxValues() {
    let minMax = minmax(this.valuesIterator.clone(), (a:number, b:number) => a - b);

    this.minValue = minMax ? minMax[0] : null;
    this.maxValue = minMax ? minMax[1] : null;
  }
}
