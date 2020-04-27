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

import { CellRenderer, DataGrid, DataModel, GraphicsContext } from "@lumino/datagrid";
import { Signal } from '@lumino/signaling';
import { SectionList } from "@lumino/datagrid/lib/sectionlist";
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import { BeakerXDataGridModel } from "./model/BeakerXDataGridModel";
import { ICellData } from "./interface/ICell";
import { CellRendererFactory } from "./cell/CellRendererFactory";
import { DataGridColumn } from "./column/DataGridColumn";
import { IDataModelState } from "./interface/IDataGridModelState";
import { HighlighterManager } from "./highlighter/HighlighterManager";
import { ColumnManager } from "./column/ColumnManager";
import { RowManager } from "./row/RowManager";
import { CellSelectionManager } from "./cell/CellSelectionManager";
import { CellManager } from "./cell/CellManager";
import { DataGridHelpers } from "./dataGridHelpers";
import { EventManager } from "./event/EventManager";
import { CellFocusManager } from "./cell/CellFocusManager";
import { CellTooltipManager } from "./cell/CellTooltipManager";
import { BeakerXDataStore } from "./store/BeakerXDataStore";
import { selectHasIndex, selectRowsToShow } from "./model/selectors";
import { DataGridCell } from "./cell/DataGridCell";
import { ColumnPosition } from "./column/ColumnPosition";
import { DataGridResize } from "./DataGridResize";
import { TableDisplayView, TableDisplayWidget } from "../../TableDisplay";
import {ALL_TYPES} from "./dataTypes";

declare global {
  interface Window {
    beakerx: any;
  }
}
export class BeakerXDataGrid extends DataGrid {
  id: string;
  store: BeakerXDataStore;
  columnSections: SectionList;
  columnHeaderSections: SectionList;
  dataModel: BeakerXDataGridModel;
  rowHeaderSections: SectionList;
  rowSections: SectionList;
  highlighterManager: HighlighterManager;
  columnManager: ColumnManager;
  columnPosition: ColumnPosition;
  rowManager: RowManager;
  cellSelectionManager: CellSelectionManager;
  cellManager: CellManager;
  eventManager: EventManager;
  cellFocusManager: CellFocusManager;
  cellTooltipManager: CellTooltipManager;
  dataGridResize: DataGridResize;
  canvasGC: GraphicsContext;
  focused: boolean;
  wrapperId: string;
  tableDisplayView: TableDisplayWidget & TableDisplayView;
  api: BeakerXApi;

  cellHovered = new Signal<this, { data: ICellData|null, event: MouseEvent }>(this);
  commSignal = new Signal<this, {}>(this);

  static FOCUS_CSS_CLASS = 'bko-focused';

  constructor(options: DataGrid.IOptions, dataStore: BeakerXDataStore, tableDisplayView: TableDisplayWidget & TableDisplayView) {
    super(options);
    this.initApi();

    //this is hack to use private DataGrid properties
    this.columnHeaderSections = this['_columnHeaderSections'];
    this.rowHeaderSections = this['_rowHeaderSections'];
    this.rowSections = this['_rowSections'];
    this.columnSections = this['_columnSections'];
    this.canvasGC = this['_canvasGC'];
    this.tableDisplayView = tableDisplayView;
    this.resize = DataGridHelpers.throttle(this.resize, 150, this);
    this.init(dataStore);
  }

  private initApi() {
      let baseUrl;

      try {
          baseUrl = `${(Jupyter.notebook_list || Jupyter.notebook).base_url}`;
      } catch (e) {
          baseUrl = `${window.location.origin}/`;
      }

      this.api = new BeakerXApi(baseUrl);
  }

  init(store: BeakerXDataStore) {
    this.id = 'grid_' + CommonUtils.generateId(6);
    this.store = store;
    this.columnManager = new ColumnManager(this);
    this.columnPosition = new ColumnPosition(this);
    this.rowManager = new RowManager(store, selectHasIndex(store.state), this.columnManager, selectRowsToShow(store.state));
    this.cellSelectionManager = new CellSelectionManager(this);
    this.cellManager = new CellManager(this);
    this.eventManager = new EventManager(this);
    this.cellFocusManager = new CellFocusManager(this);
    this.cellTooltipManager = new CellTooltipManager(this);
    this.dataGridResize = new DataGridResize(this);
    this.dataModel = new BeakerXDataGridModel(store, this.columnManager, this.rowManager);
    this.focused = false;

    this.columnManager.addColumns();
    this.rowManager.createFilterExpressionVars();
    this.store.changed.connect(DataGridHelpers.throttle<void, void>(this.handleStateChanged, 100, this));

    this.dataGridResize.setInitialSize();
    this.addHighlighterManager();
    this.addCellRenderers();

    this.columnManager.createColumnMenus();
  }

  scrollTo(x: number, y: number): void {
    super.scrollTo(x, y);
    if(this.tableDisplayView.canLoadMore() && this.maxScrollY<=y ){
      this.tableDisplayView.loadMoreRows();
    }
  }

  getColumn(config: CellRenderer.CellConfig): DataGridColumn {
    return this.columnManager.getColumn(config);
  }

  getColumnByName(columnName: string): DataGridColumn|undefined {
    return this.columnManager.getColumnByName(columnName);
  }

  getCellData(clientX: number, clientY: number): ICellData|null {
    return DataGridCell.getCellData(this, clientX, clientY);
  }

