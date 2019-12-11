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

import com.twosigma.beakerx.BeakerxDefaultDisplayers;
import com.twosigma.beakerx.CommRepository;
import com.twosigma.beakerx.DisplayerDataMapper;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.Hook;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.twosigma.beakerx.kernel.KernelSignalHandler.addSigIntHandler;
import static java.util.Collections.singletonList;

public abstract class Kernel implements KernelFunctionality {

  private static final Logger logger = LoggerFactory.getLogger(Kernel.class);

  private static String OS = System.getProperty("os.name").toLowerCase();
  public static boolean showNullExecutionResult = true;
  private final CloseKernelAction closeKernelAction;

  private String sessionId;
  private KernelSocketsFactory kernelSocketsFactory;
  private KernelHandlers handlers;
  private ResultSender executionResultSender;
  private Evaluator evaluator;
  private KernelSockets kernelSockets;
  private List<MagicCommandType> magicCommandTypes;
  private CacheFolderFactory cacheFolderFactory;
  private CustomMagicCommandsFactory customMagicCommands;
  private Map<String, MagicKernelManager> magicKernels;
  private Map<String, String> commKernelMapping;
  private CommRepository commRepository;
  private BeakerXServer beakerXServer;
  private BeakerXJson beakerXJson;
  private MagicCommandConfiguration magicCommandConfiguration;

  public Kernel(final String sessionId,
                final Evaluator evaluator,
                Configuration configuration) {
    KernelManager.register(this);
    this.sessionId = sessionId;
    this.cacheFolderFactory = configuration.getCacheFolderFactory();
    this.kernelSocketsFactory = configuration.getKernelSocketsFactory();
    this.closeKernelAction = configuration.getCloseKernelAction();
    this.customMagicCommands = configuration.getCustomMagicCommands();
    this.commRepository = configuration.getCommRepository();
    this.beakerXServer = configuration.getBeakerXServer();
    this.beakerXJson = configuration.getBeakerXJson();
    this.executionResultSender = new ExecutionResultSender(this);
    this.evaluator = evaluator;
    this.handlers = new KernelHandlers(this, getCommOpenHandler(this), getKernelInfoHandler(this));
    this.magicKernels = new HashMap<>();
    this.commKernelMapping = new HashMap<>();
    this.magicCommandConfiguration = configuration.getMagicCommandConfiguration();
    createMagicCommands();
    DisplayerDataMapper.init();
    configureSignalHandler();
    initJvmRepr();
    configuration.getRuntimetools().configRuntimeJars(this);
  }

  @Override
  public void startEvaluation() {
    this.evaluator.startEvaluation();
  }

  @Override
  public void endEvaluation() {
    this.evaluator.endEvaluation();
  }

  @Override
  public MagicCommandConfiguration magicCommandConfiguration() {
    return magicCommandConfiguration;
  }

  public abstract CommOpenHandler getCommOpenHandler(Kernel kernel);

  public abstract KernelHandler<Message> getKernelInfoHandler(Kernel kernel);

  @Override
  public void run() {
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
    doExitOnKernelManager();
    this.evaluator.exit();
    this.handlers.exit();
    this.executionResultSender.exit();
    this.closeKernelAction.close();
  }

  private void doExitOnKernelManager() {
    for (MagicKernelManager manager : magicKernels.values()) {
      manager.exit();
    }
  }

  private void closeComms() {
    this.commRepository.closeComms();
  }

  public static boolean isWindows() {
    return OS.contains("win");
  }

  public void updateEvaluatorParameters(final EvaluatorParameters kernelParameters) {
    evaluator.updateEvaluatorParameters(kernelParameters);
  }

  @Override
  public void killAllThreads() {
    evaluator.killAllThreads();
  }

  @Override
  public void cancelExecution(GroupName groupName) {
    evaluator.cancelExecution(groupName);
  }

  public boolean isCommPresent(String hash) {
    return this.commRepository.isCommPresent(hash);
  }

  public Set<String> getCommHashSet() {
    return commRepository.getCommHashSet();
  }

  public void addComm(String hash, Comm commObject) {
    commRepository.addComm(hash, commObject);
  }

  public Comm getComm(String hash) {
    return commRepository.getComm(hash);
  }

  public void removeComm(String hash) {
    commRepository.removeComm(hash);
  }

