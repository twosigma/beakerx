package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class CheckBox extends EasyFormComponent {

    private String label;
    private Boolean value;

    public void setLabel(final String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setValue(final Boolean value) {
        this.value = value;
    }

    public Boolean getValue() {
        return value;
    }
}
