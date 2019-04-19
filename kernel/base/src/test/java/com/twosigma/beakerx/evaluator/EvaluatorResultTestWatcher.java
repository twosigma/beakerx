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

package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.KernelSocketsTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class EvaluatorResultTestWatcher {

  public static final int ATTEMPT = 2000;
  public static final int SLEEP_IN_MILLIS = 20;

  public static Optional<Message> waitForResult(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> result = getResult(kernelTest);
    while (!result.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      result = getResult(kernelTest);
      count++;
    }
    return result;
  }

  public static Optional<Message> waitForResult(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    Optional<Message> result = getResult(socketsTest);
    while (!result.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      result = getResult(socketsTest);
      count++;
    }
    return result;
  }

  public static Optional<Message> waitForIdleMessage(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getIdleMessage(kernelTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getIdleMessage(kernelTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForIdleMessage(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getIdleMessage(socketsTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getIdleMessage(socketsTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForSentMessage(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    Optional<Message> sentMessage = getFirstSentMessage(socketsTest);
    while (!sentMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      sentMessage = getFirstSentMessage(socketsTest);
      count++;
    }
    return sentMessage;
  }

  public static Optional<Message> waitForStreamMessage(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> sentMessage = getStreamMessage(kernelTest);
    while (!sentMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      sentMessage = getStreamMessage(kernelTest);
      count++;
    }
    return sentMessage;
  }

  public static Optional<Message> waitForErrorMessage(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getError(kernelTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getError(kernelTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForErrorMessage(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getError(socketsTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getError(socketsTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }


  public static Optional<Message> waitForUpdateMessage(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getUpdate(socketsTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getUpdate(socketsTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForUpdateMessage(KernelSocketsTest socketsTest, MessagePreconditions preconditions) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getUpdate(socketsTest.getPublishedMessages());
    while (!preconditions.match(idleMessage) && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getUpdate(socketsTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForUpdateMessage(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> idleMessage = getUpdate(kernelTest.getPublishedMessages());
    while (!idleMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      idleMessage = getUpdate(kernelTest.getPublishedMessages());
      count++;
    }
    return idleMessage;
  }

  public static Optional<Message> waitForDisplayDataMessage(KernelTest kernelTest) throws InterruptedException {
    int count = 0;
    Optional<Message> sentMessage = getDisplayDataMessage(kernelTest);
    while (!sentMessage.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      sentMessage = getDisplayDataMessage(kernelTest);
      count++;
    }
    return sentMessage;
  }

  public static Optional<Message> getDisplayDataMessage(KernelTest kernelTest) {
    List<Message> listMessagesByType = SearchMessages.getListMessagesByType(kernelTest.getPublishedMessages(), JupyterMessages.DISPLAY_DATA);
    return listMessagesByType.stream().findFirst();
  }

  public static Optional<Message> getStreamMessage(KernelTest kernelTest) {
    List<Message> listMessagesByType = SearchMessages.getListMessagesByType(kernelTest.getPublishedMessages(), JupyterMessages.STREAM);
    return listMessagesByType.stream().findFirst();
  }

  private static Optional<Message> getIdleMessage(List<Message> messages) {
    return messages.stream().
            filter(x -> (x.type().equals(JupyterMessages.STATUS)) && (x.getContent().get("execution_state").equals("idle"))).findFirst();
  }

  private static Optional<Message> getFirstSentMessage(KernelSocketsTest socketsTest) {
    return socketsTest.getSentMessages().stream().findFirst();
  }

  private static Optional<Message> getResult(KernelTest kernelTest) {
    return kernelTest.getPublishedMessages().stream().
            filter(x -> x.type().equals(JupyterMessages.EXECUTE_RESULT)).findFirst();
  }

  private static Optional<Message> getResult(KernelSocketsTest socketsTest) {
    return socketsTest.getPublishedMessages().stream().
            filter(x -> x.type().equals(JupyterMessages.EXECUTE_RESULT)).findFirst();
  }

  private static Optional<Message> getError(List<Message> messages) {
    return messages.stream().
            filter(x -> x.type().equals(JupyterMessages.ERROR)).findFirst();
  }


  public static Optional<Message> getUpdate(List<Message> messages) {
    return messages.stream().
            filter(x -> x.type().equals(JupyterMessages.COMM_MSG)).
            filter(x -> TestWidgetUtils.getData(x).get("method").equals("update")).
            findFirst();
  }

  public static List<Message> getStdouts(List<Message> messages) {
    return messages.stream().
            filter(x -> x.type().equals(JupyterMessages.STREAM)).
            filter(x -> TestWidgetUtils.getContent(x).get("name").equals("stdout")).collect(Collectors.toList());
  }

  public static List<Message> getStderr(List<Message> messages) {
    return messages.stream().
            filter(x -> x.type().equals(JupyterMessages.STREAM)).
            filter(x -> TestWidgetUtils.getContent(x).get("name").equals("stderr")).collect(Collectors.toList());
  }

  public static List<Message> waitForStdouts(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    List<Message> result = getStdouts(socketsTest.getPublishedMessages());
    while (result.isEmpty() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      result = getStdouts(socketsTest.getPublishedMessages());
      count++;
    }
    return result;
  }

  public static List<Message> waitForStderr(KernelSocketsTest socketsTest) throws InterruptedException {
    int count = 0;
    List<Message> result = getStderr(socketsTest.getPublishedMessages());
    while (result.isEmpty() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      result = getStderr(socketsTest.getPublishedMessages());
      count++;
    }
    return result;
  }

  public static <T> Optional<T> waitForProperty(PropertyWatcher<T> propertyWatcher) throws InterruptedException {
    int count = 0;
    Optional<T> property = propertyWatcher.get();
    while (!property.isPresent() && count < ATTEMPT) {
      Thread.sleep(SLEEP_IN_MILLIS);
      property = propertyWatcher.get();
      count++;
    }
    return property;
  }

  public interface PropertyWatcher<T> {
    Optional<T> get();
  }
}
