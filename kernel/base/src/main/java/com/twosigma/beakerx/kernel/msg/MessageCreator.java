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
package com.twosigma.beakerx.kernel.msg;

import static com.twosigma.beakerx.kernel.Utils.timestamp;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_REPLY;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_RESULT;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.STATUS;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.STREAM;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.CLEAR_OUTPUT;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.ERROR;

import java.io.Serializable;
import java.util.List;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.HashMap;
import java.util.Map;

import com.twosigma.beakerx.jvm.object.ConsoleOutput;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.SerializeToString;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus;
import com.twosigma.beakerx.kernel.SocketEnum;

/**
 * Converts SimpleEvaluationObject to Message
 *
 * @author konst
 */
public class MessageCreator {

  public static final String EXECUTION_STATE = "execution_state";
  public static final String BUSY = "busy";
  public static final String IDLE = "idle";
  public static final String TEXT_PLAIN = "text/plain";
  public static final String NULL_RESULT = "null";
  public static final String ERROR_MESSAGE = "text";

  public static Logger logger = LoggerFactory.getLogger(MessageCreator.class);
  protected KernelFunctionality kernel;

  public MessageCreator(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  private Message initMessage(JupyterMessages type, Message message) {
    Message reply = new Message();
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    reply.setHeader(new Header(type, message.getHeader().getSession()));
    return reply;
  }

  public Message buildMessage(Message message, String mime, String code, int executionCount) {
    Message reply = initMessage(EXECUTE_RESULT, message);
    reply.setContent(new HashMap<String, Serializable>());
    reply.getContent().put("execution_count", executionCount);
    HashMap<String, String> map3 = new HashMap<>();
    map3.put(mime, code);
    reply.getContent().put("data", map3);
    reply.getContent().put("metadata", new HashMap<>());
    return reply;
  }

  public Message buildClearOutput(Message message, boolean wait) {
    Message reply = initMessage(CLEAR_OUTPUT, message);
    reply.setContent(new HashMap<String, Serializable>());
    reply.getContent().put("wait", wait);
    reply.getContent().put("metadata", new HashMap<>());
    return reply;
  }

  public Message buildDisplayData(Message message, MIMEContainer value) {
    Message reply = initMessage(DISPLAY_DATA, message);
    reply.setContent(new HashMap<String, Serializable>());
    reply.getContent().put("metadata", new HashMap<>());
    HashMap<String, Serializable> map3 = new HashMap<>();
    map3.put(value.getMime().asString(), value.getCode());
    reply.getContent().put("data", map3);
    return reply;
  }

  private Message buildReply(Message message, SimpleEvaluationObject seo) {
    // Send the REPLY to the original message. This is NOT the result of
    // executing the cell. This is the equivalent of 'exit 0' or 'exit 1'
    // at the end of a shell script.
    Message reply = buildReplyWithoutStatus(message, seo.getExecutionCount());
    if (EvaluationStatus.FINISHED == seo.getStatus()) {
      reply.getMetadata().put("status", "ok");
      reply.getContent().put("status", "ok");
      reply.getContent().put("user_expressions", new HashMap<>());
    } else if (EvaluationStatus.ERROR == seo.getStatus()) {
      reply.getMetadata().put("status", "error");
      reply.getContent().put("status", "error");
    }
    return reply;
  }

  public Message buildReplyWithoutStatus(Message message, int executionCount) {
    Message reply = initMessage(EXECUTE_REPLY, message);
    Hashtable<String, Serializable> map6 = new Hashtable<String, Serializable>(3);
    map6.put("dependencies_met", true);
    map6.put("engine", kernel.getSessionId());
    map6.put("started", timestamp());
    reply.setMetadata(map6);
    Hashtable<String, Serializable> map7 = new Hashtable<String, Serializable>(1);
    map7.put("execution_count", executionCount);
    reply.setContent(map7);
    return reply;
  }

  public Message buildOutputMessage(Message message, String text, boolean hasError) {
    Message reply = initMessage(STREAM, message);
    reply.setContent(new HashMap<String, Serializable>());
    reply.getContent().put("name", hasError ? "stderr" : "stdout");
    reply.getContent().put("text", text);
    logger.debug("Console output:", "Error: " + hasError, text);
    return reply;
  }

  public synchronized List<MessageHolder> createMessage(SimpleEvaluationObject seo) {
    logger.debug("Creating message response message from: " + seo);
    Message message = seo.getJupyterMessage();
    List<MessageHolder> ret = new ArrayList<>();
    if (isConsoleOutputMessage(seo)) {
      ret.addAll(createConsoleResult(seo, message));
    } else if (isSupportedStatus(seo.getStatus())) {
      ret.addAll(createResultForSupportedStatus(seo, message));
    } else {
      logger.debug("Unhandled status of SimpleEvaluationObject : " + seo.getStatus());
    }
    return ret;
  }

  private List<MessageHolder> createResultForSupportedStatus(SimpleEvaluationObject seo, Message message) {
    List<MessageHolder> ret = new ArrayList<>();
    if (EvaluationStatus.FINISHED == seo.getStatus() && showResult(seo)) {
      MessageHolder mh = createFinishResult(seo, message);
      if(mh != null){
        ret.add(mh);
      }
    } else if (EvaluationStatus.ERROR == seo.getStatus()) {
      ret.add(createErrorResult(seo, message));
    }
    ret.add(new MessageHolder(SocketEnum.SHELL_SOCKET, buildReply(message, seo)));
    return ret;
  }

  private boolean isSupportedStatus(EvaluationStatus status) {
    return EvaluationStatus.FINISHED == status || EvaluationStatus.ERROR == status;
  }

  private boolean isConsoleOutputMessage(SimpleEvaluationObject seo) {
    return seo.getConsoleOutput() != null && !seo.getConsoleOutput().isEmpty();
  }

  private List<MessageHolder> createConsoleResult(SimpleEvaluationObject seo, Message message) {
    List<MessageHolder> result = new ArrayList<>();
    while (!seo.getConsoleOutput().isEmpty()) {
      ConsoleOutput co = seo.getConsoleOutput().poll(); //FIFO : peek to see, poll -- removes the data
      result.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, buildOutputMessage(message, co.getText(), co.isError())));
    }
    return result;
  }

  private MessageHolder createErrorResult(SimpleEvaluationObject seo, Message message) {
    String[] errorMessage = seo.getPayload().toString().split("\n");
    errorMessage = clearText(errorMessage);
    if(errorMessage != null && errorMessage.length > 0){
      logger.info("Execution result ERROR: " + errorMessage[0]);
    }
    Message reply = initMessage(ERROR, message);
    Hashtable<String, Serializable> map4 = new Hashtable<String, Serializable>(2);
    String ename = "";
    String evalue = "";
    if(errorMessage != null && errorMessage[0] != null && !errorMessage[0].isEmpty()){
      String[] temp = errorMessage[0].split(":");
      if(temp != null){
        if(temp.length == 1){
          ename = temp[0];
          evalue = temp[0];
        }else if(temp.length > 1){
          ename = temp[0];
          evalue = temp[1];
        }
      }
    }
    map4.put("ename", ename);
    map4.put("evalue", evalue);
    map4.put("traceback", markRed(errorMessage));
    map4.put(ERROR_MESSAGE, seo.getPayload().toString());
    reply.setContent(map4);
    return new MessageHolder(SocketEnum.IOPUB_SOCKET, reply);
  }

  private String[] clearText(String[] input){
    List<String> ret = new ArrayList<>();
    if(input != null){
      for (String line : input) {
        if(line != null){
          if(line.endsWith("\r")){
            ret.add( line.substring(0, line.length() - 1));
          }else{
            ret.add(line);
          }
        }
      }
    }
    return ret.stream().toArray(String[]::new);
  }

  private String[] markRed(String[] input){
    List<String> ret = new ArrayList<>();
    if(input != null){
      for (String line : input) {
        if(line != null){
          ret.add("\u001b[0;31m" + line + "");
        }
      }
    }
    return ret.stream().toArray(String[]::new);
  }

  private MessageHolder createFinishResult(SimpleEvaluationObject seo, Message message) {
    MessageHolder ret = null;
    MIMEContainer resultString = SerializeToString.doit(seo.getPayload());
    if (!MIMEContainer.HIDDEN.getMime().equals(resultString.getMime())) {
      ret = new MessageHolder(SocketEnum.IOPUB_SOCKET,
          buildMessage(message, resultString.getMime().asString(),
              resultString.getCode()+outputdataResult(seo.getOutputdata()),
              seo.getExecutionCount()));
    }
    return ret;
  }

  private String outputdataResult(List<Object> outputdata) {
    String result = "";
    for (Object o : outputdata) {
      if (o instanceof SimpleEvaluationObject.EvaluationStdOutput) {
        result += "\n" + (((SimpleEvaluationObject.EvaluationStdOutput) o).payload);
      } else if (o instanceof SimpleEvaluationObject.EvaluationStdError) {
        result += "\n" + (((SimpleEvaluationObject.EvaluationStdError) o).payload);
      }
    }
    return result;
  }

  private boolean showResult(SimpleEvaluationObject seo) {
    boolean ret = true;
    if(seo != null && seo.getPayload() != null && seo.getPayload() instanceof MIMEContainer){
      MIMEContainer input = (MIMEContainer) seo.getPayload();
      ret = !MIMEContainer.MIME.HIDDEN.equals(input.getMime());
    } else if((seo!=null && !seo.getOutputdata().isEmpty())){
      ret = true;
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
    Message reply = initMessage(STATUS, parentMessage);
    reply.setContent(map1);
    return reply;
  }

}
