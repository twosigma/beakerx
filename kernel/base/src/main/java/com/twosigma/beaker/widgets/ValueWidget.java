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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 
 * @author konst
 *
 * @param <T>
 */
public abstract class ValueWidget<T extends Serializable> extends DOMWidget {

  protected T value;

  public T getValue() {
    return this.value;
  }

  public void setValue(Object value) {
    this.value = getValueFromObject(value);
    sendUpdate(VALUE, value);
  }

  @Override
  public void updateValue(Object input) {
    this.value = getValueFromObject(input);
  }

  public abstract T getValueFromObject(Object input);

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
      if (input instanceof Object[] || input instanceof Collection<?>) {
        Object[] array = (Object[]) input;
        for (Object o : array) {
          ret.add(getString(o));
        }
      } else {
        ret.add(getString(input));
      }
    }
    return ((ArrayList<String>) ret).stream().toArray(String[]::new);
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