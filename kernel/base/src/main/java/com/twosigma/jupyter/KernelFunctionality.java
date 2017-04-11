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
package com.twosigma.jupyter;

import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.zeromq.ZMQ;

import java.io.IOException;
import java.util.Observer;
import java.util.Set;

public interface KernelFunctionality {

  void publish(Message message);

  void addComm(String commId, Comm comm);

  void removeComm(String commId);

  void send(Message message);

  void send(final ZMQ.Socket socket, Message message);

  String getSessionId();

  Observer getExecutionResultSender();

  Comm getComm(String string);

  boolean isCommPresent(String string);

  Set<String> getCommHashSet();

  void setShellOptions(KernelParameters kernelParameters);

  void cancelExecution();

  EvaluatorManager getEvaluatorManager();

  Handler<Message> getHandler(JupyterMessages type);

  void run() throws InterruptedException, IOException;
}
