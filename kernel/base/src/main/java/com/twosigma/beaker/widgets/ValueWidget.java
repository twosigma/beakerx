package com.twosigma.beaker.widgets;

import java.io.Serializable;

public abstract class ValueWidget<T extends Serializable> extends DOMWidget {

  protected T value;
  
  public T getValue() {
    return this.value;
  }

  public void setValue(T value) {
    this.value = value;
    sendUpdate(VALUE, value);
  }
  
}
