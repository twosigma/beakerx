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

import static com.twosigma.beakerx.kernel.KernelSignalHandler.addSigIntHandler;
import static com.twosigma.beakerx.kernel.commands.MavenJarResolver.MVN_DIR;

import com.google.common.collect.Lists;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.EvaluatorManager;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.commands.MavenJarResolver;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandType;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.message.Message;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Kernel implements KernelFunctionality {

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
  private MagicCommand magicCommand;

  public Kernel(final String sessionId, final Evaluator evaluator,
                final KernelSocketsFactory kernelSocketsFactory) {
    this.messageCreator = new MessageCreator(this);
    this.sessionId = sessionId;
    this.kernelSocketsFactory = kernelSocketsFactory;
    this.commMap = new ConcurrentHashMap<>();
    this.executionResultSender = new ExecutionResultSender(this);
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    this.handlers = new KernelHandlers(this, getCommOpenHandler(this), getKernelInfoHandler(this));
    this.magicCommand = handlers.getExecuteRequestHandler().getMagicCommand();
    configureSignalHandler();
    initKernel(getKernelParameters());
    configureJvmRepr();
  }

  public abstract KernelParameters getKernelParameters();

  public abstract CommOpenHandler getCommOpenHandler(Kernel kernel);

  public abstract KernelHandler<Message> getKernelInfoHandler(Kernel kernel);

  protected void configureJvmRepr() {
  }

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
      doExit();
      logger.debug("Jupyter kernel shoutdown.");
    }
  }

  private void doExit() {
    this.evaluatorManager.exit();
    this.handlers.exit();
    this.executionResultSender.exit();
    System.exit(0);
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
    evaluatorManager.cancelExecution();
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
    if (!isWindows()) {
      addSigIntHandler(this::cancelExecution);
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
  public boolean addJarToClasspath(PathToJar path) {
    return this.evaluatorManager.addJarToClasspath(path);
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return this.evaluatorManager.addJarsToClasspath(paths);
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

  public MagicCommand getMagicCommand() {
    return magicCommand;
  }

  @Override
  public List<MagicCommandType> getMagicCommands() {
    return Lists.newArrayList(
            new MagicCommandType(MagicCommand.JAVASCRIPT, "", magicCommand.javascript()),
            new MagicCommandType(MagicCommand.HTML, "", magicCommand.html()),
            new MagicCommandType(MagicCommand.BASH, "", magicCommand.bash()),
            new MagicCommandType(MagicCommand.LSMAGIC, "", magicCommand.lsmagic()),
            new MagicCommandType(MagicCommand.CLASSPATH_ADD_JAR, "<jar path>", magicCommand.classpathAddJar()),
            new MagicCommandType(MagicCommand.CLASSPATH_ADD_MVN, "<group name version>",
                    magicCommand.classpathAddMvn(new MavenJarResolver.ResolverParams(
                            getTempFolder().toString() + "/../beakerIvyCache",
                            getTempFolder().toString() + MVN_DIR,
                            MavenJarResolver.createBiblioResolver()
                    ))),
            new MagicCommandType(MagicCommand.CLASSPATH_REMOVE, "<jar path>", magicCommand.classpathRemove()),
            new MagicCommandType(MagicCommand.CLASSPATH_SHOW, "", magicCommand.classpathShow()),
            new MagicCommandType(MagicCommand.ADD_STATIC_IMPORT, "<classpath>", magicCommand.addStaticImport()),
            new MagicCommandType(MagicCommand.IMPORT, "<classpath>", magicCommand.addImport()),
            new MagicCommandType(MagicCommand.UNIMPORT, "<classpath>", magicCommand.unimport()),
            new MagicCommandType(MagicCommand.TIME_LINE, "", magicCommand.time())
    );
  }


  @Override
  public Path getTempFolder() {
    return evaluatorManager.getTempFolder();
  }
}
