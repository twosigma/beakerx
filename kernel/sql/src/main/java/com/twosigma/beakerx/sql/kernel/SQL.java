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
package com.twosigma.beakerx.sql.kernel;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;
import static com.twosigma.beakerx.sql.magic.command.DataSourcesMagicCommand.DATASOURCES;
import static com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand.DEFAULT_DATASOURCE;

import com.twosigma.beakerx.DefaultJVMVariables;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.CacheFolderFactory;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.CustomMagicCommandsFactory;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import com.twosigma.beakerx.sql.handlers.SQLCommOpenHandler;
import com.twosigma.beakerx.sql.handlers.SQLKernelInfoHandler;
import com.twosigma.beakerx.sql.magic.command.DataSourcesMagicCommand;
import com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class SQL extends Kernel {

  private SQL(String sessionId, Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory) {
    super(sessionId, evaluator, kernelSocketsFactory, new SQLCustomMagicCommandsImpl());
  }

  public SQL(String sessionId, Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction, CacheFolderFactory cacheFolderFactory) {
    super(sessionId, evaluator, kernelSocketsFactory, closeKernelAction, cacheFolderFactory, new SQLCustomMagicCommandsImpl());
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new SQLCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new SQLKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(
              new KernelConfigurationFile(args));
      SQLEvaluator evaluator = new SQLEvaluator(id, id, getKernelParameters());
      return new SQL(id, evaluator, kernelSocketsFactory);
    });
  }

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new DefaultJVMVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }

  static class SQLCustomMagicCommandsImpl implements CustomMagicCommandsFactory {
    @Override
    public List<MagicCommandType> customMagicCommands(KernelFunctionality kernel) {
      return Arrays.asList(
              new MagicCommandType(
                      DATASOURCES,
                      "<jdbc:[dbEngine]:[subsubprotocol:][databaseName]>",
                      new DataSourcesMagicCommand(kernel)),
              new MagicCommandType(
                      DEFAULT_DATASOURCE,
                      "<sourceName=jdbc:[dbEngine]:[subsubprotocol:][databaseName]>",
                      new DefaultDataSourcesMagicCommand(kernel)));
    }
  }

}
