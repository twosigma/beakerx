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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.AddImportStatus;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.IOException;

import java.nio.file.Path;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EvaluatorManager {

  public static Logger logger = LoggerFactory.getLogger(EvaluatorManager.class);

  protected Evaluator evaluator = null;
  protected KernelFunctionality kernel;

  public EvaluatorManager(KernelFunctionality kernel, Evaluator evaluator) {
    this.kernel = kernel;
    this.evaluator = evaluator;
  }

  public synchronized void setShellOptions(final EvaluatorParameters kernelParameters) {
    try {
      evaluator.setShellOptions(kernelParameters);
    } catch (IOException e) {
      logger.error("Error while setting Shell Options", e);
    }
  }

  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return evaluator.autocomplete(code, caretPosition);
  }

  public InspectResult inspect(String code, int caretPosition) {
    return evaluator.inspect(code, caretPosition);
  }

  public void cancelExecution() {
    evaluator.cancelExecution();
  }

  public synchronized void killAllThreads() {
    evaluator.killAllThreads();
  }

  public synchronized TryResult executeCode(String code, SimpleEvaluationObject seo) {
    return execute(code, seo);
  }

  public void exit() {
    evaluator.exit();
  }

  private TryResult execute(String code, SimpleEvaluationObject seo) {
    return evaluator.evaluate(seo, code);
  }

  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    return this.evaluator.addJarsToClasspath(paths);
  }

  public Classpath getClasspath() {
    return this.evaluator.getClasspath();
  }

  public Imports getImports() {
    return this.evaluator.getImports();
  }

  public AddImportStatus addImport(ImportPath anImport) {
    return this.evaluator.addImport(anImport);
  }

  public void removeImport(ImportPath anImport) {
    this.evaluator.removeImport(anImport);
  }

  public Path getTempFolder() {
    return evaluator.getTempFolder();
  }

  public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
    return evaluator.loadClass(clazzName);
  }

  public String getOutDir() {
    return evaluator.getOutDir();
  }

  public void registerCancelHook(Hook hook) {
    evaluator.registerCancelHook(hook);
  }
}
