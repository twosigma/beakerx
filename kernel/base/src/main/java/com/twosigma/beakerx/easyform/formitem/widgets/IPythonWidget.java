package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.widgets.CommFunctionality;
import com.twosigma.beakerx.widgets.ValueWidget;

public class IPythonWidget extends EasyFormComponent<ValueWidget<?>> implements CommFunctionality, EasyFormWidget {


  private ValueWidget<?> widget;

  public IPythonWidget(ValueWidget<?> widget) {
    this.widget = widget;
  }
  
  @Override
  public String getLabel() {
    return this.widget.getDescription();
  }

  @Override
  public Comm getComm() {
    return widget.getComm();
  }

  @Override
  public void setLabel(String label) {
    this.widget.setDescription(label);
  }

  @Override
  public String getValue() {
    return this.widget.getValue().toString();
  }

  @Override
  public void setValue(String value) {
    this.widget.setValue(Boolean.valueOf(value));
  }

  @Override
  public ValueWidget<?> getWidget() {
    return widget;
  }
  
  @Override
  public void close() {
    getComm().close();
  }

}
