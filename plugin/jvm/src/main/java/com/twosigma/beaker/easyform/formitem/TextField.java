package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class TextField extends EasyFormComponent {

    private Integer width;

    public Integer getWidth() {
        return width;
    }

    public TextField setWidth(final Integer width) {
        this.width = width;
        return this;
    }
}
