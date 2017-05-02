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
package com.twosigma.beaker.evaluator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.twosigma.jupyter.KernelParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;

public interface Evaluator {

  Logger logger = LoggerFactory.getLogger(Evaluator.class.getName());

  void setShellOptions(final KernelParameters kernelParameters) throws IOException;

  AutocompleteResult autocomplete(String code, int caretPosition);

  void killAllThreads();

  void evaluate(SimpleEvaluationObject seo, String code);

  void startWorker();

  void exit();

  static Path createJupyterTempFolder() {
    Path ret = null;
    try {
      ret = Files.createTempDirectory("beaker");
    } catch (IOException e) {
      logger.error("No temp folder set for beaker", e);
    }
    return ret.toAbsolutePath();
  }

}