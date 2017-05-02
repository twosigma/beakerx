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
package com.twosigma.beaker;

import com.twosigma.MessageAssertions;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.KernelSockets;
import com.twosigma.jupyter.KernelSocketsFactory;
import com.twosigma.jupyter.SocketCloseAction;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;

import java.util.List;
import java.util.Optional;

import static com.twosigma.MessageAssertions.isBusyMessage;

public class KernelSocketsServiceTest implements KernelSocketsFactory {

  private volatile boolean shutdown = false;
  private volatile boolean started = false;

  private KernelFunctionality kernel;

  public void shutdown() {
    this.shutdown = true;
  }

  public boolean isStarted() {
    return started;
  }

  private KernelSocketsTest kernelSockets;

  public void waitForSockets() {
    while (!isStarted()) {
      //wait for kernel
    }
  }

  public void handleMsg(final Message message) {
    Handler<Message> handler = kernel.getHandler(message.type());
    handler.handle(message);
  }

  @Override
  public KernelSockets create(KernelFunctionality kernel, SocketCloseAction closeAction) {
    this.kernel = kernel;
    this.kernelSockets = createKernelSockets();
    return kernelSockets;
  }

  private KernelSocketsTest createKernelSockets() {
    return new KernelSocketsTest() {
      @Override
      public void run() {
        while (!shutdown) {
          //do nothing
        }
      }

      @Override
      public synchronized void start() {
        super.start();
        started = true;
      }
    };
  }

  public KernelSocketsTest getKernelSockets() {
    return kernelSockets;
  }

  public List<Message> getPublishedMessages() {
    return getKernelSockets().getPublishedMessages();
  }

  public List<Message> getSentMessages() {
    return getKernelSockets().getSentMessages();
  }

  public Optional<Message> getBusyMessage() {
    if (isBusyMessage(getPublishedMessages().get(0))) {
      return Optional.of(getPublishedMessages().get(0));
    }
    return Optional.empty();
  }

  public Optional<Message> getExecuteInputMessage() {
    return getPublishedMessages().stream().filter(MessageAssertions::isExecuteInputMessage).findFirst();
  }

  public Optional<Message> getExecuteResultMessage() {
    return getPublishedMessages().stream().filter(MessageAssertions::isExecuteResultMessage).findFirst();
  }

  public Optional<Message> getIdleMessage() {
    return getPublishedMessages().stream().filter(MessageAssertions::isIdleMessage).findFirst();
  }

  public Message getReplyMessage() {
    return getSentMessages().get(0);
  }
}
