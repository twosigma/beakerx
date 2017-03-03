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
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
public class EasyForm extends ObservableMap<String, Object> {

  public static final Integer HORIZONTAL = 1;
  public static final Integer VERTICAL = 2;
  private static final Integer AUTO_WIDTH = -1;

  private final String caption;
  private String id;
  private Boolean ready = Boolean.FALSE;
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

  public EasyFormComponent addTextField(final String label) throws Exception {
    return addTextField(label, -1);
  }

  public EasyFormComponent addTextField(final String label, final Integer width) throws Exception {
    TextField textField = new TextField();
    textField.setLabel(label);
    textField.setWidth(width);
    return addComponentOrThrow(label, textField);
  }

  public EasyFormComponent addTextArea(final String label) throws Exception {
    return addTextArea(label, null, TextArea.AUTO_WIDTH, TextArea.AUTO_HEIGHT);
  }

  public EasyFormComponent addTextArea(final String label, final Integer width, final Integer height)
      throws Exception {
    return addTextArea(label, null, width, height);
  }

  public EasyFormComponent addTextArea(final String label, final String initialValue) throws Exception {
    return addTextArea(label, initialValue, TextArea.AUTO_WIDTH, TextArea.AUTO_HEIGHT);
  }

  public EasyFormComponent addTextArea(final String label,
                          final String initialValue,
                          final Integer width,
                          final Integer height) throws Exception {
    TextArea textArea = new TextArea();
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
    CheckBox checkBox = new CheckBox();
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
    ComboBox comboBox = new ComboBox();
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
    ListComponent list = new ListComponent();
    list.setLabel(label);
    list.setSize(size);
    list.setMultipleSelection(multipleSelection);
    list.setValues(values);
    if (values != null && values.size() > 0) {
      list.setValue(values.iterator().next());
    }
    return addComponentOrThrow(label, list);
  }

  public EasyFormComponent addRadioButtons(final String label,
                              final Collection<String> values) throws Exception {
    return addRadioButtons(label, values, EasyForm.VERTICAL);
  }

  public EasyFormComponent addRadioButtons(final String label,
                              final Collection<String> values,
                              final Integer orientation) throws Exception {
    RadioButtonComponent radioButtonComponent = new RadioButtonComponent();
    radioButtonComponent.setLabel(label);
    radioButtonComponent.setHorizontal(
        orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    radioButtonComponent.setValues(values);
    return addComponentOrThrow(label, radioButtonComponent);
  }

  public EasyFormComponent addCheckBoxes(final String label,
                            final Collection<String> values) throws Exception {
    return addCheckBoxes(label, values, EasyForm.VERTICAL);
  }

  public EasyFormComponent addCheckBoxes(final String label,
                            final Collection<String> values,
                            final Integer orientation) throws Exception {
    CheckBoxGroup checkBoxGroup = new CheckBoxGroup();
    checkBoxGroup.setLabel(label);
    checkBoxGroup.setHorizontal(orientation != null && EasyForm.HORIZONTAL.equals(orientation));
    checkBoxGroup.setValues(values);
    return addComponentOrThrow(label, checkBoxGroup);
  }

  public EasyFormComponent addDatePicker(final String label) throws Exception {
    return addDatePicker(label, Boolean.FALSE);
  }

  public EasyFormComponent addDateTimePicker(final String label) throws Exception {
    return addDatePicker(label, Boolean.TRUE);
  }

  public EasyFormComponent addDatePicker(final String label, final Boolean showTime) throws Exception {
    DatePickerComponent datePickerComponent = new DatePickerComponent();
    datePickerComponent.setLabel(label);
    datePickerComponent.setShowTime(showTime);
    return addComponentOrThrow(label, datePickerComponent);
  }

  public ButtonComponent addButton(final String label) throws Exception {
    return addButton(label, null);
  }

  public ButtonComponent addButton(final String label, final String actionCellTag) throws Exception {
    ButtonComponent buttonComponent = new ButtonComponent();
    buttonComponent.setLabel(label);
    buttonComponent.setTag(actionCellTag);
    addComponentOrThrow(label, buttonComponent);
    return buttonComponent;
  }

  private EasyFormComponent addComponentOrThrow(final String label,
                                                final EasyFormComponent component) throws Exception {
    if (getComponentMap().containsKey(label)) {
      throw new Exception(
          String.format("EasyForm already contains component with such label: %s.", label));
    } else {
      getComponentMap().put(label, component);
    }
    return component;
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
    final EasyFormComponent component = getComponentMap().get(key);
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
    for (EasyFormComponent component : getComponentMap().values()) {
      if (!component.isButton()) {
        getValuesMap().put(component.getLabel(), component.getValue());
      }
      component.fireInit();
    }
  }

  public void setNotReady() {
    this.ready = Boolean.FALSE;
  }

}
