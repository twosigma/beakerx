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

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_OPEN;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;

public class Comm {
  
  public static final String COMM_ID = "comm_id";
  public static final String TARGET_NAME = "target_name";
  public static final String DATA = "data";
  public static final String TARGET_MODULE = "target_module";


  private String commId;
  private String targetName;
  private HashMap<?,?> data;
  private String targetModule;
  private GroovyKernel kernel;

  public Comm(String commId, String targetName, GroovyKernel kernel) {
    super();
    this.kernel = kernel;
    this.commId = commId;
    this.targetName = targetName;
    this.data = new HashMap<>();
  }
  
  public Comm(String commId, CommNamesEnum targetName, GroovyKernel kernel) {
    this(commId, targetName.getTargetName(), kernel);
  }
  
  public String getCommId() {
    return commId;
  }

  public String getTargetName() {
    return targetName;
  }

  public HashMap<?,?> getData() {
    return data;
  }

  public void setData(HashMap<?,?> data) {
    this.data = data;
  }

  public String getTargetModule() {
    return targetModule;
  }

  public void setTargetModule(String targetModule) {
    this.targetModule = targetModule;
  }
  
  public void open() throws NoSuchAlgorithmException{
    Message message = new Message();
    message.setHeader(new Header(COMM_OPEN, null)); // TODO put session ID, if needed
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(COMM_ID, getCommId());
    map.put(TARGET_NAME, getTargetName());
    map.put(DATA, data);
    map.put(TARGET_MODULE, getTargetModule());
    message.setContent(map);
    kernel.publish(message);
    kernel.addComm(getCommId(), this);
  }
  
  public void close() throws NoSuchAlgorithmException{
    Message message = new Message();
    message.setHeader(new Header(COMM_CLOSE, null));  // TODO put session ID, if needed
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(DATA, new HashMap<>());
    message.setContent(map);
    kernel.removeComm(getCommId());
    kernel.publish(message);
  }
  
  public void send() throws NoSuchAlgorithmException{
    Message message = new Message();
    message.setHeader(new Header(COMM_MSG, null)); // TODO put session ID, if needed
    HashMap<String, Serializable> map = new HashMap<>(6);
    map.put(COMM_ID, getCommId());
    map.put(DATA, data);
    message.setContent(map);
    kernel.send(message); //TODO check if right ?
  }
  
  @Override
  public String toString() {
    return commId + "/" + targetName + "/" + (targetModule != null && !targetModule.isEmpty()? targetModule : "");
  }

}