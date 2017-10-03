package com.twosigma.beakerx.widgets.styles;

import java.io.Serializable;
import java.util.HashMap;

public class SliderStyle extends DescriptionStyle {

  public static final String MODEL_NAME_VALUE = "SliderStyleModel";

  private String handle_color;

  public SliderStyle() {
    super();
    openComm();
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    content.put("handle_color", handle_color);
    return content;
  }

  public String getHandle_color() {
    return handle_color;
  }

  public void setHandle_color(String handle_color) {
    this.handle_color = handle_color;
    sendUpdate("handle_color", handle_color);
  }
}
