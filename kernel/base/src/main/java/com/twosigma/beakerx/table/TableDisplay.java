/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.table;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.table.action.TableActionDetails;
import com.twosigma.beakerx.table.format.TableDisplayStringFormat;
import com.twosigma.beakerx.table.format.TimeStringFormat;
import com.twosigma.beakerx.table.format.ValueStringFormat;
import com.twosigma.beakerx.table.handlers.ValueChangeMsgCallbackHandler;
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beakerx.table.highlight.ValueHighlighter;
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer;
import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.widget.ChangeItem;
import com.twosigma.beakerx.widget.RunWidgetClosure;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

import static com.twosigma.beakerx.table.TableDisplayToJson.serializeAlignmentForColumn;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeAlignmentForType;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeCellHighlighters;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeColumnOrder;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeColumnsFrozen;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeColumnsVisible;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeDataFontSize;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeDoubleClickAction;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeFilteredValues;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeFontColor;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeHasIndex;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeHeaderFontSize;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeHeadersVertical;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeRendererForColumn;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeRendererForType;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeRowsToShow;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeStringFormatForColumn;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeStringFormatForType;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeTimeZone;
import static com.twosigma.beakerx.table.TableDisplayToJson.serializeTooltips;
import static com.twosigma.beakerx.util.Preconditions.checkState;
import static com.twosigma.beakerx.widget.CompiledCodeRunner.runCompiledCode;

public class TableDisplay extends BeakerxWidget {

  public static final String VIEW_NAME_VALUE = "TableDisplayView";
  public static final String MODEL_NAME_VALUE = "TableDisplayModel";

  public static final String TABLE_DISPLAY_SUBTYPE = "TableDisplay";
  public static final String LIST_OF_MAPS_SUBTYPE = "ListOfMaps";
  public static final String MATRIX_SUBTYPE = "Matrix";
  public static final String DICTIONARY_SUBTYPE = "Dictionary";
  public static final String THE_LENGTH_OF_TYPES_SHOULD_BE_SAME_AS_NUMBER_OF_ROWS = "The length of types should be same as number of rows.";
  public static final String LOAD_MORE_ROWS = "loadMoreRows";

  public int ROWS_LIMIT = 100000;
  public int ROW_LIMIT_TO_INDEX = 10000;
  private String rowLimitMsg = "Note: table is too big to display.\n" +
          "      The limit is %s rows, but this table has %s rows. \n" +
          "      The first %s rows are displayed as a preview.";

  private Map<ColumnType, TableDisplayStringFormat> stringFormatForType = new HashMap<>();
  private Map<String, TableDisplayStringFormat> stringFormatForColumn = new HashMap<>();
  private Map<ColumnType, TableDisplayCellRenderer> rendererForType = new HashMap<>();
  private Map<String, TableDisplayCellRenderer> rendererForColumn = new HashMap<>();
  private Map<ColumnType, TableDisplayAlignmentProvider> alignmentForType = new HashMap<>();
  private Map<String, TableDisplayAlignmentProvider> alignmentForColumn = new HashMap<>();
  private Map<String, Boolean> columnsFrozen = new HashMap<>();
  private Map<String, Boolean> columnsVisible = new HashMap<>();
  private List<String> columnOrder = new ArrayList<>();
  private List<TableDisplayCellHighlighter> cellHighlighters = new ArrayList<>();
  private List<List<String>> tooltips = new ArrayList<>();
  private Integer dataFontSize;
  private Integer headerFontSize;
  private List<List<Color>> fontColor = new ArrayList<>();
  private List<List<?>> filteredValues;
  private boolean headersVertical;
  private String hasIndex;
  private String timeZone;
  private Object doubleClickListener;
  private String doubleClickTag;
  private Map<String, Object> contextMenuListeners = new HashMap<>();
  private Map<String, String> contextMenuTags = new HashMap<>();
  private TableActionDetails details;
  private TableDisplayActions displayActions = new TableDisplayActions(this);

