/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.easyform;

import com.twosigma.beakerx.easyform.formitem.ListComponent;
import com.twosigma.beakerx.easyform.formitem.LoadValuesButton;
import com.twosigma.beakerx.easyform.formitem.SaveValuesButton;
import com.twosigma.beakerx.easyform.formitem.widgets.ButtonComponentWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.CheckBoxGroupWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.CheckBoxWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.ComboBoxWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.DatePickerComponentWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.SelectMultipleSingleWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.SelectMultipleWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.RadioButtonComponentWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.TextAreaWidget;
import com.twosigma.beakerx.easyform.formitem.widgets.TextFieldWidget;
import com.twosigma.beakerx.widgets.DOMWidget;
import com.twosigma.beakerx.widgets.DisplayableWidget;
import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.Widget;
import org.apache.commons.lang3.StringUtils;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("unchecked")
public class EasyForm extends ObservableMap<String, Object> implements DisplayableWidget {

  public static final Integer HORIZONTAL = 1;
  public static final Integer VERTICAL = 2;
  private static final Integer AUTO_WIDTH = -1;

  private final String caption;
  private Boolean ready = Boolean.FALSE;
  private Map<String, EasyFormComponent<ValueWidget<?>>> componentMap = new LinkedHashMap<>();
  private SaveValuesButton saveValuesButton;
  private LoadValuesButton loadValuesButton;

  public EasyForm(final String caption) {
    this.caption = caption;
  }

  public void addSaveValuesButton(final String path) {
    SaveValuesButton button = new SaveValuesButton();
    button.setPath(path);
    this.saveValuesButton = button;
  }

  public void addLoadValuesButton(final String path) {
    LoadValuesButton button = new LoadValuesButton();
    button.setPath(path);
    this.loadValuesButton = button;
  }

  public EasyFormComponent addTextField(final String label) throws Exception {
    return addTextField(label, -1);
  }

  public EasyFormComponent addTextField(final String label, final Integer width) throws Exception {
    TextFieldWidget textField = new TextFieldWidget();
    textField.registerUpdateValueCallback(textField::fireChanged);
    textField.setLabel(label);
    textField.setWidth(width);
    return addComponentOrThrow(label, textField);
  }

  public EasyFormComponent addTextArea(final String label) throws Exception {
    return addTextArea(label, null, TextAreaWidget.AUTO_WIDTH, TextAreaWidget.AUTO_HEIGHT);
  }

  public EasyFormComponent addTextArea(final String label, final Integer width, final Integer height)
          throws Exception {
    return addTextArea(label, null, width, height);
  }

  public EasyFormComponent addTextArea(final String label, final String initialValue) throws Exception {
    return addTextArea(label, initialValue, TextAreaWidget.AUTO_WIDTH, TextAreaWidget.AUTO_HEIGHT);
  }

  public EasyFormComponent addTextArea(final String label,
                                       final String initialValue,
                                       final Integer width,
                                       final Integer height) throws Exception {
    TextAreaWidget textArea = new TextAreaWidget();
    textArea.registerUpdateValueCallback(textArea::fireChanged);
    textArea.setLabel(label);
    textArea.setWidth(width);
    textArea.setHeight(height);
    textArea.setValue(initialValue);
    return addComponentOrThrow(label, textArea);
  }

  public EasyFormComponent addCheckBox(final String label) throws Exception {
    return addCheckBox(label, Boolean.FALSE);
  }

  public EasyFormComponent addCheckBox(final String label, final Boolean value) throws Exception {
    CheckBoxWidget checkBox = new CheckBoxWidget();
    checkBox.registerUpdateValueCallback(checkBox::fireChanged);
    checkBox.setLabel(label);
    checkBox.setValue(String.valueOf(value));
    return addComponentOrThrow(label, checkBox);
  }

  public EasyFormComponent addComboBox(final String label,
                                       final Collection<String> values) throws Exception {
    return addComboBox(label, values, Boolean.FALSE);
  }

  public EasyFormComponent addComboBox(final String label,
                                       final Collection<String> values,
                                       final Boolean editable) throws Exception {
    return addComboBox(label, values, editable, EasyForm.AUTO_WIDTH);
  }

