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

package com.twosigma.beakerx.groovy.comm;

import com.twosigma.beakerx.groovy.GroovyKernelMock;
import com.twosigma.beakerx.jupyter.comm.CommKernelControlGetDefaultShellHandlerTest;
import com.twosigma.jupyter.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class GroovyCommKernelControlSetShellHandlerTest {

  private GroovyKernelMock kernelTest;
  private GroovyCommKernelControlSetShellHandler commHandler;
  private Message message;

  @Before
  public void setUp() throws Exception {
    kernelTest = new GroovyKernelMock();
    commHandler = new GroovyCommKernelControlSetShellHandler(kernelTest);
    message = new Message();
  }

  @Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    CommKernelControlGetDefaultShellHandlerTest.initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(kernelTest.getPublishedMessages()).isNotEmpty();
  }

  @Test
  public void createHandler_hasDefaultImportsAndClasspathAreNotNull() {
    //then
    Assertions.assertThat(commHandler.getDefaultImports()).isNotNull();
    Assertions.assertThat(commHandler.getDefaultClassPath()).isNotNull();
  }

}
