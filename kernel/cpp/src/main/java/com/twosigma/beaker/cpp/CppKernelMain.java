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
package com.twosigma.beaker.cpp;

import com.twosigma.beaker.cpp.handlers.CppCommOpenHandler;
import com.twosigma.beaker.cpp.handlers.CppKernelInfoHandler;
import com.twosigma.beaker.cpp.utils.CppKernel;
import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.KernelSocketsFactory;
import com.twosigma.jupyter.KernelSocketsFactoryImpl;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Message;

import java.io.IOException;

import static com.twosigma.beaker.cpp.CppEvaluator.EXECUTE;
import static com.twosigma.beaker.jupyter.Utils.uuid;

public class CppKernelMain extends Kernel {

  public CppKernelMain(final String id, final Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory) {
    super(id, evaluator, kernelSocketsFactory);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new CppCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new CppKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    if ((args.length > 4) && (args[0].equals(EXECUTE))) {
      executeCppCode(args);
    } else {
      KernelRunner.run(() -> {
        String id = uuid();
        KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(new KernelConfigurationFile(args));
        return new CppKernelMain(id, new CppEvaluator(id, id), kernelSocketsFactory);
      });
    }
  }

  private static void executeCppCode(String[] args) {
    String sessionId = args[1];
    String mainCell = args[2];
    String type = args[3];
    String tempDirectory = args[4];
    CppKernel kern = new CppKernel(sessionId, tempDirectory);
    kern.execute(mainCell, type, tempDirectory);
  }

}