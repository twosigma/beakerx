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

import com.twosigma.beaker.groovy.evaluator.GroovyEvaluatorManager;
import com.twosigma.beaker.jupyter.GroovyKernelJupyterTest;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.io.Serializable;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

public class ExecuteRequestHandlerTest {

    private GroovyKernelJupyterTest groovyKernel;
    private ExecuteRequestHandler executeRequestHandler;
    private String messageCode = "new Plot() << new Line(x: (0..5), y: [0, 1, 6, 5, 2, 8])";

    @Before
    public void setUp(){
        groovyKernel = new GroovyKernelJupyterTest();
        executeRequestHandler = new ExecuteRequestHandler(groovyKernel);
        executeRequestHandler.evaluatorManager = new GroovyEvaluatorManager(groovyKernel){
            @Override
            public void executeCode(String code, Message message, int executionCount) {
                groovyKernel.groovyEvaluatorManagerExecuteCode(code, message, executionCount);
            }

            @Override
            public void exit() {
                groovyKernel.groovyEvaluatorManagerExit();
            }
        };
    }

    @Test
    public void handleMessage_shouldSendTwoMessages() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Assertions.assertThat(groovyKernel.getPublishMessages().size()).isEqualTo(2);
    }

    @Test
    public void handleMessage_firstSentMessageHasExecutionStateIsBusy() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(0);
        Assertions.assertThat(publishMessage.getContent().get("execution_state")).isEqualTo("busy");
    }

    @Test
    public void handleMessage_firstSentMessageHasSessionId() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(0);
        Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo("sessionId");
    }

    @Test
    public void handleMessage_firstSentMessageHasTypeIsStatus() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(0);
        Assertions.assertThat(publishMessage.getHeader().getType()).isEqualTo(JupyterMessages.STATUS.getName());
    }

    @Test
    public void handleMessage_firstSentMessageHasParentHeader() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(0);
        Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(message.getHeader().asJson());
    }

    @Test
    public void handleMessage_firstSentMessageHasIdentities() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(0);
        Assertions.assertThat(new String(publishMessage.getIdentities().get(0))).isEqualTo("identities");
    }

    @Test
    public void handleMessage_secondSentMessageHasSessionId() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo("sessionId");
    }

    @Test
    public void handleMessage_secondSendMessageHasTypeIsExecutionInput() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(publishMessage.getHeader().getType()).isEqualTo(JupyterMessages.EXECUTE_INPUT.getName());
    }

    @Test
    public void handleMessage_secondSentMessageHasContentCode() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(publishMessage.getContent().get("code")).isEqualTo(messageCode);
    }

    @Test
    public void handleMessage_secondSentMessageHasContentExecutionCount() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(publishMessage.getContent().get("execution_count")).isNotNull();
    }

    @Test
    public void handleMessage_secondSentMessageHasParentHeader() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(message.getHeader().asJson());
    }

    @Test
    public void handleMessage_secondSentMessageHasIdentities() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
        Message publishMessage = groovyKernel.getPublishMessages().get(1);
        Assertions.assertThat(new String(publishMessage.getIdentities().get(0))).isEqualTo("identities");
    }

    @Test
    public void handleMessage_passCodeAndMessageAndExecCountToGroovyEvaluatorManager() throws Exception {
        //given
        Message message = initMessage();
        //when
        executeRequestHandler.handle(message);
        //then
        Assertions.assertThat(groovyKernel.getSimpleEvaluationObject()).isNotNull();
        SimpleEvaluationObject simpleEvaluationObject = groovyKernel.getSimpleEvaluationObject();
        Assertions.assertThat(simpleEvaluationObject.getExpression()).isEqualTo(messageCode);
        Assertions.assertThat(simpleEvaluationObject.getExecutionCount()).isNotZero();
        Assertions.assertThat(simpleEvaluationObject.getJupyterMessage()).isNotNull();
    }

    @Test
    public void callExit_shouldGroovyEvaluatorManagerExit() throws Exception {
        //when
        executeRequestHandler.exit();
        //then
        Assertions.assertThat(groovyKernel.getGroovyEvaluatorManagerExit()).isTrue();
    }

    public Message initMessage(){
        Header header = new Header();
        header.setId("messageId");
        header.setUsername("username");
        header.setSession("sessionId");
        header.setType(JupyterMessages.EXECUTE_REQUEST.getName());
        header.setVersion("5.0");

        Map<String, Serializable> content = new  LinkedHashMap<>();
        content.put("allow_stdin", Boolean.TRUE);
        content.put("code", messageCode);
        content.put("stop_on_error", Boolean.TRUE);
        content.put("user_expressions", new  LinkedHashMap<>());
        content.put("silent", Boolean.FALSE);
        content.put("store_history", Boolean.TRUE);

        Message message = new Message();
        message.setIdentities(Arrays.asList("identities".getBytes()));
        message.setHeader(header);
        message.setParentHeader(null);
        message.setMetadata(new LinkedHashMap<>());
        message.setContent(content);
        return message;
    }

}
