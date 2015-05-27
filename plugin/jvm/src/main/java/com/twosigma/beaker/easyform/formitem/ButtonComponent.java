package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class ButtonComponent extends EasyFormComponent {

    private String text;
    private String tag;

    public void setText(final String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setTag(final String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }
}
