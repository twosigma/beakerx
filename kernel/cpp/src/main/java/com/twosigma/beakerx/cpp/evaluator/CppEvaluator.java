/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.cpp.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.cpp.utils.TempCppFiles;
import com.twosigma.beakerx.cpp.utils.CLangCommand;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static com.twosigma.beakerx.kernel.Utils.uuid;

public class CppEvaluator extends BaseEvaluator {
  public static final String EXECUTE = "execute";
  private List<String> compileCommand;
  private CppWorkerThread workerThread;
  private List<String> userFlags = new ArrayList<>();
  private TempCppFiles tempCppFiles;
  private HashSet<String> loadedCells;

  public CppEvaluator(String id, String sId, CellExecutor cellExecutor) {
    super(id, sId, cellExecutor);
    tempCppFiles = new TempCppFiles(id);
    compileCommand = CLangCommand.compileCommand(tempCppFiles);
    loadedCells = new HashSet<>();
    workerThread = new CppWorkerThread(this);
    workerThread.start();
  }

  public CppEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("cpp"));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return null;
  }

  @Override
  public void killAllThreads() {
    // executor.killAllThreads();
  }

  @Override
  public void cancelExecution() {
    workerThread.cancelExecution();
  }

  @Override
  protected void doResetEnvironment() {
    loadedCells.clear();
    workerThread.halt();
  }

  public void exit() {
    tempCppFiles.close();
    workerThread.doExit();
    cancelExecution();
    workerThread.halt();
  }

  @Override
  public void initKernel(KernelParameters kernelParameters) {
  }

  @Override
  public void setShellOptions(KernelParameters kernelParameters) throws IOException {
    Optional<String> flagStringOptional = kernelParameters.getParam("flagString", String.class);
    if (flagStringOptional.isPresent()) {
      String[] flags = flagStringOptional.get().split("\\s+");
      userFlags = new ArrayList<>(Arrays.asList(flags));
      resetEnvironment();
    }
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return false;
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    workerThread.add(new JobDescriptor(code, seo, uuid()));
  }

  public List<String> getUserFlags() {
    return userFlags;
  }

  public TempCppFiles getTempCppFiles() {
    return tempCppFiles;
  }

  public HashSet<String> getLoadedCells() {
    return loadedCells;
  }

  public List<String> getCompileCommand() {
    return compileCommand;
  }
}
