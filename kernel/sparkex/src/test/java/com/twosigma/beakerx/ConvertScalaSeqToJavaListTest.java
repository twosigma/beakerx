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

import com.twosigma.beakerx.evaluator.MessagePreconditions;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.message.Message;
import org.jetbrains.annotations.NotNull;
import org.junit.Test;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.KernelFactoryFixtureSetup.enableSparkSupport;
import static com.twosigma.beakerx.KernelFactoryFixtureSetup.stopSpark;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForUpdateMessage;
import static com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getState;
import static org.assertj.core.api.Assertions.assertThat;

public class ConvertScalaSeqToJavaListTest extends KernelSetUpFixtureTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    return KernelFactoryFixtureSetup.createKernel(sessionId, kernelSocketsFactory, closeKernelAction);
  }

  @Test
  public void convertSeqToList() throws Exception {
    try {
      //given
      enableSparkSupport(ENABLE_SPARK_SUPPORT + " --start", getKernelSocketsService());
      String code =
              "import spark.implicits._\n" +
                      "import org.apache.spark.sql.functions._\n" +
                      "val df = Seq(\"en,fr,de\", \"en,fr\", \"ru,ua\", \"en,ru\").toDF(\"languages\")\n" +
                      "df.withColumn(\"langArray\", split(col(\"languages\"), \",\")).display(4)";
      Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
      //when
      getKernelSocketsService().handleMsg(messageWithCode);
      //then
      Optional<Message> table = waitForUpdateMessage(getKernelSocketsService().getKernelSockets(), matcher());
      assertThat(table).isPresent();
    } finally {
      stopSpark(getKernelSocketsService());
    }
  }

  @NotNull
  private MessagePreconditions matcher() {
    return message -> message.filter(x -> {
      Map model = (Map) getState(x).get("model");
      if (model != null && model.get("values") != null) {
        List values = (List) model.get("values");
        List firstRow = (List) values.get(0);
        List actual = (List) firstRow.get(1);
        return actual.get(0).equals("en");
      }
      return false;
    }).isPresent();
  }
}
