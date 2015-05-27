package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class TextField extends EasyFormComponent {
    private String label;
    private Integer width;

    public String getLabel() {
        return label;
    }

    public TextField setLabel(final String label) {
        this.label = label;
        return this;
    }

    public Integer getWidth() {
        return width;
    }

    public TextField setWidth(final Integer width) {
        this.width = width;
        return this;
    }
}
