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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.threads.ExecutionResultSender;
import org.lappsgrid.jupyter.groovy.GroovyKernelFunctionality;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.zeromq.ZMQ;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Observer;
import java.util.Set;

public class GroovyKernelTest implements GroovyKernelFunctionality {

  private List<Message> messages = new ArrayList<>();
  private String id;
  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);

  public GroovyKernelTest() {
    this("groovyKernelTestId1");
  }

  public GroovyKernelTest(String id) {
    this.id = id;
  }

  @Override
  public void publish(Message message) throws NoSuchAlgorithmException {
    this.messages.add(message);
  }

  @Override
  public void addComm(String commId, Comm comm) {

  }

  @Override
  public void removeComm(String commId) {

  }

  @Override
  public String getId() {
    return this.id;
  }

  @Override
  public Observer getExecutionResultSender() {
    return this.executionResultSender;
  }

  @Override
  public void send(ZMQ.Socket socket, Message message) throws NoSuchAlgorithmException {
  }

  @Override
  public void send(Message message) throws NoSuchAlgorithmException {
  }

  @Override
  public Comm getComm(String string) {
    return null;
  }

  @Override
  public boolean isCommPresent(String string) {
    return false;
  }

  @Override
  public Set<String> getCommHashSet() {
    return null;
  }

  @Override
  public void setShellOptions(String usString, String usString1, String o) {
  }

  public List<Message> getMessages() {
    return messages;
  }

  public void clearMessages(){
    this.messages = new ArrayList<>();
  }
}
