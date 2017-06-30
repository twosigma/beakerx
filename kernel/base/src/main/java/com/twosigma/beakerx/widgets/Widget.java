/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.LinkedHashMap;

import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.SerializeToString;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

public abstract class Widget implements CommFunctionality, DisplayableWidget {
  
  private static final Logger logger = LoggerFactory.getLogger(Widget.class);
  
  public enum CommActions {

    DOUBLE_CLICK("DOUBLE_CLICK"),
    ONCLICK("onclick"),
    ONKEY("onkey"),
    ACTIONDETAILS("actiondetails"),
    CONTEXT_MENU_CLICK("CONTEXT_MENU_CLICK"),
    CLICK("click");

    private String action;

    CommActions(String action) {
      this.action = action;
    }

    public String getAction() {
      return action;
    }
    
    public static CommActions getByAction(final String input){
      CommActions ret = null;
      if(input != null){
        for (CommActions item : CommActions.values()) {
          if(item.getAction().equalsIgnoreCase(input.trim())){
            ret = item;
            break;
          }
        }
      }
      return ret;
    }

  }

  public static final String MODEL_MODULE = "_model_module";
  public static final String MODEL_NAME = "_model_name";
  public static final String VIEW_MODULE = "_view_module";
  public static final String VIEW_NAME = "_view_name";

  public static final String MODEL_MODULE_VALUE = "jupyter-js-widgets";
  public static final String VIEW_MODULE_VALUE = "jupyter-js-widgets";

  public static final String VALUE = "value";
  public static final String DISABLED = "disabled";
  public static final String VISIBLE = "visible";
  public static final String DESCRIPTION = "description";
  public static final String MSG_THROTTLE = "msg_throttle";

  public static final String METHOD = "method";
  public static final String DISPLAY = "display";

  private Comm comm;

  public Widget() {
    comm = new Comm(TargetNamesEnum.JUPYTER_WIDGET);
  }

  protected void openComm() {
    comm.setData(createContent());
    addValueChangeMsgCallback();
    comm.open();
  }

  public void close() {
    if (this.comm != null) {
      this.comm.close();
    }
  }

  @Override
  public void display() {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, DISPLAY);
    getComm().setData(content);
    getComm().send();
  }

  private HashMap<String, Serializable> createContent() {
    HashMap<String, Serializable> result = new HashMap<>();
    result.put(MODEL_MODULE, getModelModuleValue());
    result.put(VIEW_MODULE, getViewModuleValue());
    String mn = getModelNameValue();
    if(mn != null && !mn.isEmpty()){
      result.put(MODEL_NAME, mn);
    }
    String vnv = getViewNameValue();
    if(vnv != null && !vnv.isEmpty()){
      result.put(VIEW_NAME, vnv);
    }
    result = content(result);
    return result;
  }
  
  public abstract String getModelNameValue();

  public abstract String getViewNameValue();

  public String getModelModuleValue(){
    return MODEL_MODULE_VALUE;
  }

  public String getViewModuleValue(){
    return VIEW_MODULE_VALUE;
  }

  protected abstract void addValueChangeMsgCallback();

  protected abstract HashMap<String, Serializable> content(HashMap<String, Serializable> content);

  @Override
  public Comm getComm() {
    return this.comm;
  }

  public void sendUpdate(String propertyName, Object value) {
    this.comm.sendUpdate(propertyName, value);
  }
  
  public void handleCommEventSync(Message message, CommActions action, ActionPerformed handlerAction) {
    wrapBusyIdle(KernelManager.get(), message, () -> handleCommEvent(message, action, handlerAction));
  }
  
  private void handleCommEvent(Message message, CommActions action, ActionPerformed handlerAction) {
    if (message.getContent() != null) {
      Serializable data = message.getContent().get("data");
      if (data != null && data instanceof LinkedHashMap) {
        Object contentObject = ((LinkedHashMap) data).get("content");
        if (contentObject instanceof LinkedHashMap) {
          HashMap content = (LinkedHashMap) contentObject;
          Object event = content.get("event");
          if (event.equals(action.getAction())) {
            handlerAction.executeAction(content, message);
          }
        }
      }
    }
  }
  
  public interface ActionPerformed {
    void executeAction(HashMap content, Message message);
  }
  
  /**
   * Please do not duplicate this method.
   * 
   * @param message
   * @param handler
   * @param params
   */
  public void handleCompiledCode(Message message, boolean publishResult, ExecuteCompiledCode handler, Object ... params) {
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
    }
    try {
      Object result = handler.executeCode(params);
      if(result != null && message != null){
        MIMEContainer resultString = SerializeToString.doit(result);
        logger.info("code execution result is = " + resultString.getMime());
        if(publishResult){
          KernelManager.get().publish(mc.buildDisplayData(message, resultString));
        }
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
    seo.clrOutputHandler();
  }

  public interface ExecuteCompiledCode {
    Object executeCode(Object ... params) throws Exception;
  }

  public void activateWidgetInContainer(){
    // should be removed when our widgets will be rewritten to ipywidget style
  }

}