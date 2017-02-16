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

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.Comm.TARGET_MODULE;
import static com.twosigma.beaker.jupyter.Comm.TARGET_NAME;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class CommCloseHandlerTest {

    private GroovyKernelJupyterTest groovyKernel;
    private CommCloseHandler commCloseHandler;

    @Before
    public void setUp(){
        groovyKernel = new GroovyKernelJupyterTest();
        commCloseHandler = new CommCloseHandler(groovyKernel);
    }

    @Test
    public void handleMessage_shouldSendShellSocketMessage() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    }

    @Test
    public void handleMessage_sentMessageHasTypeIsCommClose() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(sendMessage.getHeader().getType()).isEqualTo(JupyterMessages.COMM_CLOSE.getName());
    }

    @Test
    public void handleMessage_sentMessageHasSessionId() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(sendMessage.getHeader().getSession()).isEqualTo("sessionId");
    }

    @Test
    public void handleMessage_sentMessageHasParentHeader() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(sendMessage.getParentHeader().asJson()).isEqualTo(message.getHeader().asJson());
    }

    @Test
    public void handleMessage_sentMessageHasIdentities() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
        Message sendMessage = groovyKernel.getSendMessages().get(0);
        Assertions.assertThat(new String(sendMessage.getIdentities().get(0))).isEqualTo("identities");
    }

    @Test
    public void handleMessage_shouldRemoveCommMessage() throws Exception {
        //given
        Message message = initMessage();
        //when
        commCloseHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getRemoveComm()).isTrue();
    }

    private Message initMessage(){
        Header header = new Header();
        header.setId("messageId");
        header.setUsername("username");
        header.setSession("sessionId");
        header.setType(JupyterMessages.COMM_CLOSE.getName());
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
