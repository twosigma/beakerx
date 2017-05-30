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
package com.twosigma.beaker;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.beaker.jupyter.threads.ExecutionResultSender;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Observer;
import java.util.Set;

public class KernelTest implements KernelFunctionality {

  private List<Message> publishedMessages = new ArrayList<>();
  private List<Message> sentMessages = new ArrayList<>();
  private String id;
  private Map<String, Comm> commMap = new HashMap<>();
  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);
  private Boolean setShellOptions;
  private EvaluatorManager evaluatorManager;
  private MessageCreator messageCreator;

  public KernelTest() {
    this("KernelTestId1");
  }

  public KernelTest(String id) {
    this.id = id;
    this.messageCreator = new MessageCreator(this);
  }

  public KernelTest(String id, Evaluator evaluator) {
    this.id = id;
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    this.messageCreator = new MessageCreator(this);
  }

  @Override
  public void publish(Message message) {
    this.publishedMessages.add(message);
  }

  @Override
  public void send(Message message) {
    this.sentMessages.add(message);
  }

  public String getSessionId() {
    return this.id;
  }

  public Observer getExecutionResultSender() {
    return this.executionResultSender;
  }


  @Override
  public void addComm(String hash, Comm commObject) {
    if (!isCommPresent(hash)) {
      commMap.put(hash, commObject);
    }
  }

  @Override
  public void removeComm(String hash) {
    if (hash != null && isCommPresent(hash)) {
      commMap.remove(hash);
    }
  }

  @Override
  public Comm getComm(String hash) {
    return commMap.get(hash != null ? hash : "");
  }

  @Override
  public boolean isCommPresent(String hash) {
    return commMap.containsKey(hash);
  }

  @Override
  public Set<String> getCommHashSet() {
    return commMap.keySet();
  }

  @Override
  public void setShellOptions(KernelParameters kernelParameters) {
    this.setShellOptions = Boolean.TRUE;
  }

  public Boolean isSetShellOptions() {
    return setShellOptions;
  }

  public List<Message> getPublishedMessages() {
    return publishedMessages;
  }

  public List<Message> getSentMessages() {
    return sentMessages;
  }

  public void clearPublishedMessages() {
    this.publishedMessages = new ArrayList<>();
  }

  public void clearSentMessages() {
    this.sentMessages = new ArrayList<>();
  }

  public void clearMessages() {
    clearSentMessages();
    clearPublishedMessages();
  }

  public void cancelExecution() {
  }

  @Override
  public Handler<Message> getHandler(JupyterMessages type) {
    return null;
  }

  @Override
  public void run() {

  }

  @Override
  public SimpleEvaluationObject executeCode(String code, Message message, int executionCount, ExecuteCodeCallback executeCodeCallback) {
    return null;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return this.evaluatorManager.autocomplete(code,cursorPos);
  }

  @Override
  public void sendBusyMessage(Message message) {
    Message busyMessage = this.messageCreator.createBusyMessage(message);
    publish(busyMessage);
  }

  @Override
  public void sendIdleMessage(Message message) {
    Message idleMessage = this.messageCreator.createIdleMessage(message);
    publish(idleMessage);
  }
}
