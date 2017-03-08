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

package org.lappsgrid.jupyter.msg;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.LinkedHashMap;

public class MessageTest {

  public static void initMessage(Message message) {
    message.getIdentities().add("identityStr".getBytes());
    message.setHeader(new Header());
    message.setParentHeader(new Header());
    message.setMetadata(new LinkedHashMap<>());
    message.setContent(new LinkedHashMap<>());
  }

  @Test
  public void createMessageWithEmptyConstructor_messageHasHeaderIsNotNull() {
    //when
    Message message = new Message();
    //then
    Assertions.assertThat(message.getHeader()).isNotNull();
  }

  @Test
  public void initMessageWithData_messageHasDataIsNotNull() {
    //when
    Message message = new Message();
    initMessage(message);
    //then
    Assertions.assertThat(message.getIdentities()).isNotEmpty();
    Assertions.assertThat(message.getHeader()).isNotNull();
    Assertions.assertThat(message.getParentHeader()).isNotNull();
    Assertions.assertThat(message.getMetadata()).isNotNull();
    Assertions.assertThat(message.getContent()).isNotNull();
  }
}
