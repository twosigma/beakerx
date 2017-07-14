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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.kernel.handler.CommCloseHandler;
import com.twosigma.beakerx.kernel.handler.CommInfoHandler;
import com.twosigma.beakerx.kernel.handler.CommMsgHandler;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.handler.ExecuteRequestHandler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.handler.IsCompleteRequestHandler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.handler.CompleteHandler;
import com.twosigma.beakerx.handler.HistoryHandler;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;
import java.util.Map;
/**
 * Message handlers. All sockets listeners will dispatch to these handlers.
 */
public class KernelHandlers {

  private Map<JupyterMessages, KernelHandler<Message>> handlers;
  private KernelFunctionality kernel;

  public KernelHandlers(KernelFunctionality kernel, final CommOpenHandler commOpenHandler, final KernelHandler<Message> kernelInfoHandler) {
    this.kernel = kernel;
    this.handlers = createHandlers(commOpenHandler, kernelInfoHandler);
  }

  private Map<JupyterMessages, KernelHandler<Message>> createHandlers(final CommOpenHandler commOpenHandler, final KernelHandler<Message> kernelInfoHandler) {
    Map<JupyterMessages, KernelHandler<Message>> handlers = new HashMap<>();
    if(kernelInfoHandler != null){
      handlers.put(JupyterMessages.KERNEL_INFO_REQUEST, kernelInfoHandler);
    }
    if (commOpenHandler != null) {
      handlers.put(JupyterMessages.COMM_OPEN, commOpenHandler);
    }
    handlers.put(JupyterMessages.EXECUTE_REQUEST, new ExecuteRequestHandler(kernel));
    handlers.put(JupyterMessages.COMPLETE_REQUEST, new CompleteHandler(kernel));
    handlers.put(JupyterMessages.HISTORY_REQUEST, new HistoryHandler(kernel));
    handlers.put(JupyterMessages.COMM_INFO_REQUEST, new CommInfoHandler(kernel));
    handlers.put(JupyterMessages.COMM_CLOSE, new CommCloseHandler(kernel));
    handlers.put(JupyterMessages.COMM_MSG, new CommMsgHandler(kernel, new MessageCreator(kernel)));
    handlers.put(JupyterMessages.IS_COMPLETE_REQUEST, new IsCompleteRequestHandler(kernel));
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
