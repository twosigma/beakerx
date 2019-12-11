/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.Hook;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.AddImportStatus;
import com.twosigma.beakerx.kernel.BeakerXJson;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.MagicKernelManager;
import com.twosigma.beakerx.kernel.NoSuchKernelException;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.PythonEntryPoint;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.threads.ExecutionResultSender;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import com.twosigma.beakerx.message.Message;

import java.nio.file.Path;
import java.util.List;
import java.util.Observer;
import java.util.Set;

public class KernelFunctionalityEmptyMock implements KernelFunctionality {

  private ExecutionResultSender executionResultSender = new ExecutionResultSender(this);

  @Override
  public void publish(List<Message> message) {

  }

  @Override
  public void addComm(String commId, Comm comm) {

  }

  @Override
  public void removeComm(String commId) {

  }

  @Override
  public void send(Message message) {

  }

  @Override
  public String sendStdIn(Message message) {
    return null;
  }

  @Override
  public String getSessionId() {
    return null;
  }

  @Override
  public ResultSender getExecutionResultSender() {
    return executionResultSender;
  }

  @Override
  public Comm getComm(String string) {
    return null;
  }

  @Override
  public boolean isCommPresent(String string) {
    return false;
  }

  @Override
  public Set<String> getCommHashSet() {
    return null;
  }

  @Override
  public void updateEvaluatorParameters(EvaluatorParameters kernelParameters) {

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
    return null;
  }

  @Override
  public TryResult executeCode(String code, SimpleEvaluationObject seo, ExecutionOptions executionOptions) {
    return null;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int cursorPos) {
    return null;
  }

  @Override
  public InspectResult inspect(String code, int cursorPos) {
    return null;
  }

  @Override
  public void sendBusyMessage(Message message) {

  }

  @Override
  public void sendIdleMessage(Message message) {

  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return null;
  }

  @Override
  public Classpath getClasspath() {
    return null;
  }

  @Override
  public Imports getImports() {
    return null;
  }

  @Override
  public AddImportStatus addImport(ImportPath anImport) {
    return null;
  }

  @Override
  public void removeImport(ImportPath anImport) {

  }

  @Override
  public List<MagicCommandType> getMagicCommandTypes() {
    return null;
  }

  @Override
  public Path getTempFolder() {
    return null;
  }

  @Override
  public Path getCacheFolder() {
    return null;
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

  }

  @Override
  public String getOutDir() {
    return null;
  }

  @Override
  public void registerCancelHook(Hook hook) {

  }

  @Override
  public PythonEntryPoint getPythonEntryPoint(String kernelName) throws NoSuchKernelException {
    return null;
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
    return null;
  }

  @Override
  public MagicCommandConfiguration magicCommandConfiguration() {
    return null;
  }

  @Override
  public BeakerXJson getBeakerXJson() {
    return null;
  }

  @Override
  public void startEvaluation() {

  }

  @Override
  public void endEvaluation() {

  }
}
