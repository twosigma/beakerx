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

import com.twosigma.beakerx.Display;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SingleSparkSession;
import com.twosigma.beakerx.widget.SparkEngineImpl;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUiDefaultsImpl;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.List;

import static java.util.Arrays.copyOfRange;

public class SparkMagicCommand implements MagicCommandFunctionality {

  public static final String SPARK = "%%sparkRunner";
  public static final SingleSparkSession SINGLE_SPARK_SESSION = new SingleSparkSessionImpl();

  private KernelFunctionality kernel;
  private SparkUI.SparkUIFactory sparkUIFactory;
  private SparkMagicCommandOptions sparkMagicCommandOptions;


  public SparkMagicCommand(KernelFunctionality kernel) {
    //constructor for reflection in LoadMagicMagicCommand
    this(
            kernel,
            new SparkUI.SparkUIFactoryImpl(
                    new SparkEngineImpl.SparkEngineFactoryImpl(),
                    new SparkUiDefaultsImpl(kernel.getBeakerXJson()),
                    SINGLE_SPARK_SESSION
            )
    );
  }

  SparkMagicCommand(KernelFunctionality kernel, SparkUI.SparkUIFactory sparkUIFactory) {
    this.kernel = kernel;
    this.sparkUIFactory = sparkUIFactory;
    this.sparkMagicCommandOptions = new SparkMagicCommandOptions(new SparkMagicActionOptionsImpl());
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
    return createUI(param, optionsResult.options());
  }

  private MagicCommandOutcomeItem createUI(MagicCommandExecutionParam param, List<SparkOptionCommand> options) {
    SimpleEvaluationObject seo = PlainCode.createSimpleEvaluationObject(param.getCommandCodeBlock(), kernel, param.getCode().getMessage(), param.getExecutionCount());
    if (param.getCommandCodeBlock().isEmpty()) {
      return createSparkUiBasedOnEmptyConfiguration(param, options, seo);
    } else {
      return createSparkUIBasedOnUserSparkConfiguration(param, options, seo);
    }
  }

  private MagicCommandOutcomeItem createSparkUiBasedOnEmptyConfiguration(MagicCommandExecutionParam param, List<SparkOptionCommand> options, SimpleEvaluationObject seo) {
    InternalVariable.setValue(seo);
    SparkSession.Builder config = SparkSession.builder().config(new SparkConf());
    createSparkUI(config, param.getCode().getMessage(), options);
    return new MagicCommandOutput(MagicCommandOutput.Status.OK);
  }

  private MagicCommandOutcomeItem createSparkUIBasedOnUserSparkConfiguration(MagicCommandExecutionParam param, List<SparkOptionCommand> options, SimpleEvaluationObject seo) {
    TryResult either = kernel.executeCode(param.getCommandCodeBlock(), seo);
    if (either.isResult()) {
      Object result = either.result();
      if (result instanceof SparkConf) {
        SparkSession.Builder config = SparkSession.builder().config((SparkConf) result);
        createSparkUI(config, param.getCode().getMessage(), options);
      } else if (result instanceof SparkSession.Builder) {
        SparkSession.Builder config = (SparkSession.Builder) result;
        createSparkUI(config, param.getCode().getMessage(), options);
      } else {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Body of  " + SPARK + " magic command must return SparkConf object or SparkSession.Builder object");
      }
      return new MagicCommandOutput(MagicCommandOutput.Status.OK);
    } else {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "There occurs problem during execution of " + SPARK + " : " + either.error());
    }
  }

  private SparkUI createSparkUI(SparkSession.Builder builder, Message message, List<SparkOptionCommand> options) {
    SparkUI sparkUI = sparkUIFactory.create(builder);
    return displaySparkUI(sparkUI, message, options);
  }

  private SparkUI displaySparkUI(SparkUI sparkUI, Message message, List<SparkOptionCommand> options) {
    Display.display(sparkUI);
    options.forEach(option -> option.run(sparkUI, message));
    return sparkUI;
  }

  private String[] getOptions(MagicCommandExecutionParam param) {
    String[] parts = param.getCommand().split(" ");
    if (parts.length == 1) {
      return new String[0];
    }
    return copyOfRange(parts, 1, parts.length);
  }

  interface SparkOptionCommand {
    void run(SparkUI sparkUI, Message parent);
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
