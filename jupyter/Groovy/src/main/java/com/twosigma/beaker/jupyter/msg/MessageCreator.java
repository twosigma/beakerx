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
package com.twosigma.beaker.jupyter.msg;

import static com.twosigma.beaker.jupyter.Utils.timestamp;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.EXECUTE_REPLY;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.EXECUTE_RESULT;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.STATUS;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.STREAM;

import java.io.Serializable;
import java.util.*;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.SerializeToString;
import com.twosigma.beaker.groovy.ConsoleOutput;
import com.twosigma.beaker.groovy.SimpleEvaluationObject;
import com.twosigma.beaker.groovy.SimpleEvaluationObject.EvaluationStatus;
import com.twosigma.beaker.jupyter.SocketEnum;

/**
 * Converts SimpleEvaluationObject to Message
 * 
 * @author konst
 */
public class MessageCreator {

  public static final String EXECUTION_STATE = "execution_state";
  public static final String BUSY = "busy";
  public static final String IDLE = "idle";
  public static Logger logger = LoggerFactory.getLogger(MessageCreator.class);
  protected GroovyKernel kernel;
  
  public MessageCreator(GroovyKernel kernel){
    this.kernel = kernel;
  }
  
  public synchronized List<MessageHolder> createMessage(SimpleEvaluationObject seo){
    logger.info("Creating message responce message from: " + seo);

    List<MessageHolder> ret = new ArrayList<>();
    Message message = seo.getJupyterMessage();
    
    if(seo.getConsoleOutput() != null && !seo.getConsoleOutput().isEmpty()){
      while(!seo.getConsoleOutput().isEmpty()){
        ConsoleOutput co = seo.getConsoleOutput().poll(); //FIFO : peek to see, poll -- removes the data 
        Message reply = new Message();
        reply.setParentHeader(message.getHeader());
        reply.setIdentities(message.getIdentities());
        reply.setHeader(new Header(STREAM, message.getHeader().getSession()));
        reply.setContent(new Hashtable<String, Serializable>());
        reply.getContent().put("name", co.isError() ? "stderr" : "stdout");
        reply.getContent().put("text", co.getText());
        logger.info("Console output:", "Error: " + co.isError(), co.getText());
        ret.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, reply));
      }
    }else if(EvaluationStatus.FINISHED == seo.getStatus() || EvaluationStatus.ERROR == seo.getStatus()){
      
      switch (seo.getStatus()) {
        case FINISHED:{
          // Publish the result of the execution.
          Message reply = new Message();
          reply.setParentHeader(message.getHeader());
          reply.setIdentities(message.getIdentities());
          reply.setHeader(new Header(EXECUTE_RESULT, message.getHeader().getSession()));
          String resultString = SerializeToString.doit(seo.getPayload());
          boolean resultHtml = resultString != null && resultString.startsWith("<html>") && resultString.endsWith("</html>");
          reply.setContent(new HashMap<String, Serializable>());
          reply.getContent().put("execution_count", seo.getExecutionCount());
          if(resultString != null){
            HashMap<String, String> map3 = new HashMap<>();
            map3.put(resultHtml ? "text/html" : "text/plain", resultString);
            reply.getContent().put("data", map3);
          }
          reply.getContent().put("metadata", new HashMap<>());
          logger.info("Execution result is: " + (resultString == null ? "null" : "") + (resultHtml ? "HTML" : "") );
          ret.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, reply));
        }break;
  
        case ERROR:{
          logger.error("Execution result ERROR: " + seo.getPayload());
          Message reply = new Message();
          reply.setParentHeader(message.getHeader());
          reply.setIdentities(message.getIdentities());
          reply.setHeader(new Header(STREAM, message.getHeader().getSession()));
          Hashtable<String, Serializable> map4 = new Hashtable<String, Serializable>(2);
          map4.put("name", "stderr");
          map4.put("text", (String)seo.getPayload());
          reply.setContent(map4);
          ret.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, reply));
        }break;
        
        default:{
          logger.error("Unhandled status of SimpleEvaluationObject : " + seo.getStatus());
        }break;
        
      }

      Message reply = createIdleMessage(message);
      ret.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, reply));
    
      // Send the REPLY to the original message. This is NOT the result of
      // executing the cell. This is the equivalent of 'exit 0' or 'exit 1'
      // at the end of a shell script.
      reply = new Message();
      reply.setParentHeader(message.getHeader());
      reply.setIdentities(message.getIdentities());
      reply.setHeader(new Header(EXECUTE_REPLY, message.getHeader().getSession()));
      Hashtable<String, Serializable> map6 = new Hashtable<String, Serializable>(3);
      map6.put("dependencies_met", true);
      map6.put("engine", kernel.getId());
      map6.put("started", timestamp());
      reply.setMetadata(map6);
      Hashtable<String, Serializable> map7 = new Hashtable<String, Serializable>(1);
      map7.put("execution_count", seo.getExecutionCount());
      reply.setContent(map7);
      if (EvaluationStatus.ERROR == seo.getStatus()) {
        reply.getMetadata().put("status", "error");
        reply.getContent().put("status", "error");
        //reply.getContent().put("ename", error.getClass().getName());
        //reply.getContent().put("evalue", error.text);
      } else {
        reply.getMetadata().put("status", "ok");
        reply.getContent().put("status", "ok");
        reply.getContent().put("user_expressions", new HashMap<>());
      }
  
      ret.add(new MessageHolder(SocketEnum.SHELL_SOCKET, reply));
    }
    return ret;
  }

  public Message createBusyMessage(Message parentMessage) {
    return getExecutionStateMessage(parentMessage, BUSY);
  }

  public Message createIdleMessage(Message parentMessage) {
    return getExecutionStateMessage(parentMessage, IDLE);
  }

  private Message getExecutionStateMessage(Message parentMessage, String state) {
    Map<String, Serializable> map1 = new HashMap<String, Serializable>(1);
    map1.put(EXECUTION_STATE, state);
    Message reply = new Message();
    reply.setContent(map1);
    reply.setHeader(new Header(STATUS, parentMessage.getHeader().getSession()));
    reply.setParentHeader(parentMessage.getHeader());
    reply.setIdentities(parentMessage.getIdentities());
    return reply;
  }

}