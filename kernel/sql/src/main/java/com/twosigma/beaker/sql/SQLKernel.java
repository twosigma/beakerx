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
package com.twosigma.beaker.sql;

import com.twosigma.beaker.sql.handlers.SQLCommOpenHandler;
import com.twosigma.beaker.sql.handlers.SQLKernelInfoHandler;
import com.twosigma.jupyter.Configuration;
import com.twosigma.jupyter.HandlersBuilder;
import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.KernelSocketsFactoryImpl;

import java.io.IOException;

import static com.twosigma.beaker.jupyter.Utils.uuid;

public class SQLKernel extends Kernel {

  public SQLKernel(String sessionId, final Configuration configuration) {
    super(sessionId, configuration);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      return new SQLKernel(id, new Configuration(
              new SQLEvaluator(id, id),
              new KernelSocketsFactoryImpl(new KernelConfigurationFile(args)),
              new HandlersBuilder()
                      .withCommOpenHandler(SQLCommOpenHandler::new)
                      .withKernelInfoHandler(SQLKernelInfoHandler::new)));
    });
  }

}
