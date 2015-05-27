package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class DatePickerComponent extends EasyFormComponent {

    private String label;
    private Boolean showTime;

    public void setLabel(final String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setShowTime(final Boolean showTime) {
        this.showTime = showTime;
    }

    public Boolean getShowTime() {
        return showTime;
    }
}
