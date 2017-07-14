/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.easyform;

import com.twosigma.beakerx.easyform.formitem.EasyFormListener;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.widgets.CommFunctionality;
import com.twosigma.beakerx.widgets.UpdateValueCallback;
import com.twosigma.beakerx.widgets.ValueWidget;

import java.util.LinkedList;
import java.util.List;

public class EasyFormComponent<T extends ValueWidget<?>> implements CommFunctionality{

  protected T widget;
  private boolean enabled = true;
  private List<EasyFormListener> onChangeListeners = new LinkedList<>();
  private List<EasyFormListener> onInitListeners = new LinkedList<>();

  public EasyFormComponent(T widget){
    this.widget = widget;
  }
  
  public EasyFormComponent(){
    
  }
  
  //Acts like ID
  public String getLabel() {
    return this.widget.getDescription();
  }

  //Acts like ID
  public void setLabel(String label) {
    this.widget.setDescription(label);
  }

  public String getValue() {
    return this.widget.getValue().toString();
  }

  public void setValue(String value) {
    this.widget.setValue(value);
  }

  public T getWidget() {
    return widget;
  }
  
  public void fireInit() {
    for (EasyFormListener listener : onInitListeners) {
      listener.execute(getValue());
    }
  }

  public EasyFormComponent onInit(final EasyFormListener listener) {
    addOnInitListener(listener);
    return this;
  }

  public void addOnInitListener(final EasyFormListener listener) {
    if (listener != null) {
      onInitListeners.add(listener);
    }
  }

  public void removeOnInitListener(final EasyFormListener listener) {
    if (onInitListeners.contains(listener)) {
      onInitListeners.remove(listener);
    }
  }

  public EasyFormComponent onChange(final EasyFormListener listener) {
    addOnChangeListener(listener);
    return this;
  }

  public void fireChanged() {
    for (EasyFormListener listener : onChangeListeners) {
      listener.execute(this.getValue());
    }
  }

  public void addOnChangeListener(final EasyFormListener listener) {
    if (listener != null) {
      onChangeListeners.add(listener);
    }
  }

  public void removeOnChangeListener(final EasyFormListener listener) {
    if (onChangeListeners.contains(listener)) {
      onChangeListeners.remove(listener);
    }
  }

  public void clearListeners() {
    onChangeListeners.clear();
    onInitListeners.clear();
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(final boolean enabled) {
    this.enabled = enabled;
  }

  public String formatValue(final Object value) {
    return String.class.cast(value);
  }

  /**
   * Throw IllegalArgumentException if such value can't be set to this component
   */
  protected boolean checkValue(Object value) {
    return true;
  }
  
  public void registerUpdateValueCallback(final UpdateValueCallback updateValueCallback){
    getWidget().register(updateValueCallback);
  }

  public boolean isButton() {
    return false;
  }
  
  @Override
  public Comm getComm() {
    return getWidget().getComm();
  }
  
  @Override
  public void close() {
    getComm().close();
  }
  
}