package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

import java.util.Collection;

public class CheckBoxGroup extends EasyFormComponent {
    private Boolean horizontal;
    private Collection<String> values;

    public Boolean getHorizontal() {
        return horizontal;
    }

    public void setHorizontal(final Boolean horizontal) {
        this.horizontal = horizontal;
    }

    public Collection<String> getValues() {
        return values;
    }

    public void setValues(final Collection<String> values) {
        this.values = values;
    }
}