  private static TableDisplayLoadingMode loadingMode = TableDisplayLoadingMode.ALL;
  public static int PAGE_SIZE = 1000;
  private TableDisplayModel model;
  private String loadMoreRows = "loadMoreServerInit";
  private RowsToShow rowsToShow = RowsToShow.SHOW_25;

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public String getModelModuleValue() {
    return "beakerx_tabledisplay";
  }

  @Override
  public String getViewModuleValue() {
    return "beakerx_tabledisplay";
  }

  public TableDisplay(Map<?, ?> v) {
    super();
    this.model = new TableDisplayKeyValueModel(v, new BasicObjectSerializer());
    openComm();
    model.initValues();
  }

  public TableDisplay(List<List<?>> v, List<String> co, List<String> cl) {
    super();
    if (!v.isEmpty() && v.get(0) != null && !v.get(0).isEmpty()) {
      checkState(v.get(0).size() == cl.size(), THE_LENGTH_OF_TYPES_SHOULD_BE_SAME_AS_NUMBER_OF_ROWS);
    }
    this.model = new TableDisplayListModel(v, co, cl, new BasicObjectSerializer());
    openComm();
    this.model.initValues();
  }

  public TableDisplay(Stream<Map<String, Object>> v, BeakerObjectConverter serializer) {
    super();
    this.model = new TableDisplayMapModel(v, serializer);
    openComm();
    this.model.initValues();
  }

  public TableDisplay(Stream<Map<String, Object>> v, BeakerObjectConverter serializer, Message message) {
    super();
    this.model = new TableDisplayMapModel(v, serializer);
    openComm(message);
    this.model.initValues();
  }

  public TableDisplay(Stream<Map<String, Object>> v) {
    this(v, new BasicObjectSerializer());
  }

  public TableDisplay(Collection<Map<String, Object>> v) {
    this(v, new BasicObjectSerializer());
  }

  public TableDisplay(Map<String, Object>[] v) {
    this(new ArrayList<>(Arrays.asList(v)), new BasicObjectSerializer());
  }

  public TableDisplay(Map<String, Object>[] v, Message message) {
    this(new ArrayList<>(Arrays.asList(v)), new BasicObjectSerializer(), message);
  }

  public TableDisplay(Collection<Map<String, Object>> v, BeakerObjectConverter serializer) {
    this(v.stream(), serializer);
  }

  public TableDisplay(Collection<Map<String, Object>> v, BeakerObjectConverter serializer, Message message) {
    this(v.stream(), serializer, message);
  }

  public TableDisplay(int rowCount, int columnCount, List<String> columnNames, Element element) {
    this(TableDisplayConverter.convert(rowCount, columnCount, columnNames, element));
  }

  @Override
  protected void addValueChangeMsgCallback() {
    getComm().addMsgCallbackList(new ValueChangeMsgCallbackHandler(() -> setLoadMoreRows("loadMoreServerDone")));
  }

  @Override
  public void stateRequestHandler() {
    super.stateRequestHandler();
    sendModel();
  }

  @Override
  protected void openComm() {
    super.openComm();
    getComm().addMsgCallbackList((Handler<Message>) message -> displayActions.handleSetDetails(message));
    getComm().addMsgCallbackList((Handler<Message>) message -> displayActions.handleOnContextMenu(message));
    getComm().addMsgCallbackList((Handler<Message>) message -> displayActions.handleDoubleClick(message));
  }

  public static TableDisplayLoadingMode getLoadingMode() {
    return loadingMode;
  }

  public static void setLoadingMode(TableDisplayLoadingMode lm) {
    loadingMode = lm;
  }

  public String getLoadMoreRows() {
    return loadMoreRows;
  }

  void setLoadMoreRows(String loadMoreRows) {
    this.loadMoreRows = loadMoreRows;
    sendModelUpdate(TableDisplayToJson.serializeValues(this));
  }

  public List<List<?>> takeNextPage() {
    return this.model.takeNextPage();
  }

  public List<List<?>> takeAllData() {
    return this.model.takeAllData();
  }


