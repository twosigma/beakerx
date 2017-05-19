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
package com.twosigma.beaker.widgets.selectioncontainer;

import com.twosigma.beaker.widgets.Widget;
import com.twosigma.beaker.widgets.box.Box;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class SelectionContainer extends Box {

  public static final String TITLES = "_titles";
  protected Map<Integer, String> titles = new HashMap<>();

  protected SelectionContainer(List<Widget> children) {
    super(children);
  }

  public SelectionContainer(List<Widget> children, List<String> labels) {
    super(children);
    labels.forEach( (l) -> setTitle(this.titles.size(), l));
  }

  
  protected void setTitle(Object index, Object title){
    titles.put(getInteger(index), getString(title));
  }

  public void set_title(Object index, Object title){
    setTitle(index, title);
    sendUpdate(TITLES, this.titles);
  }
  
  public String get_title(Object index){
    String ret = null;
    Integer i = getInteger(index);
    if(i != null && i > 0){
      ret = titles.get(i);
    }
    return ret;
  }
  
}