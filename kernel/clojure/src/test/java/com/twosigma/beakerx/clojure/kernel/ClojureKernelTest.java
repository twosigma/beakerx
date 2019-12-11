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
package com.twosigma.beakerx.clojure.kernel;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.clojure.evaluator.ClojureEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BeakerxPlot;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForSentMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.widget.Widget.MODEL_NAME;
import static org.assertj.core.api.Assertions.assertThat;

public class ClojureKernelTest extends KernelExecutionTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    ClojureEvaluator evaluator = new ClojureEvaluator(sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock());
    return new Clojure(sessionId,
            evaluator,
            new Configuration(
                    kernelSocketsFactory,
                    closeKernelAction,
                    getCacheFolderFactory(),
                    new CustomMagicCommandsEmptyImpl(),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    magicCommandConfiguration,
                    new KernelTest.BeakerXJsonMock(),
                    new RuntimetoolsMock()));
  }

  @Override
  protected String codeFor16Divide2() {
    return "(/ 16 2)";
  }

  @Override
  protected String codeForVerifyingAddedDemoJar() {
    return "(import com.example.Demo)\n" +
            "(def demo (new Demo))" +
            "(. demo getObjectTest)";
  }

  @Override
  protected String pathToDemoClassFromAddedDemoJar() {
    return "com.example.Demo";
  }

  @Override
  protected String getObjectTestMethodFromAddedDemoJar() {
    return "(def demo (new Demo))\n" +
            "(. demo getObjectTest)";
  }

  @Test
  public void evaluateFibSeq() throws Exception {
    //given
    String code = "" +
            "(def fib-seq-lazy \n" +
            "  ((fn rfib [a b] \n" +
            "     (lazy-seq (cons a (rfib b (+ a b)))))\n" +
            "   0 1))\n" +
            "(take 20 fib-seq-lazy)";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    checkResultForErrors(result, code);
    verifyResult(result.get());
    verifyPublishedMsgs(kernelSocketsService);
    waitForSentMessage(kernelSocketsService.getKernelSockets());
    verifySentMsgs(kernelSocketsService);
  }

  private void verifyPublishedMsgs(KernelSocketsServiceTest service) {
    assertThat(service.getBusyMessage()).isPresent();
    assertThat(service.getExecuteInputMessage()).isPresent();
    assertThat(service.getExecuteResultMessage()).isPresent();
    assertThat(service.getIdleMessage()).isPresent();
  }

  private void verifySentMsgs(KernelSocketsServiceTest service) {
    verifyExecuteReplyMessage(service.getReplyMessage());
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).contains("[0, 1, 1, 2, 3, 5");
  }

  @Test
  public void shouldDisplayTableDisplay() throws Exception {
    //given
    String code = "[{:foo 1}{:foo 2}]";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    waitForIdleMessage(kernelSocketsService.getKernelSockets());
    verifyTableDisplay(kernelSocketsService);
  }

  @Test
  public void shouldDisplayPlot() throws Exception {
    //given
    String code = "" +
            "(import '[com.twosigma.beakerx.chart.xychart Plot]\n" +
            "        '[com.twosigma.beakerx.chart.xychart.plotitem Line])\n" +
            "(doto (Plot.)\n" +
            "            (.setTitle \"We Will Control the Title\")\n" +
            "            (.setXLabel \"Horizontal\")\n" +
            "            (.setYLabel \"Vertical\")\n" +
            "            (.add (doto (Line.)\n" +
            "                        (.setX [0, 1, 2, 3, 4, 5])\n" +
            "                        (.setY [0, 1, 6, 5, 2, 8]))))";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idle = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    Assertions.assertThat(idle).isPresent();
    verifyPlot(kernelSocketsService);
  }

  private void verifyPlot(KernelSocketsServiceTest kernelSocketsService) {
    List<Message> publishedMessages = kernelSocketsService.getPublishedMessages();
    List<Message> openMessages = TestWidgetUtils.getOpenMessages(publishedMessages);
    Assertions.assertThat(openMessages.size()).isEqualTo(1);
    Map data = TestWidgetUtils.getData(openMessages.get(0));
    Map state = (Map) data.get("state");
    Assertions.assertThat(state.get(MODEL_NAME)).isEqualTo(BeakerxPlot.MODEL_NAME_VALUE);
  }

  private void verifyTableDisplay(KernelSocketsServiceTest kernelSocketsService) {
    Optional<Message> messageUpdate = TestWidgetUtils.getMessageUpdate(kernelSocketsService.getPublishedMessages());
    Message message = messageUpdate.get();
    Map model = (Map) TestWidgetUtils.getState(message).get("model");
    List<List> values = (List<List>) model.get("values");
    assertThat(values.get(0).get(0)).isEqualTo(1);
    assertThat(values.get(1).get(0)).isEqualTo(2);
  }

  @Test
  public void shouldImportDemoClassWithWildcardByMagicCommand() throws Exception {
    // clojure doesn't support wildcard
  }

  @Override
  protected String unimportErrorMessage() {
    return "Unable";
  }
}