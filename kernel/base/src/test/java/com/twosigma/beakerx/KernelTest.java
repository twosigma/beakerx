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
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObjectWithTime;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.commands.MavenJarResolver;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandType;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Observer;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.ivy.plugins.resolver.FileSystemResolver;
import org.apache.ivy.plugins.resolver.RepositoryResolver;
import org.assertj.core.util.Lists;

import static com.twosigma.beakerx.kernel.commands.ClasspathAddMvnDepsMagicCommandTest.TEST_IVY_CACHE;
import static com.twosigma.beakerx.kernel.commands.MavenJarResolver.MVN_DIR;

public class KernelTest implements KernelFunctionality {

  private List<Message> publishedMessages = new ArrayList<>();
  private List<Message> sentMessages = new ArrayList<>();
  private String id;
  private Map<String, Comm> commMap = new HashMap<>();
  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);
  private KernelParameters setShellOptions;
  private EvaluatorManager evaluatorManager;
  private MessageCreator messageCreator;
  private String code;
  private MagicCommand magicCommand;
  private Path tempFolder;

  public KernelTest() {
    this("KernelTestId1");
    this.magicCommand = new MagicCommand(this);
  }

  public KernelTest(String id) {
    this.id = id;
    this.messageCreator = new MessageCreator(this);
    this.magicCommand = new MagicCommand(this);
  }

  public KernelTest(String id, Evaluator evaluator) {
    this.id = id;
    this.evaluatorManager = new EvaluatorManager(this, evaluator);
    this.messageCreator = new MessageCreator(this);
    this.magicCommand = new MagicCommand(this);
  }


  @Override
  public void publish(Message message) {
    this.publishedMessages.add(message);
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
  public void setShellOptions(KernelParameters kernelParameters) {
    this.setShellOptions = kernelParameters;
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

  @Override
  public List<MagicCommandType> getMagicCommands() {
    return Lists.newArrayList(
            new MagicCommandType(MagicCommand.JAVASCRIPT, "", magicCommand.javascript()),
            new MagicCommandType(MagicCommand.HTML, "", magicCommand.html()),
            new MagicCommandType(MagicCommand.BASH, "", magicCommand.bash()),
            new MagicCommandType(MagicCommand.LSMAGIC, "", magicCommand.lsmagic()),
            new MagicCommandType(MagicCommand.CLASSPATH_ADD_JAR, "<jar path>", magicCommand.classpathAddJar()),
            new MagicCommandType(MagicCommand.CLASSPATH_ADD_MVN, "<group name version>", magicCommand.classpathAddMvn(

            )),
            new MagicCommandType(MagicCommand.CLASSPATH_REMOVE, "<jar path>", magicCommand.classpathRemove()),
            new MagicCommandType(MagicCommand.CLASSPATH_SHOW, "", magicCommand.classpathShow()),
            new MagicCommandType(MagicCommand.ADD_STATIC_IMPORT, "<classpath>", magicCommand.addStaticImport()),
            new MagicCommandType(MagicCommand.IMPORT, "<classpath>", magicCommand.addImport()),
            new MagicCommandType(MagicCommand.UNIMPORT, "<classpath>", magicCommand.unimport())
    );
  }

  private RepositoryResolver createRepositoryResolver() {
    FileSystemResolver br = new FileSystemResolver();
    br.setName("central");
    return br;
  }

  @Override
  public Path getTempFolder() {
    if (this.tempFolder == null) {
      this.tempFolder = tempFolder();
    }
    return this.tempFolder;
  }

  private Path tempFolder() {
    if (this.evaluatorManager == null) {
      return EvaluatorTest.getTestTempFolderFactory().createTempFolder();
    } else {
      return evaluatorManager.getTempFolder();
    }
  }

  public MagicCommand getMagicCommand() {
    return magicCommand;
  }

  public Boolean isSetShellOptions() {
    return setShellOptions != null;
  }

  public KernelParameters getSetShellOptions() {
    return setShellOptions;
  }

  public List<Message> getPublishedMessages() {
    return publishedMessages;
  }

  public List<Message> getSentMessages() {
    return sentMessages;
  }

  public void clearPublishedMessages() {
    this.publishedMessages = new ArrayList<>();
  }

  public void clearSentMessages() {
    this.sentMessages = new ArrayList<>();
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
  public SimpleEvaluationObject executeCode(String code, Message message, int executionCount, ExecuteCodeCallback executeCodeCallback) {
    this.code = code;
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, executeCodeCallback);
    seo.setJupyterMessage(message);
    executeCodeCallback.execute(seo);
    return seo;
  }

  @Override
  public SimpleEvaluationObjectWithTime executeCodeWithTimeMeasurement(String code, Message message,
      int executionCount, ExecuteCodeCallbackWithTime executeCodeCallbackWithTime) {
    this.code = code;
    SimpleEvaluationObjectWithTime seowt = new SimpleEvaluationObjectWithTime(code, executeCodeCallbackWithTime);
    seowt.setJupyterMessage(message);
    executeCodeCallbackWithTime.execute(seowt);
    return seowt;
  }

  public String getCode() {
    return code;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return this.evaluatorManager.autocomplete(code, cursorPos);
  }

  @Override
  public void sendBusyMessage(Message message) {
    Message busyMessage = this.messageCreator.createBusyMessage(message);
    publish(busyMessage);
  }

  @Override
  public void sendIdleMessage(Message message) {
    Message idleMessage = this.messageCreator.createIdleMessage(message);
    publish(idleMessage);
  }

  public Optional<String> getDefaultDatasource() {
    return setShellOptions.getParam(MagicCommand.DEFAULT_DATASOURCE, String.class);
  }

  public Optional<String> getDatasource() {
    return setShellOptions.getParam(MagicCommand.DATASOURCES, String.class);
  }

  public void exit() {
    if (evaluatorManager != null) {
      evaluatorManager.exit();
    } else {
      removeTempFolder();
    }
  }

  private void removeTempFolder() {
    try {
      FileUtils.deleteDirectory(new File(getTempFolder().toString()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

}
