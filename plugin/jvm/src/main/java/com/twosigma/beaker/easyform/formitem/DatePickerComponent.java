package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

public class DatePickerComponent extends EasyFormComponent {

    private Boolean showTime;

    public void setShowTime(final Boolean showTime) {
        this.showTime = showTime;
    }

    public Boolean getShowTime() {
        return showTime;
    }
}
