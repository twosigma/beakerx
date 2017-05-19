package com.twosigma.beaker.widgets.selections;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Slider to select a single item from a list or dictionary.
 * 
 * @author konst
 *
 */
public class SelectionSlider extends SelectionWidget<String>{


  public static String VIEW_NAME_VALUE = "SelectionSliderView";
  public static String MODEL_NAME_VALUE = "SelectionSliderModel";
  
  protected static final String ORIENTATION = "orientation";

  private String orientation = "horizontal";
  
  public SelectionSlider() {
    super();
    openComm();
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
  public String getValueFromObject(Object input) {
    return getString(input);
  }
  
  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(ORIENTATION, orientation);
    return content;
  }
  
  public String getOrientation() {
    return orientation;
  }

  public void setOrientation(String orientation) {
    this.orientation = orientation;
    sendUpdate(ORIENTATION, orientation);
  }
  
}