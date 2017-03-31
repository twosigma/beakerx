package com.twosigma.beaker.widgets;

public abstract class ValueWidget<T> extends DOMWidget {

  protected T value;
  
  public T getValue() {
    return this.value;
  }

  public void setValue(T value) {
    this.value = value;
    sendUpdate(VALUE, value);
  }
  
}
