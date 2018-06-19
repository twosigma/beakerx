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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static java.util.Collections.EMPTY_LIST;

public class SparkConfiguration extends VBox {

  static final String VIEW_NAME_VALUE = "SparkConfigurationView";
  static final String MODEL_NAME_VALUE = "SparkConfigurationModel";

  private Button add;
  private HBox header;
  private PropertiesWidget properties;

  SparkConfiguration(Map<String, String> advancedSettings, String sparkVersion) {
    super(new ArrayList<>());
    this.add = createAddButton();
    this.header = new HBox(asList(this.add, sparkVersionWidget(sparkVersion)));
    List<PropertyItem> propertyItems = createPropertyItems(advancedSettings);
    this.properties = new PropertiesWidget(propertyItems);
    VBox configuration = new VBox(asList(this.header, this.properties.getWidget()));
    configuration.setDomClasses(new ArrayList<>(asList("bx-spark-configuration")));
    add(configuration);
  }

  private HTML sparkVersionWidget(String version) {
    HTML html = new HTML();
    String ap = String.format("https://spark.apache.org/docs/%s/configuration.html#available-properties", version);
    html.setValue("<a target=\"_blank\" href=\"" + ap + "\">Available properties" + "</a>");
    return html;
  }

  private List<PropertyItem> createPropertyItems(Map<String, String> advancedSettings) {
    return advancedSettings.entrySet().stream()
            .map(x -> createPropertyItem(x.getKey(), x.getValue()))
            .collect(Collectors.toList());
  }

  private Button createAddButton() {
    Button add = new Button();
    add.setTooltip("Add property");
    add.setDomClasses(new ArrayList<>(asList("bx-button", "icon-add")));
    add.registerOnClick((content, message) -> addProperty());
    return add;
  }

  private void addProperty() {
    PropertyItem propertyItem = createPropertyItem(new Text(), new Text());
    this.properties.add(propertyItem);
  }

  private PropertyItem createPropertyItem(String name, String value) {
    Text nameWidget = new Text();
    nameWidget.setValue(name);
    Text valueWidget = new Text();
    valueWidget.setValue(value);
    return createPropertyItem(nameWidget, valueWidget);
  }

  private PropertyItem createPropertyItem(Text nameWidget, Text valueWidget) {
    nameWidget.setPlaceholder("name");
    nameWidget.setDomClasses(new ArrayList<>(asList("bx-config-name")));
    valueWidget.setPlaceholder("value");
    Button remove = new Button();
    remove.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    PropertyItem propertyItem = new PropertyItem(nameWidget, valueWidget, remove);
    remove.registerOnClick((content, message) -> this.properties.getWidget().remove(propertyItem));
    return propertyItem;
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

  public void setConfiguration(Map<String, String> advancedSettings) {
    List<PropertyItem> propertyItems = createPropertyItems(advancedSettings);
    this.properties = new PropertiesWidget(propertyItems);
    this.remove(this.getChildren().get(0));
    add(new VBox(asList(this.header, this.properties.getWidget())));
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
