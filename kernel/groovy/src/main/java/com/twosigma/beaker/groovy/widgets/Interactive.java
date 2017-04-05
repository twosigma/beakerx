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
package com.twosigma.beaker.groovy.widgets;

import static com.twosigma.beaker.widgets.DisplayWidget.display;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.groovy.runtime.MethodClosure;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.SerializeToString;
import com.twosigma.beaker.evaluator.InternalVariable;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.mimetype.MIMEContainer;
import com.twosigma.beaker.widgets.InteractiveBase;
import com.twosigma.beaker.widgets.ValueWidget;
import com.twosigma.jupyter.message.Message;

public class Interactive extends InteractiveBase{

  private static final Logger logger = LoggerFactory.getLogger(Interactive.class);
  
  @SuppressWarnings("unchecked")
  public static synchronized void interact(MethodClosure function, Object... parameters) {
    final MessageCreator mc = new MessageCreator(KernelManager.get());
    final List<ValueWidget<?>> witgets = widgetsFromAbbreviations(parameters);
    
    for (ValueWidget<?> widget : witgets) {
      widget.getComm().addMsgCallbackList(widget.new ValueChangeMsgCallbackHandler() {
        
        @Override
        public void updateValue(Object value, Message message) {
          SimpleEvaluationObject seo = new SimpleEvaluationObject("");
          seo.setJupyterMessage(message);
          InternalVariable.setValue(seo);
          KernelManager.get().publish(mc.buildClearOutput(message, true));
          Object result = function.call(getWidgetValues());
          MIMEContainer resultString = SerializeToString.doit(result);
          logger.info("interact result is = " + resultString.getMime());
          KernelManager.get().publish(mc.buildDisplayData(message, resultString));
        }
        
        private Object[] getWidgetValues(){
          List<Object> ret = new ArrayList<>(witgets.size());
          for (ValueWidget<?> wid : witgets) {
            ret.add(wid.getValue());
          }
          return ret.toArray(new Object[ret.size()]);
        }
        
      });
      logger.info("interact Widget: " + widget.getClass().getName());
      display(widget);
    }
  }

}
