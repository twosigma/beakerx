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
package com.twosigma.jupyter.handler;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMPLETE_REPLY;

public class CompleteHandler extends KernelHandler<Message> {

  public static final String STATUS = "status";
  public static final String MATCHES = "matches";
  public static final String CURSOR_END = "cursor_end";
  public static final String CURSOR_START = "cursor_start";
  public static final String CODE = "code";
  public static final String CURSOR_POS = "cursor_pos";


  public CompleteHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    KernelHandlerWrapper.wrapBusyIdle(kernel, message, () -> {
      String code = ((String) message.getContent().get(CODE)).trim();
      int cursorPos = ((int) message.getContent().get(CURSOR_POS));
      AutocompleteResult autocomplete = kernel.autocomplete(code, cursorPos);
      Message reply = createMsg(message, cursorPos, autocomplete);
      send(reply);
    });
  }

  private Message createMsg(Message message, int cursorPos, AutocompleteResult autocomplete) {
    Message reply = new Message();
    reply.setHeader(new Header(COMPLETE_REPLY, message.getHeader().getSession()));
    reply.setIdentities(message.getIdentities());
    reply.setParentHeader(message.getHeader());
    Map<String, Serializable> content = new HashMap<>();
    content.put(STATUS, "ok");
    content.put(MATCHES, autocomplete.getMatches().toArray());
    content.put(CURSOR_END, cursorPos);
    content.put(CURSOR_START, autocomplete.getStartIndex());

    reply.setContent(content);
    return reply;
  }
}