  public TimeUnit getStringFormatForTimes() {
    TableDisplayStringFormat tableDisplayStringFormat = this.stringFormatForType.get(ColumnType.Time);
    if (tableDisplayStringFormat instanceof TimeStringFormat) {
      return ((TimeStringFormat) tableDisplayStringFormat).getUnit();
    }
    return null;
  }

  public void setStringFormatForTimes(TimeUnit stringFormatForTimes) {
    setStringFormatForType(ColumnType.Time, TableDisplayStringFormat.getTimeFormat(stringFormatForTimes));
  }

  public Map<ColumnType, TableDisplayStringFormat> getStringFormatForType() {
    return stringFormatForType;
  }

  public void setStringFormatForType(ColumnType type, TableDisplayStringFormat format) {
    this.stringFormatForType.put(type, format);
    sendModelUpdate(serializeStringFormatForType(this.stringFormatForType));
  }

  public Map<String, TableDisplayStringFormat> getStringFormatForColumn() {
    return stringFormatForColumn;
  }

  public void setStringFormatForColumn(String column, TableDisplayStringFormat format) {
    this.stringFormatForColumn.put(column, format);
    sendModelUpdate(serializeStringFormatForColumn(this.stringFormatForColumn));
  }

  public void setStringFormatForColumn(String column, Object closure) {
    int colIndex = this.model.columns.indexOf(column);
    if (colIndex == -1) {
      throw new IllegalArgumentException("Column " + column + " doesn't exist");
    }
    List<String> formattedValues = new ArrayList<>();
    try {
      for (int row = 0; row < this.model.values.size(); row++) {
        Object value = this.model.values.get(row).get(colIndex);
        Object[] params = new Object[]{value, row, colIndex, this};
        formattedValues.add((String) runClosure(closure, params));
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not create format using closure.", e);
    }
    this.stringFormatForColumn.put(column, new ValueStringFormat(column, formattedValues));
    sendModelUpdate(serializeStringFormatForColumn(this.stringFormatForColumn));
  }

  public Map<ColumnType, TableDisplayCellRenderer> getRendererForType() {
    return rendererForType;
  }

  public void setRendererForType(ColumnType type, TableDisplayCellRenderer renderer) {
    this.rendererForType.put(type, renderer);
    sendModelUpdate(serializeRendererForType(this.rendererForType));
  }

  public Map<String, TableDisplayCellRenderer> getRendererForColumn() {
    return rendererForColumn;
  }

  public void setRendererForColumn(String column, TableDisplayCellRenderer renderer) {
    this.rendererForColumn.put(column, renderer);
    sendModelUpdate(serializeRendererForColumn(this.rendererForColumn));
  }

  public Map<ColumnType, TableDisplayAlignmentProvider> getAlignmentForType() {
    return alignmentForType;
  }

  public void setAlignmentProviderForType(ColumnType type, TableDisplayAlignmentProvider alignmentProvider) {
    this.alignmentForType.put(type, alignmentProvider);
    sendModelUpdate(serializeAlignmentForType(this.alignmentForType));
  }

  public Map<String, TableDisplayAlignmentProvider> getAlignmentForColumn() {
    return alignmentForColumn;
  }

  public void setAlignmentProviderForColumn(String column, TableDisplayAlignmentProvider alignmentProvider) {
    this.alignmentForColumn.put(column, alignmentProvider);
    sendModelUpdate(serializeAlignmentForColumn(this.alignmentForColumn));
  }

  public Map<String, Boolean> getColumnsFrozen() {
    return columnsFrozen;
  }

  public void setColumnFrozen(String column, boolean frozen) {
    this.columnsFrozen.put(column, frozen);
    sendModelUpdate(serializeColumnsFrozen(this.columnsFrozen));
  }

  public Map<String, Boolean> getColumnsVisible() {
    return columnsVisible;
  }

  public void setColumnVisible(String column, boolean visible) {
    this.columnsVisible.put(column, visible);
    sendModelUpdate(serializeColumnsVisible(this.columnsVisible));
  }

  public List<String> getColumnOrder() {
    return columnOrder;
  }

  public List<TableDisplayCellHighlighter> getCellHighlighters() {
    return cellHighlighters;
  }

  public void addCellHighlighter(TableDisplayCellHighlighter cellHighlighter) {
    this.cellHighlighters.add(cellHighlighter);
    sendModelUpdate(serializeCellHighlighters(this.cellHighlighters));
  }

  public void addCellHighlighter(Object closure) {
    try {
      int rowSize = this.model.values.get(0).size();
      for (int colInd = 0; colInd < rowSize; colInd++) {
        boolean hasHighlightedValues = false;
        List<Color> columnColors = new ArrayList<>();
        for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
          Object[] params = new Object[]{rowInd, colInd, this};
          Color color = (Color) runClosure(closure, params);
          if (color != null) {
            hasHighlightedValues = true;
          }
          columnColors.add(color);
        }
        if (hasHighlightedValues) {
          addCellHighlighter(new ValueHighlighter(this.model.columns.get(colInd), columnColors));
        }
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set cell highlighter using closure.", e);
    }
  }

  public void addCellHighlighter(CellHighlighter cellHighlighter) {
    try {
      int rowSize = this.model.values.get(0).size();
      for (int colInd = 0; colInd < rowSize; colInd++) {
        boolean hasHighlightedValues = false;
        List<Color> columnColors = new ArrayList<>();
        for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
          Color color = cellHighlighter.apply(rowInd, colInd, this);
          if (color != null) {
            hasHighlightedValues = true;
          }
          columnColors.add(color);
        }
        if (hasHighlightedValues) {
          addCellHighlighter(new ValueHighlighter(this.model.columns.get(colInd), columnColors));
        }
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set cell highlighter using closure.", e);
    }
  }

  public void removeAllCellHighlighters() {
    this.cellHighlighters.clear();
    sendModelUpdate(serializeCellHighlighters(this.cellHighlighters));
  }

  public void setColumnOrder(List<String> columnOrder) {
    this.columnOrder = columnOrder;
    sendModelUpdate(serializeColumnOrder(this.columnOrder));
  }

  public void setToolTip(Object closure) {
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        List<?> row = this.model.values.get(rowInd);
        List<String> rowToolTips = new ArrayList<>();
        for (int colInd = 0; colInd < row.size(); colInd++) {
          Object[] params = new Object[]{rowInd, colInd, this};
          rowToolTips.add((String) runClosure(closure, params));
        }
        tooltips.add(rowToolTips);
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set tooltip using closure.", e);
    }
    sendModelUpdate(serializeTooltips(this.tooltips));
  }

