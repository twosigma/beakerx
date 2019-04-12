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
package com.twosigma.beakerx;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.Hook;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.Configuration;
import com.twosigma.beakerx.jvm.object.ConfigurationFactory;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerInputHandler;
import com.twosigma.beakerx.jvm.threads.BeakerOutputHandler;
import com.twosigma.beakerx.kernel.AddImportStatus;
import com.twosigma.beakerx.kernel.BeakerXJson;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.MagicKernelManager;
import com.twosigma.beakerx.kernel.NoSuchKernelException;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.PythonEntryPoint;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.twosigma.beakerx.AutotranslationServiceImpl.BEAKERX;
import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static java.util.Arrays.asList;
import static java.util.Collections.synchronizedList;

public class KernelTest implements KernelFunctionality {

  private List<Message> publishedMessages = synchronizedList(new ArrayList<>());
  private List<Message> sentMessages = synchronizedList(new ArrayList<>());
  private String id;
  private CommRepository commRepository;
  private ResultSender executionResultSender = new ExecutionResultSender(this);
  public EvaluatorParameters evaluatorParameters;
  private Evaluator evaluator;
  private String code;
  private Path tempFolder;
  private Map<String, MagicKernelManager> magicKernels;
  private MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
  private BeakerXJson beakerXJson;

  private List<MagicCommandType> magicCommandTypes = null;
  private LinkedList<String> stdinText = new LinkedList<>();

  public KernelTest(ResultSender resultSender) {
    this("KernelTestId1", new BeakerXCommRepositoryMock());
    this.executionResultSender = resultSender;
  }

  public KernelTest() {
    this("KernelTestId1", new BeakerXCommRepositoryMock());
  }

  public KernelTest(CommRepository commRepository) {
    this("KernelTestId1", commRepository);
  }

  public KernelTest(String id, CommRepository commRepository) {
    this.id = id;
    this.commRepository = commRepository;
    this.beakerXJson = new BeakerXJsonMock();
    initMagicCommands();
    SimpleEvaluationObject value = new SimpleEvaluationObject("ok", new SeoConfigurationFactoryMock(this, commMsg()));
    InternalVariable.setValue(value);
    KernelManager.register(this);

  }

  public KernelTest(String id, Evaluator evaluator) {
    this.id = id;
    this.evaluator = evaluator;
    this.commRepository = new BeakerXCommRepositoryMock();
    this.beakerXJson = new BeakerXJsonMock();
    initMagicCommands();
    SimpleEvaluationObject value = new SimpleEvaluationObject("ok", new SeoConfigurationFactoryMock(this, commMsg()));
    InternalVariable.setValue(value);
    KernelManager.register(this);
    this.magicKernels = new HashMap<>();
  }

  private void initMagicCommands() {
    this.magicCommandTypes = magicCommandConfiguration.createDefaults(this);
  }

  @Override
  public void publish(List<Message> message) {
    this.publishedMessages.addAll(message);
  }

  @Override
  public void send(Message message) {
    this.sentMessages.add(message);
  }

  @Override
  public String sendStdIn(Message message) {
    return this.stdinText.pop();
  }

  public void addToStdin(String s) {
    this.stdinText.add(s);
  }

  public String getSessionId() {
    return this.id;
  }

  public ResultSender getExecutionResultSender() {
    return this.executionResultSender;
  }


  @Override
  public void addComm(String hash, Comm commObject) {
    commRepository.addComm(hash, commObject);
  }

  @Override
  public void removeComm(String hash) {
    commRepository.removeComm(hash);
  }

  @Override
  public Comm getComm(String hash) {
    return commRepository.getComm(hash);
  }

  @Override
  public boolean isCommPresent(String hash) {
    return commRepository.isCommPresent(hash);
  }

  @Override
  public Set<String> getCommHashSet() {
    return commRepository.getCommHashSet();
  }

  @Override
  public void updateEvaluatorParameters(EvaluatorParameters kernelParameters) {
    this.evaluatorParameters = kernelParameters;
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return this.evaluator.addJarsToClasspath(paths);
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
  public List<MagicCommandType> getMagicCommandTypes() {
    return magicCommandTypes;
  }

  @Override
  public Path getTempFolder() {
    if (this.tempFolder == null) {
      this.tempFolder = tempFolder();
    }
    return this.tempFolder;
  }

  @Override
  public Path getCacheFolder() {
    return getTempFolder();
  }

  @Override
  public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
    return null;
  }

  @Override
  public boolean checkIfClassExistsInClassloader(String clazzName) {
    return false;
  }

  @Override
  public void registerMagicCommandType(MagicCommandType magicCommandType) {
    magicCommandTypes.add(magicCommandType);
  }

  @Override
  public String getOutDir() {
    return "";
  }

  private Path tempFolder() {
    if (this.evaluator == null) {
      return EvaluatorTest.getTestTempFolderFactory().createTempFolder();
    } else {
      return evaluator.getTempFolder();
    }
  }

  public EvaluatorParameters getEvaluatorParameters() {
    return evaluatorParameters;
  }

  public List<Message> getPublishedMessages() {
    return copy(this.publishedMessages);
  }

  public List<Message> getSentMessages() {
    return copy(this.sentMessages);
  }

  private List<Message> copy(List<Message> list) {
    return asList(list.toArray(new Message[0]));
  }

