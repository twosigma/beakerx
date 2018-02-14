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
package com.twosigma.beakerx.easyform;

import static com.twosigma.beakerx.widget.TestWidgetUtils.getState;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyDisplayMsg;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsg;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsgWitoutLayout;
import static com.twosigma.beakerx.widget.Widget.VALUE;
import static com.twosigma.beakerx.widget.string.PasswordTest.verifyPasswordField;
import static com.twosigma.beakerx.widget.string.TextTest.verifyTextField;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.widget.DatePicker;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.bool.Checkbox;
import com.twosigma.beakerx.widget.box.Box;
import com.twosigma.beakerx.widget.box.HBox;
import com.twosigma.beakerx.widget.selection.ComboBox;
import com.twosigma.beakerx.widget.selection.RadioButtons;
import com.twosigma.beakerx.widget.selection.SelectMultiple;
import com.twosigma.beakerx.widget.selection.SelectMultipleSingle;
import com.twosigma.beakerx.widget.string.Password;
import com.twosigma.beakerx.widget.string.Text;
import com.twosigma.beakerx.widget.string.Textarea;

import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

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
    easyForm.display();
    //then
    verifyOnInit(kernel.getPublishedMessages().get(0), newValueForTf1);
  }

  @Test
  public void textFieldOnChangeMethod() throws Exception {
    //given
    final StringBuilder result = new StringBuilder();
    EasyForm easyForm = new EasyForm("EasyForm with text field");
    easyForm.addTextField("tf2").onChange(value -> result.append(value));
    easyForm.display();
    kernel.clearPublishedMessages();
    //when
    easyForm.put("tf2","OK");
    //then
    assertThat(result.toString()).isEqualTo("OK");
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
    easyForm.display();
    //then
    verifyRadioButton(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
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
    easyForm.display();
    //then
    verifyTextArea(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyTextArea(List<Message> messages) {
    verifyOpenCommMsg(messages, Textarea.MODEL_NAME_VALUE, Textarea.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithButton() throws Exception {
    //given
    String label = "ButtonLabel";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with button");
    easyForm.addButton(label);
    easyForm.display();
    //then
    verifyButton(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyButton(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, Button.MODEL_NAME_VALUE, Button.VIEW_NAME_VALUE,
            Widget.MODEL_MODULE_VALUE, Widget.VIEW_MODULE_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithMultipleSelection() throws Exception {
    //given
    String label = "MultipleSelectionLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with MultipleSelection");
    easyForm.addList(label, asList("1", "2", "3"));
    easyForm.display();
    //then
    Object multipleSelectionValue = easyForm.get(label);
    verifyMultipleSelection(kernel.getPublishedMessages(), (List) multipleSelectionValue);
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyMultipleSelection(List<Message> messages, List multipleSelectionValue) {
    verifyInternalOpenCommMsgWitLayout(messages, SelectMultiple.MODEL_NAME_VALUE, SelectMultiple.VIEW_NAME_VALUE);
    assertThat(multipleSelectionValue).isEmpty();
  }

  @Test
  public void shouldCreateEasyFormWithSelectMultipleSingle() throws Exception {
    //given
    String label = "MultipleSelectionLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with SelectMultipleSingle");
    easyForm.addList(label, asList("1", "2", "3"), Boolean.FALSE);
    easyForm.display();
    //then
    Object multipleSelectionSingleValue = easyForm.get(label);
    verifySelectMultipleSingle(kernel.getPublishedMessages(), (List) multipleSelectionSingleValue);
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifySelectMultipleSingle(List<Message> messages, List multipleSelectionSingleValue) {
    verifyInternalOpenCommMsgWitLayout(messages, SelectMultipleSingle.MODEL_NAME_VALUE,
            SelectMultipleSingle.VIEW_NAME_VALUE);
    assertThat(multipleSelectionSingleValue).isEmpty();
  }

  @Test
  public void shouldCreateEasyFormWithCombobox() throws Exception {
    //given
    String label = "ComboboxLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with Combobox");
    easyForm.addComboBox(label, asList("1", "2"));
    easyForm.display();
    //then
    verifyCombobox(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyCombobox(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, ComboBox.MODEL_NAME_VALUE,
            ComboBox.VIEW_NAME_VALUE,
            BeakerxWidget.MODEL_MODULE_VALUE, BeakerxWidget.VIEW_MODULE_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithCheckbox() throws Exception {
    //given
    String label = "CheckboxLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with checkbox");
    easyForm.addCheckBox(label);
    easyForm.display();
    //then
    verifyCheckboxField(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
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
    easyForm.display();
    //then
    verifyCheckboxGroup(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyCheckboxGroup(List<Message> messages) {
    verifyOpenCommMsgWitoutLayout(messages, HBox.MODEL_NAME_VALUE, HBox.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldCreateEasyFormWithTextField() throws Exception {
    //given
    String label = "text1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with text field");
    easyForm.addTextField(label, 10);
    easyForm.display();
    //then
    verifyTextField(
            kernel.getPublishedMessages(),
            Text.MODEL_NAME_VALUE,
            Text.MODEL_MODULE_VALUE,
            Text.VIEW_NAME_VALUE,
            Text.VIEW_MODULE_VALUE
    );
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  @Test
  public void shouldCreateEasyFormWithPasswordField() throws Exception {
    //given
    String label = "pass1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with password field");
    easyForm.addPasswordField(label, 10);
    easyForm.display();
    //then
    verifyPasswordField(
            kernel.getPublishedMessages(),
            Password.MODEL_NAME_VALUE,
            Password.MODEL_MODULE_VALUE,
            Password.VIEW_NAME_VALUE,
            Password.VIEW_MODULE_VALUE
    );
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyEasyForm(List<Message> messages, List<Widget> children) {
    Message msg = SearchMessages.getListWidgetsByViewName(messages, EasyFormView.VIEW_NAME_VALUE)
            .get(0);
    verifyInternalOpenCommMsg(msg, EasyFormView.MODEL_NAME_VALUE, EasyFormView.VIEW_NAME_VALUE);
    verifyChildren(msg, children);
  }

  @Test
  public void shouldCreateEasyFormWithDatePicker() throws Exception {
    //given
    String label = "DatePickerLabel1";
    //when
    EasyForm easyForm = new EasyForm("EasyForm with DatePicker");
    easyForm.addDatePicker(label);
    easyForm.display();
    //then
    verifyDatePicker(kernel.getPublishedMessages());
    verifyEasyForm(kernel.getPublishedMessages(), easyForm.getCommFunctionalities());
    verifyDisplayMsg(kernel.getPublishedMessages());
  }

  private void verifyDatePicker(List<Message> messages) {
    verifyInternalOpenCommMsgWitLayout(messages, DatePicker.MODEL_NAME_VALUE,
            DatePicker.VIEW_NAME_VALUE);
  }

  private void verifyChildren(Message message, List<Widget> children) {
    Map data = getState(message);
    Object[] objects = (Object[]) data.get(Box.CHILDREN);
    assertThat(objects.length).isEqualTo(children.size());
    for (int i = 0; i < children.size(); i++) {
      assertThat(Box.IPY_MODEL + children.get(i).getComm().getCommId()).isEqualTo(objects[i]);
    }
  }

}