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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.util.Optional;


public class EnableSparkSupportMagicCommand implements MagicCommandFunctionality {

  public static final String ENABLE_SPARK_SUPPORT = "%%spark";
  private KernelFunctionality kernel;

  private EnableSparkSupportMagicCommandAction command;

  public EnableSparkSupportMagicCommand(KernelFunctionality kernel, SparkexJarService sparkexJarService) {
    this.kernel = kernel;
    this.command = new EnableSparkSupportMagicCommandActionInit(kernel, sparkexJarService);
  }

  @Override
  public String getMagicCommandName() {
    return ENABLE_SPARK_SUPPORT;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    return command.run(param);
  }

  class EnableSparkSupportMagicCommandSparkAction implements EnableSparkSupportMagicCommandAction {
    @Override
    public MagicCommandOutcomeItem run(MagicCommandExecutionParam param) {
      String loadSparkMagic = "%%sparkRunner";
      Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), loadSparkMagic);
      return magic.get().execute(param);
    }
  }

  class EnableSparkSupportMagicCommandActionInit implements EnableSparkSupportMagicCommandAction {

    private KernelFunctionality kernel;
    private SparkexJarService sparkexJarService;

    public EnableSparkSupportMagicCommandActionInit(KernelFunctionality kernel, SparkexJarService sparkexJarService) {
      this.kernel = kernel;
      this.sparkexJarService = sparkexJarService;
    }

    @Override
    public MagicCommandOutcomeItem run(MagicCommandExecutionParam param) {
      MagicCommandOutcomeItem magicCommandOutcomeItem = getMagicCommandOutcomeItem(kernel, sparkexJarService);
      if (magicCommandOutcomeItem.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        command = new EnableSparkSupportMagicCommandSparkAction();
        return command.run(param);
      } else {
        return magicCommandOutcomeItem;
      }
    }

    private MagicCommandOutcomeItem getMagicCommandOutcomeItem(KernelFunctionality kernel, SparkexJarService sparkexJarService) {
      MagicCommandOutcomeItem add = sparkexJarService.addSparkexJar(kernel);
      if (!add.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Can not load sparkex.jar");
      }
      MagicCommandOutcomeItem load = loadSparkSupportMagicClass();
      if (!load.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Can not load LoadSparkSupportMagicCommand class");
      }

      MagicCommandOutcomeItem magic = loadSparkSupportMagic();
      if (!magic.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Can not run LoadSparkSupportMagicCommand. Check if you add spark to path.");
      }
      return new MagicCommandOutput(MagicCommandOutput.Status.OK, "Spark support enabled");
    }

    private MagicCommandOutcomeItem loadSparkSupportMagic() {
      String loadSparkMagic = "%loadSparkSupport";
      Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), loadSparkMagic);
      MagicCommandOutcomeItem execute = magic.get()
              .execute(new MagicCommandExecutionParam(null, null, 1, null, false));
      return execute;
    }

    private MagicCommandOutcomeItem loadSparkSupportMagicClass() {
      Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), LoadMagicMagicCommand.LOAD_MAGIC);
      MagicCommandOutcomeItem magicCommandOutcomeItem = ((LoadMagicMagicCommand) magic.get())
              .load("com.twosigma.beakerx.scala.magic.command.LoadSparkSupportMagicCommand");
      return magicCommandOutcomeItem;
    }
  }

  interface EnableSparkSupportMagicCommandAction {
    MagicCommandOutcomeItem run(MagicCommandExecutionParam param);
  }
}
