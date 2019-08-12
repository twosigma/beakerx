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
package com.twosigma.beakerx.widget;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public abstract class DOMWidget extends Widget {

  public static final String DATA = "data";
  public static final String SYNC_DATA = "state";
  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/controls";
  public static final String VIEW_MODULE_VALUE = "@jupyter-widgets/controls";
  public static final String DOM_CLASSES = "_dom_classes";

  private Layout layout;
  protected Style style;
  private List<String> domClasses = new ArrayList<>();

  private UpdateValueCallback updateValueCallback = () -> {
  };

  public DOMWidget() {
    super();
    layout = new Layout();
  }

  public DOMWidget(Message parent) {
    super();
    layout = new Layout(parent);
  }

  @SuppressWarnings("unchecked")
  @Override
  protected void addValueChangeMsgCallback() {
    getComm().addMsgCallbackList(new ValueChangeMsgCallbackHandler() {

      @Override
      public void updateValue(Object value, Message message) {
        DOMWidget.this.doUpdateValueWithCallback(value);
      }

    });

  }

  @SuppressWarnings("unchecked")
  public static Optional<Object> getSyncDataValue(Message msg) {
    Optional<Object> ret = Optional.empty();
    if (msg != null && msg.getContent() != null && msg.getContent().containsKey(DATA)) {
      Map<String, Serializable> data = (Map<String, Serializable>) msg.getContent().get(DATA);
      if (data.containsKey(SYNC_DATA)) {
        Map<String, Serializable> sync_data = (Map<String, Serializable>) data.get(SYNC_DATA);
        if (sync_data.containsKey(VALUE)) {
          ret = Optional.of(sync_data.get(VALUE));
        } else if (sync_data.containsKey(INDEX)) {
          ret = Optional.of(sync_data.get(INDEX));
        } else if (sync_data.containsKey("outputs")) {
          ret = Optional.of(sync_data.get("outputs"));
        }
      }
    }
    return ret;
  }

  public abstract class ValueChangeMsgCallbackHandler implements Handler<Message> {

    public void handle(Message message) {
      Optional<Object> value = getSyncDataValue(message);
      value.ifPresent(o -> updateValue(o, message));
    }

    public abstract void updateValue(Object value, Message message);

  }

  public void register(UpdateValueCallback updateValueCallback) {
    this.updateValueCallback = checkNotNull(updateValueCallback);
  }

  public abstract void updateValue(Object value);

  public void doUpdateValueWithCallback(Object value) {
    updateValue(value);
    this.updateValueCallback.execute();
  }

  @Override
  public String getModelModuleValue() {
    return MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return VIEW_MODULE_VALUE;
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    content.put(Layout.LAYOUT, Layout.IPY_MODEL + getLayout().getComm().getCommId());
    if (style != null) {
      content.put(Style.STYLE, Layout.IPY_MODEL + getStyle().getComm().getCommId());
    }
    content.put("font_family", "");
    content.put("font_size", "");
    content.put("font_style", "");
    content.put("font_weight", "");
    content.put("background_color", null);
    content.put("color", null);
    content.put(DOM_CLASSES, domClasses.toArray());
    return content;
  }

  public List<String> getDomClasses() {
    return domClasses;
  }

  public void setDomClasses(List<String> domClasses) {
    this.domClasses = checkNotNull(domClasses);
    sendUpdate(DOM_CLASSES, this.domClasses.toArray());
  }

  public Layout getLayout() {
    if (layout == null) {
      layout = new Layout();
    }
    return layout;
  }

  public Style getStyle() {
    return style;
  }
}
