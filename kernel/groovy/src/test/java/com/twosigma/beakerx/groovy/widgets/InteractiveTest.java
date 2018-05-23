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

package com.twosigma.beakerx.groovy.widgets;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.widget.strings.TextTest.verifyTextField;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.DOMWidget;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.Text;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class InteractiveTest {
  private BaseEvaluator groovyEvaluator;
  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
    groovyKernel = new KernelTest("1", groovyEvaluator);
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
    groovyKernel.exit();
  }

  @Test
  public void interactWithStringParam_shouldCreateTextWidget() throws Exception {
    //when
    callInteractWithStringParam("\"A\"");
    //then
    verifyTextField(
            groovyKernel.getPublishedMessages(),
            Text.MODEL_NAME_VALUE,
            Text.MODEL_MODULE_VALUE,
            Text.VIEW_NAME_VALUE,
            Text.VIEW_MODULE_VALUE
    );
  }

  @Test
  public void valueChangeMsgCallback_createDisplayDataMessage() throws Exception {
    //given
    callInteractWithStringParam("\"A\"");
    Comm comm = getCommWidgetByViewName(Text.VIEW_NAME_VALUE);
    //when
    comm.handleMsg(initSyncDataMessage(comm.getCommId(), "TEST"));
    //then
    Message display = SearchMessages.getListMessagesByType(
            groovyKernel.getPublishedMessages(), JupyterMessages.COMM_MSG).get(2);
    Map date = (Map) display.getContent().get(Comm.DATA);
    Map state = (Map) date.get(Comm.STATE);
    Assertions.assertThat(state).isNotEmpty();
    Assertions.assertThat(state.get("value")).isEqualTo("TEST");
  }

  private void callInteractWithStringParam(String param) throws Exception {
    String code = getInteractiveCode(param);
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    seo.setJupyterMessage(commMsg());
    //when
    groovyEvaluator.evaluate(seo, code);
  }

  private Comm getCommWidgetByViewName(String viewName) {
    Message widget = SearchMessages.getListWidgetsByViewName(
            groovyKernel.getPublishedMessages(), viewName).get(0);
    String id = (String) widget.getContent().get(Comm.COMM_ID);
    return groovyKernel.getComm(id);
  }

  private Message initSyncDataMessage(String id, String value) {
    Map<String, Serializable> data = new LinkedHashMap<>();
    data.put(DOMWidget.SYNC_DATA, new LinkedHashMap<String, Serializable>() {
      {
        put(Widget.VALUE, value);
      }
    });
    data.put("buffer_keys", new ArrayList());
    data.put(Comm.METHOD, "backbone");
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(DATA, (Serializable) data);
    content.put(COMM_ID, id);
    return JupyterHandlerTest.initCommMessage(content);
  }

  private String getInteractiveCode(String arg) {
    return "public Object f(x){\n" +
            "    return x;\n" +
            "}\n" +
            "com.twosigma.beakerx.groovy.widgets.Interactive.interact(this.&f, " + arg + ");";
  }

}
