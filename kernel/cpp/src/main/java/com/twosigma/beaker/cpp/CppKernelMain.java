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
import com.twosigma.jupyter.Configuration;
import com.twosigma.jupyter.HandlersBuilder;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.KernelSocketsFactoryImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.twosigma.beaker.cpp.CppEvaluator.EXECUTE;
import static com.twosigma.beaker.jupyter.Utils.uuid;

public class CppKernelMain extends Kernel {

  public CppKernelMain(final String id, final Configuration configuration) {
    super(id, configuration);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    if ((args.length > 4) && (args[0].equals(EXECUTE))) {
      executeCppCode(args);
    } else {
      KernelRunner.run(() -> {
        String id = uuid();
        return new CppKernelMain(id, new Configuration(
                new CppEvaluator(id, id),
                new KernelSocketsFactoryImpl(new KernelConfigurationFile(args)),
                new HandlersBuilder()
                        .withCommOpenHandler(CppCommOpenHandler::new)
                        .withKernelInfoHandler(CppKernelInfoHandler::new)));
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