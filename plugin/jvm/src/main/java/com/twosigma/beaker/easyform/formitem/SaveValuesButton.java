package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class SaveValuesButton extends EasyFormComponent {

    private String path;

    public void setPath(final String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }
}
