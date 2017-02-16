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

package com.twosigma.beaker.jupyter.handler;

import com.twosigma.beaker.jupyter.GroovyKernelJupyterTest;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.*;

public class CommOpenHandlerTest {

    private GroovyKernelJupyterTest groovyKernel;
    private CommOpenHandler commOpenHandler;

    @Before
    public void setUp(){
        groovyKernel = new GroovyKernelJupyterTest();
        commOpenHandler = new CommOpenHandler(groovyKernel);
    }

    @Test
    public void handleMessage_shouldSendShellSocketMessage() throws Exception {
        //given
        Message message = initMessage();
        //when
        commOpenHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    }

    @Test
    public void handleMessageWithoutCommId_shouldSendCloseCommMessage() throws Exception {
        //given
        Message message = initMessage();
        message.getContent().remove(COMM_ID);
        //when
        commOpenHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(sendMessage.getHeader().getType()).isEqualTo(JupyterMessages.COMM_CLOSE.getName());
    }

    @Test
    public void handleMessageWithoutTargetId_shouldSendCloseCommMessage() throws Exception {
        //given
        Message message = initMessage();
        message.getContent().remove(TARGET_NAME);
        //when
        commOpenHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(sendMessage.getHeader().getType()).isEqualTo(JupyterMessages.COMM_CLOSE.getName());
    }

    private Message initMessage(){
        Header header = new Header();
        header.setId("messageId");
        header.setUsername("username");
        header.setSession("sessionId");
        header.setType(JupyterMessages.COMM_OPEN.getName());
        header.setVersion("5.0");

        Map<String, Serializable> content = new LinkedHashMap<>();
        content.put(DATA, new HashMap<>());
        content.put(COMM_ID, "commId");
        content.put(TARGET_NAME, "targetName");
        content.put(TARGET_MODULE, "targetModule");

        Message message = new Message();
        message.setIdentities(Arrays.asList("identities".getBytes()));
        message.setHeader(header);
        message.setContent(content);
        return message;
    }

}
