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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;

public abstract class DOMWidget extends Widget {

  public static final String DATA = "data";
  public static final String SYNC_DATA = "sync_data";

  private Layout layout;


  public DOMWidget() {
    super();
    layout = new Layout();
  }

  @Override
  protected void addValueChangeMsgCallback() {
    getComm().addMsgCallbackList(new ValueChangeMsgCallbackHandler() {
      
      @Override
      public void updateValue(Object value, Message message){
        DOMWidget.this.updateValue(value);
      }
      
    });

  }
  
  public abstract class ValueChangeMsgCallbackHandler implements Handler<Message>{
    
    @SuppressWarnings("unchecked")
    public Optional<Object> getSyncDataValue(Message msg){
      Optional<Object> ret = Optional.empty();
      if (msg != null && msg.getContent() != null && msg.getContent().containsKey(DATA)) {
        Map<String,Serializable> data = (Map<String,Serializable>) msg.getContent().get(DATA);
        if (data.containsKey(SYNC_DATA)) {
          Map<String,Serializable> sync_data = (Map<String,Serializable>) data.get(SYNC_DATA);
          if (sync_data.containsKey(VALUE)) {
            ret = Optional.of(sync_data.get(VALUE));
          }
        }
      }
      return ret;
    }
    
    public void handle(Message message){
      Optional<Object> value = getSyncDataValue(message);
      if(value.isPresent()){
        updateValue(value.get(), message);
      }
    }
    
    public abstract void updateValue(Object value, Message message);
    
  }

  public abstract void updateValue(Object value);

  
  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    content.put(Layout.LAYOUT, Layout.IPY_MODEL + layout.getComm().getCommId());
    content.put("font_family", "");
    content.put("font_size", "");
    content.put("font_style", "");
    content.put("font_weight", "");
    content.put("background_color", null);
    content.put("color", null);
    return content;
  }

  public Layout getLayout() {
    return layout;
  }
}
