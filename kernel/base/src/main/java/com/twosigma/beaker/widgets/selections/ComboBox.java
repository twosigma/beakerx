package com.twosigma.beaker.widgets.selections;

import com.twosigma.beaker.widgets.BeakerxWidget;
import java.io.Serializable;
import java.util.HashMap;

public class ComboBox extends SingleSelectionWidget {

  public static final String VIEW_NAME_VALUE = "ComboBoxView";
  public static final String MODEL_NAME_VALUE = "ComboBoxModel";
  public static final String EDITABLE = "editable";

  private Boolean editable = Boolean.FALSE;

  public ComboBox() {
    super();
    openComm();
  }

  public ComboBox(Boolean editable) {
    this();
    this.editable = editable;
  }

  public Boolean getEditable() {
    return editable;
  }

  public void setEditable(Boolean editable) {
    this.editable = editable;
    sendUpdate(EDITABLE, editable);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
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
  public void updateValue(Object value) {

  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(EDITABLE, editable);
    return content;
  }
}
