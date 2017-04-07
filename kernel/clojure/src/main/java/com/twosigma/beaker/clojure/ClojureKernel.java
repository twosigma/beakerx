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
package com.twosigma.beaker.clojure;

import com.twosigma.beaker.clojure.handlers.ClojureCommOpenHandler;
import com.twosigma.beaker.clojure.handlers.ClojureKernelInfoHandler;
import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.jupyter.ConfigurationFile;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Message;

import java.io.IOException;

import static com.twosigma.beaker.jupyter.Utils.uuid;

public class ClojureKernel extends Kernel {

  public ClojureKernel(String sessionId, Evaluator evaluator, ConfigurationFile configurationFile) {
    super(sessionId, evaluator, configurationFile);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new ClojureCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new ClojureKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    BeakerStdOutErrHandler.init();
    String id = uuid();
    ClojureKernel kernel = new ClojureKernel(id, new ClojureEvaluator(id, id), new KernelConfigurationFile(args));
    runKernel(kernel);
    BeakerStdOutErrHandler.fini();
  }

}
