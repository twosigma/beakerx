package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class CheckBox extends EasyFormComponent {

    private Boolean value;

    public void setValue(final Boolean value) {
        this.value = value;
    }

    public Boolean getValue() {
        return value;
    }
}
