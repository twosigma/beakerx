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

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.KernelSockets;
import com.twosigma.jupyter.KernelSocketsFactory;
import com.twosigma.jupyter.SocketCloseAction;
import com.twosigma.jupyter.message.Message;

public class KernelSocketsFactoryTest implements KernelSocketsFactory {

  private volatile boolean shutdown = false;
  private volatile boolean started = false;

  public void shutdown() {
    this.shutdown = true;
  }

  public boolean isStarted() {
    return started;
  }

  public void waitForSockets(){
    while (!isStarted()) {
      //wait for kernel
    }
  }

  @Override
  public KernelSockets create(KernelFunctionality kernel, SocketCloseAction closeAction) {
    return new KernelSockets() {
      @Override
      public void publish(Message message) {

      }

      @Override
      public void send(Message message) {

      }

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
}
