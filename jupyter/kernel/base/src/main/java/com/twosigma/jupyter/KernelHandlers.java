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
package com.twosigma.jupyter;

import com.twosigma.beaker.jupyter.handler.CommCloseHandler;
import com.twosigma.beaker.jupyter.handler.CommInfoHandler;
import com.twosigma.beaker.jupyter.handler.CommMsgHandler;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.beaker.jupyter.handler.ExecuteRequestHandler;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.handler.CompleteHandler;
import com.twosigma.jupyter.handler.HistoryHandler;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.handler.KernelInfoHandler;
import com.twosigma.jupyter.message.Message;

import java.util.HashMap;
import java.util.Map;
/**
 * Message handlers. All sockets listeners will dispatch to these handlers.
 */
public class KernelHandlers {

  private Map<JupyterMessages, KernelHandler<Message>> handlers;
  private KernelFunctionality kernel;

  public KernelHandlers(KernelFunctionality kernel, final CommOpenHandler commOpenHandler) {
    this.kernel = kernel;
    this.handlers = createHandlers(commOpenHandler);
  }

  private Map<JupyterMessages, KernelHandler<Message>> createHandlers(final CommOpenHandler commOpenHandler) {
    Map<JupyterMessages, KernelHandler<Message>> handlers = new HashMap<>();
    handlers.put(JupyterMessages.EXECUTE_REQUEST, new ExecuteRequestHandler(kernel));
    handlers.put(JupyterMessages.KERNEL_INFO_REQUEST, new KernelInfoHandler(kernel));
    handlers.put(JupyterMessages.COMPLETE_REQUEST, new CompleteHandler(kernel));
    handlers.put(JupyterMessages.HISTORY_REQUEST, new HistoryHandler(kernel));
    handlers.put(JupyterMessages.COMM_INFO_REQUEST, new CommInfoHandler(kernel));
    handlers.put(JupyterMessages.COMM_CLOSE, new CommCloseHandler(kernel));
    handlers.put(JupyterMessages.COMM_MSG, new CommMsgHandler(kernel, new MessageCreator(kernel)));
    if (commOpenHandler != null) {
      handlers.put(JupyterMessages.COMM_OPEN, commOpenHandler);
    }
    return handlers;
  }

  public Handler<Message> get(JupyterMessages type) {
    return handlers.get(type);
  }

  public void exit() {
    for (KernelHandler<Message> handler : this.handlers.values()) {
      handler.exit();
    }
  }
}
