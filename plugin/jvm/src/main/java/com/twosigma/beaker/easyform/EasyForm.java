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

package com.twosigma.beaker.easyform;

import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import com.twosigma.beaker.easyform.formitem.CheckBox;
import com.twosigma.beaker.easyform.formitem.CheckBoxGroup;
import com.twosigma.beaker.easyform.formitem.ComboBox;
import com.twosigma.beaker.easyform.formitem.DatePickerComponent;
import com.twosigma.beaker.easyform.formitem.ListComponent;
import com.twosigma.beaker.easyform.formitem.LoadValuesButton;
import com.twosigma.beaker.easyform.formitem.RadioButtonComponent;
import com.twosigma.beaker.easyform.formitem.SaveValuesButton;
import com.twosigma.beaker.easyform.formitem.TextArea;
import com.twosigma.beaker.easyform.formitem.TextField;
import org.apache.commons.lang3.StringUtils;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class EasyForm extends ObservableMap<String, Object> {

  public static final Integer HORIZONTAL = 1;
  public static final Integer VERTICAL = 2;

  private final String caption;
  private String id;
  private Map<String, EasyFormComponent> componentMap = new LinkedHashMap<>();
  private SaveValuesButton saveValuesButton;
  private LoadValuesButton loadValuesButton;

  public EasyForm(final String caption) {
    this.caption = caption;
  }

  public void setId(final String id) {
    this.id = id;
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

  public void addTextField(final String label) throws Exception {
    addTextField(label, TextField.MIN_WIDTH);
  }

  public void addTextField(final String label) throws Exception {
    addTextField(label, -1);
  }

  public void addTextField(final String label, final Integer width) throws Exception {
    TextField textField = new TextField();
    textField.setLabel(label);
    textField.setWidth(width);
    addComponentOrThrow(label, textField);
  }

  public void addTextArea(final String label) throws Exception {
    TextArea textArea = new TextArea();
    textArea.setLabel(label);
    addComponentOrThrow(label, textArea);
  }

  public void addTextArea(final String label, final String initialValue) throws Exception {
    TextArea textArea = new TextArea();
    textArea.setLabel(label);
    textArea.setValue(initialValue);
    addComponentOrThrow(label, textArea);
  }

  public void addCheckBox(final String label) throws Exception {
    addCheckBox(label, Boolean.FALSE);
  }

  public void addCheckBox(final String label, final Boolean value) throws Exception {
    CheckBox checkBox = new CheckBox();
    checkBox.setLabel(label);
    checkBox.setValue(value);
    addComponentOrThrow(label, checkBox);
  }

  public void addComboBox(final String label,
                          final Collection<String> values) throws Exception {
    addComboBox(label, values, Boolean.FALSE);
  }

  public void addComboBox(final String label,
                          final Collection<String> values,
                          final Boolean editable) throws Exception {
    ComboBox comboBox = new ComboBox();
    comboBox.setLabel(label);
    comboBox.setEditable(editable);
    comboBox.setValues(values);
    addComponentOrThrow(label, comboBox);
  }

  public void addList(final String label,
                      final Collection<String> values) throws Exception {
    addList(label, values, Boolean.TRUE, values.size());
  }

  public void addList(final String label,
                      final Collection<String> values,
                      final Boolean multipleSelection) throws Exception {
    addList(label, values, multipleSelection, values.size());
  }

  public void addList(final String label,
                      final Collection<String> values,
                      final Integer size) throws Exception {
    addList(label, values, Boolean.TRUE, size);
  }

  public void addList(final String label,
                      final Collection<String> values,
                      final Boolean multipleSelection,
                      final Integer size) throws Exception {
    ListComponent list = new ListComponent();
    list.setLabel(label);
    list.setSize(size);
    list.setMultipleSelection(multipleSelection);
    list.setValues(values);
    addComponentOrThrow(label, list);
  }

  public void addRadioButtons(final String label,
                              final Collection<String> values) throws Exception {
    addRadioButtons(label, values, EasyForm.VERTICAL);
  }

  public void addRadioButtons(final String label,
                              final Collection<String> values,
                              final Integer orientation) throws Exception {
    RadioButtonComponent radioButtonComponent = new RadioButtonComponent();
    radioButtonComponent.setLabel(label);
    radioButtonComponent.setHorizontal(
        orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    radioButtonComponent.setValues(values);
    addComponentOrThrow(label, radioButtonComponent);
  }

  public void addCheckBoxes(final String label,
                            final Collection<String> values) throws Exception {
    addCheckBoxes(label, values, EasyForm.VERTICAL);
  }

  public void addCheckBoxes(final String label,
                            final Collection<String> values,
                            final Integer orientation) throws Exception {
    CheckBoxGroup checkBoxGroup = new CheckBoxGroup();
    checkBoxGroup.setLabel(label);
    checkBoxGroup.setHorizontal(orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    checkBoxGroup.setValues(values);
    addComponentOrThrow(label, checkBoxGroup);
  }

  public void addDatePicker(final String label) throws Exception {
    addDatePicker(label, Boolean.FALSE);
  }

  public void addDateTimePicker(final String label) throws Exception {
    addDatePicker(label, Boolean.TRUE);
  }

  public void addDatePicker(final String label, final Boolean showTime) throws Exception {
    DatePickerComponent datePickerComponent = new DatePickerComponent();
    datePickerComponent.setLabel(label);
    datePickerComponent.setShowTime(showTime);
    addComponentOrThrow(label, datePickerComponent);

  }

  public void addButton(final String label, final String actionCellTag) throws Exception {
    ButtonComponent buttonComponent = new ButtonComponent();
    buttonComponent.setLabel(label);
    buttonComponent.setTag(actionCellTag);
    addComponentOrThrow(label, buttonComponent);
  }

  private void addComponentOrThrow(final String label,
                                   final EasyFormComponent component) throws Exception {
    if (getComponentMap().containsKey(label)) {
      throw new Exception(
          String.format("EasyForm already contains component with such label: %s.", label));
    } else {
      getComponentMap().put(label, component);
    }
  }

  public Map<String, EasyFormComponent> getComponentMap() {
    return componentMap;
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

  public Object get(final Object key) {
    return getComponentMap().get(key).getValue();
  }

  public Object put(final String key, final Object value) {
    checkValueForComponent(getComponentMap().get(key), value);
    Object previousValue = get(key);
    getComponentMap().get(key).setValue(value);
    setChanged();
    notifyObservers();
    return previousValue;
  }

  private void checkValueForComponent(final EasyFormComponent component, final Object value) {
    if (component instanceof CheckBox
        && !((value instanceof Boolean)
        || "true".equalsIgnoreCase(String.valueOf(value))
        || "false".equalsIgnoreCase(String.valueOf(value)))) {
      throw new IllegalArgumentException(
          String.format("Only boolean values allowed for CheckBox. Component: %s, value: %s",
              component.getLabel(), value));
    }
  }

  public void setEnabled(final String label, final Boolean enabled) {
    if (StringUtils.isNotEmpty(label) && componentMap.containsKey(label)) {
      componentMap.get(label).setEnabled(enabled);
      setChanged();
      notifyObservers();
    }
  }

}
