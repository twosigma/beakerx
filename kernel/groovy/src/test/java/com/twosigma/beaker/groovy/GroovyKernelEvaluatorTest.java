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

package com.twosigma.beaker.groovy;

import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.zeromq.ZMQ;

import java.util.ArrayList;
import java.util.List;
import java.util.Observer;
import java.util.Set;

public class GroovyKernelEvaluatorTest implements KernelFunctionality {

  private List<Message> messages = new ArrayList<>();

  @Override
  public void publish(Message message) {
    this.messages.add(message);
  }

  @Override
  public void addComm(String commId, Comm comm) {}

  @Override
  public void removeComm(String commId) {}

  @Override
  public void send(Message message) {}

  @Override
  public void send(ZMQ.Socket socket, Message message) {}

  @Override
  public boolean isCommPresent(String string) {
    return false;
  }

  @Override
  public Comm getComm(String string) {
    return null;
  }

  @Override
  public Set<String> getCommHashSet() {
    return null;
  }

  @Override
  public void setShellOptions(String usString, String usString1) {

  }

  public String getSessionId() {
    return null;
  }

  @Override
  public Observer getExecutionResultSender() {
    return null;
  }

  public List<Message> getMessages() {
    return messages;
  }

  public void clearMessages() {
    this.messages = new ArrayList<>();
  }

  public void cancelExecution(){}

  @Override
  public EvaluatorManager getEvaluatorManager() {
    return null;
  }

  @Override
  public Handler<Message> getHandler(JupyterMessages type) {
    return null;
  }
}