  public void setTooltip(TooltipAction tooltip) {
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        List<?> row = this.model.values.get(rowInd);
        List<String> rowToolTips = new ArrayList<>();
        for (int colInd = 0; colInd < row.size(); colInd++) {
          rowToolTips.add(tooltip.apply(rowInd, colInd, this));
        }
        tooltips.add(rowToolTips);
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set tooltip using closure.", e);
    }
    sendModelUpdate(serializeTooltips(this.tooltips));
  }

  public List<List<String>> getTooltips() {
    return tooltips;
  }

  public Integer getDataFontSize() {
    return dataFontSize;
  }

  public void setDataFontSize(Integer dataFontSize) {
    this.dataFontSize = dataFontSize;
    sendModelUpdate(serializeDataFontSize(this.dataFontSize));
  }

  public Integer getHeaderFontSize() {
    return headerFontSize;
  }

  public void setHeaderFontSize(Integer headerFontSize) {
    this.headerFontSize = headerFontSize;
    sendModelUpdate(serializeHeaderFontSize(this.headerFontSize));
  }

  public List<List<Color>> getFontColor() {
    return fontColor;
  }

  public void setFontColorProvider(Object closure) {
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        List<?> row = this.model.values.get(rowInd);
        List<Color> rowFontColors = new ArrayList<>();
        for (int colInd = 0; colInd < row.size(); colInd++) {
          Object[] params = new Object[]{rowInd, colInd, this};
          rowFontColors.add((Color) runClosure(closure, params));
        }
        this.fontColor.add(rowFontColors);
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set font color using closure.", e);
    }
    sendModelUpdate(serializeFontColor(this.fontColor));
  }

  public void setFontColorProvider(FontColorProvider fontColorProvider) {
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        List<?> row = this.model.values.get(rowInd);
        List<Color> rowFontColors = new ArrayList<>();
        for (int colInd = 0; colInd < row.size(); colInd++) {
          rowFontColors.add(fontColorProvider.apply(rowInd, colInd, this));
        }
        this.fontColor.add(rowFontColors);
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set font color using closure.", e);
    }
    sendModelUpdate(serializeFontColor(this.fontColor));
  }

  public void setRowFilter(Object closure) {
    List<List<?>> filteredValues = new ArrayList<>();
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        Object[] params = new Object[]{rowInd, this.model.values};
        if ((boolean) runClosure(closure, params)) {
          filteredValues.add(this.model.values.get(rowInd));
        }
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set row filter using closure.", e);
    }
    this.filteredValues = filteredValues;
    sendModelUpdate(serializeFilteredValues(this.filteredValues));
  }

  public void setRowFilter(RowFilter rowFilter) {
    List<List<?>> filteredValues = new ArrayList<>();
    try {
      for (int rowInd = 0; rowInd < this.model.values.size(); rowInd++) {
        if (rowFilter.apply(rowInd, this.model.values)) {
          filteredValues.add(this.model.values.get(rowInd));
        }
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set row filter using closure.", e);
    }
    this.filteredValues = filteredValues;
    sendModelUpdate(serializeFilteredValues(this.filteredValues));
  }

  public void setHeadersVertical(boolean headersVertical) {
    this.headersVertical = headersVertical;
    sendModelUpdate(serializeHeadersVertical(this.headersVertical));
  }

  public Boolean getHeadersVertical() {
    return headersVertical;
  }

  public void setHasIndex(String hasIndex) {
    this.hasIndex = hasIndex;
    sendModelUpdate(serializeHasIndex(this.hasIndex));
  }

  public String getHasIndex() {
    return hasIndex;
  }

  public void setTimeZone(String timeZone) {
    this.timeZone = timeZone;
    sendModelUpdate(serializeTimeZone(this.timeZone));
  }

  public String getTimeZone() {
    return timeZone;
  }

  public List<List<?>> getFilteredValues() {
    return filteredValues;
  }

  public static List<Map<String, Object>> getValuesAsRows(List<List<?>> values, List<String> columns) {
    List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
    if (columns != null && values != null) {

      for (List<?> value : values) {
        Map<String, Object> m = new HashMap<String, Object>();
        for (int c = 0; c < columns.size(); c++) {
          if (value.size() > c)
            m.put(columns.get(c), value.get(c));
        }
        rows.add(m);
      }
    } else {
      throw new IllegalArgumentException("Method 'getValuesAsRows' doesn't supported for this table");
    }
    return rows;
  }

  public static List<List<?>> getValuesAsMatrix(List<List<?>> values) {
    return values;
  }

  public static Map<String, Object> getValuesAsDictionary(List<List<?>> values) {
    Map<String, Object> m = new HashMap<>();
    for (List<?> l : values) {
      m.put(l.get(0).toString(), l.get(1));
    }
    return m;
  }

  public List<Map<String, Object>> getValuesAsRows() {
    return getValuesAsRows(this.model.values, this.model.columns);
  }

  public List<List<?>> getValuesAsMatrix() {
    return getValuesAsMatrix(this.model.values);
  }

  public Map<String, Object> getValuesAsDictionary() {
    return getValuesAsDictionary(this.model.values);
  }


  public List<List<?>> getValues() {
    return this.model.values;
  }

  public List<String> getColumnNames() {
    return this.model.columns;
  }

  public List<String> getTypes() {
    return this.model.classes;
  }

  public String getSubtype() {
    return this.model.subtype;
  }

  public void setDoubleClickAction(String tagName) {
    this.doubleClickListener = null;
    this.doubleClickTag = tagName;
    sendModelUpdate(serializeDoubleClickAction(this.doubleClickTag, hasDoubleClickAction()));
  }

  public void setDoubleClickAction(Object listener) {
    this.doubleClickListener = listener;
    this.doubleClickTag = null;
    sendModelUpdate(serializeDoubleClickAction(this.doubleClickTag, hasDoubleClickAction()));
  }

  public void fireDoubleClick(List<Object> params, Message message) {
    if (this.doubleClickListener != null) {
      params.add(this);
      runCompiledCode(message, this::doubleClickHandler, params);
      sendModel();
    }
  }

  public void fireContextMenuClick(String name, List<Object> params, Message message) {
    Object contextMenuListener = this.contextMenuListeners.get(name);
    if (contextMenuListener != null) {
      params.add(this);
      runCompiledCode(message, this::contextMenuClickHandlerCommon, contextMenuListener, params);
      sendModel();
    }
  }

  private Object contextMenuClickHandlerCommon(Object... params) throws Exception {
    Object actionObject = params[0];
    ArrayList<Object> other = (ArrayList<Object>) params[1];
    if (actionObject instanceof ContextMenuAction) {
      ContextMenuAction action = (ContextMenuAction) actionObject;
      action.apply((Integer) other.get(0), (Integer) other.get(1), this);
    } else {
      Object ret = runClosure(params[0], other.toArray());
    }
    return MIMEContainer.HIDDEN;
  }


  public String getDoubleClickTag() {
    return doubleClickTag;
  }

  private Object doubleClickHandler(Object... params) throws Exception {
    Object[] values = ((List<List<?>>) params[0]).toArray();
    Object ret = runClosure(this.doubleClickListener, values);
    return MIMEContainer.HIDDEN;
  }

  public boolean hasDoubleClickAction() {
    return this.doubleClickListener != null;
  }

  public void addContextMenuItem(String name, Object closure) {
    this.contextMenuListeners.put(name, closure);
  }

  public void addContextMenuItem(String name, String tagName) {
    this.contextMenuTags.put(name, tagName);
  }

  public Set<String> getContextMenuItems() {
    return this.contextMenuListeners.keySet();
  }

  public Map<String, String> getContextMenuTags() {
    return contextMenuTags;
  }

  public void setDetails(TableActionDetails details) {
    this.details = details;
  }

  public TableActionDetails getDetails() {
    return details;
  }

  protected Object runClosure(Object closure, Object... params) throws Exception {
    return RunWidgetClosure.runClosure(closure, params);
  }

  @Override
  protected Map serializeToJsonObject() {
    return TableDisplayToJson.toJson(this);
  }

  @Override
  protected Map serializeToJsonObject(Object item) {
    return TableDisplayToJson.toJson(item);
  }

  public String getRowLimitMsg() {
    return String.format(rowLimitMsg, ROWS_LIMIT, this.model.values.size(), ROW_LIMIT_TO_INDEX);
  }

  public interface Element {
    String get(int columnIndex, int rowIndex);
  }

  @SuppressWarnings("unchecked")
  public void updateCell(int row, String columnName, Object value) {
    int index = getColumnIndex(columnName);
    List<Object> rowList = (List<Object>) this.model.values.get(row);
    rowList.set(index, value);
  }

  private int getColumnIndex(String columnName) {
    int index = this.model.columns.indexOf(columnName);
    if (index < 0) {
      throw new RuntimeException("There is no given column name: " + columnName);
    }
    return index;
  }

  public void setRowLimitMsg(String rowLimitMsg) {
    this.rowLimitMsg = rowLimitMsg;
  }

  public void setRowsToShow(RowsToShow rows) {
    this.rowsToShow = rows;
    sendModelUpdate(serializeRowsToShow(this.rowsToShow));
  }

  public RowsToShow getRowsToShow() {
    return rowsToShow;
  }

  @Override
  protected List<ChangeItem> doSendModel() {
    List<ChangeItem> changeItems = super.doSendModel();
    changeItems.add(new ChangeItem(LOAD_MORE_ROWS, this.getLoadMoreRows()));
    return changeItems;
  }
}
