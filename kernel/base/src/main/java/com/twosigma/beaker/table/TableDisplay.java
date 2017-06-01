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
package com.twosigma.beaker.table;

import static com.twosigma.beaker.table.TableDisplayToJson.serializeAlignmentForColumn;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeAlignmentForType;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeCellHighlighters;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeColumnsFrozen;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeColumnsFrozenRight;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeColumnsVisible;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeRendererForColumn;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeRendererForType;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeStringFormatForColumn;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeStringFormatForTimes;
import static com.twosigma.beaker.table.TableDisplayToJson.serializeStringFormatForType;
import static java.util.Arrays.asList;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.table.action.TableActionDetails;
import com.twosigma.beaker.table.action.TableActionType;
import com.twosigma.beaker.table.format.TableDisplayStringFormat;
import com.twosigma.beaker.table.format.ValueStringFormat;
import com.twosigma.beaker.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beaker.table.highlight.ValueHighlighter;
import com.twosigma.beaker.table.renderer.TableDisplayCellRenderer;
import com.twosigma.beaker.widgets.BeakerxWidget;
import com.twosigma.beaker.widgets.RunWidgetClosure;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class TableDisplay extends BeakerxWidget {

  public static final String TAG = "tag";

  public static final String VIEW_NAME_VALUE = "TableDisplayView";
  public static final String MODEL_NAME_VALUE = "TableDisplayModel";

  public static final String TABLE_DISPLAY_SUBTYPE = "TableDisplay";
  public static final String LIST_OF_MAPS_SUBTYPE = "ListOfMaps";
  public static final String MATRIX_SUBTYPE = "Matrix";
  public static final String DICTIONARY_SUBTYPE = "Dictionary";

  private final List<List<?>> values;
  private List<String> columns;
  private final List<String> classes;
  private String subtype;

  private TimeUnit stringFormatForTimes;
  private Map<ColumnType, TableDisplayStringFormat> stringFormatForType = new HashMap<>();
  private Map<String, TableDisplayStringFormat> stringFormatForColumn = new HashMap<>();
  private Map<ColumnType, TableDisplayCellRenderer> rendererForType = new HashMap<>();
  private Map<String, TableDisplayCellRenderer> rendererForColumn = new HashMap<>();
  private Map<ColumnType, TableDisplayAlignmentProvider> alignmentForType = new HashMap<>();
  private Map<String, TableDisplayAlignmentProvider> alignmentForColumn = new HashMap<>();
  private Map<String, Boolean> columnsFrozen = new HashMap<>();
  private Map<String, Boolean> columnsFrozenRight = new HashMap<>();
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

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  public TableDisplay(List<List<?>> v, List<String> co, List<String> cl) {
    super();
    values = new ArrayList<>();
    columns = co;
    classes = cl;
    subtype = TABLE_DISPLAY_SUBTYPE;
    openComm();
    addToValues(v);
  }


  public TableDisplay(Collection<Map<?, ?>> v) {
    this(v, new BasicObjectSerializer());
  }

  public TableDisplay(Map<?, ?>[] v) {
    this(new ArrayList<Map<?, ?>>(Arrays.asList(v)), new BasicObjectSerializer());
  }

  public TableDisplay(Collection<Map<?, ?>> v, BeakerObjectConverter serializer) {
    super();
    values = new ArrayList<>();
    columns = new ArrayList<>();
    classes = new ArrayList<>();
    subtype = LIST_OF_MAPS_SUBTYPE;

    // create columns
    for (Map<?, ?> m : v) {
      Set<?> w = m.entrySet();
      for (Object s : w) {
        Entry<?, ?> e = (Entry<?, ?>) s;
        String c = e.getKey().toString();
        if (!columns.contains(c)) {
          columns.add(c);
          String n = e.getValue() != null ? e.getValue().getClass().getName() : "string";
          classes.add(serializer.convertType(n));
        }
      }
    }
    openComm();
    addToValues(buildValues(v, serializer));
  }

  public TableDisplay(Map<?, ?> v) {
    super();
    this.values = new ArrayList<>();
    this.columns = Arrays.asList("Key", "Value");
    this.classes = new ArrayList<>();
    this.subtype = DICTIONARY_SUBTYPE;
    openComm();
    addToValues(buildValuesFromMap(v));
  }

  private void addToValues(List<List<?>> items) {
    values.addAll(items);
    sendModel();
  }

  private List<List<?>> buildValues(Collection<Map<?, ?>> v, BeakerObjectConverter serializer) {
    List<List<?>> values = new ArrayList<>();
    for (Map<?, ?> m : v) {
      List<Object> vals = new ArrayList<>();
      for (String cn : columns) {
        if (m.containsKey(cn)) {
          vals.add(getValueForSerializer(m.get(cn), serializer));
        } else
          vals.add(null);
      }
      values.add(vals);
    }
    return values;
  }

  private List<List<?>> buildValuesFromMap(Map<?, ?> v) {
    Set<?> w = v.entrySet();
    List<List<?>> values = new ArrayList<>();
    for (Object s : w) {
      Entry<?, ?> e = (Entry<?, ?>) s;
      values.add(asList(e.getKey().toString(), e.getValue()));
    }
    return values;
  }

  protected void openComm() {
    super.openComm();
    getComm().addMsgCallbackList((Handler<Message>) this::handleSetDetails);
  }

  public static TableDisplay createTableDisplayForMap(Map<?, ?> v) {
    return new TableDisplay(v);
  }

  public TimeUnit getStringFormatForTimes() {
    return stringFormatForTimes;
  }

  public void setStringFormatForTimes(TimeUnit stringFormatForTimes) {
    this.stringFormatForTimes = stringFormatForTimes;
    sendModelUpdate(serializeStringFormatForTimes(this.stringFormatForTimes));
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
    int colIndex = this.columns.indexOf(column);
    if (colIndex == -1) {
      throw new IllegalArgumentException("Column " + column + " doesn't exist");
    }
    List<String> formattedValues = new ArrayList<>();
    try {
      for (int row = 0; row < this.values.size(); row++) {
        Object value = this.values.get(row).get(colIndex);
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

  public Map<String, Boolean> getColumnsFrozenRight() {
    return columnsFrozenRight;
  }

  public void setColumnFrozenRight(String column, boolean frozen) {
    this.columnsFrozenRight.put(column, frozen);
    sendModelUpdate(serializeColumnsFrozenRight(this.columnsFrozenRight));
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
    Map<String, List<Color>> colors = new HashMap<>();
    try {
      int rowSize = this.values.get(0).size();
      for (int colInd = 0; colInd < rowSize; colInd++) {
        boolean hasHighlightedValues = false;
        List<Color> columnColors = new ArrayList<>();
        for (int rowInd = 0; rowInd < this.values.size(); rowInd++) {
          Object[] params = new Object[]{rowInd, colInd, this};
          Color color = (Color) runClosure(closure, params);
          if (color != null) {
            hasHighlightedValues = true;
          }
          columnColors.add(color);
        }
        if (hasHighlightedValues) {
          addCellHighlighter(new ValueHighlighter(this.columns.get(colInd), columnColors));
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
    sendModel();
  }

  public void setToolTip(Object closure) {
    try {
      for (int rowInd = 0; rowInd < this.values.size(); rowInd++) {
        List<?> row = this.values.get(rowInd);
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
    sendModel();
  }

  public List<List<String>> getTooltips() {
    return tooltips;
  }

  public Integer getDataFontSize() {
    return dataFontSize;
  }

  public void setDataFontSize(Integer dataFontSize) {
    this.dataFontSize = dataFontSize;
    sendModel();
  }

  public Integer getHeaderFontSize() {
    return headerFontSize;
  }

  public void setHeaderFontSize(Integer headerFontSize) {
    this.headerFontSize = headerFontSize;
    sendModel();
  }

  public List<List<Color>> getFontColor() {
    return fontColor;
  }

  public void setFontColorProvider(Object closure) {
    try {
      for (int rowInd = 0; rowInd < this.values.size(); rowInd++) {
        List<?> row = this.values.get(rowInd);
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
    sendModel();
  }

  public void setRowFilter(Object closure) {
    List<List<?>> filteredValues = new ArrayList<>();
    try {
      for (int rowInd = 0; rowInd < this.values.size(); rowInd++) {
        Object[] params = new Object[]{rowInd, this.values};
        if ((boolean) runClosure(closure, params)) {
          filteredValues.add(values.get(rowInd));
        }
      }
    } catch (Throwable e) {
      throw new IllegalArgumentException("Can not set row filter using closure.", e);
    }
    this.filteredValues = filteredValues;
    sendModel();
  }

  public void setHeadersVertical(boolean headersVertical) {
    this.headersVertical = headersVertical;
    sendModel();
  }

  public Boolean getHeadersVertical() {
    return headersVertical;
  }

  public void setHasIndex(String hasIndex) {
    this.hasIndex = hasIndex;
    sendModel();
  }

  public String getHasIndex() {
    return hasIndex;
  }

  public void setTimeZone(String timeZone) {
    this.timeZone = timeZone;
    sendModel();
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
    Map<String, Object> m = new HashMap<String, Object>();
    for (List<?> l : values) {
      m.put(l.get(0).toString(), l.get(1));
    }
    return m;
  }

  public List<Map<String, Object>> getValuesAsRows() {
    return getValuesAsRows(values, columns);
  }

  public List<List<?>> getValuesAsMatrix() {
    return getValuesAsMatrix(values);
  }

  public Map<String, Object> getValuesAsDictionary() {
    return getValuesAsDictionary(values);
  }

  private Object getValueForSerializer(Object value, BeakerObjectConverter serializer) {
    if (value != null) {
      String clazz = serializer.convertType(value.getClass().getName());
      if (BasicObjectSerializer.TYPE_LONG.equals(clazz) ||
              BasicObjectSerializer.TYPE_BIGINT.equals(clazz)) {
        return value.toString();
      }
      return value;
    }
    return null;
  }


  public List<List<?>> getValues() {
    return values;
  }

  public List<String> getColumnNames() {
    return columns;
  }

  public List<String> getTypes() {
    return classes;
  }

  public String getSubtype() {
    return subtype;
  }

  public void setDoubleClickAction(String tagName) {
    this.doubleClickListener = null;
    this.doubleClickTag = tagName;
    sendModel();
  }

  public void setDoubleClickAction(Object listener) {
    this.doubleClickTag = null;
    this.doubleClickListener = listener;
    getComm().addMsgCallbackList((Handler<Message>) this::handleDoubleClick);
    sendModel();
  }

  private void handleDoubleClick(Message message) {
    handleCommEventSync(message, CommActions.ONDOUBLECLICK, (ActionPerformed) this::onDoubleClickAction);
  }

  private void handleSetDetails(Message message) {
    handleCommEventSync(message, CommActions.ACTIONDETAILS, (ActionPerformed) this::onActionDetails);
  }

  private void handleOnContextMenu(Message message) {
    handleCommEventSync(message, CommActions.ONCONTEXTMENU, (ActionPerformed) this::onContextMenu);
  }

  private void onDoubleClickAction(HashMap content) {
    Object row = content.get("row");
    Object column = content.get("column");
    List<Object> params = new ArrayList<>();
    params.add(row);
    params.add(column);
    fireDoubleClick(params);
  }

  /**
   * Also sends "runByTag" event.
   *
   * @param content
   */
  private void onActionDetails(HashMap content) {
    TableActionDetails details = new TableActionDetails();

    if (content.containsKey("params")) {

      HashMap params = (HashMap) content.get("params");

      if (params.containsKey("actionType")) {
        TableActionType value = TableActionType.getByName((String) params.get("actionType"));
        details.setActionType(value);
      }
      if (params.containsKey("contextMenuItem")) {
        String value = (String) params.get("contextMenuItem");
        details.setContextMenuItem(value);
      }
      if (params.containsKey("row")) {
        Integer value = (Integer) params.get("row");
        details.setRow(value);
      }
      if (params.containsKey("col")) {
        Integer value = (Integer) params.get("col");
        details.setCol(value);
      }
      if (params.containsKey("tag")) {
        String value = (String) params.get("tag");
        details.setTag(value);
      }
    }
    setDetails(details);
    if (TableActionType.CONTEXT_MENU_CLICK.equals(details.getActionType())) {
      if (getContextMenuTags() != null && !getContextMenuTags().isEmpty() && details.getContextMenuItem() != null && !details.getContextMenuItem().isEmpty()) {
        NamespaceClient.getBeaker().runByTag(getContextMenuTags().get(details.getContextMenuItem()));
      }
    } else if (TableActionType.DOUBLE_CLICK.equals(details.getActionType())) {
      if (getDoubleClickTag() != null && !getDoubleClickTag().isEmpty()) {
        NamespaceClient.getBeaker().runByTag(getDoubleClickTag());
      }
    }
  }

  private void onContextMenu(HashMap content) {
    String menuKey = (String) content.get("itemKey");
    Object row = content.get("row");
    Object column = content.get("column");
    List<Object> params = new ArrayList<>();
    params.add(row);
    params.add(column);
    fireContextMenuClick(menuKey, params);
  }

  public String getDoubleClickTag() {
    return doubleClickTag;
  }

  public void fireDoubleClick(List<Object> params) {
    if (this.doubleClickListener != null) {
      try {
        params.add(this);
        runClosure(this.doubleClickListener, params.toArray());
      } catch (Exception e) {
        throw new RuntimeException("Unable execute closure", e);
      }
    }
  }

  public boolean hasDoubleClickAction() {
    return this.doubleClickListener != null;
  }

  public void addContextMenuItem(String name, Object closure) {
    this.contextMenuListeners.put(name, closure);
    getComm().addMsgCallbackList((Handler<Message>) this::handleOnContextMenu);
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
    return this.details;
  }

  public void fireContextMenuClick(String name, List<Object> params) {
    Object contextMenuListener = this.contextMenuListeners.get(name);
    if (contextMenuListener != null) {
      try {
        params.add(this);
        runClosure(contextMenuListener, params.toArray());
      } catch (Exception e) {
        throw new RuntimeException("Unable execute closure", e);
      }
    }
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
}
