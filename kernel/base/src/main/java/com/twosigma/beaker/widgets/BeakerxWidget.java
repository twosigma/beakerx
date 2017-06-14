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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.SerializeToString;
import com.twosigma.beaker.evaluator.InternalVariable;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.mimetype.MIMEContainer;
import com.twosigma.beaker.table.ContextMenuAction;
import com.twosigma.jupyter.message.Message;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BeakerxWidget extends Widget {
  
  private static final Logger logger = LoggerFactory.getLogger(SerializeToString.class);

  public static final String MODEL_MODULE_VALUE = "beakerx";
  public static final String VIEW_MODULE_VALUE = "beakerx";
  public static final String MODEL = "model";
  public static final String MODEL_UPDATE = "model";
  private UpdateModel updateModel = (action, item) -> {
    //empty function
  };

  protected abstract Map serializeToJsonObject();

  protected abstract Map serializeToJsonObject(Object item);

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    return content;
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  public void sendModel() {
    this.updateModel.update(MODEL, serializeToJsonObject());
  }

  public void sendModelUpdate(Object item) {
    this.updateModel.update(MODEL_UPDATE, serializeToJsonObject(item));
  }

  @Override
  public void display() {
    enableModelUpdate();
    sendModel();
    super.display();
  }

  private void enableModelUpdate() {
    updateModel = (action, item) -> sendUpdate(action, item);
  }

  interface UpdateModel {
    void update(String action, Object item);
  }
  

  public static synchronized void handleCompiledCode(Message message, ExecuteCompiledCode handler, Object ... params) {
    final MessageCreator mc = new MessageCreator(KernelManager.get());
    final SimpleEvaluationObject seo = new SimpleEvaluationObject("",(seoResult) -> {
      //nothing to do
    });
    if(message != null){
      seo.setJupyterMessage(message);
      seo.setOutputHandler();
      seo.addObserver(KernelManager.get().getExecutionResultSender());
      InternalVariable.setValue(seo);
      KernelManager.get().publish(mc.buildClearOutput(message, true));
      seo.clrOutputHandler();
    }
    try {
      Object result = handler.executeCode(params);
      if(result != null && message != null){
        MIMEContainer resultString = SerializeToString.doit(result);
        logger.info("code execution result is = " + resultString.getMime());
        KernelManager.get().publish(mc.buildDisplayData(message, resultString));
      }
    } catch (Exception e) {
      if(message != null){
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        seo.error(sw.toString());
      }else{
        logger.info("Execution result ERROR: \n" + e);
      }
    }
  }

  public interface ExecuteCompiledCode {
    Object executeCode(Object ... params) throws Exception;
  }

  public static synchronized void handleCompiledCode(Message message, ContextMenuAction contextMenuAction, Integer row, Integer column) {
    final MessageCreator mc = new MessageCreator(KernelManager.get());
    final SimpleEvaluationObject seo = new SimpleEvaluationObject("",(seoResult) -> {
      //nothing to do
    });

    if (message != null) {
      seo.setJupyterMessage(message);
      seo.setOutputHandler();
      seo.addObserver(KernelManager.get().getExecutionResultSender());
      InternalVariable.setValue(seo);
      KernelManager.get().publish(mc.buildClearOutput(message, true));
      seo.clrOutputHandler();
    }

    try {
      contextMenuAction.apply(row, column, null);
    } catch (Exception e) {
      if (message != null) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        seo.error(sw.toString());
      }else{
        logger.info("Execution result ERROR: \n" + e);
      }
    }

  }

}