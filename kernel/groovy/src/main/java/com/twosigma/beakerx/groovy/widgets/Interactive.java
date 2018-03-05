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
package com.twosigma.beakerx.groovy.widgets;

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.InteractiveBase;
import com.twosigma.beakerx.widget.ValueWidget;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.Label;

import java.util.ArrayList;
import java.util.List;
import org.codehaus.groovy.runtime.MethodClosure;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Interactive extends InteractiveBase {

  private static Label label;

  private static final Logger logger = LoggerFactory.getLogger(Interactive.class);

  @SuppressWarnings("unchecked")
  public static synchronized void interact(MethodClosure function, Object... parameters) {

    final List<ValueWidget<?>> widgets = widgetsFromAbbreviations(parameters);

    for (ValueWidget<?> widget : widgets) {
      widget.getComm().addMsgCallbackList(widget.new ValueChangeMsgCallbackHandler() {

        private void processCode(Object... params) throws Exception {
          Object call = function.call(getWidgetValues());
          if (call instanceof String || call instanceof Number) {
            label.setValue(call);
          }
        }

        @Override
        public void updateValue(Object value, Message message) {
          try {
            processCode();
          } catch (Exception e) {
            throw new IllegalStateException("Error occurred during updating interactive widget.", e);
          }
        }

        private Object[] getWidgetValues() {
          List<Object> ret = new ArrayList<>(widgets.size());
          for (ValueWidget<?> wid : widgets) {
            ret.add(wid.getValue());
          }
          return ret.toArray(new Object[ret.size()]);
        }

      });
      logger.info("interact Widget: " + widget.getClass().getName());
    }

    widgets.forEach(Widget::display);
    Object response = function.call(widgets.stream().map(ValueWidget::getValue).toArray());
    if (response instanceof Widget) {
      ((Widget) response).display();
    } else {
      label = new Label();
      label.setValue(response);
      label.display();
    }
  }

}
