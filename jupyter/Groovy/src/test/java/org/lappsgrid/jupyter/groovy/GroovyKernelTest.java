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
package org.lappsgrid.jupyter.groovy;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.threads.ExecutionResultSender;
import it.unimi.dsi.fastutil.chars.CharSets;
import org.lappsgrid.jupyter.groovy.GroovyKernelFunctionality;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.zeromq.ZMQ;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Observer;
import java.util.Set;

public class GroovyKernelTest implements GroovyKernelFunctionality {

  private List<Message> publishedMessages = new ArrayList<>();
  private List<Message> sentMessages = new ArrayList<>();
  private String id;
  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);
  private Boolean setShellOptions;
  private Map<String, Comm> commMap = new HashMap<>();;

  public GroovyKernelTest() {
    this("groovyKernelTestId1");
  }

  public GroovyKernelTest(String id) {
    this.id = id;
  }

  @Override
  public void publish(Message message) throws NoSuchAlgorithmException {
    this.publishedMessages.add(message);
  }

  @Override
  public void send(Message message) throws NoSuchAlgorithmException {
    this.sentMessages.add(message);
  }

  @Override
  public String getId() {
    return this.id;
  }

  public Observer getExecutionResultSender() {
    return this.executionResultSender;
  }


  @Override
  public void addComm(String hash, Comm commObject) {
    if(!isCommPresent(hash)){
      commMap.put(hash, commObject);
    }
  }

  @Override
  public void removeComm(String hash) {
    if(hash != null && isCommPresent(hash)){
      commMap.remove(hash);
    }
  }

  @Override
  public void send(ZMQ.Socket socket, Message message) throws NoSuchAlgorithmException {

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

  public void setShellOptions(String usString, String usString1, String o) {
    setShellOptions = Boolean.TRUE;
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

  public void clearPublishedMessages(){
    this.publishedMessages = new ArrayList<>();
  }
  public void clearSentMessages(){
    this.sentMessages = new ArrayList<>();
  }

  public void cancelExecution(){}
}
