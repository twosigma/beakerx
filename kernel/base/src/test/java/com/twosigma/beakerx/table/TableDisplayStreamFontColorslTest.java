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
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.jetbrains.annotations.NotNull;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplayStreamFontColorslTest {

  protected KernelTest kernel;
  private TableDisplay tableDisplay;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    tableDisplay = new TableDisplay(generateInfiniteStream());
    tableDisplay.setFontColorProvider(new ClosureTest() {
      @Override
      public Color call(Object row, Object col, Object tbl) {
        return ((int) row % 10 == 0) ? Color.GREEN : Color.BLACK;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    });
    TableDisplay.setLoadingMode(TableDisplayLoadingMode.ENDLESS);
    tableDisplay.display();
    kernel.clearMessages();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
    TableDisplay.setLoadingMode(TableDisplayLoadingMode.ALL);
  }

  @Test
  public void loadMoreRows() throws Exception {
    //given
    Message message = loadMoreRowsMessage();
    kernel.clearMessages();
    //when
    tableDisplay.getComm().handleMsg(message);
    //then
    List<Message> publishedMessages = kernel.getPublishedMessages();
    Map<String,List> updateData =  (Map<String,List>)TestWidgetUtils.getState(publishedMessages.get(0)).get("updateData");
    assertThat(updateData.get("values").size()).isEqualTo(1000);
    assertThat(updateData.get("fontColor").size()).isEqualTo(1000);
    assertThat(tableDisplay.getValues().size()).isEqualTo(2000);
    assertThat(tableDisplay.getFontColor().get().size()).isEqualTo(2000);
  }

  @NotNull
  private Message loadMoreRowsMessage() {
    Message message = new Message(new Header(JupyterMessages.COMM_MSG,"sessionId"));
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put("comm_id",tableDisplay.getComm().getCommId());
    LinkedHashMap<Object, Object> data = new LinkedHashMap<>();
    data.put("method","update");
    LinkedHashMap<Object, Object> state = new LinkedHashMap<>();
    state.put("loadMoreRows","loadMoreRequestJS");
    data.put("state",state);
    content.put("data", data);
    message.setContent(content);
    return message;
  }

  @NotNull
  private Stream<Map<String, Object>> generateInfiniteStream() {
    return Stream.generate(new Supplier<Map<String, Object>>() {
      Random random = new Random();
      int index = 0;
      @Override
      public Map<String, Object> get() {
        return new LinkedHashMap<String, Object>() {
          {
            put("str1", index++);
            put("str2", random.nextFloat());
            put("str3", random.nextInt());
          }
        };
      }
    });
  }


}
