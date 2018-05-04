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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.CustomMagicCommandsFactory;

import java.util.Arrays;
import java.util.List;

public class CustomMagicCommandsImpl implements CustomMagicCommandsFactory {

  public CustomMagicCommandsImpl() {
  }

  @Override
  public List<MagicCommandType> customMagicCommands(KernelFunctionality kernel) {
    return Arrays.asList(enableSparkSupportMagicCommand(kernel));
  }

  MagicCommandType enableSparkSupportMagicCommand(KernelFunctionality kernel) {
    return new MagicCommandType(
            EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT,
            "<>",
            new EnableSparkSupportMagicCommand(kernel, new SparkexJarServiceImpl()));
  }
}
