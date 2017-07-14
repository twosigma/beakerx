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
package com.twosigma.beakerx.kernel;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;

import com.twosigma.beakerx.DefaultJVMVariables;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.EvaluatorManager;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.message.Message;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.misc.Signal;
import sun.misc.SignalHandler;

public abstract class Kernel<T extends DefaultJVMVariables> implements KernelFunctionality {

  private static final Logger logger = LoggerFactory.getLogger(Kernel.class);

  public static String OS = System.getProperty("os.name").toLowerCase();
  public static boolean showNullExecutionResult = true;

  private String sessionId;
  private KernelSocketsFactory kernelSocketsFactory;
  private KernelHandlers handlers;
  private Map<String, Comm> commMap;
  private ExecutionResultSender executionResultSender;
  private EvaluatorManager evaluatorManager;
  private KernelSockets kernelSockets;
  private MessageCreator messageCreator;

  public Kernel(final String sessionId, final Evaluator evaluator,
      final KernelSocketsFactory kernelSocketsFactory) {
    this.messageCreator = new MessageCreator(this);
    this.sessionId = sessionId;
    this.kernelSocketsFactory = kernelSocketsFactory;
    this.commMap = new ConcurrentHashMap<>();
    this.executionResultSender = new ExecutionResultSender(this);
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    this.handlers = new KernelHandlers(this, getCommOpenHandler(this), getKernelInfoHandler(this));
    configureSignalHandler();
    initKernel(getKernelParameters());
  }

  public abstract KernelParameters getKernelParameters();

  public abstract CommOpenHandler getCommOpenHandler(Kernel kernel);

  public abstract KernelHandler<Message> getKernelInfoHandler(Kernel kernel);

  @Override
  public void run() {
    KernelManager.register(this);
    logger.debug("Jupyter kernel starting.");
    this.kernelSockets = kernelSocketsFactory.create(this, this::closeComms);
    this.kernelSockets.start();
    try {
      this.kernelSockets.join();
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      exit();
    }
    logger.debug("Jupyter kernel shoutdown.");
  }

  private void exit() {
    this.evaluatorManager.exit();
    this.handlers.exit();
    this.executionResultSender.exit();
  }

  private void closeComms() {
    this.commMap.values().forEach(Comm::close);
  }

  public static boolean isWindows() {
    return (OS.indexOf("win") >= 0);
  }

  public synchronized void setShellOptions(final KernelParameters kernelParameters) {
    evaluatorManager.setShellOptions(kernelParameters);
  }

  public void initKernel(final KernelParameters kernelParameters) {
    evaluatorManager.initKernel(kernelParameters);
  }

  @Override
  public synchronized void cancelExecution() {
    evaluatorManager.killAllThreads();
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

  @Override
  public SimpleEvaluationObject executeCode(String code, Message message, int executionCount,
      ExecuteCodeCallback executeCodeCallback) {
    return this.evaluatorManager.executeCode(code, message, executionCount, executeCodeCallback);
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return this.evaluatorManager.autocomplete(code, cursorPos);
  }

  @Override
  public void addJarToClasspath(PathToJar path) {
    this.evaluatorManager.addJarToClasspath(path);
  }

  @Override
  public void sendBusyMessage(Message message) {
    publish(this.messageCreator.createBusyMessage(message));
  }

  @Override
  public void sendIdleMessage(Message message) {
    publish(this.messageCreator.createIdleMessage(message));
  }

  @Override
  public Classpath getClasspath() {
    return this.evaluatorManager.getClasspath();
  }

  @Override
  public Imports getImports() {
    return this.evaluatorManager.getImports();
  }

  @Override
  public void addImport(ImportPath anImport) {
    this.evaluatorManager.addImport(anImport);
  }

  @Override
  public void removeImport(ImportPath anImport) {
    this.evaluatorManager.removeImport(anImport);
  }

}
