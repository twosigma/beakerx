package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

import java.util.Collection;

public class ListComponent extends EasyFormComponent {

    private Integer size;
    private Boolean multipleSelection;
    private Collection<String> values;

    public void setSize(final Integer size) {
        this.size = size;
    }

    public Integer getSize() {
        return size;
    }

    public void setMultipleSelection(final Boolean multipleSelection) {
        this.multipleSelection = multipleSelection;
    }

    public Boolean getMultipleSelection() {
        return multipleSelection;
    }

    public void setValues(final Collection<String> values) {
        this.values = values;
    }

    public Collection<String> getValues() {
        return values;
    }

}