  getColumnOffset(position: number, region: DataModel.ColumnRegion): number {
    if (region === 'row-header') {
      return this.rowHeaderSections.offsetOf(position);
    }

    return this.rowHeaderSections.length + this.columnSections.offsetOf(position);
  }

  getRowOffset(row: number) {
    return this.rowSections.offsetOf(row);
  }

  updateModelData(state: IDataModelState) {
    this.dataModel.updateData(state);
    this.columnManager.recalculateMinMaxValues();
    this.dataGridResize.setInitialSize();
    this.addHighlighterManager();
  }

  updateModelValues(state: IDataModelState) {
    this.dataModel.updateValues(state);
    this.columnManager.recalculateMinMaxValues();
    this.dataGridResize.setInitialSize();
  }

  setWrapperId(id: string) {
    this.wrapperId = id;
  }

  setInitialSize() {
    this.dataGridResize.setInitialSize();
  }

  resize(args?: any): void {
    this.dataGridResize && this.dataGridResize.resize();
  }

  setFocus(focus: boolean) {
    this.focused = focus;

    try {
      window.beakerx.tableFocused = this.focused;
    } catch(e) {}

    if (focus) {
      this.node.focus();
      DataGridHelpers.disableKeyboardManager();
      this.node.classList.add(BeakerXDataGrid.FOCUS_CSS_CLASS);

      return;
    }

    this.cellHovered.emit({ data: null, event: null });
    this.cellTooltipManager.hideTooltips();
    this.columnManager.blurColumnFilterInputs();
    this.columnManager.closeAllMenus();
    this.node.classList.remove(BeakerXDataGrid.FOCUS_CSS_CLASS);
    DataGridHelpers.enableKeyboardManager();
  }

  handleEvent(event: Event): void {
    this.eventManager?.handleEvent(event, super.handleEvent);
  }

  destroy() {
    this.dataModel?.destroy();
    this.eventManager.destroy();
    this.columnManager.destroy();
    this.columnPosition.destroy();
    this.cellFocusManager.destroy();
    this.cellManager.destroy();
    this.cellSelectionManager.destroy();
    this.cellTooltipManager.destroy();
    this.highlighterManager.destroy();
    this.dataGridResize.destroy();
    this.rowManager.destroy();

    Signal.disconnectAll(this);

    setTimeout(() => {
      this.cellSelectionManager = null;
      this.cellTooltipManager = null;
      this.highlighterManager = null;
      this.cellFocusManager = null;
      this.dataGridResize = null;
      this.columnPosition = null;
      this.columnManager = null;
      this.eventManager = null;
      this.cellManager = null;
      this.rowManager = null;
      this.store = null;
    });
  }

  onAfterAttach(msg) {
    super.onAfterAttach(msg);

    this.columnManager.bodyColumns.forEach(column => column.columnFilter.attach(this.viewport.node));
    this.columnManager.indexColumns.forEach(column => column.columnFilter.attach(this.viewport.node));
  }

  messageHook(handler, msg) {
    super.messageHook(handler, msg);

    if (handler !== this.viewport) {
      return true;
    }

    if (msg.type === 'paint-request' && this.columnPosition?.dropCellData) {
      this.colorizeColumnBorder(this.columnPosition.dropCellData, BeakerXThemeHelper.DEFAULT_HIGHLIGHT_COLOR);
    }

    return true;
  }

  colorizeColumnBorder(data: ICellData, color: string) {
    const { column, region } = data;
    let sectionList = region === 'corner-header' || region === 'row-header' ? this.rowHeaderSections : this.columnSections;
    let sectionSize = sectionList.sizeOf(column);
    let sectionOffset = sectionList.offsetOf(column);
    let x = sectionOffset;
    let height = this.totalHeight;

    if (data.delta > data.width / 2) {
      x += sectionSize;
    }

    if (region !== 'corner-header' && region !== 'row-header') {
      x = x + this.rowHeaderSections.length - this.scrollX;
    }

    this.canvasGC.beginPath();
    this.canvasGC.lineWidth = 3;

    this.canvasGC.moveTo(x - 0.5, 0);
    this.canvasGC.lineTo(x - 0.5, height);
    this.canvasGC.strokeStyle = color;
    this.canvasGC.stroke();
  }

  private addHighlighterManager() {
    this.highlighterManager = new HighlighterManager(this);
  }

  private addCellRenderers() {
    let defaultRenderer = CellRendererFactory.getRenderer(this);
    let headerCellRenderer = CellRendererFactory.getHeaderRenderer(this);

    this.cellRenderers.update({
      'body': (cfg: CellRenderer.CellConfig) => {
        switch(cfg.metadata.dataType) {
          case ALL_TYPES[ALL_TYPES.html]:
            return CellRendererFactory.getRenderer(this, ALL_TYPES.html);
          case ALL_TYPES[ALL_TYPES.image]:
            return CellRendererFactory.getRenderer(this, ALL_TYPES.image);
          default:
            return defaultRenderer;
        }
      },
      "column-header": headerCellRenderer,
      "corner-header": headerCellRenderer,
      "row-header": defaultRenderer
    });
  }

  private handleStateChanged() {
    this.dataModel?.reset();
  }

  repaint();
  repaint(x, y, w, h);
  repaint() {
    this['_repaintContent'](); // FIXME
  }
}
