/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.jvm.object;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class OutputContainer {
  public final static Logger LOGGER = LoggerFactory.getLogger(OutputContainer.class.getName());

  private final List<Object> items;
  private final List<String>                 labels        = new ArrayList<>();
  private       OutputContainerLayoutManager layoutManager = new SimpleLayoutManager();

  public OutputContainer() {
    this(new ArrayList<>());
  }

  public OutputContainer(List<Object> items) {
    this(items, null);
  }

  public OutputContainer(List<Object> items, List<String> labels) {
    if (items == null || (labels != null && labels.size() != items.size()))
      throw new RuntimeException();
    this.items = items;
    this.labels.clear();
    if (labels != null) {
      this.labels.addAll(labels);
    } else {
      for (int i = 0; i < items.size(); i++) {
        this.labels.add("");
      }
    }
  }


  public void addItem(java.lang.Object item) {
    addItem(item, items.size(), null);
  }

  public void addItem(java.lang.Object item, int index) {
    addItem(item, index, null);
  }

  public void addItem(java.lang.Object item, int index, java.lang.String label) {
    items.add(index, item);
    labels.add(index, label);
  }

  public void addItem(Object item, String label) {
    addItem(item, items.size(), label);
  }

  public void removeItem(int index) {
    items.remove(index);
    labels.remove(index);
  }

  public OutputContainer leftShift(Object item) {
    addItem(item);
    return this;
  }

  public void removeItem(Object itemToRemove) {
    removeItem(items.indexOf(itemToRemove));
  }

  public List<Object> getItems() {
    return items;
  }

  public List<String> getLabels() {
    return labels;
  }

  public void visit(CellVisitor visitor) {
    for (Object item : items) {
      visitor.visit(item);
    }
  }

  public OutputContainerLayoutManager getLayoutManager() {
    return layoutManager;
  }

  public void setLayoutManager(OutputContainerLayoutManager layoutManager) {
    if (layoutManager != null)
      this.layoutManager = layoutManager;
  }


  public static interface CellVisitor {
    void visit(Object item);
  }
}
