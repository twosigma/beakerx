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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.spark.SparkDisplayers;
import com.twosigma.beakerx.scala.spark.SparkImplicit;

import java.util.Optional;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;

public class LoadSparkSupportMagicCommand implements MagicCommandFunctionality {

  public static final String LOAD_SPARK_SUPPORT = "%loadSparkSupport";
  private KernelFunctionality kernel;

  public LoadSparkSupportMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public String getMagicCommandName() {
    return LOAD_SPARK_SUPPORT;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    TryResult implicits = addImplicits(param.getCode().getMessage());
    if (implicits.isError()) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, implicits.error());
    }
    MagicCommandOutcomeItem loadSpark = loadSparkMagic();
    if (!loadSpark.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Can not run spark support");
    }
    SparkDisplayers.register();
    addDefaultImports();
    return new MagicCommandOutput(MagicCommandOutput.Status.OK, "Spark support enabled");
  }

  private MagicCommandOutcomeItem loadSparkMagic() {
    Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), LoadMagicMagicCommand.LOAD_MAGIC);
    MagicCommandOutcomeItem magicCommandOutcomeItem = ((LoadMagicMagicCommand) magic.get())
            .load(SparkMagicCommand.class.getName());
    return magicCommandOutcomeItem;
  }

  private TryResult addImplicits(Message parent) {
    String codeToExecute = new SparkImplicit().codeAsString();
    SimpleEvaluationObject seo = createSimpleEvaluationObject(
            codeToExecute,
            kernel,
            new Message(new Header(JupyterMessages.COMM_MSG, parent.getHeader().getSession())),
            1);
    return kernel.executeCode(codeToExecute, seo);
  }

  private void addDefaultImports() {
    kernel.addImport(new ImportPath("org.apache.spark.sql.SparkSession"));
  }

}
