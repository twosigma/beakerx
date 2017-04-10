package com.twosigma.beaker.widgets.floats;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Displays a float value within a textbox. For a textbox in which the value
 * must be within a specific range, use BoundedFloatText.
 * 
 *     Parameters
 *   ----------
 *   value : float
 *       value displayed
 *   description : str
 *       description displayed next to the text box
 *   color : str Unicode color code (eg. '#C13535')
 *       color of the value displayed
 * 
 * @author konst
 *
 */
public class FloatText extends FloatWidget<Double> {

  public static final String VIEW_NAME_VALUE = "FloatTextView";
  public static final String MODEL_NAME_VALUE = "FloatTextModel";

  public FloatText() {
    super();
    this.value = 0D;
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    return content;
  }

}