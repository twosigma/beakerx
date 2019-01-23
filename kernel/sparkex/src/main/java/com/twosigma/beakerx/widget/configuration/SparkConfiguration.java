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

import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.widget.HBox;
import com.twosigma.beakerx.widget.HTML;
import com.twosigma.beakerx.widget.HiveSupport;
import com.twosigma.beakerx.widget.Text;
import com.twosigma.beakerx.widget.VBox;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.util.Preconditions.checkNotEmpty;
import static java.util.Arrays.asList;
import static java.util.Collections.EMPTY_LIST;

public class SparkConfiguration extends VBox {

  static final String VIEW_NAME_VALUE = "SparkConfigurationView";
  static final String MODEL_NAME_VALUE = "SparkConfigurationModel";

  private Button add;
  private HBox header;
  private PropertiesWidget properties;
  private HiveSupport hiveSupport;
  private PropertyItemFactory propertyItemFactory;

  public SparkConfiguration(Map<String, String> advancedSettings, String sparkVersion, HiveSupport hiveSupport) {
    this(advancedSettings, sparkVersion, hiveSupport, new Button(), new PropertyItemFactoryImpl());
  }

  SparkConfiguration(Map<String, String> advancedSettings, String sparkVersion, HiveSupport hiveSupport, Button addButton, PropertyItemFactory propertyItemFactory) {
    super(new ArrayList<>());
    this.hiveSupport = configureHiveSupport(hiveSupport);
    this.add = addButton;
    this.propertyItemFactory = propertyItemFactory;
    this.add = createAddButton();
    this.header = new HBox(asList(sparkVersionWidget(sparkVersion), this.add));
    this.addConfiguration(advancedSettings);
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
    this.remove(this.getChildren().get(0));
    this.addConfiguration(advancedSettings);
  }

  public void setDisabledToAll() {
    this.add.setDisabled(true);
    this.properties.disable();
  }

  public void setEnabledToAll() {
    this.add.setDisabled(false);
    this.properties.enable();
  }

  private HiveSupport configureHiveSupport(HiveSupport hiveSupport) {
    hiveSupport.registerActionOnUpdate(this::handleActionOnUpdate);
    return hiveSupport;
  }

  private void handleActionOnUpdate(Boolean value) {
    List<PropertyItem> propertyItem = findHiveSupportPropertyItems();
    if (value) {
      if (propertyItem.isEmpty()) {
        addProperty(new Text(HiveSupport.CATALOG_IMPLEMENTATION), new Text(HiveSupport.HIVE));
      }
    } else {
      this.properties.remove(propertyItem);
    }
  }

  private List<PropertyItem> findHiveSupportPropertyItems() {
    return this.properties.findByName(HiveSupport.CATALOG_IMPLEMENTATION, HiveSupport.HIVE);
  }

  private HTML sparkVersionWidget(String version) {
    HTML html = new HTML();
    String ap = String.format("https://spark.apache.org/docs/%s/configuration.html#available-properties", version);
    html.setValue("<a target=\"_blank\" href=\"" + ap + "\">Available properties" + "</a>");
    html.setDomClasses(new ArrayList<>(asList("bx-properties-add-label")));
    return html;
  }

  private List<PropertyItem> createPropertyItems(Map<String, String> advancedSettings) {
    return advancedSettings.entrySet().stream()
            .map(x -> createPropertyItem(new Text(x.getKey()), new Text(x.getValue()), new Button()))
            .collect(Collectors.toList());
  }

  private Button createAddButton() {
    add.setTooltip("Add property");
    add.setDomClasses(new ArrayList<>(asList("bx-button", "icon-add", "bx-properties-add-button")));
    add.registerOnClick((content, message) -> addProperty());
    return add;
  }

  private void addProperty() {
    addProperty(new Text(), new Text());
  }

  private void addProperty(Text nameWidget, Text valueWidget) {
    PropertyItem propertyItem = createPropertyItem(nameWidget, valueWidget, new Button());
    this.properties.add(propertyItem);
  }

  private PropertyItem createPropertyItem(Text nameWidget, Text valueWidget, Button remove) {
    PropertyItem propertyItem = propertyItemFactory.createPropertyItem(nameWidget, valueWidget, remove);
    remove.registerOnClick((content, message) -> {
      this.properties.remove(propertyItem);
      removeHiveSupport();
    });
    nameWidget.registerActionOnUpdate(this::handleActionOnUpdate);
    valueWidget.registerActionOnUpdate(this::handleActionOnUpdate);
    return propertyItem;
  }

  private void handleActionOnUpdate(String value) {
    List<PropertyItem> propertyItem = findHiveSupportPropertyItems();
    this.hiveSupport.setValue(!propertyItem.isEmpty());
  }

  private void removeHiveSupport() {
    List<PropertyItem> propertyItem = findHiveSupportPropertyItems();
    if (propertyItem.isEmpty()) {
      this.hiveSupport.setValue(false);
    }
  }

  private void addConfiguration(Map<String, String> advancedSettings) {
    refreshStateOfHiveSupport(this.hiveSupport, advancedSettings);
    List<PropertyItem> propertyItems = createPropertyItems(advancedSettings);
    this.properties = new PropertiesWidget(propertyItems);
    VBox configuration = new VBox(asList(this.properties.getWidget(), this.header));
    configuration.setDomClasses(new ArrayList<>(asList("bx-spark-configuration")));
    add(configuration);
  }

  private void refreshStateOfHiveSupport(HiveSupport hiveSupport, Map<String, String> advancedSettings) {
    String catalogImplementation = advancedSettings.get(HiveSupport.CATALOG_IMPLEMENTATION);
    hiveSupport.setValue(HiveSupport.HIVE.equals(catalogImplementation));
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

  public static class Configuration {

    public static final String PROPERTY_NAME_CAN_NOT_BE_EMPTY = "Property 'name' can not be empty";
    public static final String PROPERTY_VALUE_CAN_NOT_BE_EMPTY = "Property 'value' can not be empty";

    private String name;
    private String value;

    public Configuration(String name, String value) {
      this.name = checkNotEmpty(name, PROPERTY_NAME_CAN_NOT_BE_EMPTY);
      this.value = checkNotEmpty(value, PROPERTY_VALUE_CAN_NOT_BE_EMPTY);
    }

    public String getName() {
      return name;
    }

    public String getValue() {
      return value;
    }
  }
}
