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

package com.twosigma.beaker.jupyter;

import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.widgets.Layout;
import com.twosigma.beaker.widgets.Widget;
import com.twosigma.jupyter.message.Message;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SearchMessages {

  public static List<Message> getListLayout(List<Message> messages){
    return getListByDataAttr(messages, Widget.VIEW_NAME, new Layout().getViewNameValue());
  }

  public static Message getLayoutForWidget(List<Message> messages, Message widget){
    Map map = ((Map)widget.getContent().get(Comm.DATA));
    if(map == null || map.get(Layout.LAYOUT) == null) return null;
    String id = ((String) map.get(Layout.LAYOUT)).replace(Layout.IPY_MODEL, "");
    return getMessageByCommId(messages, id);
  }

  public static List<Message> getListWidgetsByViewName(List<Message> messages, String viewNameValue){
    return getListByDataAttr(messages, Widget.VIEW_NAME, viewNameValue);
  }

  public static List<Message> getListWidgetsByModelName(List<Message> messages, String modelNameValue){
    return getListByDataAttr(messages, Widget.MODEL_NAME, modelNameValue);
  }

  public static List<Message> getListByDataAttr(List<Message> messages, String key, String value){
    return messages.stream()
        .filter(m -> {
          Map map = ((Map)m.getContent().get(Comm.DATA));
          return map != null && map.containsKey(key) && value.equals(map.get(key));
        })
        .collect(Collectors.toList());
  }

  public static Message getMessageByCommId(List<Message> messages, String id){
    return messages.stream()
        .filter(m -> id.equals((String) m.getContent().get(Comm.COMM_ID)))
        .findFirst()
        .get();
  }

}
