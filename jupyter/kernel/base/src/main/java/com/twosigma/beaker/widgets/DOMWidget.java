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

import com.twosigma.beaker.jupyter.Comm;
import org.lappsgrid.jupyter.handler.IHandler;
import org.lappsgrid.jupyter.msg.Message;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public abstract class DOMWidget extends Widget {

  public static final String DATA = "data";
  public static final String SYNC_DATA = "sync_data";

  private Layout layout;

  public DOMWidget() {
    super();
    layout = new Layout();
  }

  @Override
  protected void addValueChangeMsgCallback(Comm comm) {
    comm.addMsgCallbackList(new IHandler<Message>() {
      @Override
      public void handle(Message msg) throws NoSuchAlgorithmException {
        if (msg != null && msg.getContent() != null && msg.getContent().containsKey(DATA)) {
          Map data = (Map) msg.getContent().get(DATA);
          if (data.containsKey(SYNC_DATA)) {
            Map sync_data = (Map) data.get(SYNC_DATA);
            if (sync_data.containsKey(VALUE)) {
              Object value = sync_data.get(VALUE);
              if (value != null) {
                updateValue(value);
              }
            }
          }
        }
      }
    });
  }

  protected void updateValue(Object value) {
  }

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