  public void clearPublishedMessages() {
    this.publishedMessages = synchronizedList(new ArrayList<>());
  }

  public void clearSentMessages() {
    this.sentMessages = synchronizedList(new ArrayList<>());
  }

  public void clearMessages() {
    clearSentMessages();
    clearPublishedMessages();
  }

  @Override
  public void cancelExecution(GroupName groupName) {
  }

  @Override
  public void killAllThreads() {

  }

  @Override
  public Handler<Message> getHandler(JupyterMessages type) {
    return null;
  }

  @Override
  public void run() {

  }

  @Override
  public TryResult executeCode(String code, SimpleEvaluationObject seo) {
    this.code = code;
    return TryResult.createResult(this.code);
  }

  @Override
  public TryResult executeCode(String code, SimpleEvaluationObject seo, ExecutionOptions executionOptions) {
    return executeCode(code, seo);
  }

  public String getCode() {
    return code;
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
  public void sendBusyMessage(Message message) {
    Message busyMessage = MessageCreator.createBusyMessage(message);
    publish(Collections.singletonList(busyMessage));
  }

  @Override
  public void sendIdleMessage(Message message) {
    Message idleMessage = MessageCreator.createIdleMessage(message);
    publish(Collections.singletonList(idleMessage));
  }

  public void exit() {
    if (evaluator != null) {
      evaluator.exit();
    } else {
      removeTempFolder();
    }
    if (magicKernels != null) {
      for (MagicKernelManager manager : magicKernels.values()) {
        manager.exit();
      }
    }
  }

  private void removeTempFolder() {
    try {
      FileUtils.deleteDirectory(new File(getTempFolder().toString()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void registerCancelHook(Hook hook) {
  }

  @Override
  public PythonEntryPoint getPythonEntryPoint(String kernelName) throws NoSuchKernelException {
    MagicKernelManager manager = magicKernels.get(kernelName);
    if (manager == null) {
      manager = new MagicKernelManager(kernelName, "kernelTestContext");
      magicKernels.put(kernelName, manager);
    }
    return manager.getPythonEntryPoint();
  }

  @Override
  public MagicKernelManager getManagerByCommId(String commId) {
    return null;
  }

  @Override
  public void addCommIdManagerMapping(String commId, String kernel) {
  }

  @Override
  public void putEvaluationInToBackground() {

  }

  @Override
  public BeakerXServer getBeakerXServer() {
    return BeakerXServerMock.create();
  }

  @Override
  public MagicCommandConfiguration magicCommandConfiguration() {
    return magicCommandConfiguration;
  }

  @Override
  public BeakerXJson getBeakerXJson() {
    return this.beakerXJson;
  }

  @Override
  public void startEvaluation() {

  }

  @Override
  public void endEvaluation() {

  }

  public FileServiceMock getFileService() {
    return magicCommandConfiguration.getFileService();
  }


  public static class BeakerXJsonMock implements BeakerXJson {

    @Override
    public Map<String, Map> beakerxJsonAsMap() {
      HashMap<String, Map> stringMapHashMap = new HashMap<>();
      stringMapHashMap.put(BEAKERX, new HashMap());
      return stringMapHashMap;
    }

    @Override
    public void save(Map<String, Map> map) {

    }
  }

  static class SimpleOutputHandlerTest implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }

  static class SimpleErrHandlerTest implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }


  public static class SeoConfigurationFactoryMock implements ConfigurationFactory {
    private KernelFunctionality kernel;
    private Message message;
    private int executionCount;

    public SeoConfigurationFactoryMock(KernelFunctionality kernel, Message message) {
      this.kernel = kernel;
      this.message = message;
    }

    public SeoConfigurationFactoryMock() {
      this(new KernelTest());
    }

    public SeoConfigurationFactoryMock(Message message) {
      this(new KernelTest(), message);
    }

    public SeoConfigurationFactoryMock(int executionCount) {
      this();
      this.executionCount = executionCount;
    }

    public SeoConfigurationFactoryMock(KernelTest kernel) {
      this(kernel, commMsg());
    }

    @Override
    public Configuration create(SimpleEvaluationObject seo) {
      BeakerOutputHandler stdout = new SimpleEvaluationObject.SimpleOutputHandler(false, kernel.getExecutionResultSender(), seo);
      BeakerOutputHandler stderr = new SimpleEvaluationObject.SimpleOutputHandler(true, kernel.getExecutionResultSender(), seo);
      BeakerInputHandler stdin = () -> 0;
      return new Configuration(stdin, stdout, stderr, kernel.getExecutionResultSender(), message, executionCount);
    }
  }

  public static class ExecutionResultSenderMock implements ResultSender {

    private List<SimpleEvaluationObject> objectList = new LinkedList<>();

    @Override
    public void update(SimpleEvaluationObject seo) {
      objectList.add(seo);
    }

    @Override
    public void exit() {

    }

    public List<SimpleEvaluationObject> getObjectList() {
      return objectList;
    }
  }

  public static SimpleEvaluationObject createSeo(String code) {
    return new SimpleEvaluationObject(code, new KernelTest.SeoConfigurationFactoryMock());
  }

  public static SimpleEvaluationObject createSeo(String code, Message message) {
    return new SimpleEvaluationObject(code, new KernelTest.SeoConfigurationFactoryMock(message));
  }

}

