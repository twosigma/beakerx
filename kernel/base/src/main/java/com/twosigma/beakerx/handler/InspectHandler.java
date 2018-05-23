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

package com.twosigma.beakerx.handler;

import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.INSPECT_REPLY;

public class InspectHandler extends KernelHandler<Message> {
    public static final String STATUS = "status";
    public static final String METADATA = "metadata";
    public static final String FOUND = "found";
    public static final String CODE = "code";
    public static final String CURSOR_POS = "cursor_pos";
    public static final String DATA = "data";

    public InspectHandler(KernelFunctionality kernel) {
        super(kernel);
    }

    @Override
    public void handle(Message message) {
        wrapBusyIdle(kernel, message, () -> {
            handleMsg(message);
        });
    }

    private void handleMsg(Message message) {
        String code = ((String) message.getContent().get(CODE));
        int cursorPos = ((int) message.getContent().get(CURSOR_POS));
        //InspectResult inspectResult = new InspectResult(code, cursorPos);
        InspectResult inspectResult = kernel.inspect(code, cursorPos);
        Message reply = createMsg(message, inspectResult);
        send(reply);
    }

    private Message createMsg(Message message, InspectResult inspectResult) {
        Message reply = new Message(new Header(INSPECT_REPLY, message.getHeader().getSession()));
        reply.setIdentities(message.getIdentities());
        reply.setParentHeader(message.getHeader());
        Map<String, Serializable> content = new HashMap<>();
        content.put(STATUS, "ok");
        content.put(DATA, inspectResult.getData());
        //content.put(METADATA, {});
        content.put(FOUND, inspectResult.getFound());

        reply.setContent(content);
        return reply;
    }
}
