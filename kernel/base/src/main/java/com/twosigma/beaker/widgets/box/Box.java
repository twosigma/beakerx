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
package com.twosigma.beaker.widgets.box;

import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.DOMWidget;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Box extends DOMWidget {

  public static final String CHILDREN = "children";
  public static final String IPY_MODEL = "IPY_MODEL_";
  List<CommFunctionality> children;

  public Box(List<CommFunctionality> children) {
    this.children = children;
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    List<String> commIds = children.stream().map(x -> IPY_MODEL +x.getComm().getCommId()).collect(Collectors.toList());
    content.put(CHILDREN, commIds.toArray());
    return content;
  }


}
