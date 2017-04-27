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


import com.twosigma.beaker.jupyter.commands.MagicCommand;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.handler.KernelHandlerWrapper;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.EXECUTE_INPUT;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.STATUS;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private ExecuteRequestRunner executeRequestRunner;

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.kernel = kernel;
    executeRequestRunner = new ExecuteRequestRunner(kernel);
    executeRequestRunner.start();
  }

  @Override
  public void handle(Message message) {
    executeRequestRunner.add(message);
  }

  @Override
  public void exit() {
    if (executeRequestRunner != null) {
      executeRequestRunner.halt();
    }
  }

}
