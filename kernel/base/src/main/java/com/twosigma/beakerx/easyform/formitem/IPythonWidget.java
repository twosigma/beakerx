package com.twosigma.beakerx.easyform.formitem;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.widgets.ValueWidget;

public class IPythonWidget extends EasyFormComponent<ValueWidget<?>> {

  public IPythonWidget(ValueWidget<?> widget) {
    this.widget = widget;
  }

  @Override
  public String getValue() {
    return this.widget.getValue().toString();
  }

  @Override
  public void setValue(String value) {
    this.widget.setValue(Boolean.valueOf(value));
  }

}