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
package com.twosigma.beaker.jupyter.threads;

import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.message.Message;
import org.zeromq.ZMQ;

/**
 * @author konst
 */
public abstract class AbstractMessageReaderThread extends AbstractThread {

  private ZMQ.Socket socket;
  private Kernel kernel;

  public AbstractMessageReaderThread(ZMQ.Socket socket, Kernel kernel) {
    this.kernel = kernel;
    this.socket = socket;
  }

  public Message readMessage() {
    return getKernel().readMessage(socket);
  }

  public void send(Message message)  {
    getKernel().send(socket, message);
  }

  public ZMQ.Socket getSocket() {
    return socket;
  }
  
  public Kernel getKernel() {
    return kernel;
  }

}