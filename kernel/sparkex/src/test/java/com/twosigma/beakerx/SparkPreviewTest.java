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
import com.twosigma.beakerx.widget.PreviewTableDisplay;
import org.jetbrains.annotations.NotNull;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beakerx.KernelFactoryFixtureSetup.enableSparkSupport;
import static com.twosigma.beakerx.KernelFactoryFixtureSetup.runCode;
import static com.twosigma.beakerx.KernelFactoryFixtureSetup.runSparkDataset;
import static com.twosigma.beakerx.KernelFactoryFixtureSetup.stopSpark;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForUpdateMessage;
import static com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.Widget.DESCRIPTION;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkPreviewTest extends KernelSetUpFixtureTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    return KernelFactoryFixtureSetup.createKernel(sessionId, kernelSocketsFactory, closeKernelAction);
  }

  @Test
  public void sparkPreviewDisplayer() throws Exception {
    try {
      //given
      enableSparkSupport(ENABLE_SPARK_SUPPORT, getKernelSocketsService());
      runSparkDataset(getKernelSocketsService());
      //when
      runCode("ds", getKernelSocketsService());
      //then
      Optional<Message> preview = waitForUpdateMessage(getKernelSocketsService().getKernelSockets(), previewMatcher());
      assertThat(preview).isPresent();
    } finally {
      stopSpark(getKernelSocketsService());
    }
  }

  @NotNull
  private MessagePreconditions previewMatcher() {
    return message -> message.filter(x -> {
      String desc = getValueForProperty(x, DESCRIPTION, String.class);
      return desc != null && desc.contains(PreviewTableDisplay.PREVIEW);
    }).isPresent();
  }
}
