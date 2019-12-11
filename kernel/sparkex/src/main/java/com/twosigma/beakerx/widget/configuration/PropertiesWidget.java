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
package com.twosigma.beakerx.widget.configuration;

import com.twosigma.beakerx.widget.VBox;
import com.twosigma.beakerx.widget.Widget;

import java.util.List;
import java.util.stream.Collectors;

class PropertiesWidget {

  private final VBox widget;

  PropertiesWidget(List<PropertyItem> children) {
    this.widget = new VBox(children.stream().map(x -> (Widget) x).collect(Collectors.toList()));
  }

  List<PropertyItem> getItems() {
    return this.widget.getChildren().stream()
            .map(x -> (PropertyItem) x)
            .collect(Collectors.toList());
  }

  VBox getWidget() {
    return widget;
  }

  void add(PropertyItem propertyItem) {
    this.widget.add(propertyItem);
  }

  void disable() {
    getItems().forEach(PropertyItem::disable);
  }

  void enable() {
    getItems().forEach(PropertyItem::enable);
  }

  void remove(PropertyItem propertyItem) {
    getWidget().remove(propertyItem);
  }

  void remove(List<PropertyItem> propertyItems) {
    propertyItems.forEach(item -> getWidget().remove(item));
  }

  List<PropertyItem> findByName(final String name, final String value) {
    return getItems().stream().
            filter(item -> name.equals(item.getNameAsString())).
            filter(item -> value.equals(item.getValueAsString())).
            collect(Collectors.toList());
  }
}
