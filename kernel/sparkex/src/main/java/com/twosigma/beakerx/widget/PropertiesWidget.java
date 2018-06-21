/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.widget;

import java.util.List;
import java.util.stream.Collectors;

public class PropertiesWidget {

  private final VBox widget;

  public PropertiesWidget(List<PropertyItem> children) {
    this.widget = new VBox(children.stream().map(x -> (Widget) x).collect(Collectors.toList()));
  }

  public List<PropertyItem> getItems() {
    return this.widget.getChildren().stream()
            .map(x -> (PropertyItem) x)
            .collect(Collectors.toList());
  }

  public VBox getWidget() {
    return widget;
  }

  public void add(PropertyItem propertyItem) {
    this.widget.add(propertyItem);
  }

  public void disable() {
    getItems().forEach(x -> x.disable());
  }

  public void enable() {
    getItems().forEach(x -> x.enable());
  }
}
