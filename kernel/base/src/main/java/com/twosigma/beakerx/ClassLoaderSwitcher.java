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
package com.twosigma.beakerx;

import com.twosigma.beakerx.evaluator.BaseEvaluator;

public class ClassLoaderSwitcher {

  private ClassLoader oldld;
  private BaseEvaluator baseEvaluator;

  public ClassLoaderSwitcher(BaseEvaluator baseEvaluator) {
    this.baseEvaluator = baseEvaluator;
  }

  public void start() {
    this.oldld = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(baseEvaluator.getClassLoader());
  }

  public void end() {
    Thread.currentThread().setContextClassLoader(oldld);
  }
}
