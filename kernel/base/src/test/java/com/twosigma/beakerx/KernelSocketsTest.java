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

import com.twosigma.beakerx.kernel.KernelSockets;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class KernelSocketsTest extends KernelSockets {
  protected final Logger logger = LoggerFactory.getLogger(KernelSocketsTest.class.getName());
  private volatile List<Message> publishedMessages = new ArrayList<>();
  private volatile List<Message> sentMessages = new ArrayList<>();

  @Override
  public synchronized void publish(Message message) {
    logger.info("KernelSocketsTest-> publish type:  " + message.type() + " --> " + message.getContent());
    publishedMessages.add(message);
  }

  @Override
  public synchronized void send(Message message) {
    logger.info("KernelSocketsTest-> send type: " + message.type() + " --> " + message.getContent());
    sentMessages.add(message);
  }

  public List<Message> getPublishedMessages() {
    return new ArrayList<>(publishedMessages);
  }

  public List<Message> getSentMessages() {
    return new ArrayList<>(sentMessages);
  }

  public synchronized void clear() {
    logger.info("KernelSocketsTest-> clear");
    publishedMessages = new ArrayList<>();
    sentMessages = new ArrayList<>();
  }
}
