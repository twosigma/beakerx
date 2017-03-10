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

import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.threads.ExecutionResultSender;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;
import sun.misc.Signal;
import sun.misc.SignalHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public abstract class Kernel implements KernelFunctionality {

  private static final Logger logger = LoggerFactory.getLogger(Kernel.class);

  public static String OS = System.getProperty("os.name").toLowerCase();

  private volatile boolean running = false;
  private String sessionId;
  private ConfigurationFile configurationFile;
  private KernelHandlers handlers;
  private Map<String, Comm> commMap;
  private ExecutionResultSender executionResultSender;
  private EvaluatorManager evaluatorManager;
  private KernelSockets kernelSockets;

  public Kernel(final String sessionId, final Evaluator evaluator, final ConfigurationFile configurationFile) {
    this.sessionId = sessionId;
    this.configurationFile = configurationFile;
    this.commMap = new ConcurrentHashMap<>();
    this.executionResultSender = new ExecutionResultSender(this);
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    this.handlers = new KernelHandlers(this, getCommOpenHandler(this));
    configureSignalHandler();
  }

  public abstract CommOpenHandler getCommOpenHandler(Kernel kernel);

  protected static void runKernel(Kernel kernel) throws InterruptedException, IOException {
    KernelManager.register(kernel);
    kernel.run();
  }

  private void run() throws InterruptedException, IOException {
    logger.info("Groovy Jupyter kernel starting.");
    running = true;
    this.kernelSockets = new KernelSockets(this, configurationFile.getConfig());
    this.kernelSockets.start();
    waitForShutdown();
    exit();
  }

  public void shutdown() {
    running = false;
  }

  private void waitForShutdown() throws InterruptedException {
    while (running) {
      Thread.sleep(1000);
    }
  }

  private void exit() throws InterruptedException {
    this.commMap.values().forEach(Comm::close);
    this.handlers.exit();
    this.executionResultSender.exit();
    this.kernelSockets.haltAndJoin();
    logger.info("Done");
  }

  public static boolean isWindows() {
    return (OS.indexOf("win") >= 0);
  }

  public synchronized void setShellOptions(String cp, String in, String od) {
    evaluatorManager.setShellOptions(cp, in, od);
  }

  @Override
  public synchronized void cancelExecution() {
    evaluatorManager.killAllThreads();
  }

  @Override
  public EvaluatorManager getEvaluatorManager() {
    return this.evaluatorManager;
  }

  public synchronized boolean isCommPresent(String hash) {
    return commMap.containsKey(hash);
  }

  public Set<String> getCommHashSet() {
    return commMap.keySet();
  }

  public synchronized void addComm(String hash, Comm commObject) {
    if (!isCommPresent(hash)) {
      commMap.put(hash, commObject);
    }
  }

  public synchronized Comm getComm(String hash) {
    return commMap.get(hash != null ? hash : "");
  }

  public synchronized void removeComm(String hash) {
    if (hash != null && isCommPresent(hash)) {
      commMap.remove(hash);
    }
  }

  public synchronized void publish(Message message) {
    this.kernelSockets.publish(message);
  }

  public synchronized void send(Message message) {
    this.kernelSockets.send(message);
  }

  @Override
  public void send(ZMQ.Socket socket, Message message) {
    this.kernelSockets.send(socket, message);
  }

  public Message readMessage(ZMQ.Socket socket) {
    return this.kernelSockets.readMessage(socket);
  }

  public Handler<Message> getHandler(JupyterMessages type) {
    return handlers.get(type);
  }

  public String getSessionId() {
    return sessionId;
  }

  public ExecutionResultSender getExecutionResultSender() {
    return executionResultSender;
  }

  private void configureSignalHandler() {
    SignalHandler handler = new SignalHandler() {
      public void handle(Signal sig) {
        logger.info("Got " + sig.getName() + " signal, canceling cell execution");
        cancelExecution();
      }
    };
    if (!isWindows()) {
      Signal.handle(new Signal("INT"), handler);
    }
  }

}