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

package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.IOException;
import java.util.ArrayList;

public class EvaluatorTest extends BaseEvaluator {

  private KernelParameters kernelParameters;
  private SimpleEvaluationObject seo;
  private String code;
  private boolean killAllThreads;
  private boolean exit;
  private Classpath classpath = new Classpath();
  private Imports imports = new Imports();
  private int resetEnvironmentCounter = 0;

  public EvaluatorTest() {
  }

  @Override
  public void setShellOptions(KernelParameters kernelParameters) throws IOException {
    this.kernelParameters = kernelParameters;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return new AutocompleteResult(new ArrayList<>(), 0);
  }

  @Override
  public void killAllThreads() {
    killAllThreads = true;
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    this.seo = seo;
    this.code = code;
  }

  @Override
  public void exit() {
    exit = true;
  }

  @Override
  public Classpath getClasspath() {
    return this.classpath;
  }

  @Override
  public void resetEnvironment() {
    this.resetEnvironmentCounter++;
  }

  @Override
  public void initKernel(KernelParameters kernelParameters) {

  }

  public SimpleEvaluationObject getSeo() {
    return seo;
  }

  public String getCode() {
    return code;
  }

  public boolean isCallKillAllThreads() {
    return killAllThreads;
  }

  public boolean isCallExit() {
    return exit;
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return classpath.add(path);
  }

  @Override
  protected boolean addImportPath(ImportPath anImport) {
    return imports.add(anImport);
  }

  @Override
  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  @Override
  public Imports getImports() {
    return imports;
  }

  public int getResetEnvironmentCounter() {
    return resetEnvironmentCounter;
  }

}
