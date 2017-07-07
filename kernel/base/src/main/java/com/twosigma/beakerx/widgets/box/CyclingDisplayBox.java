package com.twosigma.beakerx.widgets.box;

import com.twosigma.beakerx.widgets.BeakerxWidget;
import com.twosigma.beakerx.widgets.Widget;

import java.util.List;

public class CyclingDisplayBox extends Box {

  public static final String VIEW_NAME_VALUE = "CyclingDisplayBoxView";
  public static final String MODEL_NAME_VALUE = "CyclingDisplayBoxModel";

  public CyclingDisplayBox(List<Widget> children) {
    super(children);
    openComm();
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }
  
}