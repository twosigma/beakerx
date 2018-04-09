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
package com.twosigma.beakerx.scala.spark;

import com.twosigma.beakerx.KernelSetUpFixtureTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.evaluator.NoBeakerxObjectTestFactory;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.Scala;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.table.TableDisplay.VIEW_NAME_VALUE;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getData;
import static com.twosigma.beakerx.widget.Widget.VIEW_NAME;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkKernelTest extends KernelSetUpFixtureTest {


  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    ScalaEvaluator evaluator = new ScalaEvaluator(sessionId,
            sessionId,
            null,
            cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            getTestTempFolderFactory(),
            getKernelParameters());
    return new Scala(sessionId, evaluator, kernelSocketsFactory, closeKernelAction, getCacheFolderFactory());
  }

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(SparkImplicit.IMPLICIT(), new SparkImplicit());
    return new EvaluatorParameters(kernelParameters);
  }


  @Test
  public void sparkDisplayer() throws Exception {
    runSparkDataset("ds");
  }

  @Test
  public void sparkImplicit() throws Exception {
    runSparkDataset("ds.display(1)");
  }

  private void runSparkDataset(String returnStatement) throws InterruptedException {
    //given
    String peoplePath = SparkKernelTest.class.getClassLoader().getResource("people.json").getPath();
    String code = "import org.apache.spark.sql.SparkSession\n" +
            "val spark = SparkSession\n" +
            "    .builder\n" +
            "    .appName(\"jupyter\")\n" +
            "    .master(\"local[*]\")\n" +
            "    .getOrCreate()\n" +
            "val ds = spark.read.json(\"file://"+peoplePath+"\")\n"
            + returnStatement;

    Message messageWithCode = getExecuteRequestMessage(code);
    getKernelSocketsService().handleMsg(messageWithCode);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();

    List<Message> publishedMessages = getKernelSocketsService().getKernelSockets().getPublishedMessages();
    Message message = publishedMessages.get(2);
    assertThat(message.type()).isEqualTo(JupyterMessages.COMM_OPEN);
    Map data = getData(message);
    Map state = (Map) data.get("state");
    assertThat(state.get(VIEW_NAME)).isEqualTo(VIEW_NAME_VALUE);
    Message display = publishedMessages.get(4);
    assertThat(display.type()).isEqualTo(JupyterMessages.DISPLAY_DATA);
  }

}