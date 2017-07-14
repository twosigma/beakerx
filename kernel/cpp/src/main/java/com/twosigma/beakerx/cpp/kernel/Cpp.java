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
package com.twosigma.beakerx.cpp.kernel;

import com.twosigma.beakerx.cpp.handlers.CppCommOpenHandler;
import com.twosigma.beakerx.cpp.handlers.CppKernelInfoHandler;
import com.twosigma.beakerx.cpp.utils.CppKernel;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Message;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.cpp.kernel.CppEvaluator.EXECUTE;
 import static com.twosigma.beakerx.kernel.Utils.uuid;

public class Cpp extends Kernel {

  public Cpp(final String id, final Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory) {
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
        return new Cpp(id, new CppEvaluator(id, id), kernelSocketsFactory);
      });
    }
  }

  private static void executeCppCode(String[] args) {
    //String sessionId = args[1];
    String mainCell = args[2];
    String type = args[3];
    String tempDirectory = args[4];
    CppKernel kern = new CppKernel(tempDirectory);

    List<String> otherCells = new ArrayList<>(Arrays.asList(args));
    // Remove first four arguments
    otherCells.subList(0, 5).clear();
    kern.execute(mainCell, type, tempDirectory, otherCells);
  }

}