/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.jvm.threads;

import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_REQUEST;
import static org.assertj.core.api.Assertions.assertThat;

public class InputRequestMessageFactoryImplTest {

  private InputRequestMessageFactoryImpl inputRequestMessageFactory;

  @Before
  public void setUp() throws Exception {
    inputRequestMessageFactory = new InputRequestMessageFactoryImpl();
  }

  @Test
  public void inputRequestMessage() {
    //given
    Message parent = new Message(new Header(EXECUTE_REQUEST, "session1"));
    List<byte[]> identities = Arrays.asList("MessageIdentities123".getBytes());
    parent.setIdentities(identities);
    //when
    Message message = inputRequestMessageFactory.create(parent);
    //then
    assertThat(message.getIdentities()).isEqualTo(identities);
    assertThat(message.type()).isEqualTo(JupyterMessages.INPUT_REQUEST);
  }
}