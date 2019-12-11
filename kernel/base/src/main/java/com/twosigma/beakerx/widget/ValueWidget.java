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

import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

/**
 * @param <T>
 * @author konst
 */
public abstract class ValueWidget<T extends Serializable> extends DOMWidget {

  protected T value;
  protected Boolean disabled = false;
  protected Boolean visible = true;
  protected String description = "";
  protected Integer msg_throttle = 3;
  private ActionOnUpdate<T> actionOnUpdate;

  public ValueWidget() {
    super();
  }

  public ValueWidget(Message parent) {
    super(parent);
  }

  public T getValue() {
    return this.value;
  }

  @Override
  public void stateRequestHandler() {
    super.stateRequestHandler();
    sendUpdate(VALUE, printValue());
  }

  public void setValue(Object value) {
    this.value = decorateValue(getValueFromObject(value));
    sendUpdate(VALUE, printValue());
  }

  protected Object printValue() {
    return this.value;
  }

  protected T decorateValue(T value) {
    return value;
  }

  @Override
  public void updateValue(Object input) {
    this.value = updateValueFromObject(input);
    if (actionOnUpdate != null) {
      actionOnUpdate.executeAction(this.value);
    }
  }

  public void registerActionOnUpdate(ActionOnUpdate<T> actionOnUpdate) {
    this.actionOnUpdate = actionOnUpdate;
  }

  public interface ActionOnUpdate<T> {
    void executeAction(T value);
  }

  public abstract T getValueFromObject(Object input);

  public T updateValueFromObject(Object input) {
    return getValueFromObject(input);
  }

  public Boolean getDisabled() {
    return disabled;
  }

  public void setDisabled(Object disabled) {
    this.disabled = getBoolean(disabled);
    sendUpdate(DISABLED, disabled);
  }

  public Boolean getVisible() {
    return visible;
  }

  public void setVisible(Object visible) {
    this.visible = getBoolean(visible);
    sendUpdate(VISIBLE, visible);
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(Object description) {
    this.description = getString(description);
    sendUpdate(DESCRIPTION, description);
  }

  public Integer getMsg_throttle() {
    return msg_throttle;
  }

  public void setMsg_throttle(Object msg_throttle) {
    this.msg_throttle = getInteger(msg_throttle);
    sendUpdate(MSG_THROTTLE, msg_throttle);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(DESCRIPTION, this.description);
    content.put(DISABLED, this.disabled);
    content.put(VISIBLE, this.visible);
    content.put(MSG_THROTTLE, this.msg_throttle);
    return content;
  }

  public Integer getInteger(Object input) {
    Integer ret = 0;
    if (input != null) {
      if (input instanceof Double) {
        ret = ((Double) input).intValue();
      } else if (input instanceof Integer) {
        ret = (Integer) input;
      } else if (input instanceof String) {
        try {
          ret = Integer.parseInt((String) input);
        } catch (NumberFormatException e) {
        }
      } else if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        if (array.length > 0) {
          ret = (Integer) getInteger(array[0]);
        }
      }
    }
    return ret;
  }

  public Double getDouble(Object input) {
    Double ret = 0D;
    if (input != null) {
      if (input instanceof Integer) {
        ret = ((Integer) input).doubleValue();
      } else if (input instanceof Double) {
        ret = (Double) input;
      } else if (input instanceof String) {
        try {
          ret = Double.parseDouble((String) input);
        } catch (NumberFormatException e) {
        }
      } else if (input instanceof BigDecimal) {
        ret = ((BigDecimal) input).doubleValue();
      } else if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        if (array.length > 0) {
          ret = (Double) getDouble(array[0]);
        }
      }
    }
    return ret;
  }

  protected Integer[] getArrayOfInteger(Object input, Integer lowerDefault, Integer upperDefault) {
    Integer[] ret = new Integer[2];
    ret[0] = lowerDefault;
    ret[1] = upperDefault;
    if (input != null) {
      if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        if (array.length == 1) {
          ret[0] = (Integer) getInteger(array[0]);
        } else if (array.length > 1) {
          ret[0] = (Integer) getInteger(array[0]);
          ret[1] = (Integer) getInteger(array[1]);
        }
      } else if (input instanceof Collection<?>) {
        Collection<?> coll = (Collection<?>) input;
        if (coll.size() == 1) {
          ret[0] = (Integer) getInteger(coll.toArray()[0]);
        } else if (coll.size() > 1) {
          ret[0] = (Integer) getInteger(coll.toArray()[0]);
          ret[1] = (Integer) getInteger(coll.toArray()[1]);
        }
      } else {
        ret[0] = getInteger(input);
      }
    }
    return ret;
  }

  protected Double[] getArrayOfDouble(Object input, Double lowerDefault, Double upperDefault) {
    Double[] ret = new Double[2];
    ret[0] = lowerDefault;
    ret[1] = upperDefault;
    if (input != null) {
      if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        if (array.length == 1) {
          ret[0] = (Double) getDouble(array[0]);
        } else if (array.length > 1) {
          ret[0] = (Double) getDouble(array[0]);
          ret[1] = (Double) getDouble(array[1]);
        }
      } else if (input instanceof Collection<?>) {
        Collection<?> coll = (Collection<?>) input;
        if (coll.size() == 1) {
          ret[0] = (Double) getDouble(coll.toArray()[0]);
        } else if (coll.size() > 1) {
          ret[0] = (Double) getDouble(coll.toArray()[0]);
          ret[1] = (Double) getDouble(coll.toArray()[1]);
        }
      } else {
        ret[0] = getDouble(input);
      }
    }
    return ret;
  }

  public String getString(Object input) {
    String ret = "";
    if (input != null) {
      if (input instanceof String) {
        ret = (String) input;
      } else if (input instanceof byte[]) {
        ret = new String((byte[]) input);
      } else {
        ret = input.toString();
      }
    }
    return ret;
  }

  public String[] getStringArray(Object input) {
    List<String> ret = new ArrayList<>();
    if (input != null) {
      if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        for (Object o : array) {
          ret.add(getString(o));
        }
      } else if (input instanceof Collection<?>) {
        Collection<Object> array = (Collection<Object>) input;
        for (Object o : array) {
          ret.add(getString(o));
        }
      } else {
        ret.add(getString(input));
      }
    }
    return ret.stream().toArray(String[]::new);
  }

  public List<Integer> getIntegerArray(Object input) {
    List<Integer> ret = new ArrayList<>();
    if (input != null) {
      if (input instanceof Object[]) {
        Object[] array = (Object[]) input;
        for (Object o : array) {
          ret.add(getInteger(o));
        }
      } else if (input instanceof Collection<?>) {
        Collection<Integer> array = (Collection<Integer>) input;
        for (Object o : array) {
          ret.add(getInteger(o));
        }
      } else {
        ret.add(getInteger(input));
      }
    }
    return ret;
  }

  public Boolean getBoolean(Object input) {
    Boolean ret = false;
    if (input != null) {
      if (input instanceof Boolean) {
        ret = (Boolean) input;
      } else if (input instanceof String) {
        ret = new Boolean((String) input);
      }
    }
    return ret;
  }
}
