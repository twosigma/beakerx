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

import com.twosigma.jupyter.KernelSockets;
import com.twosigma.jupyter.message.Message;

import java.util.ArrayList;
import java.util.List;

public class KernelSocketsTest extends KernelSockets {

  private List<Message> publishedMessages = new ArrayList<>();
  private List<Message> sentMessages = new ArrayList<>();

  @Override
  public void publish(Message message) {
    publishedMessages.add(message);
  }

  @Override
  public void send(Message message) {
    sentMessages.add(message);
  }

  public List<Message> getPublishedMessages() {
    return new ArrayList<>(publishedMessages);
  }

  public List<Message> getSentMessages() {
    return new ArrayList<>(sentMessages);
  }

  public void clear() {
    publishedMessages = new ArrayList<>();
    sentMessages = new ArrayList<>();
  }
}
