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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.EMPTY_LIST;
import static java.util.Collections.singletonList;

public class SparkConfiguration extends VBox {

  public static final String VIEW_NAME_VALUE = "SparkConfigurationView";
  public static final String MODEL_NAME_VALUE = "SparkConfigurationModel";

  private Button add;
  private HBox header;
  private Properties properties;

  public SparkConfiguration() {
    super(new ArrayList<>());
    this.add = createAddButton();
    this.header = new HBox(singletonList(this.add));
    this.properties = new Properties(new ArrayList<>());
    add(new VBox(Arrays.asList(this.header, this.properties.getWidget())));
  }

  private Button createAddButton() {
    Button add = new Button();
    add.setDescription("+");
    add.registerOnClick((content, message) -> addProperty());
    return add;
  }

  private void addProperty() {
    Text name = new Text();
    name.setPlaceholder("name");
    Text value = new Text();
    value.setPlaceholder("value");
    Button remove = new Button();
    remove.setDescription("-");
    PropertyItem propertyItem = new PropertyItem(name, value, remove);
    remove.registerOnClick((content, message) -> this.properties.getWidget().removeDOMWidget(propertyItem));
    this.properties.add(propertyItem);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  public List<Configuration> getConfiguration() {
    if (this.properties == null) {
      return EMPTY_LIST;
    }
    List<PropertyItem> children = this.properties.getItems();
    return children.stream()
            .map(x -> new Configuration(x.getNameAsString(), x.getValueAsString()))
            .collect(Collectors.toList());
  }

  public static class Configuration {

    private String name;
    private String value;

    public Configuration(String name, String value) {
      this.name = name;
      this.value = value;
    }

    public String getName() {
      return name;
    }

    public String getValue() {
      return value;
    }
  }
}
