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
package com.twosigma.beaker.easyform;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.Button;
import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.DatePicker;
import com.twosigma.beaker.widgets.bools.Checkbox;
import com.twosigma.beaker.widgets.box.Box;
import com.twosigma.beaker.widgets.selections.Dropdown;
import com.twosigma.beaker.widgets.selections.RadioButtons;
import com.twosigma.beaker.widgets.selections.SelectMultiple;
import com.twosigma.beaker.widgets.strings.Text;
import com.twosigma.beaker.widgets.strings.Textarea;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.widgets.TestWidgetUtils.getData;
import static com.twosigma.beaker.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyDisplayMsg;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyInternalOpenCommMsg;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsg;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsgWitoutLayout;
import static com.twosigma.beaker.widgets.Widget.VALUE;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class EasyFormTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void onInitMethod() throws Exception {
    //given
    String textField1 = "tf1";
    String newValueForTf1 = "newValueForTf1";

    EasyForm easyForm = new EasyForm("EasyForm with text field");
    easyForm.addTextField(textField1);
    easyForm.addTextField("tf2").onInit(value -> easyForm.put(textField1, newValueForTf1));
    kernel.clearPublishedMessages();
    //when
    DisplayEasyForm.display(easyForm);
    //then
    verifyOnInit(kernel.getPublishedMessages().get(0), newValueForTf1);
  }

  private void verifyOnInit(Message message, String expected) {
    String label = getValueForProperty(message, VALUE, String.class);
    assertThat(label).isEqualTo(expected);
  }

  @Test
  public void shouldCreateEasyFormWithRadioButton() throws Exception {
    //given
    String label = "RadioButto1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with RadioButto");
    easyForm.addRadioButtons(label, asList("1", "2"));
    DisplayEasyForm.display(easyForm);
    //then
    verifyRadioButton(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyRadioButton(List<Message> messages) {
    verifyOpenCommMsg(messages, RadioButtons.MODEL_NAME_VALUE, RadioButtons.VIEW_NAME_VALUE);
  }


  @Test
  public void shouldCreateEasyFormWithTextArea() throws Exception {
    //given
    String label = "ButtonLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with TextArea");
    easyForm.addTextArea(label);
    DisplayEasyForm.display(easyForm);
    //then
    verifyTextArea(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyTextArea(List<Message> messages) {
    verifyOpenCommMsg(messages, Textarea.MODEL_NAME_VALUE, Textarea.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithButton() throws Exception {
    //given
    String label = "ButtonLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with button");
    easyForm.addButton(label);
    DisplayEasyForm.display(easyForm);
    //then
    verifyButton(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyButton(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, Button.MODEL_NAME_VALUE, Button.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithMultipleSelection() throws Exception {
    //given
    String label = "MultipleSelectionLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with MultipleSelection");
    easyForm.addList(label, asList("1", "2", "3"));
    DisplayEasyForm.display(easyForm);
    //then
    verifyMultipleSelection(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyMultipleSelection(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, SelectMultiple.MODEL_NAME_VALUE, SelectMultiple.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithCombobox() throws Exception {
    //given
    String label = "ComboboxLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with Combobox");
    easyForm.addComboBox(label, asList("1", "2"));
    DisplayEasyForm.display(easyForm);
    //then
    verifyCombobox(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyCombobox(List<Message> messages) {
    verifyOpenCommMsg(messages, Dropdown.MODEL_NAME_VALUE, Dropdown.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithCheckbox() throws Exception {
    //given
    String label = "CheckboxLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with checkbox");
    easyForm.addCheckBox(label);
    DisplayEasyForm.display(easyForm);
    //then
    verifyCheckboxField(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyCheckboxField(List<Message> messages) {
    verifyOpenCommMsg(messages, Checkbox.MODEL_NAME_VALUE, Checkbox.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithCheckboxGroup() throws Exception {
    //given
    String label = "label1";
    List<String> checkboxesLabels = asList("1", "2", "3");
    //when
    EasyForm easyForm = new EasyForm("EasyForm with CheckboxGroup");
    easyForm.addCheckBoxes(label, checkboxesLabels);
    DisplayEasyForm.display(easyForm);
    //then
    verifyCheckboxGroup(getCheckboxGroupMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyCheckboxGroup(Message msg) {
    verifyOpenCommMsgWitoutLayout(msg, Box.MODEL_NAME_VALUE, Box.VIEW_NAME_VALUE);
  }

  private Message getCheckboxGroupMsgs() {
    return kernel.getPublishedMessages().get(kernel.getPublishedMessages().size() - 4);
  }

  @Test
  public void shouldCreateEasyFormWithTextField() throws Exception {
    //given
    String label = "text1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with text field");
    easyForm.addTextField(label, 10);
    DisplayEasyForm.display(easyForm);
    //then
    verifyTextField(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyEasyForm(List<Message> messages, List<CommFunctionality> children) {
    verifyInternalOpenCommMsg(messages.get(1), EasyFormView.MODEL_NAME_VALUE, EasyFormView.VIEW_NAME_VALUE);
    verifyChildren(messages.get(1), children);
  }

  @Test
  public void shouldCreateEasyFormWithDatePicker() throws Exception {
    //given
    String label = "DatePickerLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with DatePicker");
    easyForm.addDatePicker(label);
    DisplayEasyForm.display(easyForm);
    //then
    verifyDatePicker(getWidgetMsgs());
    verifyEasyForm(getEasyFormMsgs(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(getDisplayMsg());
  }

  private void verifyDatePicker(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, DatePicker.MODEL_NAME_VALUE, DatePicker.VIEW_NAME_VALUE);
  }

  private void verifyTextField(List<Message> messages) {
    verifyOpenCommMsg(messages, Text.MODEL_NAME_VALUE, Text.VIEW_NAME_VALUE);
  }

  private void verifyChildren(Message message, List<CommFunctionality> children) {
    Map data = getData(message);
    Object[] objects = (Object[]) data.get(Box.CHILDREN);
    assertThat(objects.length).isEqualTo(children.size());
    for (int i = 0; i < children.size(); i++) {
      assertThat(Box.IPY_MODEL + children.get(i).getComm().getCommId()).isEqualTo(objects[i]);
    }
  }

  private List<Message> getWidgetMsgs() {
    return kernel.getPublishedMessages().subList(0, 2);
  }

  private Message getDisplayMsg() {
    return kernel.getPublishedMessages().get(kernel.getPublishedMessages().size() - 1);
  }

  private List<Message> getEasyFormMsgs() {
    return kernel.getPublishedMessages().subList(kernel.getPublishedMessages().size() - 3, kernel.getPublishedMessages().size() - 1);
  }


}