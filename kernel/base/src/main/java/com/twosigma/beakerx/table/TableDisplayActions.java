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
package com.twosigma.beakerx.table;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.table.action.TableActionDetails;
import com.twosigma.beakerx.widget.CommActions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public class TableDisplayActions {

  private TableDisplay tableDisplay;

  public TableDisplayActions(TableDisplay tableDisplay) {
    this.tableDisplay = tableDisplay;
  }

  private boolean isCorrectEvent(Message message, CommActions commActions) {
    LinkedHashMap<String, LinkedHashMap> data = (LinkedHashMap) message.getContent().get("data");
    LinkedHashMap content = data.get("content");

    if (null != content && !content.isEmpty()) {
      String event = (String) content.getOrDefault("event", "");
      return commActions.getAction().equals(event);
    }

    return false;
  }

  void handleSetDetails(Message message) {
    if (isCorrectEvent(message, CommActions.ACTIONDETAILS)) {
      tableDisplay.handleCommEventSync(message, CommActions.ACTIONDETAILS, this::onActionDetails);
    }
  }

  /**
   * Also sends "runByTag" event.
   *
   * @param content
   */
  private void onActionDetails(HashMap content, Message message) {
    TableActionDetails details = new TableActionDetails();

    if (content.containsKey("params")) {

      HashMap params = (HashMap) content.get("params");

      if (params.containsKey("actionType")) {
        CommActions value = CommActions.getByAction((String) params.get("actionType"));
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
    tableDisplay.setDetails(details);
    if (CommActions.CONTEXT_MENU_CLICK.equals(details.getActionType())) {
      if (tableDisplay.getContextMenuTags() != null && !tableDisplay.getContextMenuTags().isEmpty() && details.getContextMenuItem() != null && !details.getContextMenuItem().isEmpty()) {
        NamespaceClient.getBeaker().runByTag(tableDisplay.getContextMenuTags().get(details.getContextMenuItem()));
      }
    } else if (CommActions.DOUBLE_CLICK.equals(details.getActionType())) {
      if (tableDisplay.getDoubleClickTag() != null && !tableDisplay.getDoubleClickTag().isEmpty()) {
        NamespaceClient.getBeaker().runByTag(tableDisplay.getDoubleClickTag());
      }
    }
  }

  void handleDoubleClick(Message message) {
    if (isCorrectEvent(message, CommActions.DOUBLE_CLICK)) {
      tableDisplay.handleCommEventSync(message, CommActions.DOUBLE_CLICK, this::onDoubleClickAction);
    }
  }

  private void onDoubleClickAction(HashMap content, Message message) {
    CommActions actionType = CommActions.getByAction((String) content.get("event"));
    Object row = content.get("row");
    Object column = content.get("column");
    List<Object> params = new ArrayList<>();
    params.add(row);
    params.add(column);

    TableActionDetails details = new TableActionDetails();
    details.setActionType(actionType);
    details.setRow((Integer) row);
    details.setCol((Integer) column);
    tableDisplay.setDetails(details);

    tableDisplay.fireDoubleClick(params, message);
  }

  void handleOnContextMenu(Message message) {
    if (isCorrectEvent(message, CommActions.CONTEXT_MENU_CLICK)) {
      tableDisplay.handleCommEventSync(message, CommActions.CONTEXT_MENU_CLICK, this::onContextMenu);
    }
  }

  private void onContextMenu(HashMap content, Message message) {
    CommActions actionType = CommActions.getByAction((String) content.get("event"));
    String menuKey = (String) content.get("itemKey");
    Object row = content.get("row");
    Object column = content.get("column");
    List<Object> params = new ArrayList<>();
    params.add(row);
    params.add(column);

    TableActionDetails details = new TableActionDetails();
    details.setActionType(actionType);
    details.setRow((Integer) row);
    details.setCol((Integer) column);
    tableDisplay.setDetails(details);

    tableDisplay.fireContextMenuClick(menuKey, params, message);
  }

}
