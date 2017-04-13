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

import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.box.Box;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class SelectionContainer extends Box {

  public static final String TITLES = "_titles";
  private Map<Integer, String> titles = new HashMap<>();

  public SelectionContainer(List<CommFunctionality> children) {
    super(children);
    sendUpdate(TITLES, this.titles);
  }

  public SelectionContainer(List<CommFunctionality> children, List<String> labels) {
    super(children);
    labels.forEach(this::setTitle);
  }

  protected void setTitle(String title) {
    this.titles.put(this.titles.size(), title);
  }

}