  public EasyFormComponent addComboBox(final String label,
                                       final Collection<String> values,
                                       final Boolean editable,
                                       final Integer width) throws Exception {
    ComboBoxWidget comboBox = new ComboBoxWidget();
    comboBox.registerUpdateValueCallback(comboBox::fireChanged);
    comboBox.setLabel(label);
    comboBox.setEditable(editable);
    comboBox.setValues(values);
    comboBox.setWidth(width);
    if (values != null && values.size() > 0) {
      comboBox.setValue(values.iterator().next());
    }
    return addComponentOrThrow(label, comboBox);
  }

  public EasyFormComponent addList(final String label,
                                   final Collection<String> values) throws Exception {
    return addList(label, values, Boolean.TRUE, values.size());
  }

  public EasyFormComponent addList(final String label,
                                   final Collection<String> values,
                                   final Boolean multipleSelection) throws Exception {
    return addList(label, values, multipleSelection, values.size());
  }

  public EasyFormComponent addList(final String label,
                                   final Collection<String> values,
                                   final Integer size) throws Exception {
    return addList(label, values, Boolean.TRUE, size);
  }

  public EasyFormComponent addList(final String label,
                                   final Collection<String> values,
                                   final Boolean multipleSelection,
                                   final Integer size) throws Exception {

    ListComponent list = (multipleSelection) ? createSelectMultipleWidget() : createSelectMultipleSingleWidget();
    list.setLabel(label);
    list.setSize(size);
    list.setMultipleSelection(multipleSelection);
    list.setValues(values);
    if (values != null && values.size() > 0) {
      list.setValue(values.iterator().next());
    }
    return addComponentOrThrow(label, list);
  }

  private ListComponent createSelectMultipleSingleWidget() {
    SelectMultipleSingleWidget list = new SelectMultipleSingleWidget();
    list.registerUpdateValueCallback(list::fireChanged);
    return list;
  }

  private ListComponent createSelectMultipleWidget() {
    SelectMultipleWidget list = new SelectMultipleWidget();
    list.registerUpdateValueCallback(list::fireChanged);
    return list;
  }

  public EasyFormComponent addRadioButtons(final String label,
                                           final Collection<String> values) throws Exception {
    return addRadioButtons(label, values, EasyForm.VERTICAL);
  }

