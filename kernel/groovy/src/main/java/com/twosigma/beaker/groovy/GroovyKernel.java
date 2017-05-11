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
package com.twosigma.beaker.groovy;

import com.twosigma.beaker.groovy.comm.GroovyCommOpenHandler;
import com.twosigma.beaker.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beaker.groovy.handler.GroovyKernelInfoHandler;
import com.twosigma.jupyter.Configuration;
import com.twosigma.jupyter.HandlersBuilder;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.KernelSocketsFactoryImpl;
import com.twosigma.jupyter.Kernel;

import java.io.IOException;

import static com.twosigma.beaker.jupyter.Utils.uuid;

public class GroovyKernel extends Kernel {

  public GroovyKernel(final String id, final Configuration configuration) {
    super(id, configuration);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      return new GroovyKernel(id,
              new Configuration(
                      new GroovyEvaluator(id, id),
                      new KernelSocketsFactoryImpl(new KernelConfigurationFile(args)),
                      new HandlersBuilder()
                              .withCommOpenHandler(GroovyCommOpenHandler::new)
                              .withKernelInfoHandler(GroovyKernelInfoHandler::new)));
    });
  }

}