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
package com.twosigma.beakerx.kernel.threads;

import java.util.List;
import java.util.Observable;
import java.util.Observer;

import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.msg.MessageHolder;
import com.twosigma.beakerx.kernel.SocketEnum;

import static java.util.Collections.singletonList;

public class ExecutionResultSender implements Observer {

  public static Logger logger = LoggerFactory.getLogger(ExecutionResultSender.class);
  private KernelFunctionality kernel;

  public ExecutionResultSender(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public synchronized void update(Observable o, Object arg) {
    SimpleEvaluationObject seo = (SimpleEvaluationObject) o;
    if (seo != null) {
      List<MessageHolder> message = MessageCreator.createMessage(seo);
      message.forEach(job -> {
        if (SocketEnum.IOPUB_SOCKET.equals(job.getSocketType())) {
          kernel.publish(singletonList(job.getMessage()));
        } else if (SocketEnum.SHELL_SOCKET.equals(job.getSocketType())) {
          kernel.send(job.getMessage());
        }
      });
    }
  }

  public void exit() {
  }

}