  public EasyFormComponent addRadioButtons(final String label,
                                           final Collection<String> values,
                                           final Integer orientation) throws Exception {
    RadioButtonComponentWidget radioButtonComponent = new RadioButtonComponentWidget();
    radioButtonComponent.setLabel(label);
    radioButtonComponent.setHorizontal(
            orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    radioButtonComponent.setValues(values);
    radioButtonComponent.registerUpdateValueCallback(radioButtonComponent::fireChanged);
    return addComponentOrThrow(label, radioButtonComponent);
  }

  public EasyFormComponent addCheckBoxes(final String label,
                                         final Collection<String> values) throws Exception {
    return addCheckBoxes(label, values, EasyForm.VERTICAL);
  }

  public EasyFormComponent addCheckBoxes(final String label,
                                         final Collection<String> values,
                                         final Integer orientation) throws Exception {
    CheckBoxGroupWidget checkBoxGroup = new CheckBoxGroupWidget();
    checkBoxGroup.setLabel(label);
    checkBoxGroup.setHorizontal(orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    checkBoxGroup.setValues(values);
    checkBoxGroup.createWidget();
    checkBoxGroup.registerUpdateValueCallback(checkBoxGroup::fireChanged);
    return addComponentOrThrow(label, checkBoxGroup);
  }

  public EasyFormComponent addDatePicker(final String label) throws Exception {
    return addDatePicker(label, Boolean.FALSE);
  }

  public EasyFormComponent addDateTimePicker(final String label) throws Exception {
    return addDatePicker(label, Boolean.TRUE);
  }

  public EasyFormComponent addDatePicker(final String label, final Boolean showTime) throws Exception {
    DatePickerComponentWidget datePickerComponent = new DatePickerComponentWidget();
    datePickerComponent.registerUpdateValueCallback(datePickerComponent::fireChanged);
    datePickerComponent.setLabel(label);
    datePickerComponent.setShowTime(showTime);
    return addComponentOrThrow(label, datePickerComponent);
  }

  public ButtonComponentWidget addButton(final String label) throws Exception {
    return addButton(label, null);
  }

  public ButtonComponentWidget addButton(final String label, final String actionCellTag) throws Exception {
    ButtonComponentWidget buttonComponent = new ButtonComponentWidget();
    buttonComponent.registerUpdateValueCallback(buttonComponent::fireChanged);
    buttonComponent.setLabel(label);
    buttonComponent.setTag(actionCellTag);
    addComponentOrThrow(label, buttonComponent);
    return buttonComponent;
  }
  
  public EasyFormComponent<ValueWidget<?>> addWidget(final String label, final ValueWidget<?> widget) throws Exception {
    EasyFormComponent<ValueWidget<?>> ret = new EasyFormComponent<>(widget);
    addComponentOrThrow(label, ret);
    return ret;
  }

  private EasyFormComponent<ValueWidget<?>> addComponentOrThrow(final String label,
                                                final EasyFormComponent component) throws Exception {
    if (getComponentMap().containsKey(label)) {
      throw new Exception(
              String.format("EasyForm already contains component with such label: %s.", label));
    } else {
      getComponentMap().put(label, component);
    }
    return component;
  }

  public Map<String, EasyFormComponent<ValueWidget<?>>> getComponentMap() {
    return componentMap;
  }

  public DOMWidget getWidget(String key) {
    return getComponentMap().get(key).getWidget();
  }

  public List<Widget> getCommFunctionalities() {
    return componentMap.values().stream().map(EasyFormComponent::getWidget).collect(Collectors.toList());
  }

  public boolean hasComponents() {
    return getComponentMap().size() > 0;
  }


  public boolean hasSaveValuesButton() {
    return this.saveValuesButton != null;
  }

  public boolean hasLoadValuesButton() {
    return this.loadValuesButton != null;
  }

  public SaveValuesButton getSaveValuesButton() {
    return saveValuesButton;
  }

  public LoadValuesButton getLoadValuesButton() {
    return loadValuesButton;
  }

  public String getCaption() {
    return caption;
  }

  private HashMap<String, Object> getValuesMap() {
    return this.mapInstance;
  }

  @Override
  public String get(final Object key) {
    checkComponentExists((String) key);
    return getComponentMap().get(key).getValue();
  }

  @Override
  public String put(final String key, final Object value) {
    checkComponentExists(key);
    final EasyFormComponent<ValueWidget<?>> component = getComponentMap().get(key);
    if (!component.checkValue(value)) {
      throw new IllegalArgumentException(
              String.format("\"%s\" is not a valid option for %s \"%s\".",
                      value, component.getClass().getSimpleName(), key));
    }
    final String currentValue = component.formatValue(value);
    final String previousValue = component.getValue();
    component.setValue(currentValue);
    getValuesMap().put(key, currentValue);
    setChanged();
    notifyObservers();
    component.fireChanged();
    return previousValue;
  }

  private void checkComponentExists(final String key) {
    if (!componentExists(key)) {
      throw new IllegalArgumentException(
              String.format("The requested component \"%s\" does not exist.", key));
    }
  }

  private boolean componentExists(final String key) {
    return getComponentMap().containsKey(key);
  }

  public void setEnabled(final String label, final Boolean enabled) {
    if (StringUtils.isNotEmpty(label) && componentMap.containsKey(label)) {
      componentMap.get(label).setEnabled(enabled);
      setChanged();
      notifyObservers();
    }
  }

  public Boolean isReady() {
    return ready;
  }

  public void setReady() {
    this.ready = Boolean.TRUE;
    for (EasyFormComponent<ValueWidget<?>> component : getComponentMap().values()) {
      if (!component.isButton()) {
        getValuesMap().put(component.getLabel(), component.getValue());
      }
      component.fireInit();
    }
  }

  public void setNotReady() {
    this.ready = Boolean.FALSE;
  }

  @Override
  public void display() {
    this.setReady();
    EasyFormView easyFormView = new EasyFormView(this.getCommFunctionalities());
    easyFormView.setEasyFormName(this.getCaption());
    easyFormView.display();
  }

}
