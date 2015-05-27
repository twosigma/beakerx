package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

import java.util.Collection;

public class ComboBox extends EasyFormComponent {

    private String label;
    private Boolean editable;
    private Collection<String> values;

    public void setLabel(final String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setEditable(final Boolean editable) {
        this.editable = editable;
    }

    public Boolean getEditable() {
        return editable;
    }

    public void setValues(final Collection<String> values) {
        this.values = values;
    }

    public Collection<String> getValues() {
        return values;
    }
}
