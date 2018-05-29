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
import com.twosigma.beakerx.evaluator.EvaluatorManager;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.Hook;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.AddImportStatus;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.NoSuchKernelException;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.PythonEntryPoint;
import com.twosigma.beakerx.kernel.MagicKernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandWhichThrowsException;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddStaticImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.BashMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddDynamicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddRepoMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathResetMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathShowMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.HtmlAliasMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.HtmlMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.JSMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.LsMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.ClojureMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.GroovyMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.JavaMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.KernelMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.KotlinMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.PythonMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.ScalaMagicCommand;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.io.FileUtils;
import org.assertj.core.util.Lists;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Observer;
import java.util.Set;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.magic.command.ClasspathAddMvnDepsMagicCommandTest.TEST_MVN_CACHE;
import static java.util.Arrays.asList;
import static java.util.Collections.synchronizedList;

public class KernelTest implements KernelFunctionality {

  private List<Message> publishedMessages = synchronizedList(new ArrayList<>());
  private List<Message> sentMessages = synchronizedList(new ArrayList<>());
  private String id;
  private Map<String, Comm> commMap = new HashMap<>();
  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);
  public EvaluatorParameters setShellOptions;
  private EvaluatorManager evaluatorManager;
  private String code;
  private Path tempFolder;
  private Map<String, MagicKernelManager> magicKernels;

  public MavenJarResolver.ResolverParams mavenResolverParam = null;

  private List<MagicCommandType> magicCommandTypes = null;


  public KernelTest() {
    this("KernelTestId1");
  }

  public KernelTest(String id) {
    this.id = id;
    initMavenResolverParam();
    initMagicCommands();
    SimpleEvaluationObject value = new SimpleEvaluationObject("ok");
    Message jupyterMessage = commMsg();
    value.setJupyterMessage(jupyterMessage);
    InternalVariable.setValue(value);
    KernelManager.register(this);
  }

  public KernelTest(String id, Evaluator evaluator) {
    this.id = id;
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    initMavenResolverParam();
    initMagicCommands();
    SimpleEvaluationObject value = new SimpleEvaluationObject("ok");
    Message jupyterMessage = commMsg();
    value.setJupyterMessage(jupyterMessage);
    InternalVariable.setValue(value);
    KernelManager.register(this);
    this.magicKernels = new HashMap<>();
  }

  private void initMavenResolverParam() {
    this.mavenResolverParam = new MavenJarResolver.ResolverParams(
            new File(TEST_MVN_CACHE).getAbsolutePath(),
            getTempFolder().toString() + MavenJarResolver.MVN_DIR,
            true);
  }

  private void initMagicCommands() {
    this.magicCommandTypes = new ArrayList<>();
    this.magicCommandTypes.addAll(Lists.newArrayList(
            new MagicCommandType(JavaScriptMagicCommand.JAVASCRIPT, "", new JavaScriptMagicCommand()),
            new MagicCommandType(JSMagicCommand.JAVASCRIPT, "", new JSMagicCommand()),
            new MagicCommandType(HtmlMagicCommand.HTML, "", new HtmlMagicCommand()),
            new MagicCommandType(HtmlAliasMagicCommand.HTML, "", new HtmlAliasMagicCommand()),
            new MagicCommandType(BashMagicCommand.BASH, "", new BashMagicCommand()),
            new MagicCommandType(LsMagicCommand.LSMAGIC, "", new LsMagicCommand(this.magicCommandTypes)),
            new MagicCommandType(ClasspathAddRepoMagicCommand.CLASSPATH_CONFIG_RESOLVER, "repoName repoURL", new ClasspathAddRepoMagicCommand(this)),
            new MagicCommandType(ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR, "<jar path>", new ClasspathAddJarMagicCommand(this)),
            new MagicCommandType(ClasspathAddMvnMagicCommand.CLASSPATH_ADD_MVN, "<group name version>",
                    new ClasspathAddMvnMagicCommand(mavenResolverParam, this)),
            new MagicCommandType(ClassPathAddMvnCellMagicCommand.CLASSPATH_ADD_MVN_CELL, "<group name version>",
                    new ClassPathAddMvnCellMagicCommand(mavenResolverParam, this)),
            addClasspathReset(this),
            addDynamic(this),
            addMagicCommandWhichThrowsException(),
            new MagicCommandType(ClasspathShowMagicCommand.CLASSPATH_SHOW, "", new ClasspathShowMagicCommand(this)),
            new MagicCommandType(AddStaticImportMagicCommand.ADD_STATIC_IMPORT, "<classpath>", new AddStaticImportMagicCommand(this)),
            new MagicCommandType(AddImportMagicCommand.IMPORT, "<classpath>", new AddImportMagicCommand(this)),
            new MagicCommandType(UnImportMagicCommand.UNIMPORT, "<classpath>", new UnImportMagicCommand(this)),
            new MagicCommandType(TimeLineModeMagicCommand.TIME_LINE, "", new TimeLineModeMagicCommand(this)),
            new MagicCommandType(TimeCellModeMagicCommand.TIME_CELL, "", new TimeCellModeMagicCommand(this)),
            new MagicCommandType(TimeItLineModeMagicCommand.TIMEIT_LINE, "", new TimeItLineModeMagicCommand(this)),
            new MagicCommandType(TimeItCellModeMagicCommand.TIMEIT_CELL, "", new TimeItCellModeMagicCommand(this)),
            new MagicCommandType(LoadMagicMagicCommand.LOAD_MAGIC, "", new LoadMagicMagicCommand(this)),
            new MagicCommandType(KernelMagicCommand.KERNEL, "", new KernelMagicCommand(this)),
            new MagicCommandType(PythonMagicCommand.PYTHON, "", new PythonMagicCommand(this)),
            new MagicCommandType(ScalaMagicCommand.SCALA, "", new ScalaMagicCommand(this)),
            new MagicCommandType(KotlinMagicCommand.KOTLIN, "", new KotlinMagicCommand(this)),
            new MagicCommandType(JavaMagicCommand.JAVA, "", new JavaMagicCommand(this)),
            new MagicCommandType(GroovyMagicCommand.GROOVY, "", new GroovyMagicCommand(this)),
            new MagicCommandType(ClojureMagicCommand.CLOJURE, "", new ClojureMagicCommand(this))
    ));
  }

  private static MagicCommandType addClasspathReset(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathResetMagicCommand.CLASSPATH_RESET, "", new ClasspathResetMagicCommand(kernel));
  }

  private static MagicCommandType addDynamic(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathAddDynamicMagicCommand.CLASSPATH_ADD_DYNAMIC, "", new ClasspathAddDynamicMagicCommand(kernel));
  }

  private static MagicCommandType addMagicCommandWhichThrowsException() {
    return new MagicCommandType(MagicCommandWhichThrowsException.MAGIC_COMMAND_WHICH_THROWS_EXCEPTION, "", new MagicCommandWhichThrowsException());
  }

  @Override
  public void publish(List<Message> message) {
    this.publishedMessages.addAll(message);
  }

  @Override
  public void send(Message message) {
    this.sentMessages.add(message);
  }

  public String getSessionId() {
    return this.id;
  }

  public Observer getExecutionResultSender() {
    return this.executionResultSender;
  }


  @Override
  public void addComm(String hash, Comm commObject) {
    if (!isCommPresent(hash)) {
      commMap.put(hash, commObject);
    }
  }

  @Override
  public void removeComm(String hash) {
    if (hash != null && isCommPresent(hash)) {
      commMap.remove(hash);
    }
  }

  @Override
  public Comm getComm(String hash) {
    return commMap.get(hash != null ? hash : "");
  }

  @Override
  public boolean isCommPresent(String hash) {
    return commMap.containsKey(hash);
  }

  @Override
  public Set<String> getCommHashSet() {
    return commMap.keySet();
  }

  @Override
  public void setShellOptions(EvaluatorParameters kernelParameters) {
    this.setShellOptions = kernelParameters;
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return this.evaluatorManager.addJarsToClasspath(paths);
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
  public AddImportStatus addImport(ImportPath anImport) {
    return this.evaluatorManager.addImport(anImport);
  }

  @Override
  public void removeImport(ImportPath anImport) {
    this.evaluatorManager.removeImport(anImport);
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
  public void registerMagicCommandType(MagicCommandType magicCommandType) {
    magicCommandTypes.add(magicCommandType);
  }

  @Override
  public String getOutDir() {
    return "";
  }

  private Path tempFolder() {
    if (this.evaluatorManager == null) {
      return EvaluatorTest.getTestTempFolderFactory().createTempFolder();
    } else {
      return evaluatorManager.getTempFolder();
    }
  }

  public Boolean isSetShellOptions() {
    return setShellOptions != null;
  }

  public EvaluatorParameters getSetShellOptions() {
    return setShellOptions;
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

  public void cancelExecution() {
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
    return TryResult.createResult(seo.getPayload());
  }

  public String getCode() {
    return code;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return this.evaluatorManager.autocomplete(code, cursorPos);
  }

  @Override
  public InspectResult inspect(String code, int cursorPos){
    return this.evaluatorManager.inspect(code, cursorPos);
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
    if (evaluatorManager != null) {
      evaluatorManager.exit();
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
      manager = new MagicKernelManager(kernelName);
      magicKernels.put(kernelName, manager);
    }
    return manager.getPythonEntryPoint();
  }

  @Override
  public MagicKernelManager getManagerByCommId(String commId) {
    return null;
  }

  @Override
  public void addCommIdManagerMapping(String commId, String kernel) {}
}
