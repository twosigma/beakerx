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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Comm {
  
  private static final Logger logger = LoggerFactory.getLogger(GroovyKernel.class);
  
  public static final String COMM_ID = "comm_id";
  public static final String TARGET_NAME = "target_name";
  public static final String DATA = "data";
  public static final String TARGET_MODULE = "target_module";
  public static final String COMMS = "comms";

  private String commId;
  private String targetName;
  private HashMap<?,?> data;
  private String targetModule;
  private GroovyKernel kernel;
  private List<IHandler<Message>> msgCallbackList = new ArrayList<>();
  private List<IHandler<Message>> closeCallbackList  = new ArrayList<>(); 
  
  public Comm(String commId, String targetName) {
    super();
    this.kernel = GroovyKernelManager.get();
    this.commId = commId;
    this.targetName = targetName;
    this.data = new HashMap<>();
  }
  
  public Comm(String commId, CommNamesEnum targetName) {
    this(commId, targetName.getTargetName());
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
  
  public List<IHandler<Message>> getMsgCallbackList() {
    return msgCallbackList;
  }

  public void addMsgCallbackList(IHandler<Message> ... handlers) {
    this.msgCallbackList.addAll(Arrays.asList(handlers));
  }
  
  public void clearMsgCallbackList() {
    this.msgCallbackList = new ArrayList<>();
  }

  public List<IHandler<Message>> getCloseCallbackList() {
    return closeCallbackList;
  }

  public void addCloseCallbackList(IHandler<Message> ... handlers) {
    this.closeCallbackList.addAll(Arrays.asList(handlers));
  }
  
  public void clearCloseCallbackList() {
    this.closeCallbackList = new ArrayList<>();
  }
  
  public void open() throws NoSuchAlgorithmException{
    Message message = new Message();
    message.setHeader(new Header(COMM_OPEN, kernel.getParentMessage().getHeader().getSession()));
    message.setParentHeader(kernel.getParentMessage().getHeader());
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(COMM_ID, getCommId());
    map.put(TARGET_NAME, getTargetName());
    map.put(DATA, data);
    map.put(TARGET_MODULE, getTargetModule());
    message.setContent(map);
    kernel.publish(message);
    kernel.addComm(getCommId(), this);
  }
  
  public void close(Message parentMessage) throws NoSuchAlgorithmException{
    if(this.getCloseCallbackList() != null && !this.getMsgCallbackList().isEmpty()){
      for (IHandler<Message> handler : getMsgCallbackList()) {
        handler.handle(parentMessage);
      }
    }
    Message message = new Message();
    message.setHeader(new Header(COMM_CLOSE, parentMessage.getHeader().getSession()));
    message.setParentHeader(parentMessage.getHeader());
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(DATA, new HashMap<>());
    message.setContent(map);
    kernel.removeComm(getCommId());
    kernel.publish(message);
  }
  
  public void send() throws NoSuchAlgorithmException{
    Message message = new Message();
    message.setHeader(new Header(COMM_MSG, kernel.getParentMessage().getHeader().getSession()));
    message.setParentHeader(kernel.getParentMessage().getHeader());
    HashMap<String, Serializable> map = new HashMap<>(6);
    map.put(COMM_ID, getCommId());
    map.put(DATA, data);
    message.setContent(map);
    kernel.publish(message); //TODO check if right ?
  }
  
  public void handleMsg(Message parentMessage) throws NoSuchAlgorithmException{
    if(this.getMsgCallbackList() != null && !this.getMsgCallbackList().isEmpty()){
      for (IHandler<Message> handler : getMsgCallbackList()) {
        handler.handle(parentMessage);
      }
    }
  }
  
  @Override
  public String toString() {
    return commId + "/" + targetName + "/" + (targetModule != null && !targetModule.isEmpty()? targetModule : "");
  }

}