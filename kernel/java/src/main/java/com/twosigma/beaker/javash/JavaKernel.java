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
package com.twosigma.beaker.javash;

import static com.twosigma.beaker.jupyter.Utils.uuid;

import java.io.IOException;

import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.javash.comm.JavaCommOpenHandler;
import com.twosigma.beaker.javash.evaluator.JavaEvaluator;
import com.twosigma.beaker.javash.handler.JavaKernelInfoHandler;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.jupyter.ConfigurationFile;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Message;


public class JavaKernel extends Kernel {

  public JavaKernel(final String id, final Evaluator evaluator, ConfigurationFile config) {
    super(id, evaluator, config);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new JavaCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new JavaKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      JavaEvaluator e = new JavaEvaluator(id, id);
      return new JavaKernel(id, e, new KernelConfigurationFile(args));
    });
  }

}