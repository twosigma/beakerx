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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.widget.SingleSparkSession;
import com.twosigma.beakerx.widget.SparkEngineNoUIImpl;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUiDefaultsImpl;

import static java.util.Arrays.copyOfRange;

public class SparkMagicCommand implements MagicCommandFunctionality {

  public static final String SPARK = "%%sparkRunner";
  public static final SingleSparkSession SINGLE_SPARK_SESSION = new SingleSparkSessionImpl();

  private KernelFunctionality kernel;
  private SparkFactory sparkFactory;
  private SparkMagicCommandOptions sparkMagicCommandOptions;


  public SparkMagicCommand(KernelFunctionality kernel) {
    //constructor for reflection in LoadMagicMagicCommand
    this(
            kernel,
            new SparkFactoryImpl(kernel,
                    new SparkEngineNoUIImpl.SparkEngineNoUIFactoryImpl(),
                    new SparkUI.SparkUIFactoryImpl(SINGLE_SPARK_SESSION),
                    new SparkUiDefaultsImpl(kernel.getBeakerXJson())
            )
    );
  }

  SparkMagicCommand(KernelFunctionality kernel, SparkFactory sparkFactory) {
    this.kernel = kernel;
    this.sparkFactory = sparkFactory;
    this.sparkMagicCommandOptions = new SparkMagicCommandOptions();
  }

  @Override
  public String getMagicCommandName() {
    return SPARK;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String[] options = getOptions(param);
    SparkMagicCommandOptions.OptionsResult optionsResult = sparkMagicCommandOptions.parseOptions(options);
    if (optionsResult.hasError()) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, optionsResult.errorMsg());
    }
    return sparkFactory.createSpark(param, optionsResult.options());
  }

  private String[] getOptions(MagicCommandExecutionParam param) {
    String[] parts = param.getCommand().split(" ");
    if (parts.length == 1) {
      return new String[0];
    }
    return copyOfRange(parts, 1, parts.length);
  }

  public static class SingleSparkSessionImpl implements SingleSparkSession {
    private boolean active = false;

    @Override
    public boolean isActive() {
      return active;
    }

    @Override
    public void active() {
      active = true;
    }

    @Override
    public void inActive() {
      active = false;
    }
  }

}