  public void publish(List<Message> message) {
    this.kernelSockets.publish(message);
  }

  public void send(Message message) {
    this.kernelSockets.send(message);
  }

  public String sendStdIn(Message message) {
    return this.kernelSockets.sendStdIn(message);
  }

  public Handler<Message> getHandler(JupyterMessages type) {
    return handlers.get(type);
  }

  public String getSessionId() {
    return sessionId;
  }

  public ResultSender getExecutionResultSender() {
    return executionResultSender;
  }

  private void configureSignalHandler() {
    if (!isWindows()) {
      addSigIntHandler();
    }
  }

  @Override
  public TryResult executeCode(String code, SimpleEvaluationObject seo) {
    return this.evaluator.evaluate(seo, code);
  }

  @Override
  public TryResult executeCode(String code, SimpleEvaluationObject seo, ExecutionOptions executionOptions) {
    return this.evaluator.evaluate(seo, code, executionOptions);
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return this.evaluator.autocomplete(code, cursorPos);
  }

  @Override
  public InspectResult inspect(String code, int cursorPos) {
    return this.evaluator.inspect(code, cursorPos);
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return this.evaluator.addJarsToClasspath(paths);
  }

  @Override
  public void sendBusyMessage(Message message) {
    publish(singletonList(MessageCreator.createBusyMessage(message)));
  }

  @Override
  public void sendIdleMessage(Message message) {
    publish(singletonList(MessageCreator.createIdleMessage(message)));
  }

  @Override
  public Classpath getClasspath() {
    return this.evaluator.getClasspath();
  }

  @Override
  public Imports getImports() {
    return this.evaluator.getImports();
  }

  @Override
  public AddImportStatus addImport(ImportPath anImport) {
    return this.evaluator.addImport(anImport);
  }

  @Override
  public void removeImport(ImportPath anImport) {
    this.evaluator.removeImport(anImport);
  }

  @Override
  public Path getTempFolder() {
    return evaluator.getTempFolder();
  }

  @Override
  public Path getCacheFolder() {
    return cacheFolderFactory.getCache();
  }

  @Override
  public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
    return evaluator.loadClass(clazzName);
  }

  @Override
  public List<MagicCommandType> getMagicCommandTypes() {
    return new ArrayList<>(magicCommandTypes);
  }

  private void createMagicCommands() {
    this.magicCommandTypes = magicCommandConfiguration.createDefaults(this);
    customMagicCommands.customMagicCommands(this).forEach(this::registerMagicCommandType);
    configureMagicCommands();
  }

  protected void configureMagicCommands() {
  }

  @Override
  public void registerMagicCommandType(MagicCommandType magicCommandType) {
    this.magicCommandTypes.add(magicCommandType);
  }

  private void initJvmRepr() {
    BeakerxDefaultDisplayers.registerDefaults();
    configureJvmRepr();
  }

  protected void configureJvmRepr() {
  }

  @Override
  public String getOutDir() {
    return evaluator.getOutDir();
  }

  @Override
  public void registerCancelHook(Hook hook) {
    evaluator.registerCancelHook(hook);
  }

  @Override
  public PythonEntryPoint getPythonEntryPoint(String kernelName) throws NoSuchKernelException {
    MagicKernelManager manager = magicKernels.get(kernelName);
    if (manager == null) {
      manager = new MagicKernelManager(kernelName, evaluator.getBeakerX().getContext());
      magicKernels.put(kernelName, manager);
    }
    return manager.getPythonEntryPoint();
  }

  @Override
  public MagicKernelManager getManagerByCommId(String commId) {
    String kernelName = commKernelMapping.get(commId);
    return magicKernels.get(kernelName);
  }

  @Override
  public void addCommIdManagerMapping(String commId, String kernel) {
    commKernelMapping.put(commId, kernel);
  }

  public void putEvaluationInToBackground() {
    evaluator.putEvaluationInToBackground();
  }

  @Override
  public BeakerXServer getBeakerXServer() {
    return beakerXServer.get(this);
  }

  @Override
  public boolean checkIfClassExistsInClassloader(String clazzName) {
    return this.evaluator.checkIfClassExistsInClassloader(clazzName);
  }

  @Override
  public BeakerXJson getBeakerXJson() {
    return this.beakerXJson;
  }

}
