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
import java.util.stream.Collectors;

import com.twosigma.beakerx.jvm.object.ConsoleOutput;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.MIMEContainerFactory;
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
  public static final String TEXT = "text";
  public static final String NAME = "name";
  public static final String STDERR = "stderr";
  public static final String STDOUT = "stdout";

  public static Logger logger = LoggerFactory.getLogger(MessageCreator.class);

  private MessageCreator() {
  }

  private static Message initMessage(JupyterMessages type, Message message) {
    Message reply = new Message(new Header(type, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    return reply;
  }

  public static Message buildMessage(Message message, List<MIMEContainer> mimes, int executionCount) {
    Message reply = initMessage(EXECUTE_RESULT, message);
    reply.setContent(new HashMap<>());
    reply.getContent().put("execution_count", executionCount);
    HashMap<String, Object> map3 = new HashMap<>();
    mimes.forEach(mimeItem -> map3.put(mimeItem.getMime().asString(), mimeItem.getData()));
    reply.getContent().put("data", map3);
    reply.getContent().put("metadata", new HashMap<>());
    return reply;
  }

  private static Message buildMessage(Message message, List<MIMEContainer> mimes, String outputdataResult, int executionCount) {
    if (!outputdataResult.isEmpty()) {
      List<MIMEContainer> collect = mimes.stream().map(x -> new MIMEContainer(x.getMime().asString(), x.getData() + outputdataResult)).collect(Collectors.toList());
      return buildMessage(message, collect, executionCount);
    }
    return buildMessage(message, mimes, executionCount);
  }

  public static Message buildClearOutput(Message message, boolean wait) {
    Message reply = initMessage(CLEAR_OUTPUT, message);
    reply.setContent(new HashMap<>());
    reply.getContent().put("wait", wait);
    reply.getContent().put("metadata", new HashMap<>());
    return reply;
  }

  public static Message buildDisplayData(Message message, List<MIMEContainer> mimes) {
    Message reply = initMessage(DISPLAY_DATA, message);
    reply.setContent(new HashMap<>());
    reply.getContent().put("metadata", new HashMap<>());
    HashMap<String, Object> map3 = new HashMap<>();
    mimes.forEach(mimeItem -> map3.put(mimeItem.getMime().asString(), mimeItem.getData()));
    reply.getContent().put("data", map3);
    return reply;
  }

  private static Message buildReply(Message message, SimpleEvaluationObject seo) {
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

  public static Message buildReplyWithoutStatus(Message message, int executionCount) {
    Message reply = initMessage(EXECUTE_REPLY, message);
    Hashtable<String, Serializable> map6 = new Hashtable<String, Serializable>(3);
    map6.put("dependencies_met", true);
    map6.put("started", timestamp());
    reply.setMetadata(map6);
    Hashtable<String, Serializable> map7 = new Hashtable<String, Serializable>(1);
    map7.put("execution_count", executionCount);
    reply.setContent(map7);
    return reply;
  }

  public static Message buildReplyWithOkStatus(Message message, int executionCount) {
    Message messageWithStatus = buildReplyWithoutStatus(message, executionCount);
    messageWithStatus.getContent().put("status", "ok");
    return messageWithStatus;
  }

  public static Message buildReplyWithErrorStatus(Message message, int executionCount) {
    Message messageWithStatus = buildReplyWithoutStatus(message, executionCount);
    messageWithStatus.getContent().put("status", "error");
    return messageWithStatus;
  }

  public static Message buildOutputMessage(Message message, String text, boolean hasError) {
    Message reply = initMessage(STREAM, message);
    reply.setContent(new HashMap<>());
    reply.getContent().put(NAME, hasError ? STDERR : STDOUT);
    reply.getContent().put(TEXT, text);
    logger.debug("Console output:", "Error: " + hasError, text);
    return reply;
  }

  public static synchronized List<MessageHolder> createMessage(SimpleEvaluationObject seo) {
    logger.debug("Creating message response message from: " + seo);
    Message message = seo.getJupyterMessage();
    List<MessageHolder> ret = new ArrayList<>();
    if (isConsoleOutputMessage(seo)) {
      ret.addAll(createConsoleResult(seo, message));
    } else if (isError(seo.getStatus())) {
      ret.addAll(createError(seo, message));
    } else if (isFinish(seo.getStatus()) && seo.isShowResult()) {
      ret.addAll(createFinish(seo, message));
    } else {
      logger.debug("Unhandled status of SimpleEvaluationObject : " + seo.getStatus());
    }
    return ret;
  }

  private static List<MessageHolder> createFinish(SimpleEvaluationObject seo, Message message) {
    List<MessageHolder> ret = new ArrayList<>();
    MessageHolder mh = createFinishResult(seo, message);
    if (mh != null) {
      ret.add(mh);
    }
    ret.add(new MessageHolder(SocketEnum.SHELL_SOCKET, buildReply(message, seo)));
    return ret;
  }

  private static boolean isFinish(EvaluationStatus status) {
    return EvaluationStatus.FINISHED == status;
  }

  private static List<MessageHolder> createError(SimpleEvaluationObject seo, Message message) {
    List<MessageHolder> ret = new ArrayList<>();
    ret.add(createErrorResult(seo, message));
    ret.add(new MessageHolder(SocketEnum.SHELL_SOCKET, buildReply(message, seo)));
    return ret;
  }

  private static boolean isError(EvaluationStatus status) {
    return EvaluationStatus.ERROR == status;
  }

  private static boolean isConsoleOutputMessage(SimpleEvaluationObject seo) {
    return seo.getConsoleOutput() != null && !seo.getConsoleOutput().isEmpty();
  }

  private static List<MessageHolder> createConsoleResult(SimpleEvaluationObject seo, Message message) {
    List<MessageHolder> result = new ArrayList<>();
    while (!seo.getConsoleOutput().isEmpty()) {
      ConsoleOutput co = seo.getConsoleOutput().poll(); //FIFO : peek to see, poll -- removes the data
      result.add(new MessageHolder(SocketEnum.IOPUB_SOCKET, buildOutputMessage(message, co.getText(), co.isError())));
    }
    return result;
  }

  private static MessageHolder createErrorResult(SimpleEvaluationObject seo, Message message) {
    String[] errorMessage = seo.getPayload().toString().split("\n");
    errorMessage = clearText(errorMessage);
    if (errorMessage != null && errorMessage.length > 0) {
      logger.debug("Execution result ERROR: " + seo.getPayload().toString());
    }
    Message reply = initMessage(ERROR, message);
    Hashtable<String, Serializable> map4 = new Hashtable<String, Serializable>(2);
    String ename = "";
    String evalue = "";
    if (errorMessage != null && errorMessage[0] != null && !errorMessage[0].isEmpty()) {
      String[] temp = errorMessage[0].split(":");
      if (temp != null) {
        if (temp.length == 1) {
          ename = temp[0];
          evalue = temp[0];
        } else if (temp.length > 1) {
          ename = temp[0];
          evalue = temp[1];
        }
      }
    }
    map4.put("ename", ename);
    map4.put("evalue", evalue);
    map4.put("traceback", TracebackPrinter.print(errorMessage));
    map4.put(ERROR_MESSAGE, seo.getPayload().toString());
    reply.setContent(map4);
    return new MessageHolder(SocketEnum.IOPUB_SOCKET, reply);
  }

  private static String[] clearText(String[] input) {
    List<String> ret = new ArrayList<>();
    if (input != null) {
      for (String line : input) {
        if (line != null) {
          if (line.endsWith("\r")) {
            ret.add(line.substring(0, line.length() - 1));
          } else {
            ret.add(line);
          }
        }
      }
    }
    return ret.stream().toArray(String[]::new);
  }

  private static MessageHolder createFinishResult(SimpleEvaluationObject seo, Message message) {
    MessageHolder ret = null;
    List<MIMEContainer> mimes = MIMEContainerFactory.createMIMEContainers(seo.getPayload());
    if (!mimes.contains(MIMEContainer.HIDDEN)) {
      ret = new MessageHolder(SocketEnum.IOPUB_SOCKET,
              buildMessage(message, mimes, outputdataResult(seo.getOutputdata()), seo.getExecutionCount()));
    }
    return ret;
  }

  private static String outputdataResult(List<Object> outputdata) {
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

  private static boolean showResult(SimpleEvaluationObject seo) {
    boolean ret = true;
    if (seo != null && seo.getPayload() != null && seo.getPayload() instanceof MIMEContainer) {
      MIMEContainer input = (MIMEContainer) seo.getPayload();
      ret = !MIMEContainer.MIME.HIDDEN.equals(input.getMime().asString());
    } else if ((seo != null && !seo.getOutputdata().isEmpty())) {
      ret = true;
    }
    return ret;
  }

  public static Message createBusyMessage(Message parentMessage) {
    return getExecutionStateMessage(parentMessage, BUSY);
  }

  public static Message createIdleMessage(Message parentMessage) {
    return getExecutionStateMessage(parentMessage, IDLE);
  }

  private static Message getExecutionStateMessage(Message parentMessage, String state) {
    Map<String, Serializable> map1 = new HashMap<String, Serializable>(1);
    map1.put(EXECUTION_STATE, state);
    Message reply = initMessage(STATUS, parentMessage);
    reply.setContent(map1);
    return reply;
  }
}
