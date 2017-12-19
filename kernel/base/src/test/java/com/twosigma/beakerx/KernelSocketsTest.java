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

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.synchronizedList;
import static java.util.Collections.unmodifiableList;

public class KernelSocketsTest extends KernelSockets {

  private volatile List<Message> publishedMessages = synchronizedList(new ArrayList<>());
  private volatile List<Message> sentMessages = synchronizedList(new ArrayList<>());

  @Override
  public void publish(Message message) {
    publishedMessages.add(message);
  }

  @Override
  public void send(Message message) {
    sentMessages.add(message);
  }

  public List<Message> getPublishedMessages() {
    return unmodifiableList(publishedMessages);
  }

  public List<Message> getSentMessages() {
    return unmodifiableList(sentMessages);
  }

  public void clear() {
    publishedMessages = synchronizedList(new ArrayList<>());
    sentMessages = synchronizedList(new ArrayList<>());
  }
}
