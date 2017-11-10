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

import static com.twosigma.beakerx.widgets.CompiledCodeRunner.runCompiledCodeAndPublish;

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widgets.InteractiveBase;
import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.Widget;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.codehaus.groovy.runtime.MethodClosure;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Interactive extends InteractiveBase {

  private static final Logger logger = LoggerFactory.getLogger(Interactive.class);

  @SuppressWarnings("unchecked")
  public static synchronized void interact(MethodClosure function, Object... parameters) {

    final List<ValueWidget<?>> widgets = widgetsFromAbbreviations(parameters);

    for (ValueWidget<?> widget : widgets) {
      widget.getComm().addMsgCallbackList(widget.new ValueChangeMsgCallbackHandler() {

        private Object processCode(Object... params) throws Exception {
          widgets.forEach(Widget::display);

          return function.call(getWidgetValues());
        }

        @Override
        public void updateValue(Object value, Message message) {
          runCompiledCodeAndPublish(message, this::processCode, Collections.emptyList());
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
    }
  }

}
