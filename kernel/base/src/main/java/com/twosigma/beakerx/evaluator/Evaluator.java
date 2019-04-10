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

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.AddImportStatus;

import java.nio.file.Path;

import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.EvaluatorParameters;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;

public interface Evaluator {

  String BEAKER_VARIABLE_NAME = "beakerx";

  Logger logger = LoggerFactory.getLogger(Evaluator.class.getName());

  void updateEvaluatorParameters(final EvaluatorParameters kernelParameters);

  AutocompleteResult autocomplete(String code, int caretPosition);

  InspectResult inspect(String code, int caretPosition);

  void killAllThreads();

  void cancelExecution(GroupName groupName);

  TryResult evaluate(SimpleEvaluationObject seo, String code);

  TryResult evaluate(SimpleEvaluationObject seo, String code, ExecutionOptions executionOptions);

  void exit();

  void resetEnvironment();

  List<Path> addJarsToClasspath(List<PathToJar> paths);

  Classpath getClasspath();

  Imports getImports();

  AddImportStatus addImport(ImportPath anImport);

  void removeImport(ImportPath anImport);

  Path getTempFolder();

  Class<?> loadClass(String clazzName) throws ClassNotFoundException;

  boolean checkIfClassExistsInClassloader(String clazzName);

  String getOutDir();

  void registerCancelHook(Hook hook);

  BeakerXClient getBeakerX();

  void putEvaluationInToBackground();

  void startEvaluation();

  void endEvaluation();
}
