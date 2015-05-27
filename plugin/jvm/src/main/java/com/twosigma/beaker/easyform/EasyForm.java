package com.twosigma.beaker.easyform;

import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import com.twosigma.beaker.easyform.formitem.CheckBox;
import com.twosigma.beaker.easyform.formitem.ComboBox;
import com.twosigma.beaker.easyform.formitem.DatePickerComponent;
import com.twosigma.beaker.easyform.formitem.ListComponent;
import com.twosigma.beaker.easyform.formitem.RadioButtonComponent;
import com.twosigma.beaker.easyform.formitem.TextArea;
import com.twosigma.beaker.easyform.formitem.TextField;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

public class EasyForm {

    private List<EasyFormComponent> components = new LinkedList<>();

    public void addTextField(final String label) {
        addTextField(label, 0);
    }

    public void addTextField(final String label, final Integer width) {
        TextField textField = new TextField();
        textField.setLabel(label);
        textField.setWidth(width);
        getComponents().add(textField);
    }

    public void addTextArea(final String label) {
        TextArea textArea = new TextArea();
        textArea.setLabel(label);
        getComponents().add(textArea);
    }

    public void addCheckBox(final String label) {
        addCheckBox(label, Boolean.FALSE);
    }

    public void addCheckBox(final String label, final Boolean value) {
        CheckBox checkBox = new CheckBox();
        checkBox.setLabel(label);
        checkBox.setValue(value);
        getComponents().add(checkBox);
    }

    public void addComboBox(final String label, final Collection<String> values) {
        addComboBox(label, Boolean.TRUE, values);
    }

    public void addComboBox(final String label, final Boolean editable, final Collection<String> values) {
        ComboBox comboBox = new ComboBox();
        comboBox.setLabel(label);
        comboBox.setEditable(editable);
        comboBox.setValues(values);
        getComponents().add(comboBox);
    }

    public void addList(final String label, final Collection<String> values) {
        addList(label, 1, Boolean.FALSE, values);
    }

    public void addList(final String label, final Integer size, final Boolean multipleSelection,
                        final Collection<String> values) {
        ListComponent list = new ListComponent();
        list.setLabel(label);
        list.setSize(size);
        list.setMultipleSelection(multipleSelection);
        list.setValues(values);
        getComponents().add(list);
    }

    public void addRadioButtons(final String label, final Collection<String> values) {
        addRadioButtons(label, Boolean.FALSE, values);
    }

    public void addRadioButtons(final String label, final Boolean isHorizontal, final Collection<String> values) {
        RadioButtonComponent radioButtonComponent = new RadioButtonComponent();
        radioButtonComponent.setLabel(label);
        radioButtonComponent.setHorizontal(isHorizontal);
        radioButtonComponent.setValues(values);
        getComponents().add(radioButtonComponent);
    }

    public void addDatePicker(final String label) {
        addDatePicker(label, Boolean.FALSE);
    }

    public void addDatePicker(final String label, final Boolean showTime) {
        DatePickerComponent datePickerComponent = new DatePickerComponent();
        datePickerComponent.setLabel(label);
        datePickerComponent.setShowTime(showTime);
        getComponents().add(datePickerComponent);

    }

    public void addButton(final String text) {
        addButton(text, null);
    }

    public void addButton(final String text, final String actionCellTag) {
        ButtonComponent buttonComponent = new ButtonComponent();
        buttonComponent.setText(text);
        buttonComponent.setTag(actionCellTag);
        getComponents().add(buttonComponent);
    }

    public List<EasyFormComponent> getComponents() {
        return components;
    }

    public boolean hasComponents() {
        return getComponents().size() > 0;
    }
}
