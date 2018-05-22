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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.handler.CommMsgHandler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.CommActions;
import org.junit.Before;
import org.junit.Test;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest.initHeader;
import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.widget.CommActions.CONTEXT_MENU_CLICK;
import static com.twosigma.beakerx.widget.CommActions.DOUBLE_CLICK;
import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplayActionsTest {

  private KernelTest kernel;
  private CommMsgHandler commMsgHandler;
  private TableDisplay tableDisplay;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    tableDisplay = new TableDisplay(TableDisplayTest.getListOfMapsData());
    tableDisplay.display();
    kernel.clearMessages();
    commMsgHandler = new CommMsgHandler(kernel);
  }

  @Test
  public void actionDetailsShouldHaveDetails() throws Exception {
    //given
    Message message = actionDetailsMessage();
    //when
    commMsgHandler.handle(message);
    //then
    assertThat(tableDisplay.getDetails()).isNotNull();
  }

  private Message actionDetailsMessage() {
    Message message = new Message(initHeader(JupyterMessages.COMM_MSG));

    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(COMM_ID, tableDisplay.getComm().getCommId());

    Map<String, Serializable> dataContent = new LinkedHashMap<>();
    dataContent.put("event", CommActions.ACTIONDETAILS.getAction());

    Map<String, Serializable> params = new LinkedHashMap<>();
    params.put("actionType", CONTEXT_MENU_CLICK.getAction());
    params.put("row", 1);
    params.put("col", 1);
    params.put("contextMenuItem", "run print cell");

    Map<String, Serializable> data = new LinkedHashMap<>();
    content.put("data", (Serializable) data);
    data.put("content", (Serializable) dataContent);
    dataContent.put("params", (Serializable) params);
    message.setContent(content);
    return message;
  }

  @Test
  public void contextMenuActionShouldHaveDetails() throws Exception {
    //given
    Message message = contextMenuMessage();
    //when
    commMsgHandler.handle(message);
    //then
    assertThat(tableDisplay.getDetails()).isNotNull();
  }

  private Message contextMenuMessage() {
    Message message = new Message(initHeader(JupyterMessages.COMM_MSG));

    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(COMM_ID, tableDisplay.getComm().getCommId());

    Map<String, Serializable> dataContent = new LinkedHashMap<>();
    dataContent.put("event", CONTEXT_MENU_CLICK.getAction());
    dataContent.put("row", 1);
    dataContent.put("column", 1);
    dataContent.put("itemKey", "tag1ByClosure");

    Map<String, Serializable> data = new LinkedHashMap<>();
    data.put("content", (Serializable) dataContent);
    content.put("data", (Serializable) data);
    message.setContent(content);
    return message;
  }

  @Test
  public void doubleClickActionShouldHaveDetails() throws Exception {
    //given
    Message message = doubleClickActionMessage();
    //when
    commMsgHandler.handle(message);
    //then
    assertThat(tableDisplay.getDetails()).isNotNull();
  }

  private Message doubleClickActionMessage() {
    Message message = new Message(initHeader(JupyterMessages.COMM_MSG));

    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(COMM_ID, tableDisplay.getComm().getCommId());

    Map<String, Serializable> dataContent = new LinkedHashMap<>();
    dataContent.put("event", DOUBLE_CLICK.getAction());
    dataContent.put("row", 1);
    dataContent.put("column", 1);
    dataContent.put("itemKey", "tag1ByClosure");

    Map<String, Serializable> data = new LinkedHashMap<>();
    data.put("content", (Serializable) dataContent);
    content.put("data", (Serializable) data);
    message.setContent(content);
    return message;
  }

}