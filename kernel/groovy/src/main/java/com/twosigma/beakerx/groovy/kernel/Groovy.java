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
package com.twosigma.beakerx.groovy.kernel;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;

import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.groovy.comm.GroovyCommOpenHandler;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beakerx.groovy.handler.GroovyKernelInfoHandler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.message.Message;
import java.io.IOException;
import java.util.HashMap;

public class Groovy extends Kernel {

  public Groovy(final String id, final Evaluator evaluator,
      KernelSocketsFactory kernelSocketsFactory) {
    super(id, evaluator, kernelSocketsFactory);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new GroovyCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new GroovyKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(
          new KernelConfigurationFile(args));
      return new Groovy(id, new GroovyEvaluator(id, id), kernelSocketsFactory);
    });
  }

  @Override
  public KernelParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new GroovyDefaultVariables().getImports());
    return new KernelParameters(kernelParameters);
  }
}
