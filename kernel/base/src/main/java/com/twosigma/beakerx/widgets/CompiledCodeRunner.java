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
package com.twosigma.beakerx.widgets;

import com.twosigma.beakerx.SerializeToString;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import static java.util.Collections.singletonList;

public class CompiledCodeRunner {

  private static final Logger logger = LoggerFactory.getLogger(CompiledCodeRunner.class);

  public interface ExecuteCompiledCode {
    Object executeCode(Object... params) throws Exception;
  }

  static void runCommEvent(Message message, CommActions action, Widget.ActionPerformed handlerAction) {
    if (message.getContent() != null) {
      Serializable data = message.getContent().get("data");
      if (data != null && data instanceof LinkedHashMap) {
        Object contentObject = ((LinkedHashMap) data).get("content");
        if (contentObject instanceof LinkedHashMap) {
          HashMap content = (LinkedHashMap) contentObject;
          if (handlerAction != null) {
            final SimpleEvaluationObject seo = initOutput(message);
            handlerAction.executeAction(content, message);
            seo.clrOutputHandler();
          }
        }
      }
    }
  }

  public static void runCompiledCode(Message message, ExecuteCompiledCode handler, Object... params) {
    final SimpleEvaluationObject seo = initOutput(message);
    InternalVariable.setValue(seo);
    try {
      Object result = handler.executeCode(params);
      if (result != null) {
        SerializeToString.doit(result);
      }
    } catch (Exception e) {
      printError(message, seo, e);
    }
    seo.clrOutputHandler();
  }

  public static void runCompiledCodeAndPublish(Message message, ExecuteCompiledCode handler, Object... params) {
    final SimpleEvaluationObject seo = initOutput(message);
    InternalVariable.setValue(seo);
    KernelManager.get().publish(singletonList(MessageCreator.buildClearOutput(message, true)));
    try {
      Object result = handler.executeCode(params);
      if (result != null) {
        List<MIMEContainer> resultString = SerializeToString.doit(result);
        KernelManager.get().publish(singletonList(MessageCreator.buildDisplayData(message, resultString)));
      }
    } catch (Exception e) {
      printError(message, seo, e);
    }
    seo.clrOutputHandler();
  }

  private static SimpleEvaluationObject initOutput(Message message) {
    final SimpleEvaluationObject seo = new SimpleEvaluationObject("");
    seo.setJupyterMessage(message);
    seo.setOutputHandler();
    seo.addObserver(KernelManager.get().getExecutionResultSender());
    return seo;
  }

  private static void printError(Message message, SimpleEvaluationObject seo, Exception e) {
    if (message != null) {
      StringWriter sw = new StringWriter();
      PrintWriter pw = new PrintWriter(sw);
      e.printStackTrace(pw);
      seo.error(sw.toString());
    } else {
      logger.info("Execution result ERROR: \n" + e);
    }
  }
}
