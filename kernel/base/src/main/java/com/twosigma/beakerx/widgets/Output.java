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
package com.twosigma.beakerx.widgets;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.ConsoleOutput;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static com.twosigma.beakerx.message.Header.MSG_ID;
import static java.util.Collections.emptyList;

public class Output extends DOMWidget {

  public static final String VIEW_NAME_VALUE = "OutputView";
  public static final String MODEL_NAME_VALUE = "OutputModel";

  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/output";
  public static final String VIEW_MODULE_VALUE = "@jupyter-widgets/output";
  public static final String OUTPUTS = "outputs";
  public static final String OUTPUT_TYPE = "output_type";
  public static final String NAME = "name";
  public static final String TEXT = "text";
  public static final String STREAM = "stream";
  public static final String STDERR = "stderr";
  public static final String STDOUT = "stdout";

  private List<Map<String, Serializable>> outputs = Collections.synchronizedList(new ArrayList<>());

  public Output() {
    super();
    openComm();
  }

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
    return MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return VIEW_MODULE_VALUE;
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MSG_ID, "");
    content.put(OUTPUTS, new ArrayList<>().toArray());
    return content;
  }

  @Override
  public void updateValue(Object value) {
    sendUpdate(MSG_ID, "");
    InternalVariable.getSimpleEvaluationObject().finishInnerEvaluation();
  }

  public void sendOutput(ConsoleOutput co) {
    InternalVariable.getSimpleEvaluationObject().startInnerEvaluation();
    sendUpdate(MSG_ID, getComm().getParentMessage().getHeader().getId());
    Map<String, Serializable> asMap = addOutput(co);
    getComm().sendOutputContent(asMap);
  }

  public void appendStdout(String text) {
    addOutput(new ConsoleOutput(false, text + "\n"));
    sendUpdate(OUTPUTS, outputs);
  }

  public void appendStderr(String text) {
    addOutput(new ConsoleOutput(true, text + "\n"));
    sendUpdate(OUTPUTS, outputs);
  }

  private Map<String, Serializable> addOutput(ConsoleOutput co) {
    Map<String, Serializable> value = createOutput(co);
    outputs.add(value);
    return value;
  }

  public void clearOutput() {
    outputs = Collections.synchronizedList(new ArrayList<>());
    sendUpdate(OUTPUTS, emptyList());
  }

  private Map<String, Serializable> createOutput(ConsoleOutput co) {
    Map<String, Serializable> outputs = new HashMap<>();
    outputs.put(OUTPUT_TYPE, STREAM);
    outputs.put(NAME, co.isError() ? STDERR : STDOUT);
    outputs.put(TEXT, co.getText());
    return outputs;
  }

  public void display(MIMEContainer mimeContainer) {
    InternalVariable.getSimpleEvaluationObject().startInnerEvaluation();
    sendUpdate(MSG_ID, getComm().getParentMessage().getHeader().getId());
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(mimeContainer.getMime().asString(), (Serializable) mimeContainer.getData());
    getComm().setData(content);
    getComm().send(DISPLAY_DATA);
  }
}
