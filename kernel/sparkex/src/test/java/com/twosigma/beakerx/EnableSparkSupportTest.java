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
package com.twosigma.beakerx;

import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.TestBeakerCellExecutor;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.scala.evaluator.NoBeakerxObjectTestFactory;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.Scala;
import com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT;
import static com.twosigma.beakerx.table.TableDisplay.VIEW_NAME_VALUE;
import static com.twosigma.beakerx.widget.Widget.VIEW_NAME;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class EnableSparkSupportTest extends KernelSetUpFixtureTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    ScalaEvaluator evaluator = new ScalaEvaluator(sessionId,
            sessionId,
            null,
            TestBeakerCellExecutor.cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            EvaluatorTest.getTestTempFolderFactory(),
            getKernelParameters());
    return new Scala(sessionId,
            evaluator,
            kernelSocketsFactory,
            closeKernelAction,
            EvaluatorTest.getCacheFolderFactory(),
            kernel -> singletonList(enableSparkSupportMagicCommand(kernel)));
  }

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    return new EvaluatorParameters(kernelParameters);
  }

  public void sparkDisplayer() throws Exception {
    enableSparkSupport();
    runSparkDataset("ds");
  }

  public void sparkImplicit() throws Exception {
    enableSparkSupport();
    runSparkDataset("ds.display(1)");
  }

  private void enableSparkSupport() throws InterruptedException {
    String code = ENABLE_SPARK_SUPPORT;
    Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
    getKernelSocketsService().handleMsg(messageWithCode);
    Optional<Message> idleMessage = EvaluatorResultTestWatcher.waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    getKernelSocketsService().getKernelSockets().clear();
  }

  private void runSparkDataset(String returnStatement) throws InterruptedException {
    //given
    String peoplePath = EnableSparkSupportTest.class.getClassLoader().getResource("people.json").getPath();
    String code = "import org.apache.spark.sql.SparkSession\n" +
            "val spark = SparkSession\n" +
            "    .builder\n" +
            "    .appName(\"jupyter\")\n" +
            "    .master(\"local[*]\")\n" +
            "    .getOrCreate()\n" +
            "val ds = spark.read.json(\"file://" + peoplePath + "\")\n"
            + returnStatement;

    Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
    getKernelSocketsService().handleMsg(messageWithCode);
    Optional<Message> idleMessage = EvaluatorResultTestWatcher.waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();

    List<Message> publishedMessages = getKernelSocketsService().getKernelSockets().getPublishedMessages();
    Message message = publishedMessages.get(2);
    assertThat(message.type()).isEqualTo(JupyterMessages.COMM_OPEN);
    Map data = TestWidgetUtils.getData(message);
    Map state = (Map) data.get("state");
    assertThat(state.get(VIEW_NAME)).isEqualTo(VIEW_NAME_VALUE);
    Message display = publishedMessages.get(4);
    assertThat(display.type()).isEqualTo(JupyterMessages.DISPLAY_DATA);
  }

  MagicCommandType enableSparkSupportMagicCommand(KernelFunctionality kernel) {
    return new MagicCommandType(
            EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT,
            "<>",
            new EnableSparkSupportMagicCommand(kernel, kernel1 -> new MagicCommandOutcomeItem() {
              @Override
              public Optional<MIMEContainer> getMIMEContainer() {
                return Optional.empty();
              }

              @Override
              public Status getStatus() {
                return Status.OK;
              }

              @Override
              public void sendMagicCommandOutcome(KernelFunctionality kernel, Message message, int executionCount) {
              }

              @Override
              public void sendRepliesWithStatus(KernelFunctionality kernel, Message message, int executionCount) {
              }

              @Override
              public TryResult getResult() {
                return null;
              }

              @Override
              public SimpleEvaluationObject getSimpleEvaluationObject() {
                return null;
              }
            }));
  }

}
