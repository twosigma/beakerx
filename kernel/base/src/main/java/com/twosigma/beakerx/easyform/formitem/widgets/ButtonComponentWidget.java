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
package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.easyform.formitem.EasyFormListener;
import com.twosigma.beakerx.widgets.Button;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class ButtonComponentWidget extends EasyFormComponent<Button> {

  private List<EasyFormListener> actionListeners = new LinkedList<>();
  public EasyFormListener actionPerformed =  (value) -> {
    //empty function
  };

  public ButtonComponentWidget() {
    super(new Button());
    this.widget.registerOnClick(this::fireActionPerformed);
  }
  
  private void fireActionPerformed(HashMap content, Message message){
    this.fireActionPerformed();
  }


  @Override
  public String getValue() {
    return null;
  }

  @Override
  public void setValue(String value) {
  }

  public void setTag(String tag) {
    this.widget.setTag(tag);
  }

  public String getTag() {
    return this.widget.getTag();
  }

  public void fireActionPerformed() {
    if (actionPerformed != null) {
      actionPerformed.execute(getLabel());
      for (EasyFormListener listener : actionListeners) {
        listener.execute(getLabel());
      }
    }
  }

  public EasyFormComponent addAction(final EasyFormListener listener) {
    addActionListener(listener);
    return this;
  }

  public void addActionListener(final EasyFormListener listener) {
    if (listener != null) {
      actionListeners.add(listener);
    }
  }

  @Override
  public boolean isButton() {
    return true;
  }
  
}