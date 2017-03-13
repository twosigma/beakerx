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

package com.twosigma.beaker.jupyter;

import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.evaluator.GroovyEvaluator;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.Config;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.zeromq.ZMQ;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.jupyter.message.MessageSerializer.parse;
import static com.twosigma.jupyter.message.MessageSerializer.toJson;

public class GroovyKernelJupyterTest extends Kernel {

  private List<Message> publishMessages = new ArrayList<>();
  private List<Message> sendMessages = new ArrayList<>();
  private SimpleEvaluationObject simpleEvaluationObject;
  private Boolean groovyEvaluatorManagerExit;
  private Boolean commHandleMessage;
  private Boolean setShellOptions;

  public GroovyKernelJupyterTest() {
    this("1", new GroovyEvaluator("1", "1"));
  }

  public GroovyKernelJupyterTest(String id, Evaluator evaluator) {
    super(id, evaluator, Config::new);
  }

  @Override
  public void publish(Message message) {
    this.publishMessages.add(copyMessage(message));
  }

  @Override
  public void send(Message message) {
    this.sendMessages.add(copyMessage(message));
  }

  @Override
  public void send(ZMQ.Socket socket, Message message) {
    this.sendMessages.add(copyMessage(message));
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return null;
  }

  public List<Message> getPublishMessages() {
    return publishMessages;
  }

  public List<Message> getSendMessages() {
    return sendMessages;
  }

  @Override
  public synchronized void setShellOptions(String cp, String in, String od) {
    setShellOptions = Boolean.TRUE;
    super.setShellOptions(cp, in, od);
  }

  public Boolean isSetShellOptions() {
    return setShellOptions;
  }

  public SimpleEvaluationObject getSimpleEvaluationObject() {
    return simpleEvaluationObject;
  }

  public SimpleEvaluationObject groovyEvaluatorManagerExecuteCode(String code, Message message, int executionCount) {
    simpleEvaluationObject = new SimpleEvaluationObject(code);
    simpleEvaluationObject.setJupyterMessage(message);
    simpleEvaluationObject.setExecutionCount(executionCount);
    return simpleEvaluationObject;
  }

  public void groovyEvaluatorManagerExit() {
    groovyEvaluatorManagerExit = Boolean.TRUE;
  }

  public Boolean getGroovyEvaluatorManagerExit() {
    return groovyEvaluatorManagerExit;
  }

  public Boolean getCommHandleMessage() {
    return commHandleMessage;
  }

  public void commHandleMessage() {
    this.commHandleMessage = Boolean.TRUE;
  }

  private Message copyMessage(Message origin) {
    Message copy = new Message();
    for (byte[] list : origin.getIdentities()) {
      copy.getIdentities().add(list.clone());
    }
    String header = toJson(origin.getHeader());
    String parent = toJson(origin.getParentHeader());
    String metadata = toJson(origin.getMetadata());
    String content = toJson(origin.getContent());
    copy.setHeader(parse(header, Header.class));
    copy.setParentHeader(parse(parent, Header.class));
    copy.setMetadata(parse(metadata, LinkedHashMap.class));
    copy.setContent(parse(content, LinkedHashMap.class));
    return copy;
  }
}
